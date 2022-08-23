import {
  ArrowDownward,
  ArrowUpward,
  CarRental,
  DriveEtaRounded,
  Money,
  People,
} from "@mui/icons-material";
import { Box, Button, Card, Container, Grid, Typography } from "@mui/material";
import Head from "next/head";
import { CustomizedBox } from "src/components/dashboard/customizedBox";
import { StatisticChart } from "src/components/report/StatictisChart";
import { DashboardLayout } from "src/components/dashboard-layout";
import { LatestTrips } from "src/components/dashboard/latest-trips";
import { BestDrivers } from "src/components/dashboard/best-driver";
import { TripsByType } from "src/components/report/trip-by-type";
import { TripsByAreaChart } from "src/components/report/tripsByAreaChart";
import { useRouter } from "next/router";
import { width } from "@mui/system";
import TripOverviewReport from "src/components/report/tripOverViewReport";

const Dashboard = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Dashboard </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} xl={12} xs={12}>
              <TripOverviewReport />
            </Grid>

            <Grid item lg={12} md={12} xl={12} xs={12}>
              <TripsByAreaChart />
            </Grid>

            <Grid item lg={12} md={12} xl={12} xs={12}>
              <Button
                variant="contained"
                sx={{ width: "100%" }}
                onClick={() => {
                  router.push("/drivers");
                }}
              >
                View Report Income Of Drivers
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
