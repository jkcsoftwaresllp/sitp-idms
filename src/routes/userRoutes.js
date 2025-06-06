// routes/userRoutes.js
import express from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../controller/userController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// ── CREATE ── (POST /api/users)
router.post('/', authenticateToken, createUser);

// ── READ ALL ── (GET /api/users)
router.get('/', authenticateToken, getAllUsers);

// ── READ ONE BY ID ── (GET /api/users/:id)
router.get('/:id', authenticateToken, getUserById);

// ── UPDATE ── (PUT /api/users/:id)
router.put('/:id', authenticateToken, updateUser);

// ── DELETE ── (DELETE /api/users/:id)
router.delete('/:id', authenticateToken, deleteUser);

export default router;
