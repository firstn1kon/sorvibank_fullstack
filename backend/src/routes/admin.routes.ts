import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { authMiddleware } from '../middleware/auth.middleware';
import { csrfMiddleware } from '../middleware/csrf.middleware';
import { requireAdmin } from '../middleware/requireAdmin';
import {
    blockUser,
    getUser,
    getUsers,
    resetUserPassword,
    unblockUser,
    updateUser,
} from '../controllers/admin.controller';

const router = Router();

router.use(authMiddleware, requireAdmin);

router.get('/users', asyncHandler(getUsers));
router.get('/users/:id', asyncHandler(getUser));
router.patch('/users/:id', csrfMiddleware, asyncHandler(updateUser));
router.post('/users/:id/block', csrfMiddleware, asyncHandler(blockUser));
router.post('/users/:id/unblock', csrfMiddleware, asyncHandler(unblockUser));
router.post('/users/:id/reset-password', csrfMiddleware, asyncHandler(resetUserPassword));

export default router;
