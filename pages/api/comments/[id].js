import fs from "fs";

import { useRouter } from "next/router";
import path from "path";

function checkIfFileExists(id) {
  var fs = require("fs");
  const filePath = path.join(process.cwd(), "data", `${id}-comments.json`);
  if (fs.existsSync(filePath)) {
    console.log("file exists");
  } else {
    console.log("file not found!");
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
}

function getData(id) {
  const filePath = path.join(process.cwd(), "data", `${id}-comments.json`);
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}

function updateData(id, newData) {
  const filePath = path.join(process.cwd(), "data", `${id}-comments.json`);
  fs.writeFileSync(filePath, JSON.stringify(newData));
  return;
}

function handler(req, res) {
  if (req.method === "POST") {
    const id = req.body.id;
    const date = req.body.date;
    const email = req.body.email;
    const name = req.body.name;
    const comment = req.body.comment;

    if (
      email.trim() === "" ||
      !email.includes("@") ||
      name.trim() === "" ||
      comment.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input" });
      return;
    }



    const newComment = {
      id: id,
      date: new Date().toISOString(),
      email: email,
      name: name,
      comment: comment,
    };

    checkIfFileExists(id);
    const data = getData(id);

    data.push(newComment);
    updateData(id, data);
    res.status(201).json({ message: "Comment added", user: newComment });
  }

  if (req.method === "GET") {
    const { id } = req.query;
    checkIfFileExists(id);
    const data = getData(id);
    res.status(200).json({ comments: data });
  }
}

export default handler;
