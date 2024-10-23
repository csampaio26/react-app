import * as React from 'react';

// material-ui
import { Box, TableCell, TableHead, TableSortLabel, TableRow } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

// project imports
import { KeyedObject, ArrangementOrder, EnhancedTableHeadProps, GetComparator } from 'types';

// table filter
export function descendingComparator(a: KeyedObject, b: KeyedObject, orderBy: string) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export const getComparator: GetComparator = (order, orderBy) =>
  order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);

export function stableSort(array: any[], comparator: (a: KeyedObject, b: KeyedObject) => number) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0] as any, b[0] as any);
    if (order !== 0) return order;
    return (a[1] as number) - (b[1] as number);
  });
  return stabilizedThis.map((el) => el[0]);
}

// ==============================|| TABLE - HEADER ||============================== //

interface TableDataEnhancedTableHead extends EnhancedTableHeadProps {
  headCells: any[];
}

export function EnhancedTableHead({ headCells, order, orderBy, rowCount, onRequestSort }: TableDataEnhancedTableHead) {
  const createSortHandler = (property: string) => (event: React.SyntheticEvent) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'left' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// ==============================|| TABLE - DATA TABLE ||============================== //

const DataTable = (props: {
  rows: any[];
  headCells: any[];
  defaultSort: string;
  defaultOrder: ArrangementOrder;
  title: any;
  setValueSearch: (searchedVal: string) => void;
  hasSearch: boolean;
}) => {
  return <></>;
};

DataTable.Layout = 'authGuard';
export default DataTable;
