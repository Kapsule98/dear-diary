import nextConnect from "next-connect";
import middleware from "@/middleware/database";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req,res) => {
  let doc = await req.db.collection("dailyDiary").findOne()
  console.log(doc);
  res.json(doc);
});

handler.post(async (req, res) => {
  let data = JSON.parse(req.body);
  let doc = await req.db.collection("dailyDiary").updateOne(data)
})

export default handler;