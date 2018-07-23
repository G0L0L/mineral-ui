/* @flow */
import React from 'react';
import { createStyledComponent } from '../styles';
import { FlexItem } from '../Flex';
import { FormField } from '../Form';
import TextInput from '../TextInput';
import type Messages from './Pagination';

type Props = {
  /** TODO */
  'aria-label'?: string,
  /** TODO */
  currentPage: number,
  /** Various messages and labels used by Table
   * ([see example for more details](#rtl))
   */
  messages: Messages,
  /** TODO */
  onPageChange: () => number,
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
    width: theme.size_large
  };
};

const handleFormFieldBlur = (
  { onPageChange, totalPages },
  event: SyntheticInputEvent<>
) => {
  event.persist();
  const updateCurrentPage = () => {
    const value = parseInt(event.target.value);
    const currentPage = value - 1;
    if (1 <= value && value <= totalPages) {
      onPageChange(currentPage);
    }
  };
  event.target.addEventListener('blur', updateCurrentPage);
};

const Root = createStyledComponent(FlexItem, styles, {
  displayName: 'PageJumper',
  includeStyleReset: true
});

/**
 * TODO
 */
export default function PageJumper(props: Props) {
  const { messages, ...restProps } = props;
  const rootProps = {
    width: '4.5em',
    ...restProps
  };
  const inputProps = {
    label: messages.pageJumperLabel,
    hideLabel: true,
    input: TextInput,
    caption: messages.pageJumperLabel,
    onChange: handleFormFieldBlur.bind(null, props),
    placeholder: messages.pageJumperPlaceholder,
    size: 'medium'
  };

  return (
    <Root {...rootProps}>
      <FormField {...inputProps} />
    </Root>
  );
}

PageJumper.defaultProps = {
  'aria-label': 'Page Jumper',
  messages: {
    pageJumperLabel: 'Jump to page',
    pageJumperPlaceholder: 'Page #'
  }
};
