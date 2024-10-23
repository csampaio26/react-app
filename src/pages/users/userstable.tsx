import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { GetUsers } from 'api/users';
import useConfig from 'hooks/useConfig';
import SearchInput from 'layout/MainLayout/Header/SearchSection/SearchInput';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { User as UserType } from 'types/user';
import Loader from 'ui-component/Loader';
// ==============================|| APPOINTMENTS ||============================== //

const UsersTable = () => {
  const { storeAuto } = useConfig();
  const [data, setData] = React.useState<UserType[]>([]);
  const [rows, setRows] = React.useState<UserType[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    setLoading(true);
    GetUsers().then((result) => {
      setData(result.data.data);
      setRows(result.data.data);
      setLoading(false);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeAuto]);

  const setValueSearch = (searchedVal: string) => {
    const res = data.filter(
      (x) =>
        x.name.toLowerCase().includes(searchedVal.toLowerCase()) ||
        x.email.toLowerCase().includes(searchedVal.toLowerCase()) ||
        x.role.toString().toLowerCase().includes(searchedVal.toLowerCase())
    );

    setRows(res);
  };

  function Row(props: { row: UserType }) {
    const row = props.row;

    return (
      <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }} key={row.id}>
        <TableCell align="left">{row.name}</TableCell>
        <TableCell align="left">{row.email}</TableCell>
        <TableCell align="left">{row.role.description}</TableCell>
      </TableRow>
    );
  }

  return !loading ? (
    <>
      <SearchInput setValueSearch={setValueSearch} />

      {/* table */}
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={'small'}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <FormattedMessage id="Name" />
              </TableCell>
              <TableCell>
                <FormattedMessage id="Email" />
              </TableCell>
              <TableCell>
                <FormattedMessage id="Role" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: UserType) => {
              return <Row row={row} key={row.id} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  ) : (
    <Loader />
  );
};

UsersTable.Layout = 'authGuard';
export default UsersTable;
