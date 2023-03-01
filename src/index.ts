require("dotenv").config();

import { faker } from "@faker-js/faker";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import getPCIPublicKey from "./circle/getPCIPublicKey";
import createCard from "./circle/createCard";
import createPayment from "./circle/createPayment";

const port = process.env.PORT || "8080";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "5mb" }));

app.get("/", (req, res) => {
  res.send("Alive");
});

app.get("/pci-public-key", async (req, res) => {
  const response = await getPCIPublicKey();
  res.send(response);
});

app.post("/create-card", async (req, res) => {
  const { keyId, encryptedData } = req.body;

  const params = {
    idempotencyKey: faker.datatype.uuid(),
    keyId,
    encryptedData,
    billingDetails: {
      name: faker.name.fullName(),
      city: faker.address.city(),
      country: "US",
      line1: faker.address.streetAddress(),
      district: "NY",
      postalCode: "10037",
    },
    expMonth: 12,
    expYear: 2026,
    metadata: {
      email: `founders+${Math.random()}@meshlink.ai`,
      sessionId: Math.random().toString(),
      ipAddress: "165.235.125.71",
    },
  };

  const card = await createCard(params);

  console.log({ card });

  res.send(card);
});

app.post("/create-payment", async (req, res) => {
  const { amount, cardId } = req.body;

  const params = {
    idempotencyKey: faker.datatype.uuid(),
    keyId: "keyId", // sandbox
    metadata: {
      email: `founders+${Math.random()}@meshlink.ai`,
      sessionId: Math.random().toString(),
      ipAddress: "165.235.125.71",
    },
    amount: {
      amount: amount,
      currency: "USD" as const,
    },
    verification: "none" as const,
    source: {
      id: cardId,
      type: "card" as const,
    },
  };

  const payment = await createPayment(params);
  console.log({ payment });

  res.send(payment);
});

app.post("/", (req, res) => {
  res.send({
    res: req.body.blah,
  });
});

app.listen(port, () => {
  console.log(`[Relayer]: Running on port: ${port}`);
});
