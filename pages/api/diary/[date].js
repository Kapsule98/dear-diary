import nextConnect from "next-connect";
import middleware from "@/middleware/database";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req,res) => {
  const date = new Date(req.query.date);
  var nextDate = new Date(date)
  nextDate.setDate(date.getDate() + 1)
  console.log("diary get date" + date)
  console.log("next date ", nextDate)
  const notes = {"type":"NOTE"}
  const tasks = {"date":{$lt : nextDate}, "type":"TASK", "state":{$ne:"DONE"}}
  const doneTasks = {"date":{$gte:date, $lt : nextDate}, "type":"TASK", "state":"DONE"}
  let doc = await req.db.collection("dailyDiary").find({$or:[notes,tasks,doneTasks]}).toArray();
  console.log(doc);
  res.json(doc);
});



export default handler