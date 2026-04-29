import express from "express";
import {
  createOrder,
  getOrders,
  markDelivered,
} from "../controllers/orderController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// USER
router.post("/", createOrder);

//  ADMIN
router.get("/", protect, admin, getOrders);
router.put("/:id/deliver", protect, admin, markDelivered);

export default router;