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
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { getJob } from 'utils/requests';

import { Typography } from '@mui/material';

export default function Job(props) {
  const { job } = props;
  const router = useRouter();

  return (
    <Container>
      <Typography>
        {job.job_id}
      </Typography>
      <Typography>
        {job.title}
      </Typography>
      <Typography>
        {job.description}
      </Typography>
      {
        job.interviews.map((interview, ind) => (
          <Card key={ind}>
            <CardContent >
              {interview.title}
            </CardContent>
            <CardActions>
              <Link href={`/interview/${interview.interview_id}`}>
                <Button size="small">View</Button>
              </Link>
            </CardActions>
          </Card>
        ))
      }
    </Container>

  );
}

export async function getServerSideProps() {
  let job = {};
  const { id } = context.query;
  try {
    job = await getJob(id);
  } catch (err) {
    console.log(err.message);
  }
  return {
    props: {
      job,
    },
  };
}
