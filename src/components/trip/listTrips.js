import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from "@mui/material";
import { format } from "date-fns";
import Link from "next/link";
import PerfectScrollbar from "react-perfect-scrollbar";
import { SeverityPill } from "../severity-pill";

const trips = [
  {
    driverName: "Vo Dinh Phuc",
    origin: "120 Phan Van Tri, phuong 12, quan Binh Thanh, ...",
    destination: "120 Phan Van Tri, phuong 12, quan Binh Thanh, ...",
    customerName: "Cao Yu",
    createdAt: 1555016400000,
    status: "running",
  },
  {
    driverName: "Vo Dinh Phuc",
    origin: "120 Phan Van Tri, phuong 12, quan Binh Thanh, ...",
    destination: "120 Phan Van Tri, phuong 12, quan Binh Thanh, ...",
    customerName: "Cao Yu",
    createdAt: 1555016400000,
    status: "completed",
  },
  {
    driverName: "Vo Dinh Phuc",
    origin: "120 Phan Van Tri, phuong 12, quan Binh Thanh, ...",
    destination: "120 Phan Van Tri, phuong 12, quan Binh Thanh, ...",
    customerName: "Alexa Richardson",
    createdAt: 1554930000000,
    status: "canceled",
  },
  {
    driverName: "Vo Dinh Phuc",
    origin: "120 Phan Van Tri, phuong 12, quan Binh Thanh, ...",
    destination: "120 Phan Van Tri, phuong 12, quan Binh Thanh, ...",
    customerName: "Anje Keizer",
    createdAt: 1554757200000,
    status: "running",
  },
  {
    driverName: "Vo Dinh Phuc",
    origin: "120 Phan Van Tri, phuong 12, quan Binh Thanh, ...",
    destination: "120 Phan Van Tri, phuong 12, quan Binh Thanh, ...",
    customerName: "Clarke Gillebert",
    createdAt: 1554670800000,
    status: "completed",
  },
  {
    driverName: "Vo Dinh Phuc",
    origin: "120 Phan Van Tri, phuong 12, quan Binh Thanh, ...",
    destination: "120 Phan Van Tri, phuong 12, quan Binh Thanh, ...",
    customerName: "Adam Denisov",
    createdAt: 1554670800000,
    status: "completed",
  },
];

const ListTrips = (props) => (
  <Card {...props}>
    <PerfectScrollbar>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>Driver</TableCell>
              <TableCell>Origin</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell sortDirection="desc">
                <Tooltip enterDelay={300} title="Sort">
                  <TableSortLabel active direction="desc">
                    Date
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trips.map((trip) => (
              <TableRow hover key={trip.id}>
                <TableCell>{trip.driverName}</TableCell>
                <TableCell>{trip.customerName}</TableCell>
                <TableCell>{trip.origin}</TableCell>
                <TableCell>{trip.destination}</TableCell>
                <TableCell>{format(trip.createdAt, "dd/MM/yyyy")}</TableCell>
                <TableCell>
                  <SeverityPill
                    color={
                      (trip.status === "completed" && "success") ||
                      (trip.status === "canceled" && "error") ||
                      "warning"
                    }
                  >
                    {trip.status}
                  </SeverityPill>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </PerfectScrollbar>
  </Card>
);

export default ListTrips;
