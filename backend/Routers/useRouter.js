
import {Router} from 'express';
import {gameProccess} from '../Controllers/gameController.js';
const router = Router();

router.route('/memoryGame').post(gameProccess);

export default router;