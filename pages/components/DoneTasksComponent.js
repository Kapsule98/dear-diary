import { Accordion,AccordionSummary, AccordionDetails,Button } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { Done } from "@mui/icons-material";
import {Card,CardContent} from "@mui/material";

const DoneTasksComponent = (props) => {

  const doneTasks = props.doneList
  return ( 
    <div>
      {
        doneTasks && doneTasks.map((task, index) => (
          <Card variant="outlined" key={index}>
            <CardContent>
              {task.title} <br/>
              {task.description}
            </CardContent>
          </Card>
        ))
      }
    </div> 
  );
}
 
export default DoneTasksComponent;