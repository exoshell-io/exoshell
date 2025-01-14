'use client';

import { type SlotComponentProps } from '../..';
import { createContext } from 'react';
import {
  Cell as AriaCell,
  Column as AriaColumn,
  ResizableTableContainer as AriaResizableTableContainer,
  Row as AriaRow,
  Table as AriaTable,
  TableBody as AriaTableBody,
  TableHeader as AriaTableHeader,
} from 'react-aria-components';
import { type VariantProps } from 'tailwind-variants';
import { _tvTable, tvTable } from './styles';

const TableContext = createContext<VariantProps<typeof _tvTable>>({});

// =============================================================================
// #region Table
export type TableProps = SlotComponentProps<
  typeof _tvTable,
  'root',
  React.ComponentPropsWithRef<typeof AriaTable>
>;

export const Table: React.FC<TableProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <TableContext value={{ variant: props.variant, caption: props.caption }}>
      <AriaResizableTableContainer>
        <AriaTable
          className={(renderProps) => {
            if (typeof className === 'function') {
              className = className(renderProps);
            }
            return tvTable.root({ className, ...props, ...renderProps });
          }}
          {...props}
        >
          {children}
        </AriaTable>
      </AriaResizableTableContainer>
    </TableContext>
  );
};
// #endregion

// =============================================================================
// #region TableHeader
export type TableHeaderProps = SlotComponentProps<
  typeof _tvTable,
  'header',
  React.ComponentPropsWithRef<typeof AriaTableHeader>
>;

export const TableHeader: React.FC<TableHeaderProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <AriaTableHeader
      className={(renderProps) => {
        if (typeof className === 'function') {
          className = className(renderProps);
        }
        return tvTable.header({ className, ...props, ...renderProps });
      }}
      {...props}
    >
      {children}
    </AriaTableHeader>
  );
};
// #endregion

// =============================================================================
// #region TableColumn
export type TableColumnProps = SlotComponentProps<
  typeof _tvTable,
  'column',
  React.ComponentPropsWithRef<typeof AriaColumn>
>;

export const TableColumn: React.FC<TableColumnProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <AriaColumn
      className={(renderProps) => {
        if (typeof className === 'function') {
          className = className(renderProps);
        }
        return tvTable.column({ className, ...props, ...renderProps });
      }}
      {...props}
    >
      {children}
    </AriaColumn>
  );
};
// #endregion

// =============================================================================
// #region TableBody
export type TableBodyProps = SlotComponentProps<
  typeof _tvTable,
  'body',
  React.ComponentPropsWithRef<typeof AriaTableBody>
>;

export const TableBody: React.FC<TableBodyProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <AriaTableBody
      className={(renderProps) => {
        if (typeof className === 'function') {
          className = className(renderProps);
        }
        return tvTable.body({ className, ...props, ...renderProps });
      }}
      {...props}
    >
      {children}
    </AriaTableBody>
  );
};
// #endregion

// =============================================================================
// #region TableRow
export type TableRowProps = SlotComponentProps<
  typeof _tvTable,
  'row',
  React.ComponentPropsWithRef<typeof AriaRow>
>;

export const TableRow: React.FC<TableRowProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <AriaRow
      className={(renderProps) => {
        if (typeof className === 'function') {
          className = className(renderProps);
        }
        return tvTable.row({ className, ...props, ...renderProps });
      }}
      {...props}
    >
      {children}
    </AriaRow>
  );
};
// #endregion

// =============================================================================
// #region TableCell
export type TableCellProps = SlotComponentProps<
  typeof _tvTable,
  'cell',
  React.ComponentPropsWithRef<typeof AriaCell>
>;

export const TableCell: React.FC<TableCellProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <AriaCell
      className={(renderProps) => {
        if (typeof className === 'function') {
          className = className(renderProps);
        }
        return tvTable.cell({ className, ...props, ...renderProps });
      }}
      {...props}
    >
      {children}
    </AriaCell>
  );
};
// #endregion

// =============================================================================
// #region TableFooter
export type TableFooterProps = SlotComponentProps<
  typeof _tvTable,
  'footer',
  React.ComponentPropsWithRef<typeof TableRow>
>;

export const TableFooter: React.FC<TableFooterProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <TableRow
      className={(renderProps) => {
        if (typeof className === 'function') {
          className = className(renderProps);
        }
        return tvTable.footer({ className, ...props, ...renderProps });
      }}
      {...props}
    >
      {children}
    </TableRow>
  );
};
// #endregion
