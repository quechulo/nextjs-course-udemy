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
  } else {
    throw Error( "Email already in use: " + document.email );
  }
}

async function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;

    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connection to database failed!" });
      return;
    }

    try {
      await insertDocument(client, { email: email });
      res.status(201).json({ message: 'Signed up!' })
      
    } catch (error) {
      if (error.message) {
        res.status(500).json({ message: error.message });
      }
      res.status(500).json({ message: "Inserting failed!" });
      return;
    }
    client.close();
  }

  if (req.method === "GET") {
    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connection to database failed!" });
      return;
    }
    try {
      const db = client.db();
      const documents = await db.collection("emails").find().toArray();
      res.status(201).json({ emails: documents });
    } catch (error) {
      res.status(500).json({ message: "Reading from database failed!" });
      return;
    }

    client.close();
  }
}

export default handler;
