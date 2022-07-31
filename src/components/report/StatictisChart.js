import React, { useState } from "react";
import { Line } from "react-chartjs-2";
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
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { ArrowRight, Sort } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Link from "next/link";

export const options = {
  responsive: true,
  animation: false,
  cornerRadius: 20,
  layout: { padding: 0 },
  legend: { display: false },
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Budget",
      data: labels.map(() => Math.random()),
      borderColor: "rgb(100, 99, 100)",
      backgroundColor: "rgba(100, 99, 100, 0.5)",
    },
    {
      label: "Trip",
      data: labels.map(() => Math.random()),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Driver",
      data: labels.map(() => Math.random()),
      borderColor: "rgb(236, 252, 22)",
      backgroundColor: "rgba(236, 252, 22, 0.5)",
    },
    {
      label: "Customer",
      data: labels.map(() => Math.random()),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export function StatisticChart(props) {
  const [dateFrom, setDateFrom] = useState(
    new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
  );
  const [dateTo, setDateTo] = useState(new Date());
  return (
    <Card {...props}>
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
                  <ArrowRight fontSize="large" sx={{ color: "gray" }} />
                </Grid>
                <Grid item lg={5} md={5} xs={5}>
                  <DatePicker
                    label="To"
                    value={dateTo}
                    onChange={(newValue) => {
                      setDateTo(newValue);
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
        title="Statictis"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 500,
            position: "relative",
          }}
        >
          <Line options={options} data={data} title={false} />
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
        <Link href="/report/statistic">
          <Button color="primary" endIcon={<ArrowRight fontSize="small" />} size="small">
            Overview
          </Button>
        </Link>
      </Box>
    </Card>
  );
}
