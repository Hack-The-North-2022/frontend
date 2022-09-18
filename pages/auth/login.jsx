import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";

import Swal from 'sweetalert2';
import { Typography } from '@mui/material';

export default function Login() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const updateUsername = (event) => {
    setUserName(event.currentTarget.value);
  };
  const updatePassword = (event) => {
    setPassword(event.currentTarget.value);
  };

  const loginUser = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'password') {
      if (typeof window !== 'undefined') {
        // eslint-disable-next-line no-undef
        localStorage.setItem('htnLoggedIn', 'true');
      }
      router.push('/');
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Wrong username! Water water water!',
        icon: 'error',
        confirmButtonText: 'loo loo loo!',
      });
    }
  };

  return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh'}}>
        <Paper>
          <Stack spacing={4} sx={{backgroundColor: 'white', px: 4, py: 4, borderRadius: '25px'}}>
            <Box>
              <Typography variant="h6">Username</Typography>
              <TextField label="Enter Username">
              </TextField>
            </Box>
            <Box>
              <Typography variant="h6">Password</Typography>
              <TextField label="Enter Password" type="password">
              </TextField>
            </Box>
              <Button variant="contained">
                Log In
              </Button>

            <Typography sx={{color: 'primary.main'}}>
              Forgot Password?
            </Typography>

          </Stack>
        </Paper>
      </Box>

  );
}
