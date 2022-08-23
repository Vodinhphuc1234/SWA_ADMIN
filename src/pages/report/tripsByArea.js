import {
  Card,
  CardContent,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { removeCookies } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import getTripReportByArea from "src/api/report/getTripReportByArea";

const { DashboardLayout } = require("src/components/dashboard-layout");
const { TripsByAreaChart } = require("src/components/report/tripsByAreaChart");

const TripByAreaReport = () => {
  const router = useRouter();
  const [data, setData] = useState({ datasets: [], labels: [] });

  const [dateFrom, setDateFrom] = useState(
    new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
  );
  const [dateTo, setDateTo] = useState(new Date());

  useEffect(() => {
    const asyncFunc = async () => {
      const data = await getTripReportByArea({
        params: {
          offset: 0,
          limit: 500,
          date_start: dateFrom.getTime() / 1000,
          date_end: dateTo.getTime() / 1000,
        },
      });
      console.log(data);

      if (data?.status === 403 || data?.status === 401) {
        removeCookies("token");
        router.push("/login");
      } else {
        //convert data
        const convertedData = { dates: [], datasets: [] };
        var dataFollowRegion = {};

        //get data
        data.forEach((item) => {
          if (!convertedData.dates.includes(item.date)) convertedData.dates.push(item.date);
          if (dataFollowRegion[item.region]) {
            dataFollowRegion[item.region].push(item.trips_count);
          } else {
            dataFollowRegion[item.region] = [];
            dataFollowRegion[item.region].push(item.trips_count);
          }
        });

        //get regions
        var regions = Object.keys(dataFollowRegion);
        regions.forEach((region) => {
          convertedData.datasets.push({
            key: region,
            data: [...dataFollowRegion[region]],
          });
        });

        setData({
          datasets: [...convertedData.datasets],
          labels: [...convertedData.dates],
        });
      }
    };

    asyncFunc();
  }, [dateFrom, dateTo]);

  return (
    <Container
      maxWidth={false}
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <TripsByAreaChart
        sx={{ width: "100%" }}
        setDateFromTable={setDateFrom}
        setDateToTable={setDateTo}
      />
      <Card sx={{ my: 3, width: 1050 }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: "black" }}>
              <TableRow sx={{ color: "white" }}>
                <TableCell>
                  <Typography sx={{ color: "white" }}>Date</Typography>
                </TableCell>

                {data.datasets.map((item) => (
                  <TableCell>
                    <Typography sx={{ color: "white" }}>{item.key}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.labels.map((label, i) => (
                <TableRow key={i}>
                  <TableCell>{label}</TableCell>
                  {data.datasets.map((item) => (
                    <TableCell>{item.data[i]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Container>
  );
};

TripByAreaReport.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default TripByAreaReport;
