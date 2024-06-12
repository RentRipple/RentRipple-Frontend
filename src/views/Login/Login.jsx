import React from "react";
import { Box, TextField, Button, Typography, Link, Grid } from "@mui/material";
import { styled } from "@mui/system";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import image from "../../assets/loginSide.PNG";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
const FormContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
}));

const LoginButton = styled(Button)(() => ({
  marginTop: "20px",
  backgroundColor: "#04c4cc",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#9dcccf",
  },
}));

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

const Login = () => {
  const { setIsLogin, handleLogin } = useContext(AppContext);
  const Navigate = useNavigate();
  return (
    <Grid container justifyContent="center" gap={2}>
      <Grid item xs={12} sm={6} md={5}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={image}
            alt="SideImage"
            style={{ width: "100%", height: "auto" }}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, setFieldError }) => {
            setSubmitting(true);
            const result = await handleLogin(values);

            if (result.error) {
              if (result.status === 401) {
                setFieldError("email", "Invalid email or password");
                setFieldError("password", "Invalid email or password");
              } else {
                alert(result.message);
              }
              setIsLogin(false);
            } else {
              toast.success("Login successful");
              setIsLogin(true);
              Navigate("/");
            }

            setSubmitting(false);
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <FormContainer>
                <Typography variant="h4" component="h1" gutterBottom>
                  Login
                </Typography>
                <Typography variant="body2" component="p" gutterBottom>
                  Do not have an account yet?{" "}
                  <Link component={RouterLink} to="/register">
                    Sign up
                  </Link>
                </Typography>
                <Field
                  as={TextField}
                  name="email"
                  type="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                />
                <Field
                  as={TextField}
                  name="password"
                  type="password"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                />
                <LoginButton
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={isSubmitting}
                >
                  Login
                </LoginButton>
                <Link href="#" variant="body2" style={{ marginTop: "10px" }}>
                  Forgot Password?
                </Link>
              </FormContainer>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default Login;
