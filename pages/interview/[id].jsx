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
import BarGraph from 'components/charts/BarGraph'

import { Typography } from '@mui/material';

export default function Interview(props) {
  const { interview } = props;
  const router = useRouter();

  const eye_contact = [
    { name: 'Maintaining eye', value: 50*Math.random()},
    { name: 'Non-eye contact', value: 50*Math.random()}
  ]

  const key_words = [
    { name: 'Used key words', value: 20*Math.random()},
    { name: 'Non key words', value: 90*Math.random()}
  ]

  const looked = [
    { looked: 'Face', value: 20*Math.random()},
    { looked: 'Table', value: 6*Math.random()},
    { looked: 'Walls', value: 9*Math.random()},
    { looked: 'Floor', value: 5*Math.random()}
  ]

  const gibberish = [
    { name: 'Umms and ahhs', value: 10*Math.random()},
    { name: 'Useful words', value: 90*Math.random()}
  ]


  return (
    <Container>
      <Typography>
        {interview.interview_id}
      </Typography>

      <PieChart title={"Eye Contact"} data={eye_contact}/>
      <PieChart title={"Key words"} data={key_words}/>
      <PieChart title={"Gibberish"} data={gibberish}/>

      <BarGraph title={"Most Looked at Areas"} data={looked} name="looked"/>

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
