/* @flow */
import React, { Component } from 'react';
import { IconChevronRight } from 'mineral-ui-icons';
import { IconChevronLeft } from 'mineral-ui-icons';
import { createStyledComponent } from '../styles';
import { createThemedComponent } from '../themes';
import Button from '../Button';
import Flex, { FlexItem } from '../Flex';
import PageJumper from './PageJumper';
import PageSizer from './PageSizer';

type Props = {
  /** TODO */
  'aria-label'?: string,
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
  totalPages: number
};

export type Messages = {
  pageJumperLabel?: string,
  pageJumperPlaceholder?: string,
  pagesStatus?: () => string,
  perPageText?: string,
  rowsText?: string,
  total?: number
};

type State = {
  currentPage: number,
  pageSize: number
};

export const componentTheme = (baseTheme: Object) => ({
  // Pagination_color_checkedDisabled: baseTheme.color_gray_60,

  ...baseTheme
});

const styles = {
  root: ({ theme: baseTheme }) => {
    let theme = componentTheme(baseTheme);

    return {
      '& button': {
        '&:not(:last-child)': {
          marginRight: theme.space_inline_sm
        }
      }
    };
  },
  icon: {}
};

const firstPage = (current) => current === 0;
const lastPage = (current, total) => current === total - 1;

const pages = (currentPage, handleClick, { totalPages, visibleRange }) => {
  const range = visibleRange || Pagination.defaultProps.visibleRange;
  return Array.apply(null, Array(totalPages))
    .map(Number.prototype.valueOf, 0)
    .map((_, index) => {
      let primary = false;
      if (currentPage === index) {
        primary = true;
      }
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
          <PageButton
            minimal
            primary={primary}
            key={index}
            onClick={handleClick.bind(null, index)}
            size="medium">
            {index + 1}
          </PageButton>
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

const PageButton = createThemedComponent(Button, {
  Button_paddingHorizontal: 0
});

const Root = createStyledComponent('nav', styles.root, {
  includeStyleReset: true
});

/**
 * TODO
 */
export default class Pagination extends Component<Props, State> {
  static displayName = 'Pagination';
  static defaultProps = {
    'aria-label': 'Pagination',
    defaultPage: 0,
    pageSizes: [10, 20, 25],
    visibleRange: 3
  };

  state = {
    currentPage: this.props.defaultPage && this.props.defaultPage - 1,
    pageSize: this.props.pageSize || this.props.pageSizes[0]
  };

  render() {
    const { currentPage, pageSize } = this.state;
    const {
      messages,
      pageJumper,
      totalPages,
      onPageSizeChange,
      pageSizer,
      pageSizes,
      ...restProps
    } = this.props;
    const rootProps = {
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
        {pages(currentPage, this.handleClick, this.props)}
        {incrementButton(currentPage, 'next', this.handleIncrement, totalPages)}
      </FlexItem>
    ];

    const pageJumperProps = {
      key: 'Page Jumper',
      currentPage: currentPage,
      messages,
      onPageChange: this.onPageChange,
      totalPages
    };

    const pageSizerProps = {
      key: 'Page Sizer',
      currentPage: currentPage,
      messages,
      onPageChange: this.onPageChange,
      onPageSizeChange,
      pageSize: pageSize || pageSizes[0],
      pageSizes,
      totalPages
    };

    pageJumper && content.unshift(<PageJumper {...pageJumperProps} />);
    pageSizer && content.unshift(<PageSizer {...pageSizerProps} />);

    return (
      <Root {...rootProps}>
        <Flex justifyContent="end">{content}</Flex>
      </Root>
    );
  }

  handleClick = (index: number) => {
    const currentPage = index;
    this.setState({ currentPage });
    this.onPageChange(currentPage);
  };

  handleIncrement = (incrementForward: boolean) => {
    this.setState((prevState) => {
      const currentPage = incrementForward
        ? prevState.currentPage + 1
        : prevState.currentPage - 1;
      this.onPageChange(currentPage);
      return { currentPage };
    });
  };

  onPageChange = (currentPage: number) => {
    if (this.props.onPageChange) {
      this.props.onPageChange(currentPage);
    } else {
      this.setState({ currentPage });
    }
  };

  onPageSizeChange = (pageSize: number) => {
    if (this.props.onPageSizeChange) {
      this.props.onPageSizeChange(pageSize);
    } else {
      this.setState({ pageSize });
    }
  };
}
