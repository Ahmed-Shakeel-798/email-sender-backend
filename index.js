require("dotenv").config();

const express = require("express");

const emailSender = require("./node-mailer");


const app = express();
const port = process.env.PORT;

app.use(express.json());

app.post("/", async (req, res) => {
  try {
    const isSent = await emailSender(req.body);
    if (isSent) {
      res.status(200).send({message: "Email sent"});
    } else {
      res.status(500).send({message: "Please try again"});
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({message: error.message});
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
