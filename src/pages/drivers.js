import { Box, Container } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import getListDriver from "src/api/driver/getListDriver";
import { DriverListResults } from "src/components/driver/driver-list-results";
import { DriverListToolbar } from "src/components/driver/driver-list-toolbar";
import { DashboardLayout } from "src/components/dashboard-layout";

const Drivers = ({ data }) => {
  const [paging, setPaging] = useState({ limit: 20, offset: 0 });
  const router = useRouter();
  useEffect(() => {
    console.log(paging);
    router.query.limit = paging.limit;
    router.query.offset = paging.offset;
    router.push(router);
  }, [paging]);

  const { drivers, totalItem } = data;
  return (
    <>
      <Head>
        <title>Drivers</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <DriverListToolbar />
          <Box sx={{ mt: 3 }}>
            <DriverListResults
              paging={paging}
              setPaging={setPaging}
              drivers={drivers}
              totalItem={totalItem}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};
Drivers.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export const getServerSideProps = async ({ query, req, res }) => {
  var result = {};
  let { offset, limit } = query;

  const data = await getListDriver(
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
  }else if (data?.status === 401 || data?.status === 403) {
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
      drivers: data.results,
    };
  }

  return {
    props: {
      data: result,
    },
  };
};

export default Drivers;
