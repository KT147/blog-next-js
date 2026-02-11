import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      return res.status(422).json({ message: "Invalid Input." });
    }

    const newMessage = {
      email,
      name,
      message,
    };

    let client;

    try {
      client = await MongoClient.connect(
        "mongodb+srv://kevinkirjutabkoodi_db_user:VE8IVbg8BxuJOuTx@cluster0.nmb4uc9.mongodb.net/my-site?appName=Cluster0"
      );
    } catch (err) {
      res.status(500).json({ message: "Could not connect to database" });
    }

    const db = client.db("my-site");

    try {
      const result = await db.collection("messages").insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (err) {
      client.close();
      res.status(500).json({ message: "Storing message failed" });
      return;
    }

    client.close();

    console.log(newMessage);
    res
      .status(201)
      .json({ message: "Successfully stored message", message: newMessage });
  }
}
