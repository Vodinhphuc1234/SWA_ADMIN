const { ContactMail } = require("@mui/icons-material");
const { Container, Card, TableContainer, Table, TableHead, TableRow, TableCell, Typography, TableBody } = require("@mui/material");
const { DashboardLayout } = require("src/components/dashboard-layout");
const { StatisticChart } = require("src/components/report/StatictisChart");

const statistics = [
  {
    time: "16/2/20200",
    budget: "150000",
    tripTotal: "100",
    customerTotal: "200",
    driverTotal: "300",
  },
  {
    time: "16/2/20200",
    budget: "150000",
    tripTotal: "100",
    customerTotal: "200",
    driverTotal: "300",
  },
  {
    time: "16/2/20200",
    budget: "150000",
    tripTotal: "100",
    customerTotal: "200",
    driverTotal: "300",
  },
  {
    time: "16/2/20200",
    budget: "150000",
    tripTotal: "100",
    customerTotal: "200",
    driverTotal: "300",
  },
  {
    time: "16/2/20200",
    budget: "150000",
    tripTotal: "100",
    customerTotal: "200",
    driverTotal: "300",
  },
  {
    time: "16/2/20200",
    budget: "150000",
    tripTotal: "100",
    customerTotal: "200",
    driverTotal: "300",
  },
];

const StatisticReport = () => {
  return (
    <Container maxWidth={false}>
      <StatisticChart />

      <Card sx={{ my: 3 }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: "black" }}>
              <TableRow sx={{ color: "white" }}>
                <TableCell>
                  <Typography sx={{ color: "white" }}>Time</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ color: "white" }}>Budget</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ color: "white" }}>Trip total</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ color: "white" }}>Customer total</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ color: "white" }}>Driver total</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {statistics.map((item) => (
                <TableRow>
                  <TableCell>{item.time}</TableCell>
                  <TableCell>{item.budget}</TableCell>
                  <TableCell>{item.tripTotal}</TableCell>
                  <TableCell>{item.customerTotal}</TableCell>
                  <TableCell>{item.driverTotal}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Container>
  );
};

StatisticReport.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default StatisticReport;
