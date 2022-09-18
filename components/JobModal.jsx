import React, { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { callAddJob } from 'utils/requests';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const updateTitle = (event) => {
    setTitle(event.currentTarget.value);
  };

  const updateDescription = (event) => {
    setDescription(event.currentTarget.value);
  };


  const addJob = async (e) => {
    e.preventDefault();
    let username = localStorage.getItem('username')
    let good = await callAddJob(username, title, description)
    if (good) {
      handleClose()
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Wrong Code',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }

  }

  return (
    <div>
      <Button variant="contained" onClick={handleOpen} endIcon={<AddCircleIcon/>}>Add Job</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              New Job
            </Typography>
            <Box>
              <Typography variant="h6" sx={{py: 2}}>Job Title</Typography>
              <TextField label="Enter Job Title" onChange={(e) => updateTitle(e)}>
              </TextField>
            </Box>
            <Box>
              <Typography variant="h6" sx={{py: 2}}>Job Description</Typography>
              <TextField label="Paste Job Description" onChange={(e) => updateDescription(e)}>
              </TextField>
            </Box>
            <Box sx={{py: 2}}>
              <Button variant="contained" onClick={(e) => addJob(e)}>
                Add
              </Button>
              <Button variant="contained" color="error" sx={{mx:2}} onClick={(e) => handleClose()}>
                Cancel
              </Button>
            </Box>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
