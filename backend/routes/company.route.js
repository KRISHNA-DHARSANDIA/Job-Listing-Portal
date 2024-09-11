import express from "express";
import isAuthenticated from "../middleware/authMiddleware.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controls/company.controller.js";
import { singleUpload } from "../middleware/mutler.js";

const router = express.Router();

router.route("/register").post(isAuthenticated,registerCompany);
router.route("/get").get(isAuthenticated,getCompany);
router.route("/get/:id").get(isAuthenticated,getCompanyById);
router.route("/update/:id").put(isAuthenticated,singleUpload, updateCompany);

export default router;
