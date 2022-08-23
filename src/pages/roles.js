import { Box, Container } from "@mui/material";
import Head from "next/head";
import getAllUsers from "src/api/getAllUser";
import { DashboardLayout } from "src/components/dashboard-layout";
import { RoleListResults } from "src/components/role/RoleListResults";
import { RoleListToolbar } from "src/components/role/RoleListToolbar";

const Roles = ({ roles }) => (
  <>
    <Head>
      <title>Roles</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <RoleListToolbar />
        <Box sx={{ mt: 3 }}>
          <RoleListResults roles={roles} />
        </Box>
      </Container>
    </Box>
  </>
);
Roles.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export const getServerSideProps = async ({ query }) => {
  let { _page, _limit } = query;

  let roles = await getAllUsers({
    params: {
      _page,
      _limit,
    },
  });

  console.log(roles.data);

  return {
    props: {
      roles: roles.data,
    },
  };
};

export default Roles;
