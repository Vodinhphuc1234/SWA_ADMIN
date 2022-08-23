import { Sort } from "@mui/icons-material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  IconButton,
  TextField,
  useTheme,
} from "@mui/material";
import { removeCookies } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import getTripReportByArea from "src/api/report/getTripReportByArea";

const colors = [
  "#B54040",
  "#B54086",
  "#4840B5",
  "#40B5A1",
  "#48B540",
  "#B5B540",
  "#B56340",
  "#000000",
  "#9C7E71",
  "#819C71",
];

export const TripsByAreaChart = ({ setDateFromTable, setDateToTable, ...rest }) => {
  const theme = useTheme();

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
            backgroundColor: colors[Math.floor(Math.random() * 9)],
            barPercentage: 0.5,
            barThickness: 12,
            borderRadius: 4,
            categoryPercentage: 0.5,
            data: [...dataFollowRegion[region]],
            label: region,
            maxBarThickness: 10,
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

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    xAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
          beginAtZero: true,
          min: 0,
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: theme.palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: theme.palette.divider,
        },
      },
    ],
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: "index",
      titleFontColor: theme.palette.text.primary,
    },
  };

  return (
    <Card {...rest}>
      <CardHeader
        action={
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Grid container>
                <Grid item lg={5} md={5} xs={5}>
                  <DatePicker
                    label="From"
                    value={dateFrom}
                    onChange={(newValue) => {
                      console.log(newValue);
                      setDateFrom(newValue);
                      if (setDateFromTable) setDateFromTable(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
                <Grid
                  item
                  lg={1}
                  md={1}
                  xs={1}
                  sx={{ display: "flex" }}
                  justifyContent="center"
                  alignItems="center"
                >
                  <ArrowRightIcon fontSize="large" sx={{ color: "gray" }} />
                </Grid>
                <Grid item lg={5} md={5} xs={5}>
                  <DatePicker
                    label="To"
                    value={dateTo}
                    onChange={(newValue) => {
                      setDateTo(newValue);
                      if (setDateToTable) setDateToTable(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
                <Grid
                  item
                  lg={1}
                  md={1}
                  xs={1}
                  sx={{ display: "flex" }}
                  justifyContent="center"
                  alignItems="center"
                >
                  <IconButton>
                    <Sort fontSize="large" sx={{ color: "gray" }} />
                  </IconButton>
                </Grid>
              </Grid>
            </LocalizationProvider>
          </FormControl>
        }
        title="Trips By Area"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: "relative",
          }}
        >
          <Bar data={data} options={options} />
        </Box>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <Link href="/report/tripsByArea">
          <Button color="primary" endIcon={<ArrowRightIcon fontSize="small" />} size="small">
            Overview
          </Button>
        </Link>
      </Box>
    </Card>
  );
};
