import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
  TextField,
  Link as MuiLink,
  Grid,
  MenuItem,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import sampleImage from "../../assets/signup.jpg"; // Adjust the path to your image file
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { REGEX_PASSWORD, SECURITY_QUESTION } from "../../helpers/constant";
import { toast } from "react-toastify";

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
    password: Yup.string()
      .matches(
        REGEX_PASSWORD,
        "password should have atleast 8 characters.atleast one uppercase,atleast one lowercase,atleast one special character and atleast one digit"
      )
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  }),
  Yup.object({
    question1: Yup.string().required("Required"),
    answer1: Yup.string().required("Required"),
    question2: Yup.string().required("Required"),
    answer2: Yup.string().required("Required"),
    question3: Yup.string().required("Required"),
    answer3: Yup.string().required("Required"),
  }),
];

const initialValues = {
  firstname: "",
  lastname: "",
  gender: "",
  number: "",
  email: "",
  password: "",
  confirmPassword: "",
  question1: "",
  answer1: "",
  question2: "",
  answer2: "",
  question3: "",
  answer3: "",
};

const Register = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const navigate = useNavigate();
  const { handleSignUp } = useContext(AppContext);

  useEffect(() => {
    if (sessionStorage.getItem("accessToken")) {
      navigate("/")
    }
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleQuestionChange = (question, field, setFieldValue) => {
    setFieldValue(field, question);
    setSelectedQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      newQuestions[parseInt(field.charAt(field.length - 1)) - 1] = question;
      return newQuestions;
    });
  };

  const getAvailableQuestions = (currentField) => {
    const currentQuestionIndex = parseInt(currentField.charAt(currentField.length - 1)) - 1;
    return SECURITY_QUESTION.filter((question) => !selectedQuestions.includes(question) || selectedQuestions[currentQuestionIndex] === question);
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
              maxWidth: "100%",
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
        <Box textAlign="center" marginTop={2}>
          Already have an account?
          <MuiLink component={Link} to="/login" variant="body2">
            {" "}
            Sign in
          </MuiLink>
        </Box>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema[activeStep]}
          onSubmit={async (values, { setSubmitting }) => {
            if (activeStep === steps.length - 1) {
              const res = await handleSignUp(values);
              if (res.status === 201) {
                toast.success("Registration successful");
                navigate("/login");
              } else {
                toast.error("Registration failed");
              }
            } else {
              handleNext();
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, errors, touched, setFieldValue }) => (
            <Form>
              {activeStep === 0 && (
                <>
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
                    onChange={(e) => handleQuestionChange(e.target.value, "question1", setFieldValue)}
                  >
                    {getAvailableQuestions("question1").map((question, index) => (
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
                    onChange={(e) => handleQuestionChange(e.target.value, "question2", setFieldValue)}
                  >
                    {getAvailableQuestions("question2").map((question, index) => (
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
                    onChange={(e) => handleQuestionChange(e.target.value, "question3", setFieldValue)}
                  >
                    {getAvailableQuestions("question3").map((question, index) => (
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
