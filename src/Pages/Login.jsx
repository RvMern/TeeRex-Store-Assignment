import react, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  CssBaseline,
  Box,
  TextField,
  Button,
  Snackbar,
  IconButton
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { loginUserService } from "../Services/userService";
import { useDispatch, useSelector } from "react-redux";
import { getUserErrorAction, loginAction } from "../Redux/userSlice";
import CloseIcon from '@mui/icons-material/Close';

const validationSchema = Yup.object({
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

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false); // State to manage Snackbar visibility
  const { error, user} = useSelector((state) => state.user);
  const mutation = useMutation({
    mutationFn: loginUserService,
    mutationKey: "loginUser",
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  useEffect(() => {
    console.log(mutation.data);
    if (mutation.isSuccess) {
      const checkIsError = Object.keys(mutation.data).includes("isError");
      if (checkIsError) {
        return dispatch(getUserErrorAction(mutation.data));
      } else {
        return dispatch(loginAction(mutation.data));
      }
    }
    if (mutation.isError) {
      return dispatch(getUserErrorAction(mutation.error));
    }
  }, [
    mutation.isSuccess,
    mutation.isError,
    mutation.data,
    mutation.error,
    dispatch,
  ]);

  useEffect(() => {
    // Show Snackbar when error occurs
    if (error) {
      setOpenSnackbar(true);
    }
  }, [error]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    // Close Snackbar when user clicks close button
    setOpenSnackbar(false);
  };

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
            Log in
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
              Log In
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
                  Don't have an account?{" "}
                  <Link className="hover:text-violet-400" to="/register">
                    Register
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
      {error  && (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={openSnackbar}
          autoHideDuration={5000}
          onClose={handleClose}
          message={error?.message}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      )}
    </Grid>
  );
};

export default Login;
