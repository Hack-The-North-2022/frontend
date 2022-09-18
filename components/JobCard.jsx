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

import { Typography } from '@mui/material';

export default function JobCard(props) {
  const { title, description, link, job_id } = props;
  const router = useRouter();

  return (
    <Card sx={{ width: 400, height: 350, m: 4, p:2 }}>
      <CardMedia
        component="img"
        height="140"
        image={link}
        alt="Job"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description.substring(0,150)}...
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Link href={`/job/${job_id}`}>
          <Button size="small">Learn More</Button>
        </Link>
      </CardActions>
    </Card>

  );
}
