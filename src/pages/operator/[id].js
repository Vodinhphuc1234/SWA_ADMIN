import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import Head from "next/head";
import getOperator from "src/api/operator/getOperator";
import { AccountProfile } from "src/components/account/account-profile";
import { AccountProfileDetails } from "src/components/account/account-profile-details";
import { DashboardLayout } from "src/components/dashboard-layout";

const OperatorDetail = ({ operator }) => {
  return (
    <>
      <Head>
        <title>Operator</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          {operator && (
            <>
              <Typography sx={{ mb: 3 }} variant="h4">
                Account
              </Typography>
              <Grid container spacing={3}>
                <Grid item lg={4} md={6} xs={12}>
                  <AccountProfile user={operator} />
                </Grid>
                <Grid item lg={8} md={6} xs={12}>
                  <AccountProfileDetails user={operator} />
                </Grid>
                <Grid item lg={12} mt={10}>
                  <Divider />
                </Grid>
              </Grid>
            </>
          )}
          {!operator && (
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

OperatorDetail.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export const getServerSideProps = async ({ req, res }) => {
  const url = req.url;
  console.log(url);

  const operator = await getOperator(url.replace("operator", "admin/operators"), { req, res });

  console.log(operator);
  return {
    props: {
      operator,
    },
  };
};

export default OperatorDetail;
