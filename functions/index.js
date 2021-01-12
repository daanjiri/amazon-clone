const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const stripe = require("stripe")(
  "sk_test_51I8YTRAku80oCRQE6F3nMQ1MF6PorN9AXQUTy2RzcNyZLMUAXKBDx2ShJ6D71ZkTyi3ZVtZm9umH3GIVC39hcYX900ccogsp4P"
);

//API

// App config
const app = express();
// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

//API routes

app.post("/", (req, res) => {
  res.status(200).send("funciona");
});

app.post("/payments/pagar", async (request, response) => {
  const total = request.query.total;

  console.log("payment request recieved boom!!!", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });
  // ok .created ==201
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

//Listen command
exports.api = functions.https.onRequest(app);

//http://localhost:5001/challenge-7df2f/us-central1/api
