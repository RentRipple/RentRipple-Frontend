import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Grid,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/system";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link as RouterLink } from "react-router-dom";

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

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object({
  firstname: Yup.string().required("Required"),
  lastname: Yup.string().required("Required"),
  username: Yup.string().required("Required"),
  gender: Yup.string().oneOf(["Male", "Female", "Other"]).required("Required"),
  number: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, "Phone number is not valid")
    .max(10, "Phone number is not valid"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
  accountType: Yup.string().oneOf(["Tenant", "Owner"]).required("Required"),
});

const Register = () => {
  return (
    <Grid id="Meet" container justifyContent="center" gap={2}>
      <Grid item xs={12} sm={6} md={6}>
        <Formik
          initialValues={{
            firstname: "",
            lastname: "",
            username: "",
            gender: "",
            number: "",
            email: "",
            password: "",
            accountType: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <FormContainer>
                <Typography variant="h4" component="h1" gutterBottom>
                  Register
                </Typography>
                <Typography variant="body2" component="p" gutterBottom>
                  Do you have an account yet?{" "}
                  <Link component={RouterLink} to="/login">
                    Sign in
                  </Link>
                </Typography>
                <Field
                  as={TextField}
                  name="firstname"
                  type="text"
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={touched.firstname && !!errors.firstname}
                  helperText={touched.firstname && errors.firstname}
                />
                <Field
                  as={TextField}
                  name="lastname"
                  type="text"
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={touched.lastname && !!errors.lastname}
                  helperText={touched.lastname && errors.lastname}
                />
                <Field
                  as={TextField}
                  name="username"
                  type="text"
                  label="Username"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={touched.username && !!errors.username}
                  helperText={touched.username && errors.username}
                />
                <Field
                  as={TextField}
                  name="gender"
                  select
                  label="Gender"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={touched.gender && !!errors.gender}
                  helperText={touched.gender && errors.gender}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Field>
                <Field
                  as={TextField}
                  name="number"
                  type="number"
                  label="Number"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={touched.number && !!errors.number}
                  helperText={touched.number && errors.number}
                />
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
                <Field
                  as={TextField}
                  name="accountType"
                  select
                  label="Account Type"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={touched.accountType && !!errors.accountType}
                  helperText={touched.accountType && errors.accountType}
                >
                  <MenuItem value="Tenant">Tenant</MenuItem>
                  <MenuItem value="Owner">Owner</MenuItem>
                </Field>
                <LoginButton
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={isSubmitting}
                >
                  Register
                </LoginButton>
              </FormContainer>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default Register;
