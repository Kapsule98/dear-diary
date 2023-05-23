import { Card,CardContent } from "@mui/material";

const NotesComponent = ({notes}) => {
  return (<>
    {
      notes && notes.map((task, index) => (
        <Card variant="outlined" key={index}>
          <CardContent>
            {task.title} <br/>
            {task.description}
          </CardContent>
        </Card>
      ))
    }
  </>);
}
 
export default NotesComponent;