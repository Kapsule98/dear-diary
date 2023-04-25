import nextConnect from "next-connect";
import middleware from "@/middleware/database";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req,res) => {
  const dateToday = new Date()
  const query = {
    "type":"TASK",
    "state":{$ne:"DONE"},
    "date": {$lt : dateToday},
  }
  const update = {
    $set: {
      "date": dateToday
    }
  }
  const obj = await req.db.collection("dailyDiary").updateMany(query,update)
  res.json(obj)
})

export default handler;