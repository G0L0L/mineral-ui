/* @flow */
import React, { Component } from 'react';
import { IconChevronRight } from 'mineral-ui-icons';
import { IconChevronLeft } from 'mineral-ui-icons';
import { createStyledComponent } from '../styles';
import { createThemedComponent } from '../themes';
import Button from '../Button';
import Flex, { FlexItem } from '../Flex';
import { FormField } from '../Form';
import TextInput from '../TextInput';
import Select from '../Select';

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
  pagesStatusBuilder?: () => string
};

type State = {
  currentPage: number
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

const Root = createStyledComponent('nav', styles.root, {
  includeStyleReset: true
});

const PageButton = createThemedComponent(Button, {
  Button_paddingHorizontal: 0
});

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

const PageJumperFlexItem = createStyledComponent(FlexItem, ({ theme }) => ({
  width: theme.size_large
}));

const createPageJumper = (handleFormFieldBlur, messages) => (
  <PageJumperFlexItem key={2} width="4.5em">
    <FormField
      label={
        messages.pageJumperLabel ||
        Pagination.defaultProps.messages.pageJumperLabel
      }
      hideLabel
      input={TextInput}
      caption={messages.pageJumperLabel}
      onChange={handleFormFieldBlur}
      placeholder={messages.pageJumperPlaceholder}
      size="medium"
    />
  </PageJumperFlexItem>
);

const createPageSizer = (
  currentPage,
  handleSelect,
  { messages, pageSize, pageSizes, totalPages }
) => {
  const data = pageSizes.map((pageSize) => ({
    text: `${pageSize}`,
    value: `${pageSize}`
  }));
  return (
    <FlexItem key={3}>
      <FormField
        data={data}
        defaultSelectedItem={data[data.indexOf(pageSize)] || data[0]}
        label="choose a page"
        // label={
        //   messages.pagesStatus || Pagination.defaultProps.messages.pagesStatus
        // }
        hideLabel
        input={Select}
        // caption={messages.pagesStatus(
        //   currentPage,
        //   totalPages,
        //   messages.pagesText || Pagination.defaultProps.messages.pagesText
        // )}
        onChange={handleSelect}
        size="medium"
      />
    </FlexItem>
  );
};

/**
 * TODO
 */
export default class Pagination extends Component<Props, State> {
  static displayName = 'Pagination';
  static defaultProps = {
    'aria-label': 'Pagination',
    defaultPage: 0,
    pageSize: 10,
    messages: {
      pageJumperLabel: 'Jump to page',
      pageJumperPlaceholder: 'Page #',
      pagesStatus: ({ currentPage, totalPages, pagesText }) =>
        `${currentPage} of ${totalPages} ${pagesText}`,
      pagesText: 'pages'
    },
    pageSizes: [10, 20, 25],
    visibleRange: 3
  };

  state = {
    currentPage:
      (this.props.defaultPage && this.props.defaultPage - 1) ||
      Pagination.defaultProps.defaultPage,
    pageSize: this.props.pageSize || Pagination.defaultProps.pageSize
  };

  render() {
    const {
      messages,
      pageJumper,
      totalPages,
      pageSizer,
      ...restProps
    } = this.props;
    const rootProps = {
      ...restProps
    };

    const content = [
      <FlexItem key={1}>
        {incrementButton(
          this.state.currentPage,
          'previous',
          this.handleIncrement,
          totalPages
        )}
        {pages(this.state.currentPage, this.handleClick, this.props)}
        {incrementButton(
          this.state.currentPage,
          'next',
          this.handleIncrement,
          totalPages
        )}
      </FlexItem>
    ];

    pageJumper &&
      content.unshift(createPageJumper(this.handleFormFieldBlur, messages));
    pageSizer &&
      content.unshift(
        createPageSizer(this.state.currentPage, this.handleSelect, this.props)
      );

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

  handleFormFieldBlur = (event: SyntheticInputEvent<>) => {
    const value = parseInt(event.target.value);
    const currentPage = value - 1;
    const updateState = () => {
      if (1 < value && value < this.props.totalPages) {
        this.setState({ currentPage });
        this.onPageChange(currentPage);
      }
    };
    event.target.addEventListener('blur', updateState);
  };

  handleSelect = (event: SyntheticInputEvent<>) => {
    const pageSize = parseInt(event.value);
    this.setState({ pageSize });
    this.onPageSizeChange(pageSize);
  };

  onPageChange = (currentPage: number) => {
    if (this.props.onPageChange) {
      this.props.onPageChange(currentPage);
    }
  };

  onPageSizeChange = (pageSize: number) => {
    if (this.props.onPageSizeChange) {
      this.props.onPageSizeChange(pageSize);
    }
  };
}
