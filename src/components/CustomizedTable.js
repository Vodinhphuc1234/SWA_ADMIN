import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
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
import { getInitials } from "../../utils/get-initials";
import Router from "next/router";
import Link from "next/link";

export const CustomizedTable = ({ rows, columns, paging, setPaging, totalItem, ...rest }) => {
  const [selectedRowIds, setSelectedRowIds] = useState([]);

  const handleSelectAll = (event) => {
    let newSelectedRowIds;

    if (event.target.checked) {
      newSelectedRowIds = rows.map((row) => row.id);
    } else {
      newSelectedRowIds = [];
    }

    setSelectedRowIds(newSelectedRowIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedRowIds.indexOf(id);
    let newSelectedRowIds = [];

    if (selectedIndex === -1) {
      newSelectedRowIds = newSelectedRowIds.concat(selectedRowIds, id);
    } else if (selectedIndex === 0) {
      newSelectedRowIds = newSelectedRowIds.concat(selectedRowIds.slice(1));
    } else if (selectedIndex === selectedRowIds.length - 1) {
      newSelectedRowIds = newSelectedRowIds.concat(selectedRowIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedRowIds = newSelectedRowIds.concat(
        selectedRowIds.slice(0, selectedIndex),
        selectedRowIds.slice(selectedIndex + 1)
      );
    }

    setSelectedRowIds(newSelectedRowIds);
  };

  const { offset, limit } = paging;

  const handleLimitChange = (event) => {
    console.log(event.target.value);
    setPaging((prev) => ({ ...prev, limit: event.target.value }));
  };

  const handlePageChange = (event, newPage) => {
    setPaging((prev) => ({ ...prev, offset: newPage }));
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
                    checked={selectedRowIds.length === rows.length}
                    color="primary"
                    indeterminate={selectedRowIds.length > 0 && selectedRowIds.length < rows.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                {columns.map((item) => (
                  <TableCell>{item}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow hover key={row.id} selected={selectedRowIds.indexOf(row.id) !== -1}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedRowIds.indexOf(row.id) !== -1}
                      onChange={(event) => handleSelectOne(event, row.id)}
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
                      <Avatar src={row.avatarUrl} sx={{ mr: 2 }}>
                        {getInitials(row.name)}
                      </Avatar>
                      <Typography color="textPrimary" variant="body1">
                        {row.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>
                    {`${row.address.city}, ${row.address.state}, ${row.address.country}`}
                  </TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{format(1200003333, "dd/MM/yyyy")}</TableCell>
                  <TableCell>
                    <Link href={`row/${row.id}`}>
                      <Button variant="contained" color="primary">
                        Detail
                      </Button>
                    </Link>
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

CustomizedTable.propTypes = {
  rows: PropTypes.array.isRequired,
};
