import {
  Card,
  CardContent,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const { DashboardLayout } = require("src/components/dashboard-layout");
const { TripsByAreaChart } = require("src/components/report/tripsByAreaChart");

const amountTripByProvince = [
  { name: "Ho Chi Minh", amount: 100 },
  { name: "Ha Noi", amount: 100 },
  { name: "Hai Phong", amount: 100 },
  { name: "Da Nang", amount: 100 },
  { name: "Quang Ngai", amount: 100 },
  { name: "Thua Thien Hue", amount: 100 },
  { name: "Dong Nai", amount: 100 },
  { name: "Quang Nam", amount: 100 },
  { name: "Ba Ria Vung Tau", amount: 100 },
  { name: "Binh Duong", amount: 100 },
  { name: "Ha Dong", amount: 100 },
  { name: "Hai Duong", amount: 100 },
];

const TripByAreaReport = () => {
  return (
    <Container maxWidth={false} sx = {{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <TripsByAreaChart />
      <Card sx = {{my: 3, width: 1050}}>
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: "black" }}>
                <TableRow sx={{ color: "white" }}>
                  <TableCell>
                    <Typography sx={{ color: "white" }}>Location</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ color: "white" }}>Trip amount</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {amountTripByProvince.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        
      </Card>
    </Container>
  );
};

TripByAreaReport.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default TripByAreaReport;
