import { Router } from "express";
import { verifyjwt } from "../middleswares/auth.middlesware.js";
import { createToDo, deleteToDO, getToDoById, updateToDo } from "../controllers/lists.controller.js";

const router = Router()

router.use(verifyjwt)

router.route("/create/:userId").post(createToDo)

router.route("/update/:listId").patch(updateToDo)

router.route("/delete/:listId").delete(deleteToDO)

router.route("/getList").post(getToDoById)






export default router