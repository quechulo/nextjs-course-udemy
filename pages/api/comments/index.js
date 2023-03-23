import fs from "fs";
import path from "path";
import { MongoClient } from "mongodb";

async function connectDatabase() {
  return await MongoClient.connect(
    "mongodb+srv://dbAdmin:<password>@cluster23.w305vlv.mongodb.net/comments?retryWrites=true&w=majority"
  );
}

function getData() {
  const filePath = path.join(process.cwd(), "data", "comments.json");
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}

function updateData(newData) {
  const filePath = path.join(process.cwd(), "data", "comments.json");
  fs.writeFileSync(filePath, JSON.stringify(newData));
}

async function handler(req, res) {
  if (req.method === "POST") {
    const id = req.body.id;
    const email = req.body.email;
    const name = req.body.name;
    const comment = req.body.comment;

    const newComment = {
      id: id,
      email: email,
      name: name,
      comment: comment,
    };

    const data = getData();

    data.push(newComment);
    updateData(data);
    res.status(201).json({ message: "Success", user: newComment });
  }

  if (req.method === "GET") {
    const client = await connectDatabase();
    const db = client.db();
    
    const collections = await db.listCollections().toArray();
    const data = collections.map((collection) => (collection.name))
    const asyncRes = await Promise.all(data.map(async (name) => {
      return await db.collection(name).find().sort({_id: -1 }).toArray();
    }));

    res.status(201).json({ comments: asyncRes });
    // const data = getData();
    // res.status(200).json({ comments: data });
  }
}

export default handler;
