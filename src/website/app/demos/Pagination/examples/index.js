/* @flow */
import basic from './basic';
import defaultPage from './defaultPage';
import importSyntax from './importSyntax';
import pageJumper from './pageJumper';
import pageSizer from './pageSizer';
import table from './table';
import tableSelectable from './tableSelectable';
import tableSortable from './tableSortable';
import visibleRange from './visibleRange';

export default [
  importSyntax,
  basic,
  visibleRange,
  defaultPage,
  pageJumper,
  table,
  pageSizer,
  tableSelectable,
  tableSortable
];
