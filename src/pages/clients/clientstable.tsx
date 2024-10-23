import React from 'react';

// material-ui
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from '@mui/material';

// project imports
import { Client } from 'types/client';

// third-party
import { ArrangementOrder, HeadCell } from 'types';
import { EnhancedTableHead } from 'components/table/datatable';
import { FormattedMessage } from 'react-intl';
import SearchInput from 'layout/MainLayout/Header/SearchSection/SearchInput';
import useConfig from 'hooks/useConfig';
import { GetClients } from 'api/clients';
import Loader from 'ui-component/Loader';

// ==============================|| CLIENTS ||============================== //

interface pageDataProps {
  rowData: Client[];
  isLoading: boolean;
  totalPages: number;
  totalItems: number;
  page: number;
  rowsPerPage: number;
  orderBy: string;
  order: ArrangementOrder;
}
const ClientsTable = () => {
  const { storeAuto } = useConfig();
  const [loading, setLoading] = React.useState<boolean>(false);

  const initialStateTable: pageDataProps = {
    rowData: [],
    isLoading: false,
    totalPages: 0,
    totalItems: 150,
    page: 0,
    rowsPerPage: 10,
    order: 'asc',
    orderBy: 'name',
  };

  const [pageData, setPageData] =
    React.useState<pageDataProps>(initialStateTable);

  const [filters, setFilters] = React.useState('');

  const fetchAPI = async () => {
    setLoading(true);
    await GetClients(
      pageData.page + 1,
      pageData.rowsPerPage,
      JSON.stringify({
        [pageData.orderBy]: pageData.order,
      }),
      storeAuto!,
      JSON.stringify(filters)
    ).then((result) => {
      const { items, pages, total } = result.data.data;
      setPageData({
        ...pageData,
        isLoading: false,
        rowData: items,
        totalPages: pages,
        totalItems: total,
      });
      setLoading(false);
    });
  };

  React.useEffect(() => {
    fetchAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    storeAuto,
    pageData.page,
    pageData.rowsPerPage,
    pageData.order,
    pageData.orderBy,
    filters,
  ]);

  const handleRequestSort = (event: React.SyntheticEvent, property: string) => {
    const isAsc = pageData.orderBy === property && pageData.order === 'asc';

    setPageData({
      ...pageData,
      order: isAsc ? 'desc' : 'asc',
      orderBy: property,
      page: 0,
    });
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPageData({ ...pageData, page: newPage });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined
  ) => {
    setPageData({
      ...pageData,
      page: 0,
      rowsPerPage: parseInt(event?.target.value!, 10),
    });
  };

  const headCells: HeadCell[] = [
    {
      id: 'name',
      numeric: false,
      disablePadding: false,
      label: <FormattedMessage id="Name" />,
    },
    {
      id: 'contacts',
      numeric: false,
      disablePadding: false,
      label: <FormattedMessage id="Contacts" />,
    },
    {
      id: 'taxpayer',
      numeric: false,
      disablePadding: false,
      label: <FormattedMessage id="Taxpayer" />,
    },
    {
      id: 'address',
      numeric: false,
      disablePadding: false,
      label: <FormattedMessage id="Address" />,
    },
    {
      id: 'registrations',
      numeric: true,
      disablePadding: false,
      label: <FormattedMessage id="Registrations" />,
    },
  ];

  const setValueSearch = async (searchedVal: string) => {
    setPageData(initialStateTable);
    setFilters(searchedVal);
  };

  function Row(props: { row: Client }) {
    const row = props.row;

    return (
      <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }} key={row.id}>
        <TableCell align="left">{row.name}</TableCell>
        <TableCell align="left">
          {row.contacts?.map((x: string, index: number) => {
            return (
              <span key={index} style={{ marginRight: '5px' }}>
                <Chip label={x} size="small" />
              </span>
            );
          })}
        </TableCell>

        <TableCell align="left">{row.taxpayer}</TableCell>
        <TableCell align="left">{row.address}</TableCell>
        <TableCell align="left">
          {row.registrations?.map((x: string, index: number) => {
            return (
              <span key={index} style={{ marginRight: '5px' }}>
                <Chip label={x} size="small" />
              </span>
            );
          })}
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      <SearchInput setValueSearch={setValueSearch} />
      {!loading ? (
        <>
          {/* table */}
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={'small'}
            >
              <EnhancedTableHead
                headCells={headCells}
                order={pageData.order}
                orderBy={pageData.orderBy}
                onRequestSort={handleRequestSort}
                rowCount={pageData.rowData.length}
              />
              <TableBody>
                {pageData.rowData.map((row: Client) => {
                  return <Row row={row} key={row.id} />;
                })}
              </TableBody>
            </Table>
          </TableContainer>

          {/* table data */}
          <TablePagination
            rowsPerPageOptions={[10, 15, 25]}
            component="div"
            count={pageData.totalItems}
            rowsPerPage={pageData.rowsPerPage}
            page={pageData.page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={<FormattedMessage id="Rows Per Page" />}
            labelDisplayedRows={({ from, to, count }) => `${from}...${to}`}
          />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

ClientsTable.Layout = 'authGuard';
export default ClientsTable;
