import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Box,
  Button,
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

export const CustomerListResults = ({ customers, paging, setPaging, totalItem, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
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

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === customers.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0 &&
                      selectedCustomerIds.length < customers.length
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
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer) => (
                <TableRow
                  hover
                  key={customer.id}
                  selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(customer.id) !== -1}
                      onChange={(event) => handleSelectOne(event, customer.id)}
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
                      <Avatar src={customer.avatarUrl} sx={{ mr: 2 }}>
                        {getInitials(customer.last_name)}
                      </Avatar>
                      <Typography color="textPrimary" variant="body1">
                        {customer.first_name} {customer.last_name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone_number}</TableCell>
                  <TableCell>{customer.date_joined}</TableCell>
                  <TableCell>
                    <Link href={customer.self.replace("admin/riders", "customer")}>
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
                        await handleDeleteUser(customer.self);
                      }}
                    >
                      Delete
                    </LoadingButton>
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

CustomerListResults.propTypes = {
  customers: PropTypes.array.isRequired,
};
