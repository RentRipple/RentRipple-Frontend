import React, { useState } from "react";
import {
  Box,
  Button,
  Stepper,
  Step,
  Link,
  StepLabel,
  Typography,
  TextField,
  Grid,
  MenuItem,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link as RouterLink } from "react-router-dom";
import sampleImage from "../../assets/signup.jpg"; // Adjust the path to your image file

const steps = [
  "Personal Details",
  "Contact Details",
  "Account Details",
  "Security Questions",
];

const validationSchema = [
  Yup.object({
    firstname: Yup.string().required("Required"),
    lastname: Yup.string().required("Required"),
  }),
  Yup.object({
    gender: Yup.string()
      .oneOf(["Male", "Female", "Other"])
      .required("Required"),
    accountType: Yup.string().oneOf(["Tenant", "Owner"]).required("Required"),
    number: Yup.string()
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Phone number is not valid"
      )
      .min(10, "Phone number is not valid")
      .max(10, "Phone number is not valid"),
  }),
  Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  }),
  Yup.object({
    answer1: Yup.string().required("Required"),
    answer2: Yup.string().required("Required"),
    answer3: Yup.string().required("Required"),
  }),
];

const initialValues = {
  firstname: "",
  lastname: "",
  gender: "Male",
  number: "",
  email: "",
  password: "",
  confirmPassword: "",
  accountType: "Tenant",
  question1: "",
  answer1: "",
  question2: "",
  answer2: "",
  question3: "",
  answer3: "",
};

const Register = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const questions = [
    "What's your favorite city?",
    "What's your favorite sport?",
    "What's your favorite color?",
    "What's your father's middle name?",
    "What's your mother's maiden name?",
    "What's your favorite pet?",
  ];

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Grid container justifyContent="center" gap={2}>
      <Grid item xs={12} sm={6} md={4}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <img
            src={sampleImage}
            alt="Sample"
            style={{
              maxWidth: "300%",
              maxHeight: "400px",
              objectFit: "contain",
            }}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema[activeStep]}
          onSubmit={(values, { setSubmitting }) => {
            if (activeStep === steps.length - 1) {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            } else {
              handleNext();
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              {activeStep === 0 && (
                <>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    mt={2}
                    mb={1}
                  >
                    <Typography variant="body1" component="p" gutterBottom>
                      Do you have an account already?{" "}
                      <Link component={RouterLink} to="/login">
                        Sign In
                      </Link>
                    </Typography>
                  </Box>
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
                </>
              )}
              {activeStep === 1 && (
                <>
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
                  <Field
                    as={TextField}
                    name="number"
                    type="text"
                    label="Number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={touched.number && !!errors.number}
                    helperText={touched.number && errors.number}
                  />
                </>
              )}
              {activeStep === 2 && (
                <>
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
                    name="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={touched.confirmPassword && !!errors.confirmPassword}
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                    }
                  />
                </>
              )}
              {activeStep === 3 && (
                <>
                  <Field
                    as={TextField}
                    name="question1"
                    select
                    label="Security Question 1"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={touched.question1 && !!errors.question1}
                    helperText={touched.question1 && errors.question1}
                  >
                    {questions.map((question, index) => (
                      <MenuItem key={index} value={question}>
                        {question}
                      </MenuItem>
                    ))}
                  </Field>
                  <Field
                    as={TextField}
                    name="answer1"
                    type="text"
                    label="Answer"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={touched.answer1 && !!errors.answer1}
                    helperText={touched.answer1 && errors.answer1}
                  />
                  <Field
                    as={TextField}
                    name="question2"
                    select
                    label="Security Question 2"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={touched.question2 && !!errors.question2}
                    helperText={touched.question2 && errors.question2}
                  >
                    {questions.map((question, index) => (
                      <MenuItem key={index} value={question}>
                        {question}
                      </MenuItem>
                    ))}
                  </Field>
                  <Field
                    as={TextField}
                    name="answer2"
                    type="text"
                    label="Answer"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={touched.answer2 && !!errors.answer2}
                    helperText={touched.answer2 && errors.answer2}
                  />
                  <Field
                    as={TextField}
                    name="question3"
                    select
                    label="Security Question 3"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={touched.question3 && !!errors.question3}
                    helperText={touched.question3 && errors.question3}
                  >
                    {questions.map((question, index) => (
                      <MenuItem key={index} value={question}>
                        {question}
                      </MenuItem>
                    ))}
                  </Field>
                  <Field
                    as={TextField}
                    name="answer3"
                    type="text"
                    label="Answer"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={touched.answer3 && !!errors.answer3}
                    helperText={touched.answer3 && errors.answer3}
                  />
                </>
              )}
              <Box display="flex" justifyContent="space-between" marginTop={2}>
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
        {activeStep === steps.length && (
          <Box textAlign="center" marginTop={2}>
            <Typography variant="h6">All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default Register;
