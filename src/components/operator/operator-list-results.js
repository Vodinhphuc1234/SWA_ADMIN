import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { removeCookies } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import deleteUser from "src/api/deleteUser";
import { getInitials } from "../../utils/get-initials";
import {
  assignCoordinator,
  assignCustomerCare,
  assignReception,
} from "src/api/operator/assignRole";

export const OperatorListResults = ({ operators, paging, setPaging, totalItem, ...rest }) => {
  const [selectedOperatorIds, setSelectedOperatorIds] = useState([]);

  const handleSelectAll = (event) => {
    let newSelectedOperatorIds;

    if (event.target.checked) {
      newSelectedOperatorIds = operators.map((operator) => operator.id);
    } else {
      newSelectedOperatorIds = [];
    }

    setSelectedOperatorIds(newSelectedOperatorIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedOperatorIds.indexOf(id);
    let newSelectedOperatorIds = [];

    if (selectedIndex === -1) {
      newSelectedOperatorIds = newSelectedOperatorIds.concat(selectedOperatorIds, id);
    } else if (selectedIndex === 0) {
      newSelectedOperatorIds = newSelectedOperatorIds.concat(selectedOperatorIds.slice(1));
    } else if (selectedIndex === selectedOperatorIds.length - 1) {
      newSelectedOperatorIds = newSelectedOperatorIds.concat(selectedOperatorIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedOperatorIds = newSelectedOperatorIds.concat(
        selectedOperatorIds.slice(0, selectedIndex),
        selectedOperatorIds.slice(selectedIndex + 1)
      );
    }

    setSelectedOperatorIds(newSelectedOperatorIds);
  };

  const { offset, limit } = paging;

  const handleLimitChange = (event) => {
    console.log(event.target.value);
    setPaging((prev) => ({ ...prev, limit: event.target.value }));
  };

  const handlePageChange = (event, newPage) => {
    setPaging((prev) => ({ ...prev, offset: newPage }));
  };

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleDeleteUser = async (url) => {
    setLoading(true);
    const data = await deleteUser(url);
    setLoading(false);
    if (data?.status === 401 || data?.status === 403) {
      removeCookies("token");
      router.push("/");
    } else {
      router.reload();
    }
  };

  //assign role

  const [loadingRole, setLoadingRole] = useState(false);

  const handleAssignCoordinator = async (url) => {
    setLoadingRole(true);
    const data = await assignCoordinator(url);
    setLoadingRole(false);

    if (data?.status === 401 || data?.status === 403) {
      removeCookies("token");
      router.push("/login");
    } else if (data?.data?.message) {
      alert(data.data.message);
    } else {
      alert("Assign successfully");
    }
  };

  const handleAssignCustomerCare = async (url) => {
    setLoadingRole(true);
    const data = await assignCustomerCare(url);
    setLoadingRole(false);

    if (data?.status === 401 || data?.status === 403) {
      removeCookies("token");
      router.push("/login");
    } else if (data?.data?.message) {
      alert(data.data.message);
    } else {
      alert("Assign successfully");
    }
  };

  const handleAssignReception = async (url) => {
    setLoadingRole(true);
    const data = await assignReception(url);
    setLoadingRole(false);

    if (data?.status === 401 || data?.status === 403) {
      removeCookies("token");
      router.push("/login");
    } else if (data?.data?.message) {
      alert(data.data.message);
    } else {
      alert("Assign successfully");
    }
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedOperatorIds.length === operators.length}
                    color="primary"
                    indeterminate={
                      selectedOperatorIds.length > 0 &&
                      selectedOperatorIds.length < operators.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Registration date</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {operators.map((operator) => (
                <TableRow
                  hover
                  key={operator.id}
                  selected={selectedOperatorIds.indexOf(operator.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedOperatorIds.indexOf(operator.id) !== -1}
                      onChange={(event) => handleSelectOne(event, operator.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Avatar src={operator.avatarUrl} sx={{ mr: 2 }}>
                        {getInitials(operator.last_name)}
                      </Avatar>
                      <Typography color="textPrimary" variant="body1">
                        {operator.first_name} {operator.last_name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{operator.email}</TableCell>
                  <TableCell>{operator.phone_number}</TableCell>
                  <TableCell>{operator.date_joined}</TableCell>
                  <TableCell>
                    <Link href={operator.self.replace("admin/operators", "operator")}>
                      <Button variant="contained" color="primary">
                        Detail
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <LoadingButton
                      loading={loading}
                      variant="contained"
                      color="error"
                      onClick={async () => {
                        await handleDeleteUser(operator.self);
                      }}
                    >
                      Delete
                    </LoadingButton>
                  </TableCell>
                  <TableCell>
                    <ButtonGroup orientation="vertical" aria-label="vertical outlined button group">
                      <LoadingButton
                        loading={loadingRole}
                        color="warning"
                        onClick={async () => {
                          await handleAssignCoordinator(operator.self);
                        }}
                      >
                        Coordinator
                      </LoadingButton>
                      <LoadingButton
                        loading={loadingRole}
                        color="success"
                        onClick={async () => {
                          await handleAssignCustomerCare(operator.self);
                        }}
                      >
                        Customer Care
                      </LoadingButton>
                      <LoadingButton
                        loading={loadingRole}
                        onClick={async () => {
                          await handleAssignReception(operator.self);
                        }}
                      >
                        Reception
                      </LoadingButton>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={totalItem}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={offset}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 15, 20, 25, 50]}
      />
    </Card>
  );
};

OperatorListResults.propTypes = {
  operators: PropTypes.array.isRequired,
};
