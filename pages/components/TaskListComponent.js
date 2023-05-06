import { Accordion, AccordionActions, AccordionSummary, AccordionDetails, Button } from "@mui/material";
import { Done, ExpandMore } from "@mui/icons-material";

const TaskListComponent = (props) => {
  const taskList = props.taskList
  const markDone = (_id) => {
    console.log(_id)
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
      {/* <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{taskList[0]}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion> */}
    </div>
  );
}
 
export default TaskListComponent;