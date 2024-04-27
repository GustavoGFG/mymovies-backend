import { Router } from 'express';

import * as movies from '../controllers/movies.js';
import * as auth from '../controllers/auth.js';
import { privateRoute } from '../libs/passport.js';

const router = Router();
// DEFAULT
router.get('/', (req, res) => {
  res.send('Movies Database is Running');
});
// USER
router.post('/signup', auth.signup);
router.post('/login', auth.login);
// MOVIES
router.get('/towatch', privateRoute, movies.getAll);
router.post('/towatch', privateRoute, movies.add);
router.delete('/towatch/:name/:year', privateRoute, movies.remove);
export default router;
