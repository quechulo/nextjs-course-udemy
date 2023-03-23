import fs from "fs";
import { MongoClient } from "mongodb";
import path from "path";
import { password } from "../../passwords";

async function connectDatabase() {
  return await MongoClient.connect(
    `mongodb+srv://dbAdmin:${password}@cluster23.w305vlv.mongodb.net/newsletter?retryWrites=true&w=majority`
  );
}

async function insertDocument(client, document) {
  const db = client.db();

  const documents = await db
    .collection("emails")
    .find({ email: document.email })
    .toArray();

  if (documents.length < 1) {
    await db.collection("emails").insertOne(document);
    res.status(201).json({ message: "Signed Up!", document });
  } else {
    res.status(401).json({ message: "Email already in use", document });
  }
}

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
  if (req.method === "POST") {
    const email = req.body.email;

    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: 'Connection to database failed!' });
      return;
    }
    
    try {
      await insertDocument(client, { email: email });
      client.close();
    } catch (error) {
      res.status(500).json({ message: 'Inserting failed!' });
      return;
    }
    

    // const newUser = {
    //   email: email,
    // };

    // const data = getData();
    // const documents = await db
    //   .collection("emails")
    //   .find({ email: email })
    //   .toArray();

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
    const client = await connectDatabase();
    const db = client.db();
    
    const documents = await db.collection("emails").find().toArray();

    res.status(201).json({ emails: documents });

    // res.status(201).json({ message: "Signed Up!" });
    // res.status(200).json({ newsletter: data });
    client.close();
  }

  
}

export default handler;
