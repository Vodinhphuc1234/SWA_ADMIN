import { Box, Container } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import getListCustomer from "src/api/customer/getListCustomer";
import { CustomerListResults } from "src/components/customer/customer-list-results";
import { CustomerListToolbar } from "src/components/customer/customer-list-toolbar";
import { DashboardLayout } from "src/components/dashboard-layout";

const Customers = ({ data }) => {
  const [paging, setPaging] = useState({ limit: 20, offset: 0 });
  const router = useRouter();
  useEffect(() => {
    console.log(paging);
    router.query.limit = paging.limit;
    router.query.offset = paging.offset;
    router.push(router);
  }, [paging]);

  const { customers, totalItem } = data;
  return (
    <>
      <Head>
        <title>Customers </title>
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
            <CustomerListResults
              paging={paging}
              setPaging={setPaging}
              customers={customers}
              totalItem={totalItem}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};
Customers.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export const getServerSideProps = async ({ query, req, res }) => {
  var result = {};
  let { offset, limit } = query;

  const data = await getListCustomer(
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
      customers: data.results,
    };
  }

  return {
    props: {
      data: result,
    },
  };
};

export default Customers;
