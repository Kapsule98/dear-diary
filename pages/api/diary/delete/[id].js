import nextConnect from "next-connect";
import middleware from "@/middleware/database";
import { ObjectId } from 'bson'; 

const handler = nextConnect();

handler.use(middleware);

handler.delete(async (req,res) => {
  const id =  req.query.id
  const doc = req.db.collection("dailyDiary").deleteOne({_id:new ObjectId(id)})
  return res.json(doc)
})

export default handler