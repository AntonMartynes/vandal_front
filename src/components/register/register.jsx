import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import { Button, Stack } from "@mui/material";

import './register.scss';

const validationSchema = yup.object({
  userEmail: yup
    .string('Enter the name of the mark')
    .min(3, 'Name should be of minimum 3 characters length')
    .required('Name is required'),
  description: yup
    .string('Enter description of the mark')
    .min(3, 'Description should be of minimum 3 characters length')
    .required('Description is required'),
  latitude: yup
    .number('Enter latitude')
    .required('latitude is required'),
  longitude: yup
    .number('Enter longitude')
    .required('longitude is required'),

});

export const Register = () => {
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
            const response = await fetch('http://localhost:3001/auth/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values, null, 2),
            });
      
            if (response.ok) {
              // Handle successful response
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
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          <TextField
            id="userConfirmedPassword"
            name="userConfirmedPassword"
            label="Підтвердження паролю"
            placeholder="Підтвердіть пароль"
            type="password"
            margin="dense"
            sx={{width: '30vw'}}
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          <Button 
            color="primary" 
            variant="contained" 
            type="submit"
            sx={{ my: 1.5, width: '30vw' }}
          >
            Зареєструватись
          </Button>
        </Stack>     
      </form>

      <div className="registerForm__redirect">
        <span>Ще не зареєстровані?</span>
        <Link to="/login"> <button className="redirectButton">Вхід</button> </Link>
      </div>

    </div>
  );
}