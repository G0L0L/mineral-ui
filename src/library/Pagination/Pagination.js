/* @flow */
import React, { Component } from 'react';
import { IconChevronRight } from 'mineral-ui-icons';
import { IconChevronLeft } from 'mineral-ui-icons';
import { createStyledComponent } from '../styles';
import Button from '../Button';
import Flex, { FlexItem } from '../Flex';
import PageJumper from './PageJumper';
import _PageSizer from './PageSizer';

type Props = {
  /** TODO */
  contentText?: string,
  /** TODO */
  defaultPage?: number,
  /** Various messages and labels used by Table
   * ([see example for more details](#rtl))
   */
  messages?: Messages,
  /** TODO */
  onPageChange?: () => number,
  /** TODO */
  onPageSizeChange?: () => number,
  /** TODO */
  pageJumper?: boolean,
  /** TODO */
  pageSize?: number,
  /** TODO */
  pageSizes?: Array<number>,
  /** TODO */
  pageSizer?: boolean,
  /** TODO */
  visibleRange?: number,
  /** TODO */
  totalLength: number
};

export type Messages = {
  pagination: { label: string },
  pageJumper?: { label: string, placeholder: string },
  pageSizer?: {
    status: (
      first: number,
      last: number,
      total: number,
      label: string
    ) => string,
    itemText: (pageSize: number) => string
  }
};

type State = {
  currentPage: number,
  pageSize: number
};

export const componentTheme = (baseTheme: Object) => ({
  // Pagination_color_checkedDisabled: baseTheme.color_gray_60,

  ...baseTheme
});

const styles = ({ theme: baseTheme }) => {
  let theme = componentTheme(baseTheme);

  return {
    '& button': {
      '&:not(:last-child)': {
        marginRight: theme.space_inline_sm
      }
    }
  };
};

const firstPage = (current) => current === 0;
const lastPage = (current, total) => current === total - 1;

const pages = (currentPage, handleClick, totalPages, { visibleRange }) => {
  const range = visibleRange || Pagination.defaultProps.visibleRange;
  return Array.apply(null, Array(totalPages))
    .map(Number.prototype.valueOf, 0)
    .map((_, index) => {
      let pagesBuffer;
      if (currentPage < range) {
        pagesBuffer = range - currentPage + 2;
      } else if (currentPage > totalPages - 1 - range) {
        pagesBuffer = range - (totalPages - 1 - currentPage) + 2;
      } else {
        pagesBuffer = Math.ceil(range / 2);
      }

      const firstPageInRange =
        index === currentPage - pagesBuffer && !firstPage(index);
      const lastPageInRange =
        index === currentPage + pagesBuffer && !lastPage(index, totalPages);
      const isPageOutOfRange =
        index < currentPage - pagesBuffer || index > currentPage + pagesBuffer;

      let pageView = null;
      if (firstPageInRange || lastPageInRange) {
        pageView = (
          <Button element="span" key={index} minimal size="medium">
            ...
          </Button>
        );
      } else if (
        !isPageOutOfRange ||
        firstPage(index) ||
        lastPage(index, totalPages)
      ) {
        pageView = (
          <Button
            minimal
            primary={currentPage === index}
            key={index}
            onClick={handleClick.bind(null, index)}
            size="medium">
            {index + 1}
          </Button>
        );
      }
      return pageView;
    })
    .filter((page) => !!page);
};

const incrementButton = (
  currentPage,
  direction,
  handleIncrement,
  totalPages
) => {
  const incrementForward = direction === 'next' ? true : false;
  const incrementIcon =
    direction === 'next' ? <IconChevronRight /> : <IconChevronLeft />;
  const disabled =
    direction === 'next'
      ? lastPage(currentPage, totalPages)
      : firstPage(currentPage);
  return (
    <Button
      aria-label={`${direction}-pointing chevron`}
      disabled={disabled}
      iconStart={incrementIcon}
      minimal
      size="medium"
      onClick={handleIncrement.bind(null, incrementForward)}
    />
  );
};

const getTotalPages = (pageSize, totalLength) =>
  Math.ceil(totalLength / pageSize);

const Root = createStyledComponent(Flex, styles, {
  includeStyleReset: true,
  withProps: { element: 'nav', justifyContent: 'end' }
});

const PageSizer = createStyledComponent(_PageSizer, {
  marginRight: 'auto'
});

/**
 * TODO
 */
export default class Pagination extends Component<Props, State> {
  static displayName = 'Pagination';
  static defaultProps = {
    contentText: 'rows',
    defaultPage: 0,
    pageSizes: [10, 20, 25],
    visibleRange: 3,
    messages: {
      pagination: { label: 'Pagination' },
      pageJumper: {
        label: 'Jump to page',
        placeholder: 'Page #'
      },
      pageSizer: {
        status: (first, last, total, label) =>
          `${first}-${last} of ${total} ${label}`,
        itemText: (pageSize) => `${pageSize} per page`
      }
    }
  };

  state = {
    currentPage: this.props.defaultPage && this.props.defaultPage - 1,
    pageSize: this.props.pageSize || this.props.pageSizes[0],
    totalPages: getTotalPages(
      this.props.pageSize || this.props.pageSizes[0],
      this.props.totalLength
    )
  };

  render() {
    const { currentPage, pageSize, totalPages } = this.state;
    const {
      contentText,
      messages,
      pageJumper,
      totalLength,
      onPageSizeChange,
      pageSizer,
      pageSizes,
      ...restProps
    } = this.props;
    const rootProps = {
      'aria-label': messages.pagination.label,
      ...restProps
    };
    const content = [
      <FlexItem key={1}>
        {incrementButton(
          currentPage,
          'previous',
          this.handleIncrement,
          totalPages
        )}
        {pages(currentPage, this.handleClick, totalPages, this.props)}
        {incrementButton(currentPage, 'next', this.handleIncrement, totalPages)}
      </FlexItem>
    ];

    const pageJumperProps = {
      key: 'Page Jumper',
      currentPage: currentPage,
      messages: messages,
      onPageChange: this.onPageChange,
      totalPages
    };

    const pageSizerProps = {
      key: 'Page Sizer',
      currentPage: currentPage,
      contentText,
      messages,
      onPageChange: this.onPageChange,
      onPageSizeChange: this.onPageSizeChange,
      pageSize,
      pageSizes,
      totalLength,
      totalPages
    };

    pageJumper && content.unshift(<PageJumper {...pageJumperProps} />);
    pageSizer && content.unshift(<PageSizer {...pageSizerProps} />);

    return <Root {...rootProps}>{content}</Root>;
  }

  handleClick = (index: number) => {
    const currentPage = index;
    this.onPageChange(currentPage);
  };

  handleIncrement = (incrementForward: boolean) => {
    this.setState((prevState) => {
      const currentPage = incrementForward
        ? prevState.currentPage + 1
        : prevState.currentPage - 1;
      if (this.props.onPageChange) {
        this.props.onPageChange(currentPage);
      }
      return { currentPage };
    });
  };

  onPageChange = (currentPage: number) => {
    this.setState({ currentPage });
    if (this.props.onPageChange) {
      this.props.onPageChange(currentPage);
    }
  };

  onPageSizeChange = (pageSize: number) => {
    const totalPages = getTotalPages(pageSize, this.props.totalLength);
    this.setState({ pageSize, totalPages });
    if (this.props.onPageSizeChange) {
      this.props.onPageSizeChange(pageSize);
    }
  };
}
