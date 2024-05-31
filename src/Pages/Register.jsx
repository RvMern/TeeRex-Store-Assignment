import react, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  CssBaseline,
  Box,
  TextField,
  Button
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { registerUserService } from "../Services/userService";
import { useDispatch, useSelector } from "react-redux";
import { getUserErrorAction} from "../Redux/userSlice";

const validationSchema = Yup.object({
  username: Yup.string()
    .required("Username is required *")
    .min(3, "The username must contain at least 3 characters")
    .max(30, "The username must not exceed more than 30 characters"),
  email: Yup.string()
    .required("Email is required *")
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/,
      "Enter Valid Email"
    ),
  password: Yup.string()
    .required("Password is required *")
    .min(8, "The password must contain at least 8 characters"),
});

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, user} = useSelector((state) => state.user);
  const mutation = useMutation({
    mutationFn: registerUserService,
    mutationKey: "loginUser",
  });

  const formik = useFormik({
    initialValues: {
      username:'',
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      const checkIsError = Object.keys(mutation.data).includes("isError");
      if (checkIsError) {
        dispatch(getUserErrorAction(mutation.data));
      } else {
            navigate('/login')
      }
    }
    if (mutation.isError) {
      dispatch(getUserErrorAction(mutation.error));
    }
  }, [
    mutation.isSuccess,
    mutation.isError,
    mutation.data,
    mutation.error,
    dispatch,
  ]);

  useEffect(()=>{
    if(user){
      navigate('/')
    }
  },[user])

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper}>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              {...formik.getFieldProps("username")}
            />
            {formik.touched.username && formik.errors.username && (
              <Typography color={"red"} variant={"subtitle2"}>
                {formik.errors.username}
              </Typography>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <Typography color={"red"} variant={"subtitle2"}>
                {formik.errors.email}
              </Typography>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <Typography color={"red"} variant={"subtitle2"}>
                {formik.errors.password}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container>
              <Grid item xs>
                <Typography
                  component={Link}
                  to="#"
                  className="hover:text-violet-500"
                  href="#"
                  variant="body1"
                >
                  Forgot password?
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="body1">
                  Have an account?{" "}
                  <Link className="hover:text-violet-400" to="/login">
                    Log In
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Register;
