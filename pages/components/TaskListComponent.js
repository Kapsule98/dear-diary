import { useState } from "react";
import { Accordion, AccordionActions, AccordionSummary, AccordionDetails, Button } from "@mui/material";
import { Done, ExpandMore } from "@mui/icons-material";
import {CircularProgress} from '@mui/material';
import {Box} from '@mui/material';

const TaskListComponent = (props) => {

  const [loading,setLoading] = useState(false)

  const taskList = props.taskList
  const markDone = (taskId) => {
    console.log(taskId)
    const reqBody = {
      _id:taskId
    }
    const url = "/api/tasks/update-task"
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
      {
        taskList && taskList.map((task, index) => (
          <Accordion key={index}>
            <AccordionSummary 
              expandIcon={<ExpandMore />}
            >
              {task.title}
            </AccordionSummary>
            <AccordionDetails>
              {task.description}
              <div>
                <Button variant="contained" size="small" onClick={()=>markDone(task._id)}><Done/></Button>
              </div>
            </AccordionDetails>
          </Accordion>
        ))
      }
    </div>
  );
}
 
export default TaskListComponent;