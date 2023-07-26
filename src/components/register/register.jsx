import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import {useCookies} from 'react-cookie';
import axios from 'axios';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import { Button, Stack } from "@mui/material";

import './register.scss';

const validationSchema = yup.object({
  userName: yup
    .string('Enter Your Name')
    .required('Name is required'),

  userSurname: yup
    .string('Enter Your Surname')
    .required('Description is required'),

  userPhone: yup
    .string('Enter Your Phone')
    .required('Phone number is required'),

    userEmail: yup
    .string('Enter Your Email')
    .email()
    .required('Email is required'),

    userPassword: yup
    .string('Enter Your Password')
    .required('Password is required'),

    userConfirmedPassword: yup
    .string('Confirm Your Password')
    .required('Confirmation is required'),

});


export const Register = ({setData}) => {
  const navigate = useNavigate();
  const [_, setCookies] = useCookies(['access_token']);

  const formik = useFormik(
    {
    initialValues: {
      userName: '',
      userSurname: '',
      userPhone: '',
      userEmail: '',
      userPassword: '',
      userConfirmedPassword: '',
    },
    validationSchema: validationSchema,
      onSubmit: (values) => {
        const postData = async () => {
          try {
            const response = await axios.post('http://localhost:3001/auth/register', JSON.stringify(values, null, 2), {        
              headers: {
                'Content-Type': 'application/json',
              },
            });
      
            if (response.status === 200) {
              // Handle successful response
              setCookies('access_token', response.data.token);
              window.localStorage.setItem('userID', response.data.userID);
              alert('Post request successful');
              setData({
                userName: response.data.userName,
                userSurname: response.data.userSurname,
                userEmail: response.data.userEmail,
                userPhone: response.data.userPhone
              })
              formik.resetForm();
              console.log('Post request successful');
              navigate("/")

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
    <div className="registerForm">
      <div className="registerForm__header">
        <span>Реєстрація</span>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <Stack direction={"column"}>
          <TextField
            id="userName"
            name="userName"
            label="Ім'я"
            placeholder="Ім'я"
            type="text"
            margin="dense"
            sx={{width: '30vw'}}
            value={formik.values.userName}
            onChange={formik.handleChange}
            error={formik.touched.userName && Boolean(formik.errors.userName)}
            helperText={formik.touched.userName && formik.errors.userName}
          />

          <TextField
            id="userSurname"
            name="userSurname"
            label="Прізвище"
            placeholder="Прізвище"
            type="text"
            margin="dense"
            sx={{width: '30vw'}}
            value={formik.values.userSurname}
            onChange={formik.handleChange}
            error={formik.touched.userSurname && Boolean(formik.errors.userSurname)}
            helperText={formik.touched.userSurname && formik.errors.userSurname}
          />

          <TextField
            id="userPhone"
            name="userPhone"
            label="Номер телефону"
            placeholder="380951231212"
            type="text"
            margin="dense"
            sx={{width: '30vw'}}
            value={formik.values.userPhone}
            onChange={formik.handleChange}
            error={formik.touched.userPhone && Boolean(formik.errors.userPhone)}
            helperText={formik.touched.userPhone && formik.errors.userPhone}
          />

          <TextField
            id="userEmail"
            name="userEmail"
            label="Email"
            placeholder="email@example.com"
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
            label="Пароль"
            placeholder="Введіть пароль"
            type="password"
            margin="dense"
            sx={{width: '30vw'}}
            value={formik.values.userPassword}
            onChange={formik.handleChange}
            error={formik.touched.userPassword && Boolean(formik.errors.userPassword)}
            helperText={formik.touched.userPassword && formik.errors.userPassword}
          />

          <TextField
            id="userConfirmedPassword"
            name="userConfirmedPassword"
            label="Підтвердження паролю"
            placeholder="Підтвердіть пароль"
            type="password"
            margin="dense"
            sx={{width: '30vw'}}
            value={formik.values.userConfirmedPassword}
            onChange={formik.handleChange}
            error={formik.touched.userConfirmedPassword && Boolean(formik.errors.userConfirmedPassword)}
            helperText={formik.touched.userConfirmedPassword && formik.errors.userConfirmedPassword}
          />

          <Button 
            variant="contained" 
            fullWidth 
            type="submit"
            sx={{ my: 1.5, width: '30vw' }}
          >
            Зареєструватись
          </Button>
        </Stack>     
      </form>

      <div className="registerForm__redirect">
        <span>Вже маєте аккаунт?</span>
        <Link to="/login"> <button className="redirectButton">Вхід</button> </Link>
      </div>

    </div>
  );
}