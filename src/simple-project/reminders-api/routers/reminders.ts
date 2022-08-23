import { Router } from "express";
const router = Router();
import Reminder from "../models/reminder";

const reminders: Reminder[] = [];

router.get("/", (req, res) => {
  res.json(reminders);
});

interface CreateReminderDto {
  title: string;
}

router.post("/", (req, res) => {
  const { title } = req.body as CreateReminderDto;
  const reminder = new Reminder(title);
  reminders.push(reminder);
  res.status(201).json(reminder);
});

export default router;
