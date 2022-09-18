import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Swal from 'sweetalert2';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Typography } from '@mui/material';
import { callAddJob } from 'utils/requests';
import JobModal from 'components/JobModal';
import JobCard from 'components/JobCard';
import { callJobs } from 'utils/requests';

export default function Jobs() {
  const router = useRouter();

  const [jobs, setJobs] = useState([])

  const jobLinks= [
    "https://www.experis.com/-/media/project/manpowergroup/experis/experis-us/articles/all_financial_planning_bluewash_rgb_150.jpg",
    "https://www.theladders.com/wp-content/uploads/job-interview-long-term-compensation-1044x783.jpg",
    "https://www.livecareer.com/wp-content/uploads/2019/06/top-10-job-interview-tips-jobseekers.jpg",
    "https://imageio.forbes.com/specials-images/imageserve/5fce71245c7f26c56e89bbd5/0x0.jpg?format=jpg&width=1200",
    "https://www.lrostaffing.com/wp-content/uploads/2022/04/6-ways-to-prepare-for-behavioural-interview-questions-lro-staffing-1024x576.jpg",
    "https://www.resumecoach.com/wp-content/uploads/sites/2/2018/02/top-10-tips-job-interview.jpg",
    "https://www.livecareer.com/wp-content/uploads/2020/09/job-interview-tips.jpg",
    "https://alis.alberta.ca/media/699122/panel-job-interview-istock-1152769811.jpg"
  ]

  const getJobs = async (username) => {
    const responseJobs = await callJobs(username)
    setJobs(responseJobs)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const username = localStorage.getItem('username');
      getJobs(username)
    }
    console.log('getting jbs')
  }, [setJobs])

  return (
    <Box>

      <Grid container justifyContent="flex-end" sx={{px: 2}}>
        <JobModal callback={getJobs}/>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', height: '90vh', flexWrap: 'wrap', width:"100%"}}>
        {
          jobs.map((job, ind) => (
            <JobCard title={job.title} description={job.job_description} key={ind} link={jobLinks[ind%8]}/>
          ))
        }
      </Box>

    </Box>

  );
}
