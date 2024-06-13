import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import image from "../../assets/forgot password.jpg";
import axios from 'axios';
import { toast } from 'react-toastify';

const FormContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
}));

const LoginButton = styled(Button)(() => ({
  marginTop: '20px',
  backgroundColor: '#04c4cc',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#9dcccf',
  },
}));

const validationSchemaEmail = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
});

const validationSchemaQA = Yup.object({
  answer: Yup.string().required('Required'),
});

const validationSchemaPassword = Yup.object({
  newPassword: Yup.string().required('Required').min(6, 'Password must be at least 6 characters'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Required'),
});

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState(''); 
  const [isAnswerVerified, setIsAnswerVerified] = useState(false); // Renamed this state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestion = async () => {
      if (step === 2) {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/api/auth/forgot-password`,
            { email },
            {
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );
          setQuestion(response.data.question);
        } catch (error) {
          
          toast.error('Invalid email address');
          navigate('/login');

        }
      }
    };

    fetchQuestion();
  }, [step, email]);

  

  useEffect(() => {
    const verifyAnswerAndProceed = async () => {
      if (step === 3) {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/api/auth/verify-security-answers`,
            { email, securityQuestion: question, securityAnswer: answer },
            {
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );
          
          if (response.data.message === 'Success') {
            setIsAnswerVerified(true);
            
          } else {
            setIsAnswerVerified(false);
            toast.error('Invalid answer');
            navigate('/login');
           
          }
        } catch (error) {
          setIsAnswerVerified(false);
          toast.error('Invalid answer');
         
          navigate('/login');
         
        }
      }
    };

    verifyAnswerAndProceed();
  }, [step, email, question, answer, navigate]); // Added `question` and `answer` to the dependency array

  
  

  const handleNext = (values, { setSubmitting }) => {
    setEmail(values.email);
    setStep(2);
    setSubmitting(false);
  };

  const handleAnswerSubmit = (values, { setSubmitting }) => {
    setAnswer(values.answer); // Set the answer state
    setStep(3);
    setSubmitting(false);
  };

  const handlePasswordSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/reset-password`,
        { email, newPassword: values.newPassword },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      toast.success('Password reset successful!');
      navigate('/login');
    } catch (error) {
      toast.error('Password reset failed!');
      navigate('/login');
    } finally {
      setSubmitting(false);
    }
  };




  return (
    <Grid container justifyContent="center" gap={2}>
      <Grid item xs={12} sm={6} md={5}>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            src={image}
            alt="SideImage"
            style={{ width: '100%', height: 'auto' }}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        {step === 1 && (
          <Formik
            initialValues={{ email: '' }}
            validationSchema={validationSchemaEmail}
            onSubmit={handleNext}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <FormContainer>
                  <Typography variant="h4" component="h1" gutterBottom>
                    Reset Your Password
                  </Typography>
                  <Typography variant="body1" component="p" gutterBottom>
                    Enter your email address to reset your password.
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
                  <LoginButton type="submit" variant="contained" fullWidth disabled={isSubmitting}>
                    Next
                  </LoginButton>
                </FormContainer>
              </Form>
            )}
          </Formik>
        )}
        {step === 2 && (
          <Formik
            initialValues={{ answer: '' }}
            validationSchema={validationSchemaQA}
            onSubmit={handleAnswerSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <FormContainer>
                  <Typography variant="h4" component="h1" gutterBottom>
                    Security Question
                  </Typography>
                  <TextField
                    name="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    disabled
                  />
                  <TextField
                    name="question"
                    label="Question"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={question}
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
                  <LoginButton type="submit" variant="contained" fullWidth disabled={isSubmitting}>
                    Submit
                  </LoginButton>
                </FormContainer>
              </Form>
            )}
          </Formik>
        )}
        {step === 3 && isAnswerVerified && (
          <Formik
            initialValues={{ newPassword: '', confirmPassword: '' }}
            validationSchema={validationSchemaPassword}
            onSubmit={handlePasswordSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <FormContainer>
                  <Typography variant="h4" component="h1" gutterBottom>
                    Reset Password
                  </Typography>
                  <TextField
                    name="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    disabled
                  />
                  <Field
                    as={TextField}
                    name="newPassword"
                    type="password"
                    label="New Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={touched.newPassword && !!errors.newPassword}
                    helperText={touched.newPassword && errors.newPassword}
                  />
                  <Field
                    as={TextField}
                    name="confirmPassword"
                    type="password"
                    label="Confirm New Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={touched.confirmPassword && !!errors.confirmPassword}
                    helperText={touched.confirmPassword && errors.confirmPassword}
                  />
                  <LoginButton type="submit" variant="contained" fullWidth disabled={isSubmitting}>
                    Submit
                  </LoginButton>
                </FormContainer>
              </Form>
            )}
          </Formik>
        )}
      </Grid>
    </Grid>
  );
};

export default ForgotPassword;
