import { ArrowRight, Sort } from "@mui/icons-material";
import { DatePicker, LoadingButton, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControl,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { removeCookies } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import deleteUser from "src/api/deleteUser";
import getTripIncomeReport from "src/api/report/getTripIncomeReport";
import { getInitials } from "../../utils/get-initials";

export const DriverListResults = ({ drivers, paging, setPaging, totalItem, ...rest }) => {
  const [selectedDriverIds, setSelectedDriverIds] = useState([]);

  const handleSelectAll = (event) => {
    let newSelectedDriverIds;

    if (event.target.checked) {
      newSelectedDriverIds = drivers.map((driver) => driver.id);
    } else {
      newSelectedDriverIds = [];
    }

    setSelectedDriverIds(newSelectedDriverIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedDriverIds.indexOf(id);
    let newSelectedDriverIds = [];

    if (selectedIndex === -1) {
      newSelectedDriverIds = newSelectedDriverIds.concat(selectedDriverIds, id);
    } else if (selectedIndex === 0) {
      newSelectedDriverIds = newSelectedDriverIds.concat(selectedDriverIds.slice(1));
    } else if (selectedIndex === selectedDriverIds.length - 1) {
      newSelectedDriverIds = newSelectedDriverIds.concat(selectedDriverIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedDriverIds = newSelectedDriverIds.concat(
        selectedDriverIds.slice(0, selectedIndex),
        selectedDriverIds.slice(selectedIndex + 1)
      );
    }

    setSelectedDriverIds(newSelectedDriverIds);
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
    <>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedDriverIds.length === drivers.length}
                    color="primary"
                    indeterminate={
                      selectedDriverIds.length > 0 && selectedDriverIds.length < drivers.length
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
              {drivers.map((driver) => (
                <TableRow
                  hover
                  key={driver.id}
                  selected={selectedDriverIds.indexOf(driver.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedDriverIds.indexOf(driver.id) !== -1}
                      onChange={(event) => handleSelectOne(event, driver.id)}
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
                      <Avatar src={driver.avatarUrl} sx={{ mr: 2 }}>
                        {getInitials(driver.last_name)}
                      </Avatar>
                      <Typography color="textPrimary" variant="body1">
                        {driver.first_name} {driver.last_name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{driver.email}</TableCell>
                  <TableCell>{driver.phone_number}</TableCell>
                  <TableCell>{driver.date_joined}</TableCell>

                  <TableCell>
                    <Link href={driver.self.replace("admin/drivers", "driver")}>
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
                        await handleDeleteUser(driver.self);
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
    </>
  );
};

DriverListResults.propTypes = {
  drivers: PropTypes.array.isRequired,
};
