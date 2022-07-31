import { Container } from "@mui/material";
import { DashboardLayout } from "src/components/dashboard-layout";
import ListTrips from "src/components/trip/listTrips";
import { ListTripToolbar } from "src/components/trip/listTripsToolbar";

const Trips = () => {
  return (
    <Container maxWidth={false} sx={{ my: 3 }}>
      <ListTripToolbar />
      <ListTrips sx = {{mt: 3}} />
    </Container>
  );
};
Trips.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Trips;
