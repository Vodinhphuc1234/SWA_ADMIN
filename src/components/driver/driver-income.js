import { ArrowRight, Sort } from "@mui/icons-material";
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
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import getTripIncomeReport from "src/api/report/getTripIncomeReport";

const DriverIncome = ({ self }) => {
  const [dateFrom, setDateFrom] = useState(
    new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
  );
  const [dateTo, setDateTo] = useState(new Date());

  const [income, setIncome] = useState("");

  useEffect(() => {
    const asyncFunc = async () => {
      const budgetData = await getTripIncomeReport({
        params: {
          offset: 0,
          limit: 500,
          date_start: dateFrom.getTime() / 1000,
          date_end: dateTo.getTime() / 1000,
          driver: self,
        },
      });

      if (budgetData?.status === 403 || budgetData?.status === 401) {
        removeCookies("token");
        router.push("/login");
      } else {
        //get amount trip
        setIncome(budgetData.revenue ? budgetData.revenue : 0);
      }
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
        title="Driver Income"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            backgroundColor: "blue",
            color: "white",
            borderRadius: 1,
            paddingX: 5,
            paddingY: 3,
          }}
        >
          <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>Income: {income} VND</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DriverIncome;
