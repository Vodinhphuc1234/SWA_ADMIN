import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import Head from "next/head";
import getDriver from "src/api/driver/getDriver";
import { AccountProfile } from "src/components/account/account-profile";
import { AccountProfileDetails } from "src/components/account/account-profile-details";
import { DashboardLayout } from "src/components/dashboard-layout";
import DriverIncome from "src/components/driver/driver-income";

const DriverDetail = ({ driver }) => {
  return (
    <>
      <Head>
        <title>Driver</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          {driver && (
            <>
              <Typography sx={{ mb: 3 }} variant="h4">
                Account
              </Typography>
              <Grid container spacing={3}>
                <Grid item lg={4} md={6} xs={12}>
                  <AccountProfile user={driver} />
                </Grid>
                <Grid item lg={8} md={6} xs={12}>
                  <AccountProfileDetails user={driver} />
                </Grid>
                <Grid item lg={12} mt={10}>
                  <Divider />
                </Grid>
              </Grid>

              <DriverIncome self={driver.self} />
            </>
          )}
          {!driver && (
            <>
              <Typography sx={{ mb: 3 }} variant="h4" textAlign="center">
                No account available
              </Typography>
            </>
          )}
        </Container>
      </Box>
    </>
  );
};

DriverDetail.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export const getServerSideProps = async ({ req, res }) => {
  const url = req.url;
  console.log(url);

  const driver = await getDriver(url.replace("driver", "admin/drivers"), { req, res });

  console.log(driver);
  return {
    props: {
      driver,
    },
  };
};

export default DriverDetail;
