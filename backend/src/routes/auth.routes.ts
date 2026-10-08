import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { authMiddleware } from '../middleware/auth.middleware';
import { csrfMiddleware } from '../middleware/csrf.middleware';
import {
    csrfToken,
    deleteSession,
    login,
    logout,
    logoutAll,
    me,
    refresh,
    register,
    resetPassword,
    restore,
    sessions,
    changePassword,
    updateMe,
} from '../controllers/auth.controller';

const router = Router();

router.post('/register', asyncHandler(register));
router.post('/login', asyncHandler(login));
router.get('/csrf-token', csrfToken);

router.post('/refresh', csrfMiddleware, asyncHandler(refresh));
router.post('/logout', csrfMiddleware, asyncHandler(logout));
router.post('/logout-all', csrfMiddleware, authMiddleware, asyncHandler(logoutAll));

router.get('/sessions', authMiddleware, asyncHandler(sessions));
router.delete('/sessions/:id', csrfMiddleware, authMiddleware, asyncHandler(deleteSession));

router.get('/me', authMiddleware, asyncHandler(me));
router.patch('/me', csrfMiddleware, authMiddleware, asyncHandler(updateMe));
router.post('/restore', asyncHandler(restore));
router.post('/reset-password', asyncHandler(resetPassword));
router.post('/change-password', csrfMiddleware, authMiddleware, asyncHandler(changePassword));

export default router;
