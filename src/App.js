import './App.css';
import React, { useState } from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Register } from './components/register/register';

const App = () => {
  const [data, setData] = useState({
    userName: 'Anton',
    userSurname: 'Martynes',
    userEmail: 'martynes@gmail.com',
    userPhone: '380958888888'
  })
  const [isLogin, setIsLogin] = useState('false');
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home data={data} isLogin={isLogin} />}/>
          <Route path='/login' element={<Login setData={setData} />}/>
          <Route path='/register' element={<Register setData={setData}/>}/>
          <Route path='*' element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
