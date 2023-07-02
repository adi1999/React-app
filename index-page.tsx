// src/pages/login/index.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Typography } from '@mui/material';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';

interface User {
    id: number;
    username: string;
    password: string; // Add 'password' property to the User interface
    metamaskKey: string;
  }

const LoginPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null | undefined>(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const setUser = (username : string) => {
console.log(users)
   var currser = users.find(user => {return user.username == username})
   console.log(username);
   setSelectedUser(currser);
  }

  useEffect(() => {
    axios.get<User[]>('http://localhost:5000/users').then((response) => {
      setUsers(response.data);
    });
  }, []);

  const handleLogin = () => {
    console.log(password)
    console.log(selectedUser)
    if (selectedUser && selectedUser.password === password) {
        
      setError('');
      // Redirect to the homepage with the selected user's data
      window.location.href = `/homepage?user=${encodeURIComponent(
        JSON.stringify(selectedUser)
      )}`;
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    // <Container>
    //   <Typography variant="h4">Login Page</Typography>
    //   <ul>
    //     {users.map((user) => (
    //       <li key={user.id}>
    //         {user.username}{' '}
    //         <Button variant="contained" color="primary" onClick={() => setSelectedUser(user)}>
    //           Select
    //         </Button>
    //       </li>
    //     ))}
    //   </ul>
    //   {selectedUser && (
    //     <div>
    //       <Typography variant="h5">Selected User: {selectedUser.username}</Typography>
    //       <input
    //         type="password"
    //         placeholder="Enter password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //       />
    //       <Button variant="contained" color="primary" onClick={handleLogin}>
    //         Login
    //       </Button>
    //       {error && <Typography color="error">{error}</Typography>}
    //     </div>
    //   )}
    // </Container>
    <div className="container">
    <div className="row">
        <div className="col-lg-3 col-md-2"></div>
        <div className="col-lg-6 col-md-8 login-box">
            <div className="col-lg-12 login-key">
                {/* <i className="fa fa-key" aria-hidden="true"></i> */}
                <FontAwesomeIcon icon={faKey} className="fa fa-key" />
            </div>
            <div className="col-lg-12 login-title">
                ADMIN PANEL
            </div>

            <div className="col-lg-12 login-form">
                <div className="col-lg-12 login-form">
                   
                        {/* <div className="form-group">
                            <label className="form-control-label">USERNAME</label>
                            <input type="text" className="form-control"/>
                        </div> */}
                        <select className="form-select" aria-label="Default select example" onChange={(e) => setUser(e.target.value)}>
                                <option selected>Select Username</option>
                                {users.map(user=> {return <option> {user.username}  </option> })}
                        </select>
                        <div className="form-group">
                            <label className="form-control-label">PASSWORD</label>
                            <input type="password" className="form-control"  value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <div className="col-lg-12 loginbttm">
                            <div className="col-lg-6 login-btm login-text">
                               
                            </div>
                            <div className="col-lg-6 login-btm login-button">
                                <button type="submit" className="btn btn-outline-primary" onClick={handleLogin}>LOGIN</button>
                                {error && <Typography color="error">{error}</Typography>}
                            </div>
                        </div>
                    
                </div>
            </div>
            <div className="col-lg-3 col-md-2"></div>
        </div>
    </div>
    </div>





  );
};

export default LoginPage;
