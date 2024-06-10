import React, { useState,  useEffect } from "react";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
  TextField,
  Grid,
  MenuItem,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import sampleImage from '../../assets/signup.jpg'; // Adjust the path to your image file

const steps = ["Personal Details", "Contact Details", "Account Details", "Security Questions"];

const validationSchema = [
  Yup.object({
    username: Yup.string().required("Required"),
    firstname: Yup.string().required("Required"),
    lastname: Yup.string().required("Required"),
  }),
  Yup.object({
    gender: Yup.string().oneOf(["Male", "Female", "Other"]).required("Required"),
    number: Yup.string()
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Phone number is not valid"
      )
      .min(10, "Phone number is not valid")
      .max(10, "Phone number is not valid")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
  }),
  Yup.object({
    password: Yup.string().required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
    accountType: Yup.string().oneOf(["Tenant", "Owner"]).required("Required"),
  }),
];

const initialValues = {
  username: "",
  firstname: "",
  lastname: "",
  gender: "",
  number: "",
  email: "",
  password: "",
  accountType: "",
};

const Register = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [question1, setQuestion1] = useState('');
  const [question2, setQuestion2] = useState('');
  const [question3, setQuestion3] = useState('');

  const questions = [
    "What's your last name?",
    "What's your favorite sport?",
    "What's your favorite color?",
    "What's your father's middle name?",
    "What's your mother's maiden name?",
    "What's your favorite pet?"
  ];

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };
  
  useEffect(() => {
    if (activeStep === 3) {
      const shuffledQuestions = shuffleArray([...questions]);
      setQuestion1(shuffledQuestions[0]);
      setQuestion2(shuffledQuestions[1]);
      setQuestion3(shuffledQuestions[2]);
    }
  }, [activeStep]);

  const handleReset = () => {
    setActiveStep(0);
  };  

  return (
    <Grid container justifyContent="center" gap={2}>
      <Grid item xs={12} sm={6} md={4}>
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <img src={sampleImage} alt="Sample" style={{ maxWidth: "300%", maxHeight: "400px", objectFit: "contain" }} />
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
                    helperText={touched.confirmPassword && errors.confirmPassword}
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
                </>
              )}
              {activeStep === 3 && (
                <>
                  <TextField
                    name="question1"
                    label="Question"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={question1}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <Field
                    as={TextField}
                    name="answer"
                    type="text"
                    label="Answer"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={touched.answer && !!errors.answer}
                    helperText={touched.answer && errors.answer}
                  />
                  <TextField
                    name="question2"
                    label="Question"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={question2}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <Field
                    as={TextField}
                    name="answer"
                    type="text"
                    label="Answer"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={touched.answer && !!errors.answer}
                    helperText={touched.answer && errors.answer}
                  />
                  <TextField
                    name="question3"
                    label="Question"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={question3}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <Field
                    as={TextField}
                    name="answer"
                    type="text"
                    label="Answer"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={touched.answer && !!errors.answer}
                    helperText={touched.answer && errors.answer}
                  />
                </>
              )}
              <Box display="flex" justifyContent="space-between" marginTop={2}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                >
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
