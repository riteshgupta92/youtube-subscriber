import { Router } from "express";
import {
  getAllSubscribers,
  getSubscriberById,
  getSubscribersNames,
} from "../controller/subscriber.controller.js";

const router = Router();

router.route("/").get(getAllSubscribers);
router.route("/names").get(getSubscribersNames);
router.route("/:id").get(getSubscriberById);

export default router;
