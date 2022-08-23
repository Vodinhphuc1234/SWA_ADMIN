import { Box, Container } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import getListAdmin from "src/api/admin/getListAdmin";
import { AdminListResults } from "src/components/admin/admin-list-results";
import { AdminListToolbar } from "src/components/admin/admin-list-toolbar";
import { DashboardLayout } from "src/components/dashboard-layout";

const Admins = ({ data }) => {
  const [paging, setPaging] = useState({ limit: 20, offset: 0 });
  const router = useRouter();
  useEffect(() => {
    console.log(paging);
    router.query.limit = paging.limit;
    router.query.offset = paging.offset;
    router.push(router);
  }, [paging]);

  const { admins, totalItem } = data;
  return (
    <>
      <Head>
        <title>Admins </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <AdminListToolbar />
          <Box sx={{ mt: 3 }}>
            <AdminListResults
              paging={paging}
              setPaging={setPaging}
              admins={admins}
              totalItem={totalItem}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};
Admins.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export const getServerSideProps = async ({ query, req, res }) => {
  var result = {};
  let { offset, limit } = query;

  const data = await getListAdmin(
    {
      params: {
        offset: offset * limit,
        limit,
        with_count: true,
      },
    },
    { req, res }
  );

  if (data == null) {
    result.error = "Check your internet";
  } else if (data?.status === 401 || data?.status === 403) {
    res.setHeader("Set-Cookie", [
      `token=deleted; Max-Age=0`,
      `AnotherCookieName=deleted; Max-Age=0`,
    ]);
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  } else {
    var id = 1;
    data.results.forEach((item) => {
      item.id = id++;
    });

    result = {
      totalItem: data.count,
      admins: data.results,
    };
  }

  return {
    props: {
      data: result,
    },
  };
};

export default Admins;
