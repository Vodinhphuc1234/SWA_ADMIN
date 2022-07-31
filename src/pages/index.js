import { ArrowDownward, ArrowUpward, CarRental, DriveEtaRounded, Money, People } from "@mui/icons-material";
import { Box, Container, Grid, Typography } from "@mui/material";
import Head from "next/head";
import { CustomizedBox } from "src/components/dashboard/customizedBox";
import { StatisticChart } from "src/components/report/StatictisChart";
import { DashboardLayout } from "src/components/dashboard-layout";
import { LatestTrips } from "src/components/dashboard/latest-trips";
import { BestDrivers } from "src/components/dashboard/best-driver";
import { TripsByType } from "src/components/report/trip-by-type";
import { TripsByAreaChart } from "src/components/report/tripsByAreaChart";

const Dashboard = () => (
  <>
    <Head>
      <title>Dashboard | Material Kit</title>
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
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <CustomizedBox title={"BUDGET"} value={"$24k"} icon={<Money />} iconColor="error.main">
              <>
                <ArrowDownward color="error" />
                <Typography
                  color="error"
                  sx={{
                    mr: 1,
                  }}
                  variant="body2"
                >
                  12%
                </Typography>
                <Typography color="textSecondary" variant="caption">
                  Since last month
                </Typography>
              </>
            </CustomizedBox>
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <CustomizedBox title={"TOTAL CUSTOMER"} value={"1.6K"} icon={<People />} iconColor="warning.main">
              <>
                <ArrowUpward color="success" />
                <Typography
                  variant="body2"
                  sx={{
                    mr: 1,
                  }}
                >
                  16%
                </Typography>
                <Typography color="textSecondary" variant="caption">
                  Since last month
                </Typography>
              </>
            </CustomizedBox>
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <CustomizedBox title={"TOTAL DRIVER"} value={"1.6K"} icon={<DriveEtaRounded />} iconColor="success.main">
              <>
                <ArrowUpward color="success" />
                <Typography
                  variant="body2"
                  sx={{
                    mr: 1,
                  }}
                >
                  16%
                </Typography>
                <Typography color="textSecondary" variant="caption">
                  Since last month
                </Typography>
              </>
            </CustomizedBox>
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <CustomizedBox title={"TOTAL TRIP"} value={"1.6K"} icon={<CarRental />} iconColor="primary.main">
              <>
                <ArrowUpward color="success" />
                <Typography
                  variant="body2"
                  sx={{
                    mr: 1,
                  }}
                >
                  16%
                </Typography>
                <Typography color="textSecondary" variant="caption">
                  Since last month
                </Typography>
              </>
            </CustomizedBox>
          </Grid>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <TripsByAreaChart />
          </Grid>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <StatisticChart />
          </Grid>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <TripsByType sx={{ height: "100%" }} />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <BestDrivers sx={{ height: "100%" }} />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <LatestTrips />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
