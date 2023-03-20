import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

export function getData() {
  const filePath = path.join(process.cwd(), "data", "feedback.json");
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}

function updateData(newData) {
  const filePath = path.join(process.cwd(), "data", "feedback.json");
  fs.writeFileSync(filePath, JSON.stringify(newData));
}

function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    const text = req.body.text;

    const newFeedback = {
      id: uuidv4(),
      email: email,
      feedback: text,
    };

    const data = getData();

    data.push(newFeedback);
    updateData(data);
    res.status(201).json({ message: "Success", feedback: newFeedback });
  }
  if (req.method === "GET") {
    const data = getData();
    res.status(200).json({ feedback: data });
  }
}

export default handler;
