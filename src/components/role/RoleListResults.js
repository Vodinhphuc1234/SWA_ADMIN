import {
    Avatar,
    Box,
    Button,
    Card,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
  } from "@mui/material";
  import { format } from "date-fns";
  import Link from "next/link";
  import Router from "next/router";
  import PropTypes from "prop-types";
  import { useState } from "react";
  import PerfectScrollbar from "react-perfect-scrollbar";
  import { getInitials } from "../../utils/get-initials";
  
  export const RoleListResults = ({ roles, ...rest }) => {
    const [selectedRoleIds, setSelectedRoleIds] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
  
    const handleSelectAll = (event) => {
      let newSelectedRoleIds;
  
      if (event.target.checked) {
        newSelectedRoleIds = roles.map((role) => role.id);
      } else {
        newSelectedRoleIds = [];
      }
  
      setSelectedRoleIds(newSelectedRoleIds);
    };
  
    const handleSelectOne = (event, id) => {
      const selectedIndex = selectedRoleIds.indexOf(id);
      let newSelectedRoleIds = [];
  
      if (selectedIndex === -1) {
        newSelectedRoleIds = newSelectedRoleIds.concat(selectedRoleIds, id);
      } else if (selectedIndex === 0) {
        newSelectedRoleIds = newSelectedRoleIds.concat(selectedRoleIds.slice(1));
      } else if (selectedIndex === selectedRoleIds.length - 1) {
        newSelectedRoleIds = newSelectedRoleIds.concat(selectedRoleIds.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelectedRoleIds = newSelectedRoleIds.concat(
          selectedRoleIds.slice(0, selectedIndex),
          selectedRoleIds.slice(selectedIndex + 1)
        );
      }
  
      setSelectedRoleIds(newSelectedRoleIds);
    };
  
    const handleLimitChange = (event) => {
      setLimit(event.target.value);
    };
  
    const handlePageChange = (event, newPage) => {
      setPage(newPage);
      Router.push(`/roles?_page=${newPage + 1}&_limit=${limit}`);
    };
  
    return (
      <Card {...rest}>
        <PerfectScrollbar>
          <TableContainer sx={{ maxHeight: 1000, minWidth: 1050 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox" sx={{ backgroundColor: "lightgray" }}>
                    <Checkbox
                      checked={selectedRoleIds.length === roles.length}
                      color="primary"
                      indeterminate={
                        selectedRoleIds.length > 0 &&
                        selectedRoleIds.length < roles.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "lightgray" }}>Name</TableCell>
                  <TableCell sx={{ backgroundColor: "lightgray" }}>Email</TableCell>
                  <TableCell sx={{ backgroundColor: "lightgray" }}>Location</TableCell>
                  <TableCell sx={{ backgroundColor: "lightgray" }}>Phone</TableCell>
                  <TableCell sx={{ backgroundColor: "lightgray" }}>Registration date</TableCell>
                  <TableCell sx={{ backgroundColor: "lightgray" }}>Income</TableCell>
                  <TableCell sx={{ backgroundColor: "lightgray" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {roles.slice(0, limit).map((role) => (
                  <TableRow
                    hover
                    key={role.id}
                    selected={selectedRoleIds.indexOf(role.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedRoleIds.indexOf(role.id) !== -1}
                        onChange={(event) => handleSelectOne(event, role.id)}
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
                        <Avatar src={role.avatarUrl} sx={{ mr: 2 }}>
                          {getInitials(role.name)}
                        </Avatar>
                        <Typography color="textPrimary" variant="body1">
                          {role.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{role.email}</TableCell>
                    <TableCell>
                      {`${role.address.city}, ${role.address.state}, ${role.address.country}`}
                    </TableCell>
                    <TableCell>{role.phone}</TableCell>
                    <TableCell>{format(1200003333, "dd/MM/yyyy")}</TableCell>
                    <TableCell>12.000.000</TableCell>
                    <TableCell>
                      <Link href={`/role/${role.id}`}>
                        <Button variant="contained" color="primary">
                          Detail
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={10}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
    );
  };
  
  RoleListResults.propTypes = {
    roles: PropTypes.array.isRequired,
  };
  