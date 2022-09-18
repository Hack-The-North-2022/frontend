import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import Swal from 'sweetalert2';

import { Typography } from '@mui/material';
import { callPairCode, callJobs, callCreateInterview } from 'utils/requests';

export default function Connect() {
  const router = useRouter();

  const [code, setCode] = useState('');
  const [status, setStatus] = useState(0);
  const [jobs, setJobs] = useState([]);
  const [jobID, setID] = useState('');

  const getJobs = async (username) => {
    const responseJobs = await callJobs(username)
    setJobs(responseJobs)
  }


  const updateCode = (event) => {
    setCode(event.currentTarget.value);
  };
  const updateID = (event) => {
    setID(event.target.value);
  };


  const pairCode = async (e) => {
    e.preventDefault();
    let username = localStorage.getItem('username')
    let good = await callPairCode(username, code);
    if (good) {
      Swal.fire({
        title: 'Success!',
        text: 'Headset has been paired! Now, choose a job to interview for.',
        icon: 'success',
        confirmButtonText: 'Okay',
      });
      await getJobs(username)
      setStatus(1)
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Wrong Code',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }
  };

  const createInterview = async (e) => {
    e.preventDefault()
    let username = localStorage.getItem('username')
    let good = await callCreateInterview(username, jobID, code);
    if (good) {
      Swal.fire({
        title: 'Success!',
        text: 'Job chosen! Switch to headset for your interview.',
        icon: 'success',
        confirmButtonText: 'Okay',
      });
      setStatus(2)
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'There was an error creating an interview.',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }
  }

  return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', height: '90vh'}}>
        <Paper>
          <Stack spacing={4} sx={{backgroundColor: 'white', px: 4, pb: 4, borderRadius: '25px'}}>
            {
              status === 0 && (
                <Box>
                  <Box sx={{py:2}}>
                    <Typography variant="h6" sx={{py: 2}}>Connect Instance</Typography>
                    <TextField label="Enter pair code" onChange={(e) => updateCode(e)}>
                    </TextField>
                  </Box>
                <Button variant="contained" onClick={(e) => pairCode(e)}>
                  Pair
                </Button>
                </Box>
              )
            }
            {
              status === 1 && (
                <Box>
                  <Select onChange={(e) => updateID(e)} value={jobID}>
                    {
                      jobs.map((job, ind) => (
                        <MenuItem value={job.job_id} key={ind}>{job.title}</MenuItem>
                      ))
                    }
                  </Select>
                  <Button variant="contained" onClick={(e) => createInterview(e)}>
                    Create Interview!
                  </Button>
                </Box>
              )
            }
            {
              status === 2 && (
                <Box>
                  <Typography>Please go to headset.</Typography>
                </Box>
              )
            }



          </Stack>
        </Paper>
      </Box>


  );
}
