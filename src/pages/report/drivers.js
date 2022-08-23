import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "src/components/dashboard-layout";
import getAllUsers from "src/api/getAllUser";
import { DriverListToolbar } from "src/components/driver/customer-list-toolbar";
import { DriverListResults } from "src/components/driver/driver-list-results";

const Drivers = ({ drivers }) => (
  <>
    <Head>
      <title>Report Driver</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <DriverListToolbar hideHeader={true} />
        <Box sx={{ mt: 3 }}>
          <DriverListResults drivers={drivers} />
        </Box>
      </Container>
    </Box>
  </>
);
Drivers.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export const getServerSideProps = async ({ query }) => {
  let { _page, _limit } = query;

  let drivers = await getAllUsers({
    params: {
      _page,
      _limit,
    },
  });

  return {
    props: {
      drivers: drivers.data,
    },
  };
};

export default Drivers;
