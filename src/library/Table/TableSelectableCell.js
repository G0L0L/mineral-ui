/* @flow */
import React, { Component } from 'react';
import Checkbox from '../Checkbox';
import TableCell from './TableCell';
import TableHeaderCell from './TableHeaderCell';

type Props = {
  checked?: boolean,
  indeterminate?: boolean,
  isHeader?: boolean,
  label: string,
  onChange: () => void
};

export default class TableSelectableCell extends Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
    return (
      this.props.checked !== nextProps.checked ||
      this.props.indeterminate !== nextProps.indeterminate
    );
  }

  render() {
    console.log('render TableSelectableCell');
    const {
      checked,
      indeterminate,
      isHeader,
      label,
      onChange,
      ...rootProps
    } = this.props;

    const Root = isHeader ? TableHeaderCell : TableCell;

    return (
      <Root {...rootProps}>
        <Checkbox
          checked={checked}
          indeterminate={indeterminate}
          hideLabel
          label={label}
          onChange={onChange}
        />
      </Root>
    );
  }
}