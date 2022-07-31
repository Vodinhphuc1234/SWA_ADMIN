import Head from "next/head";
import { Box, Container } from "@mui/material";
import { CustomerListResults } from "src/components/customer/customer-list-results";
import { CustomerListToolbar } from "src/components/customer/customer-list-toolbar";
import { DashboardLayout } from "src/components/dashboard-layout";
import getAllUsers from "src/api/getAllUser";

const Customers = ({ customers }) => (
  <>
    <Head>
      <title>Customers | Material Kit</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <CustomerListToolbar />
        <Box sx={{ mt: 3 }}>
          <CustomerListResults customers={customers} />
        </Box>
      </Container>
    </Box>
  </>
);
Customers.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export const getServerSideProps = async ({ query }) => {
  let { _page, _limit } = query;

  let customers = await getAllUsers({
    params: {
      _page,
      _limit,
    },
  });

  console.log(customers.data);

  return {
    props: {
      customers: customers.data,
    },
  };
};

export default Customers;
