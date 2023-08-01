import { Router } from 'express';
import produtoController from './produto.controller';
import isAdmin from '../../middlewares/isAdmin';
const router = Router();

router.get('/', produtoController.index);
// router.post('/', isAdmin, produtoController.create);
router.post('/', produtoController.create);
router.get('/:id', produtoController.read);
// router.put('/:id', isAdmin, produtoController.update);
router.put('/:id', produtoController.update);
// router.delete('/:id', isAdmin, produtoController.remove);
router.delete('/:id', produtoController.remove);

export default router;
