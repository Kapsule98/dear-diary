import nextConnect from "next-connect";
import middleware from "@/middleware/database";

const handler = nextConnect();

handler.use(middleware);

// handler.get(async (req,res) => {
//   const date = req['date']
//   let doc = await req.db.collection("dailyDiary").find({"date":date}).toArray();
//   console.log(doc);
//   res.json(doc);
// });

handler.post(async (req, res) => {
  let data = req.body;
  if(!("date" in data)) {
    data["date"] = new Date().toJSON.slice(0,10);
  } else {
    data["date"] = new Date(data["date"])
  }
  data["createdAt"] = new Date();
  console.log(data)
  let doc = await req.db.collection("dailyDiary").insertOne(data);
  console.log(doc)
  return res.json(doc)
})



export default handler;