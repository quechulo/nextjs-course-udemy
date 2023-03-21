import fs from "fs";
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

function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;

    const newUser = {
      email: email,
    };

    const data = getData();

    const duplicate = data.find((userLog) => userLog.email === email);

    if (!duplicate) {
      data.push(newUser);
      updateData(data);
      res.status(201).json({ message: "Success", user: newUser });
    } else {
      res.status(409).json({ message: "Email already in database" });
    }
  }
  if (req.method === "GET") {
    const data = getData();
    res.status(200).json({ newsletter: data });
  }
}

export default handler;
