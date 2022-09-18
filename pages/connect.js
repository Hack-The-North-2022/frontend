import React, { useEffect, useState } from 'react';
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
import { callPairCode } from 'utils/requests';

export default function Connect() {
  const router = useRouter();

  const [code, setCode] = useState('');
  const updateCode = (event) => {
    setCode(event.currentTarget.value);
  };

  const pairCode = async (e) => {
    e.preventDefault();
    let username = localStorage.getItem('username')
    let good = await callPairCode(username, code);
    if (good) {
      Swal.fire({
        title: 'Success!',
        text: 'Headset has been paired! Interview will start soon.',
        icon: 'success',
        confirmButtonText: 'Okay',
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Wrong Code',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }
  };

  return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh'}}>
        <Paper>
          <Stack spacing={4} sx={{backgroundColor: 'white', px: 4, py: 4, borderRadius: '25px'}}>
            <Box>
              <Typography variant="h6">Pair Code</Typography>
              <TextField label="Enter pair code" onChange={(e) => updateCode(e)}>
              </TextField>
            </Box>
              <Button variant="contained" onClick={(e) => pairCode(e)}>
                Pair
              </Button>
          </Stack>
        </Paper>
      </Box>


  );
}
