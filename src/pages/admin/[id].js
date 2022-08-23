import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import Head from "next/head";
import getAdmin from "src/api/admin/getAdmin";
import { AccountProfile } from "src/components/account/account-profile";
import { AccountProfileDetails } from "src/components/account/account-profile-details";
import { DashboardLayout } from "src/components/dashboard-layout";

const AdminDetail = ({ admin }) => {
  return (
    <>
      <Head>
        <title>Admin</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          {admin && (
            <>
              <Typography sx={{ mb: 3 }} variant="h4">
                Account
              </Typography>
              <Grid container spacing={3}>
                <Grid item lg={4} md={6} xs={12}>
                  <AccountProfile user={admin} />
                </Grid>
                <Grid item lg={8} md={6} xs={12}>
                  <AccountProfileDetails user={admin} />
                </Grid>
                <Grid item lg={12} mt={10}>
                  <Divider />
                </Grid>
              </Grid>
            </>
          )}
          {!admin && (
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

AdminDetail.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export const getServerSideProps = async ({ req, res }) => {
  const url = req.url;
  console.log(url);

  const admin = await getAdmin(url.replace("admin", "admin/admins"), { req, res });

  console.log(admin);
  return {
    props: {
      admin,
    },
  };
};

export default AdminDetail;
