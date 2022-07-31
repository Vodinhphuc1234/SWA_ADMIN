import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import Head from "next/head";
import getAllUsers from "src/api/getAllUser";
import { getUser } from "src/api/getUser";
import { AccountProfile } from "src/components/account/account-profile";
import { AccountProfileDetails } from "src/components/account/account-profile-details";
import { DashboardLayout } from "src/components/dashboard-layout";

const CustomerDetail = ({ customer }) => {
  return (
    <>
      <Head>
        <title>Customer</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          {customer && (
            <>
              <Typography sx={{ mb: 3 }} variant="h4">
                Account
              </Typography>
              <Grid container spacing={3}>
                <Grid item lg={4} md={6} xs={12}>
                  <AccountProfile user={customer} />
                </Grid>
                <Grid item lg={8} md={6} xs={12}>
                  <AccountProfileDetails user={customer} />
                </Grid>
                <Grid item lg={12} mt={10}>
                  <Divider />
                </Grid>
              </Grid>
            </>
          )}
          {!customer && (
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

CustomerDetail.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export const getStaticProps = async ({ params }) => {
  const customer = await getUser({
    params: {
      id: params.id,
    },
  });

  return {
    props: { customer },
  };
};

export const getStaticPaths = async () => {
  const users = await getAllUsers();

  let Paths = users.data.map((user) => ({
    params: {
      id: user.id.toString(),
    },
  }));

  return {
    paths: [...Paths],
    fallback: true,
  };
};

export default CustomerDetail;
