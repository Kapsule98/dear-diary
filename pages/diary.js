

import React, { useState, useEffect } from 'react';
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
import TaskListComponent from './components/TaskListComponent';
import DoneTasksComponent from './components/DoneTasksComponent';
import {CircularProgress} from '@mui/material';
import {Box} from '@mui/material';
import NotesComponent from './components/NotesComponent';


const Diary = () => {

  const [loading,setLoading] = useState(false)
  const [date,setDate] = useState(new Date())
  const [open,setOpen] = useState(false)
  const [entryDate,setEntryDate] = useState(new Date())
  const [entryType,setEntryType] = useState("TASK")
  const [entryTitle, setEntryTitle] = useState("")
  const [entryDescription, setEntryDescription] = useState("")
  const [taskList, setTaskList] = useState([])
  const [done, setDone]  = useState([])
  const [notes, setNotes] = useState([])

  const getTasks = (list) => {
    return list.filter((x)=>{return (x.type === "TASK" && x.state !== "DONE")})
  }

  const getDone = (list) => {
    return list.filter((x)=>{return (x.type === "TASK" && x.state === "DONE")})
  }

  const getNotes = (list) => {
    return list.filter((x) => {return x.type === "NOTE"})
  } 

  useEffect(()=> {
    setLoading(true);
    const isoDate = date.toISOString().split("T")[0];
    const url = "/api/diary/" + isoDate
    fetch(url)
    .then(response => response.json())
    .then(res => {
      setTaskList(getTasks(res))
      setDone(getDone(res))
      setNotes(getNotes(res))
      console.log("res = ", res)
    }).catch(err => alert("something went wrong" + err))
    .finally(()=>setLoading(false))
  }, [])

  const fetchDiary = (date) => {
    setDate(date)
    console.log("Fetch diary ", date)
    const isoDate = date.toISOString().split("T")[0];
    const url = "/api/diary/" + isoDate
    console.log("Fetch url = ", url)
    setLoading(true)
    fetch(url)
    .then(response => response.json())
    .then(res => {
      setTaskList(getTasks(res))
      setDone(getDone(res))
      console.log("res = ", res)
    })
    .catch(err => alert("something went wrong" + err))
    .finally(()=>setLoading(false))

    
    return date

  }

  const resetDialogInputs = () => {
    setEntryType("TASK")
    setEntryDate(new Date())
    setEntryTitle("")
    setEntryDescription("")
  }
  const submitEntry = ()=> {
    console.log("new entry submit")
    console.log(entryType)
    console.log(entryDate)
    console.log(entryTitle)
    console.log(entryDescription)
    if(entryTitle === "") {
      alert("title cant be empty bruh")
      return
    }
    resetDialogInputs()
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
    setLoading(true)
    fetch(url,requestOptions)
    .then(response => response.json())
    .then(res => {
      console.log(res)
    })
    .catch((err) => alert(err))
    .finally(()=>setLoading(false))
    setOpen(false)
  }
  if (loading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    )
  }
  return (
    <div>
      <p>Date</p>
      <div>
        <ReactDatePicker selected = {date} onChange = {(date) => fetchDiary(date)}/>
      </div>
      <TaskListComponent taskList={taskList}/>
      <p>Done</p>
      <DoneTasksComponent doneList={done} />
      <div>
        <p>Notes</p>
        <NotesComponent notes={notes} />
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