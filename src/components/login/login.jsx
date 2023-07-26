import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {useCookies} from 'react-cookie';
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

export const Login = ({setData}) => {
  const [_, setCookies] = useCookies(['access_token']);

  const navigate = useNavigate();

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
            const response = await axios.post('http://localhost:3001/auth/login', JSON.stringify(values, null, 2), {
              headers: {
                'Content-Type': 'application/json',
              },            
          });
      
            if (response.status === 200) {
              alert('Post request successful');
              setCookies('access_token', response.data.token);
              window.localStorage.setItem('userID', response.data.userID);
              formik.resetForm();
              setData({
                userName: response.data.userName,
                userSurname: response.data.userSurname,
                userEmail: response.data.userEmail,
                userPhone: response.data.userPhone
              })
              navigate('/');
              console.log('Post request successful');
              
            } else {
              // Handle error response
              console.log('Error:', response.status);
            }
          } catch (error) {
            // Handle network or other errors
            alert(error)
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