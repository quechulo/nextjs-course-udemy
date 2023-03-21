import fs from "fs";
import { MongoClient } from "mongodb";
import path from "path";

export function getData() {
  const filePath = path.join(process.cwd(), "data", "newsletter.json");
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}

export function updateData(newData) {
  const filePath = path.join(process.cwd(), "data", "newsletter.json");
  fs.writeFileSync(filePath, JSON.stringify(newData));
}

async function handler(req, res) {
  const client = await MongoClient.connect(
    "mongodb+srv://dbAdmin:BLyuBUu4CR@cluster23.w305vlv.mongodb.net/newsletter?retryWrites=true&w=majority"
  );

  if (req.method === "POST") {
    const email = req.body.email;

    // const newUser = {
    //   email: email,
    // };

    // const data = getData();
    // const documents = await db
    //   .collection("emails")
    //   .find({ email: email })
    //   .toArray();
    
    const db = client.db();

    const documents = await db.collection('emails').find({ email: email }).toArray();
    console.log("finded same docunets", documents);
    if(documents.length < 1) {
    await db.collection("emails").insertOne({ email: email });

    res.status(201).json({ message: "Signed Up!", email: email });
    } else {
      res.status(401).json({ message: "Email already in use", email: email });
    }
  }
    
    // const duplicate = data.find((userLog) => userLog.email === email);

    // if (!duplicate) {
    //   data.push(newUser);
    //   updateData(data);
    //   res.status(201).json({ message: "Success", user: newUser });
    // } else {
    //   res.status(409).json({ message: "Email already in database" });
    // }
  
  if (req.method === "GET") {
    // const data = getData();

    const db = client.db();

    const documents = await db.collection("emails").find().toArray();

    res.status(201).json({ emails: documents });

    // res.status(201).json({ message: "Signed Up!" });
    // res.status(200).json({ newsletter: data });
  }

  client.close();
}

export default handler;
