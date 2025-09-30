import { Router, Request, Response } from "express";
import mongoose from "mongoose";

const router = Router();

// ✅ Seed data directly without schema
router.post("/seed", async (req: Request, res: Response) => {
  try {
    const seedData = req.body; // Expecting an array of objects

    if (!Array.isArray(seedData)) {
      return res.status(400).json({ message: "Request body must be an array" });
    }

    // Get the "courses" collection directly
    const collection = mongoose.connection.collection("seed");

    // Clear old data
    await collection.deleteMany({});

    // Insert new data
    const result = await collection.insertMany(seedData);

    res.status(201).json({ message: " seeded", data: result });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get all courses
router.get("/getSeed", async (req: Request, res: Response) => {
  try {
    const collection = mongoose.connection.collection("seed");
    const seed= await collection.find({}).toArray();
    res.json(seed);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
