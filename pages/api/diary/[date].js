import nextConnect from "next-connect";
import middleware from "@/middleware/database";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req,res) => {
  const date = new Date(req.query.date);
  console.log("diary get date" + date)
  let doc = await req.db.collection("dailyDiary").find({"date":date}).toArray();
  console.log(doc);
  res.json(doc);
});



export default handler