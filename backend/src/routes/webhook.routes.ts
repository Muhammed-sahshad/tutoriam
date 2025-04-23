import express from "express";
import container from "../di/container";
import { IWebhookController } from "../core/interfaces/controller/IWebhookController";
import { TYPES } from "../di/types";
const router = express.Router();

const webhookController = container.get<IWebhookController>(TYPES.WebhookController);
router.post("/", express.raw({ type: "application/json" }), webhookController.handleStripeWebhook);

export default router;
