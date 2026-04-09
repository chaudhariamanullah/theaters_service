import { Router } from "express";
import theaterController from "../controller/controller.theatres.js";
import { upload } from "../config/multer.js";

const router = Router();

router.get("/city", theaterController.findAllByCity);
router.get("/",theaterController.findAll);
router.get("/:theater_public_id", theaterController.findOne);
router.post("/", upload.single("theaterImage"),theaterController.add);
router.patch("/:theater_public_id",upload.single("theaterImage"),theaterController.edit);
router.delete("/:theater_public_id", theaterController.remove);

export default router;
