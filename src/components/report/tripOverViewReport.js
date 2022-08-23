import {
  ArrowDownward,
  ArrowRight,
  ArrowUpward,
  CarRental,
  Money,
  Sort,
} from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { removeCookies } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import getTripIncomeReport from "src/api/report/getTripIncomeReport";
import getTripReportByArea from "src/api/report/getTripReportByArea";
import { CustomizedBox } from "../dashboard/customizedBox";

const TripOverviewReport = () => {
  const [dateFrom, setDateFrom] = useState(
    new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
  );
  const [dateTo, setDateTo] = useState(new Date());

  const [budget, setBudget] = useState();

  const [tripAmount, setTripAmount] = useState();

  const router = useRouter();

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

      if (data?.status === 403 || data?.status === 401) {
        removeCookies("token");
        router.push("/login");
      } else {
        //get amount trip
        var count = 0;
        data.forEach((item) => {
          count += item.trips_count;
        });
        setTripAmount(count);
      }

      const budgetData = await getTripIncomeReport({
        params: {
          offset: 0,
          limit: 500,
          date_start: dateFrom.getTime() / 1000,
          date_end: dateTo.getTime() / 1000,
        },
      });

      if (budgetData?.status === 403 || budgetData?.status === 401) {
        removeCookies("token");
        router.push("/login");
      } else {
        //get amount trip
        setBudget(budgetData.revenue ? budgetData.revenue : 0);
      }

      console.log(dateFrom, dateTo);
      console.log(data, budgetData);
    };

    asyncFunc();
  }, [dateFrom, dateTo]);

  return (
    <Card>
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
                      console.log(newValue.getTime());
                      setDateFrom((prev) => newValue.getTime());
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
                      console.log(newValue.getTime());
                      setDateTo((prev) => newValue);
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
        title="Trips OverView"
      />
      <Divider />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item lg={6} sm={6} xl={6} xs={12}>
            <CustomizedBox
              title={"BUDGET"}
              value={`${budget} VND`}
              icon={<Money />}
              iconColor="error.main"
            >
              <>
                <Typography color="textSecondary" variant="caption">
                  System budget in this period
                </Typography>
              </>
            </CustomizedBox>
          </Grid>

          <Grid item xl={6} lg={6} sm={6} xs={12}>
            <CustomizedBox
              title={"TOTAL TRIP"}
              value={tripAmount}
              icon={<CarRental />}
              iconColor="primary.main"
            >
              <>
                <Typography color="textSecondary" variant="caption">
                  Trips amount in this period
                </Typography>
              </>
            </CustomizedBox>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TripOverviewReport;
