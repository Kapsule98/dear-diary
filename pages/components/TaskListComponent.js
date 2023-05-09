import { Accordion, AccordionActions, AccordionSummary, AccordionDetails, Button } from "@mui/material";
import { Done, ExpandMore } from "@mui/icons-material";

const TaskListComponent = (props) => {
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
    fetch(url,requestOptions)
    .then(response => response.json())
    .then(res => {
      console.log(res)
    })
  }
  return (
    <div>
      {
        taskList.map((task, index) => (
          <Accordion>
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