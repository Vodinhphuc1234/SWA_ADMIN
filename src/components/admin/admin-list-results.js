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

export const AdminListResults = ({ admins, paging, setPaging, totalItem, ...rest }) => {
  const [selectedAdminIds, setSelectedAdminIds] = useState([]);

  const handleSelectAll = (event) => {
    let newSelectedAdminIds;

    if (event.target.checked) {
      newSelectedAdminIds = admins.map((admin) => admin.id);
    } else {
      newSelectedAdminIds = [];
    }

    setSelectedAdminIds(newSelectedAdminIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedAdminIds.indexOf(id);
    let newSelectedAdminIds = [];

    if (selectedIndex === -1) {
      newSelectedAdminIds = newSelectedAdminIds.concat(selectedAdminIds, id);
    } else if (selectedIndex === 0) {
      newSelectedAdminIds = newSelectedAdminIds.concat(selectedAdminIds.slice(1));
    } else if (selectedIndex === selectedAdminIds.length - 1) {
      newSelectedAdminIds = newSelectedAdminIds.concat(selectedAdminIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedAdminIds = newSelectedAdminIds.concat(
        selectedAdminIds.slice(0, selectedIndex),
        selectedAdminIds.slice(selectedIndex + 1)
      );
    }

    setSelectedAdminIds(newSelectedAdminIds);
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
                    checked={selectedAdminIds.length === admins.length}
                    color="primary"
                    indeterminate={
                      selectedAdminIds.length > 0 && selectedAdminIds.length < admins.length
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
              {admins.map((admin) => (
                <TableRow
                  hover
                  key={admin.id}
                  selected={selectedAdminIds.indexOf(admin.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedAdminIds.indexOf(admin.id) !== -1}
                      onChange={(event) => handleSelectOne(event, admin.id)}
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
                      <Avatar src={admin.avatarUrl} sx={{ mr: 2 }}>
                        {getInitials(admin.last_name)}
                      </Avatar>
                      <Typography color="textPrimary" variant="body1">
                        {admin.first_name} {admin.last_name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>{admin.phone_number}</TableCell>
                  <TableCell>{admin.date_joined}</TableCell>
                  <TableCell>
                    <Link href={admin.self.replace("admin/admins", "admin")}>
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
                        await handleDeleteUser(admin.self);
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

AdminListResults.propTypes = {
  admins: PropTypes.array.isRequired,
};
