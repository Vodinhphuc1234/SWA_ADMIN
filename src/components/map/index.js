import GoogleMapReact from "google-map-react";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const CustomizedLocation = () => <LocationOnIcon sx={{ color: "red", fontSize: "50px" }} />;

const SimpleMap = ({ trip }) => {
  const defaultProps = {
    center: {
      lat: 10.7994154,
      lng: 106.7116815,
    },
    zoom: 11,
  };
  return (
    <GoogleMapReact
      ///bootstrapURLKeys={{ key: "AIzaSyDsw_rqUq00UBsKiQXMB814XLu0VvkXJI8" }}
      defaultCenter={defaultProps.center}
      defaultZoom={defaultProps.zoom}
    >
      {trip && <CustomizedLocation lat={trip.fromLocation.lat} lng={trip.fromLocation.lng} />}
      {trip && <CustomizedLocation lat={trip.toLocation.lat} lng={trip.toLocation.lng} />}
    </GoogleMapReact>
  );
};

export default SimpleMap;
