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
  let doc = await req.db.collection("dailyDiary").find({"date":{$gte : date, $lt : nextDate}}).toArray();
  console.log(doc);
  res.json(doc);
});



export default handler