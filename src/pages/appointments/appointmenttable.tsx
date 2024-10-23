import React from 'react';

// material-ui
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from '@mui/material';

// project imports
import { Appointment } from 'types/appointment';

// third-party
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import EditTwoTone from '@mui/icons-material/EditTwoTone';
import {
  DeleteAppointment,
  GetAppointments,
  UpdateAppointment,
} from 'api/appointments';
import { EnhancedTableHead } from 'components/table/datatable';
import AlertDialogSlide from 'components/ui-elements/advance/UIDialog/AlertDialogSlide';
import useConfig from 'hooks/useConfig';
import SearchInput from 'layout/MainLayout/Header/SearchSection/SearchInput';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import { ArrangementOrder, HeadCell } from 'types';
import Loader from 'ui-component/Loader';
// ==============================|| APPOINTMENTS ||============================== //

interface Props {
  handleDrawerOpen: () => void;
  handleSetAppointment: (appointment: Appointment) => void;
}

interface pageDataProps {
  rowData: Appointment[];
  isLoading: boolean;
  totalPages: number;
  totalItems: number;
  page: number;
  rowsPerPage: number;
  orderBy: string;
  order: ArrangementOrder;
}

const AppointmentsTable = ({
  handleDrawerOpen,
  handleSetAppointment,
}: Props) => {
  const { storeAuto } = useConfig();
  const [loading, setLoading] = React.useState<boolean>(false);

  const initialStateTable: pageDataProps = {
    rowData: [],
    isLoading: false,
    totalPages: 0,
    totalItems: 150,
    page: 0,
    rowsPerPage: 10,
    order: 'desc',
    orderBy: 'appointmentdate',
  };

  const [pageData, setPageData] =
    React.useState<pageDataProps>(initialStateTable);

  const [filters, setFilters] = React.useState('');

  const fetchAPI = async () => {
    setLoading(true);
    await GetAppointments(
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
    handleDrawerOpen,
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
      id: 'id',
      numeric: false,
      disablePadding: true,
      label: '',
    },
    {
      id: 'client',
      numeric: false,
      disablePadding: false,
      label: <FormattedMessage id="Client" />,
    },
    {
      id: 'contact',
      numeric: false,
      disablePadding: false,
      label: <FormattedMessage id="Contact" />,
    },
    {
      id: 'registration',
      numeric: false,
      disablePadding: false,
      label: <FormattedMessage id="Registration" />,
    },
    {
      id: 'service',
      numeric: false,
      disablePadding: false,
      label: <FormattedMessage id="Service" />,
    },
    {
      id: 'price',
      numeric: true,
      disablePadding: false,
      label: <FormattedMessage id="Price" />,
    },
    {
      id: 'appointmentdate',
      numeric: false,
      disablePadding: false,
      label: <FormattedMessage id="Appointment Date" />,
    },
    {
      id: 'pickingdate',
      numeric: false,
      disablePadding: false,
      label: <FormattedMessage id="Picking Date" />,
    },
    {
      id: 'missed',
      numeric: false,
      disablePadding: false,
      label: <FormattedMessage id="Missed" />,
    },
    {
      id: '',
      numeric: false,
      disablePadding: false,
      label: '',
    },
  ];

  const setValueSearch = async (searchedVal: string) => {
    setPageData(initialStateTable);
    setFilters(searchedVal);
  };

  function Row(props: { row: Appointment }) {
    const row = props.row;

    return (
      <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }} key={row.id}>
        <TableCell align="center">
          {moment(row.appointmentdate) > moment() ? (
            <AccessTimeIcon style={{ color: '#2ca58d' }} />
          ) : (
            <AccessTimeIcon style={{ color: '#ef9a9a' }} />
          )}
        </TableCell>
        <TableCell align="left">{row.client.name}</TableCell>
        <TableCell align="left">{row.contact}</TableCell>
        <TableCell align="left">{row.registration}</TableCell>
        <TableCell align="left">{row.service}</TableCell>
        <TableCell align="left">{row.price}</TableCell>
        <TableCell align="left">
          {moment(row.appointmentdate).format('DD-MM-YYYY HH:mm')}
        </TableCell>
        <TableCell align="left">
          {moment(row.pickingdate).format('DD-MM-YYYY HH:mm')}
        </TableCell>
        <TableCell align="left">
          <Checkbox
            color="secondary"
            checked={row.missed}
            inputProps={{
              'aria-labelledby': 'Missed',
            }}
            onChange={async (e) => {
              await UpdateAppointment({ ...row, missed: e.target.checked });
              fetchAPI();
            }}
          />
        </TableCell>
        <TableCell align="left">
          <IconButton
            color="secondary"
            size="large"
            onClick={() => {
              handleDrawerOpen();
              handleSetAppointment(row);
            }}
          >
            <EditTwoTone sx={{ fontSize: '1.3rem' }} />
          </IconButton>

          <AlertDialogSlide
            title="Delete Appointment"
            message="Are you sure you want to delete the selected appointment?"
            handleClose={async () => {
              await DeleteAppointment({ ...row });
              fetchAPI();
            }}
            displayElement={
              <IconButton color="primary" size="large">
                <DeleteOutlineTwoToneIcon sx={{ fontSize: '1.3rem' }} />
              </IconButton>
            }
          />
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
                {pageData.rowData.map((row: Appointment) => {
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

AppointmentsTable.Layout = 'authGuard';
export default AppointmentsTable;
