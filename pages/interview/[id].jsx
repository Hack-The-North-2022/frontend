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
import { getInterview } from 'utils/requests';
import PieChart from 'components/charts/PieChart'

import { Typography } from '@mui/material';

export default function Interview(props) {
  const { interview } = props;
  const router = useRouter();

  const eye_contact = [
    { name: 'Maintaining eye', value: 20},
    { name: 'Non-eye contact', value: 50}
  ]

  return (
    <Container>
      <Typography>
        {interview.interview_id}
      </Typography>
      <Typography>
        {interview.title}
      </Typography>
      <Typography>
        {interview.description}
      </Typography>
      <PieChart title={"Eye Contact"} data={eye_contact}/>

    </Container>

  );
}

export async function getServerSideProps(context) {
  let interview = {};
  const { id } = context.query;
  try {
    //interview = await getInterview(id);
    interview = {
      interiew_id: 1,
      title: 'Interview Title',
      description: 'Interview Description',
    }
  } catch (err) {
    console.log(err.message);
  }
  return {
    props: {
      interview,
    },
  };
}
