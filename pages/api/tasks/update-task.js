import nextConnect from "next-connect";
import middleware from "@/middleware/database";
import { ObjectId } from "mongodb";

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req,res) => {
  const taskId = req.body._id
  let doc = await req.db.collection("dailyDiary").updateOne({_id:new ObjectId(taskId)},{
    $set: {
      state:"DONE",
      doneTime:new Date()
    }
  })
  console.log(doc);
  res.json(doc);
});



export default handler