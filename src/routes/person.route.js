import express from "express";
import authToken from "../middleware/auth.middleware.js";
import personController from "../controllers/person.controller.js";

const router = express.Router();



router.get('/', authToken, personController.getPerson);

router.post('/', authToken, personController.postPerson);

router.put('/:id', authToken, personController.editPerson);
router.delete('/:id', authToken, personController.deletePerson);


export default router;