import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import { Button, Stack } from "@mui/material";

import './login.scss';



const validationSchema = yup.object({
  userEmail: yup
    .string('Enter Your Email')
    .email()
    .required('Email is required'),

  userPassword: yup
    .string('Enter Your Password')
    .required('Password is Required'),
});

export const Login = () => {
  const formik = useFormik(
    {
    initialValues: {
      userEmail: '',
      userPassword: '',
    },
    validationSchema: validationSchema,
      onSubmit: (values) => {
        const postData = async () => {
          try {
            const response = await fetch('http://localhost:3001/auth/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values, null, 2),
            });
      
            if (response.ok) {
              alert('Post request successful')
              formik.resetForm();
              console.log('Post request successful');
              
            } else {
              // Handle error response
              console.log('Error:', response.status);
            }
          } catch (error) {
            // Handle network or other errors
            console.log('Error:', error);
          }
        };
      
        postData();
      },
  });


  return (
    <div className="loginForm">
      <div className="loginForm__header">
        <span>Вхід</span>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <Stack direction={"column"} >
          <TextField
            
            id="userEmail"
            name="userEmail"
            label="Email"
            type="text"
            margin="dense"
            sx={{width: '30vw'}}
            value={formik.values.userEmail}
            onChange={formik.handleChange}
            error={formik.touched.userEmail && Boolean(formik.errors.userEmail)}
            helperText={formik.touched.userEmail && formik.errors.userEmail}
          />

          <TextField
            
            id="userPassword"
            name="userPassword"
            label="Password"
            type="password"
            margin="dense"
            sx={{width: '30vw'}}
            value={formik.values.userPassword}
            onChange={formik.handleChange}
            error={formik.touched.userPassword && Boolean(formik.errors.userPassword)}
            helperText={formik.touched.userPassword && formik.errors.userPassword}
          />
          
          <Button 
            
            variant="contained" 
            fullWidth 
            type="submit"
            sx={{ my: 1.5, width: '30vw' }}
          >
            Увійти
          </Button>
        </Stack>
      </form>

      <div className="loginForm__redirect">
        <span>Ще не зареєстровані?</span>
        <Link to="/register"> <button className="redirectButton">Перейти до реєстрації</button> </Link>
      </div>
    </div>
  );
}