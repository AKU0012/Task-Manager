import express from 'express'
const router = express.Router()

import { createTask, getAllTask, updateTask, deleteTask } from '../controllers/taskController.js';

router.route('/').post(createTask).get(getAllTask)
router.route('/:id').patch(updateTask).delete(deleteTask)

export default router