

import React, { useState } from 'react';
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Button} from '@mui/material';
import {Dialog, DialogTitle, DialogActions,DialogContent,DialogContentText} from '@mui/material';
import {TextField} from '@mui/material';
import {RadioGroup} from '@mui/material';
import {FormControl} from '@mui/material';
import {FormLabel} from '@mui/material';
import {FormControlLabel} from '@mui/material';
import {Radio} from '@mui/material';


const Diary = () => {

  const [date,setDate] = useState(new Date())
  const [open,setOpen] = useState(false)
  const [entryDate,setEntryDate] = useState(new Date())
  const [entryType,setEntryType] = useState("TASK")
  const [entryTitle, setEntryTitle] = useState("")
  const [entryDescription, setEntryDescription] = useState("")

  const fetchDiary = (date) => {

    console.log("Fetch diary ", date)
    const isoDate = date.toISOString().split("T")[0];
    const url = "/api/diary/" + isoDate
    console.log("Fetch url = ", url)
    fetch(url)
    .then(response => response.json())
    .then(res => {
      console.log("res = ", res)
    })
    return date

  }
  const submitEntry = ()=> {
    console.log("new entry submit")
    console.log(entryType)
    console.log(entryDate)
    console.log(entryTitle)
    console.log(entryDescription)
    const reqBody = {
      "title":entryTitle,
      "description":entryDescription,
      "type":entryType,
      "date":entryDate.toISOString().split("T")[0],
      "state":"CREATED"
    }
    console.log(reqBody)
    const url = "/api/diary"
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reqBody)
    }
    fetch(url,requestOptions)
    .then(response => response.json())
    .then(res => {
      console.log(res)
    })
    setOpen(false)
  }

  return (
    <div>
      <p>Date</p>
      <div>
        <ReactDatePicker selected = {date} onChange = {(date) => fetchDiary(date)}/>
      </div>
      <div>
        <Button variant="contained" size="small" onClick={()=>setOpen(true)}>+</Button>
      </div>

      <Dialog open={open} onClose={()=>setOpen(false)}>
        <DialogTitle>New entry</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create a new entry, entry can either be a TASK or it can be a NOTE
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="entryTitle"
            label="title"
            type="text"
            fullWidth
            variant="standard"
            value={entryTitle}
            onChange={(e)=>setEntryTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            id="entryDescription"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={entryDescription}
            onChange={(e)=>setEntryDescription(e.target.value)}
          />
          <ReactDatePicker selected = {entryDate} onChange = {(d) => setEntryDate(d)}/>

          <FormControl>
            <FormLabel id="entryType">Type</FormLabel>
            <RadioGroup
              aria-labelledby="entryType"
              name="entryTypeRadio"
              value={entryType}
              onChange={(event) => setEntryType(event.target.value)}
            >
              <FormControlLabel value="TASK" control={<Radio />} label="Task" />
              <FormControlLabel value="NOTE" control={<Radio />} label="Note" />
            </RadioGroup>
          </FormControl>
          

        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpen(false)}>Cancel</Button>
          <Button onClick={submitEntry }>Submit</Button>
        </DialogActions>
      </Dialog>


    </div>
  );
}
 
export default Diary;