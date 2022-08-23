import { LoadingButton } from "@mui/lab";
import { Box, Card, CardContent, CardHeader, Divider, Grid, TextField } from "@mui/material";
import { removeCookies } from "cookies-next";
import { useRouter } from "next/router";
import { useState } from "react";
import updateProfile from "src/api/updateProfile";

export const AccountProfileDetails = ({ user, ...props }) => {
  const [values, setValues] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    phone_number: user.phone_number,
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdate = async () => {
    console.log("heleleo");
    setLoading(true);
    const data = await updateProfile({ ...user, ...values });
    setLoading(false);

    console.log(data);

    if (data?.status === 401 || data?.status === 401) {
      removeCookies("token");
      router.push("/");
    }
  };
  return (
    <Card>
      <CardHeader subheader="The information can be edited" title="Profile" />
      <Divider />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              helperText="Please specify the name"
              label="First Name"
              name="first_name"
              onChange={handleChange}
              required
              value={values.first_name}
              variant="outlined"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              helperText="Please specify the name"
              label="Lats Name"
              name="last_name"
              onChange={handleChange}
              required
              value={values.last_name}
              variant="outlined"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              onChange={handleChange}
              required
              value={values.email}
              variant="outlined"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              onChange={handleChange}
              required
              value={values.phone_number}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <LoadingButton loading={loading} color="primary" variant="contained" onClick={handleUpdate}>
          Save details
        </LoadingButton>
      </Box>
    </Card>
  );
};
