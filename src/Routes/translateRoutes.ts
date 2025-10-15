import { Router } from "express";
import { translateText } from "../controllers/translateController";

const router = Router();

router.post("/", translateText);

export default router;
