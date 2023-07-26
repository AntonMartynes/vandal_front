import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './home.scss';

export const Home = ({data, isLogin}) => {
  useEffect(() => {
    if (isLogin) {
      return navigate('/login');
    }
  }, [isLogin])
  
  let navigate = useNavigate();

  if (isLogin) {
    return navigate('/login');
  }

  return (
    <div className="home">
      <div className="welcome">
        <h1>{`Welcome Back ${data.userName}`} </h1>
      </div>

      <div className="personalInfo">
        <span>{`Your fullname is : ${data.userName} ${data.userSurname}`}</span>
        <br/>
        <span>{`Your phone number is : ${data.userPhone}`}</span>
        <br/>
        <span>{`Your email is : ${data.userEmail}`}</span>
      </div>
    </div>
  );
};