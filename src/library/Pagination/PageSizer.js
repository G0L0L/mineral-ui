/* @flow */
import React, { Component } from 'react';
import { createStyledComponent } from '../styles';
import { FlexItem } from '../Flex';
import { FormField } from '../Form';
import Select from '../Select';
import type Messages from './Pagination';

type Props = {
  /** TODO */
  'aria-label'?: string,
  /** TODO */
  currentPage: number,
  /** Various messages and labels used by Table
   * ([see example for more details](#rtl))
   */
  messages?: Messages,
  /** TODO */
  onPageSizeChange: () => number,
  /** TODO */
  pageSize: number,
  /** TODO */
  pageSizes: Array<number>,
  /** TODO */
  totalLength: number,
  /** TODO */
  totalPages: number
};

export const componentTheme = (baseTheme: Object) => ({
  // Pagination_color_checkedDisabled: baseTheme.color_gray_60,

  ...baseTheme
});

const styles = ({ theme: baseTheme }) => {
  let theme = componentTheme(baseTheme);

  return {
    // marginRight: 'auto'
  };
};

const Root = createStyledComponent(FlexItem, styles, {
  includeStyleReset: true
});

/**
 * TODO
 */
export default class PageSizer extends Component<State, Props> {
  render() {
    const {
      contentText,
      currentPage,
      messages,
      pageSize,
      pageSizes,
      totalLength,
      totalPages,
      ...restProps
    } = this.props;
    const rootProps = {
      ...restProps
    };

    const { status, itemText } = messages.pageSizer;

    const data = pageSizes.map((pageSize) => ({
      text: itemText(pageSize),
      value: `${pageSize}`
    }));

    const first = currentPage * pageSize + 1;
    const last = first + pageSize - 1;
    const lastPage = currentPage + 1 === totalPages;
    const pageSizerDescription = status(
      first,
      lastPage ? totalLength : last,
      totalLength,
      contentText
    );

    const inputProps = {
      data,
      defaultSelectedItem: data[data.indexOf(pageSize)] || data[0],
      label: pageSizerDescription,
      hideLabel: true,
      input: Select,
      caption: pageSizerDescription,
      onChange: this.handleSelect,
      size: 'medium'
    };

    return (
      <Root {...rootProps}>
        <FormField {...inputProps} />
      </Root>
    );
  }

  handleSelect = (event: SyntheticInputEvent<>) => {
    const pageSize = parseInt(event.value);
    this.props.onPageSizeChange(pageSize);
  };
}
