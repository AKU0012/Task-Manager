import express from 'express'
const router = express.Router();

import { register, login, deleteUser} from '../controllers/authController.js';

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/delete').delete(deleteUser)

export default router