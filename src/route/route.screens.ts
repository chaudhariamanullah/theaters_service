import { Router } from "express";
import theaterScreenController from "../controller/controller.screens.js";

const router = Router({ mergeParams: true });

router.get("/",theaterScreenController.findAll);
router.post("/",theaterScreenController.add);
router.get("/:theater_screen_public_id",theaterScreenController.findOne);
router.patch("/:theater_screen_public_id",theaterScreenController.edit);
router.delete("/:theater_screen_public_id",theaterScreenController.remove);
export default router;