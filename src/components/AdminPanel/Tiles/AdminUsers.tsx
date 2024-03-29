import { users, roles } from "../../../routes/roots";
import * as React from "react";
import {
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  TablePagination,
  Stack,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  Button,
  Snackbar,
  Alert,
  AlertColor,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { Search } from "@mui/icons-material";
import { updateUserPermission } from "../../../routes/users-api";
import { UserResponse } from "../../../models/user";
import { RoleResponse } from "../../../models/role";

const defaultSnackbarState = { open: false, severity: "info", message: "" };

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const devs = ["ea99489b-df58-4241-a30f-3d20a70a7d4c"];

export default function ManageAccounts() {
  const [search, setSearch] = React.useState("");
  const [userList, setUsers] = React.useState<UserResponse[]>([]);
  const [filteredUsers, setFilteredUsers] = React.useState<UserResponse[]>([]);
  const [roleList, setRoles] = React.useState([{}]);
  const [changes, setChanges] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [snackbarState, setSnackbarState] =
    React.useState(defaultSnackbarState);

  const handleSnackbarClose = () => {
    setSnackbarState(defaultSnackbarState);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);

    setFilteredUsers(
      userList.filter(
        (user: UserResponse) =>
          user.polyuser_name!.toLowerCase().includes(value.toLowerCase()) ||
          user.polyuser_mail!.toLowerCase().includes(value.toLowerCase()),
      ),
    );
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const changePermissions = () => {
    axios
      .patch(updateUserPermission(), { changes })
      .then((response) => {
        setSnackbarState({
          open: true,
          severity: "success",
          message: response.data.message,
        });
      })
      .catch((error) => {
        setSnackbarState({
          open: true,
          severity: "error",
          message: error.response.data.message,
        });
      });
    setChanges([]);
  };

  React.useEffect(() => {
    axios.get(users).then((res) => {
      setUsers(res.data);
      setFilteredUsers(res.data);
    });
    axios.get(roles).then((res) => {
      setRoles(res.data);
    });
  }, []);

  return (
    <main>
      <Snackbar
        open={snackbarState.open}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarState.severity as AlertColor}
        >
          {snackbarState.message}
        </Alert>
      </Snackbar>
      <Container sx={{ py: 10 }} maxWidth="lg">
        <Typography
          component="h1"
          variant="h4"
          align="center"
          color="text.primary"
          gutterBottom
        >
          {"Gestion des permissions"}
        </Typography>
      </Container>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
        >
          <FormControl sx={{ mb: 2 }} variant="standard">
            <InputLabel htmlFor="searchBar">Recherche</InputLabel>
            <Input
              id="searchBar"
              value={search}
              onChange={handleSearchChange}
              startAdornment={
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              }
            />
          </FormControl>
          <Button
            sx={{ mb: 2 }}
            disabled={changes.length === 0}
            variant="contained"
            onClick={changePermissions}
          >
            Valider les modifications
          </Button>
        </Stack>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Nom</StyledTableCell>
                <StyledTableCell align="center">Mail</StyledTableCell>
                <StyledTableCell align="center">Role</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <StyledTableRow key={user.polyuser_id}>
                    <StyledTableCell component="th" scope="row" align="center">
                      {user.polyuser_name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {user.polyuser_mail}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Select
                        name="userRole"
                        disabled={devs.includes(user.polyuser_id!)}
                        value={user.role_id}
                        onChange={(e) => {
                          user.role_id = Number(e.target.value);
                          setChanges({
                            ...changes,
                            [user.polyuser_id!]: e.target.value,
                          });
                        }}
                      >
                        {roleList.map((role: RoleResponse) => (
                          <MenuItem value={role.role_id!} key={role.role_id!}>
                            {role.role_name!}
                          </MenuItem>
                        ))}
                      </Select>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>
    </main>
  );
}
