import { Box, Container } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import getListOperator from "src/api/operator/getListOperator";
import { OperatorListResults } from "src/components/operator/operator-list-results";
import { OperatorListToolbar } from "src/components/operator/operator-list-toolbar";
import { DashboardLayout } from "src/components/dashboard-layout";

const Operators = ({ data }) => {
  const [paging, setPaging] = useState({ limit: 20, offset: 0 });
  const router = useRouter();
  useEffect(() => {
    console.log(paging);
    router.query.limit = paging.limit;
    router.query.offset = paging.offset;
    router.push(router);
  }, [paging]);

  const { operators, totalItem } = data;
  return (
    <>
      <Head>
        <title>Operators </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <OperatorListToolbar />
          <Box sx={{ mt: 3 }}>
            <OperatorListResults
              paging={paging}
              setPaging={setPaging}
              operators={operators}
              totalItem={totalItem}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};
Operators.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export const getServerSideProps = async ({ query, req, res }) => {
  var result = {};
  let { offset, limit } = query;

  const data = await getListOperator(
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
  } else if (data?.status === 403 || data?.status === 401) {
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
      operators: data.results,
    };
  }

  return {
    props: {
      data: result,
    },
  };
};

export default Operators;
