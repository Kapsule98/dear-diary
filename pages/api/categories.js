import nextConnect from "next-connect";
import middleware from "@/middleware/database";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req,res) => {
  let doc = await req.db.collection("categories").find({}).toArray();
  console.log(doc);
  res.json(doc);
});

handler.post(async (req,res) => {
  let alreadyExists = await req.db.collection("categories").find({"title":req.body.title}).toArray();
  if (alreadyExists.length !== 0) {
    res.json("Category already exists")
    return;
  }
  let doc = await req.db.collection("categories").insertOne({
    title:req.body.title
  })
  return res.json(doc)

})

export default handler;