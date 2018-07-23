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
  totalPages: number
};

export const componentTheme = (baseTheme: Object) => ({
  // Pagination_color_checkedDisabled: baseTheme.color_gray_60,

  ...baseTheme
});

const styles = ({ theme: baseTheme }) => {
  let theme = componentTheme(baseTheme);

  return {
    // width: theme.size_large
  };
};

const Root = createStyledComponent(FlexItem, styles, {
  includeStyleReset: true
});

/**
 * TODO
 */
export default class PageSizer extends Component<State, Props> {
  static defaultProps = {
    'aria-label': 'Page Sizer',
    messages: {
      pagesStatus: (first, last, total, text) =>
        `${first}-${last} of ${total} ${text}`,
      perPageText: 'per page',
      rowsText: 'rows'
    }
  };

  state = {
    pageSize: this.props.pageSize
  };

  render() {
    const { pageSize } = this.state;
    const {
      currentPage,
      messages,
      pageSizes,
      totalPages,
      ...restProps
    } = this.props;
    const rootProps = {
      ...restProps
    };

    const data = pageSizes.map((pageSize) => ({
      text: `${pageSize} ${messages.perPageText}`,
      value: `${pageSize}`
    }));

    const first = currentPage * pageSize + 1;
    const last = first + pageSize - 1;
    const lastPage = currentPage + 1 === totalPages;
    const pageSizerDescription = messages.pagesStatus(
      first,
      lastPage ? messages.total : last,
      messages.total,
      messages.rowsText
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
    this.setState({ pageSize });
    this.props.onPageSizeChange(pageSize);
  };
}
