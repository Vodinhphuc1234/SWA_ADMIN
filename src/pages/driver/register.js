import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { removeCookies } from "cookies-next";
import { useFormik } from "formik";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import addDriver from "src/api/driver/addDriver";
import * as Yup from "yup";

const Register = () => {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      phone_number: "",
      first_name: "",
      last_name: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      phone_number: Yup.string()
        .length(10, "Phone number length is 10")
        .max(255)
        .required("Phone number is required"),
      first_name: Yup.string().max(255).required("First name is required"),
      last_name: Yup.string().max(255).required("Last name is required"),
      password: Yup.string()
        .max(255)
        .required("Password is required")
        .length(8, "Password's length is 8"),
    }),
    onSubmit: async (user) => {
      console.log(user);
      setLoading(true);
      const data = await addDriver({
        ...user,
        phone_number: user.phone_number.replace("0", "+84"),
      });
      setLoading(false);
      if (data?.status === 401 || data?.status === 403) {
        removeCookies("token");
        router.push("/login");
      } else if (data?.data?.message) {
        setMessage({ message: data.data.message, color: "red" });
      } else {
        setMessage({ message: "Add succesfully", color: "green" });
      }
    },
  });

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <NextLink href="/" passHref>
            <Button component="a" startIcon={<ArrowBackIcon fontSize="small" />}>
              Dashboard
            </Button>
          </NextLink>

          <Box sx={{ my: 3 }}>
            <Typography color="textPrimary" variant="h4">
              Create a driver account
            </Typography>

            {message && (
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
                sx={{ color: message.color }}
              >
                {message.message}
              </Typography>
            )}
          </Box>
          <TextField
            error={Boolean(formik.touched.first_name && formik.errors.first_name)}
            fullWidth
            helperText={formik.touched.first_name && formik.errors.first_name}
            label="First Name"
            margin="normal"
            name="first_name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.first_name}
            variant="outlined"
          />
          <TextField
            error={Boolean(formik.touched.last_name && formik.errors.last_name)}
            fullWidth
            helperText={formik.touched.last_name && formik.errors.last_name}
            label="Last Name"
            margin="normal"
            name="last_name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.last_name}
            variant="outlined"
          />
          <TextField
            error={Boolean(formik.touched.phone_number && formik.errors.phone_number)}
            fullWidth
            helperText={formik.touched.phone_number && formik.errors.phone_number}
            label="Phone Number"
            margin="normal"
            name="phone_number"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
           
            value={formik.values.phone_number}
            variant="outlined"
          />
          <TextField
            error={Boolean(formik.touched.email && formik.errors.email)}
            fullWidth
            helperText={formik.touched.email && formik.errors.email}
            label="Email Address"
            margin="normal"
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="email"
            value={formik.values.email}
            variant="outlined"
          />

          <TextField
            error={Boolean(formik.touched.password && formik.errors.password)}
            fullWidth
            helperText={formik.touched.password && formik.errors.password}
            label="Password"
            margin="normal"
            name="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            value={formik.values.password}
            variant="outlined"
          />

          <Box sx={{ py: 2 }}>
            <LoadingButton
              loading={loading}
              color="primary"
              disabled={formik.isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              onClick={formik.handleSubmit}
            >
              Create
            </LoadingButton>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Register;
