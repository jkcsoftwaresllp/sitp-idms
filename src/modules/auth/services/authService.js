// src/modules/auth/services/authService.js

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { eq } from 'drizzle-orm';
import { db } from '../../../shared/config/database.js';
import { users } from '../../../shared/schema/index.js';

export const signup = async (userData) => {
  const { name, email, password, role = 'user', phone } = userData;

  // Check if user already exists
  const existingUser = await db.select().from(users).where(eq(users.email, email));
  if (existingUser.length > 0) {
    throw new Error('User already exists with this email');
  }

  // Hash password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Insert user (NO `.returning()` in MySQL)
  const result = await db.insert(users).values({
    name,
    email,
    password: hashedPassword,
    role,
    phone
  });

  // Fetch newly inserted user using insertId
  const [newUser] = await db.select().from(users).where(eq(users.id, result.insertId));

  return newUser;
};

export const login = async (email, password) => {
  // Find user by email
  const [user] = await db.select().from(users).where(eq(users.email, email));
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Verify password
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error('Invalid email or password');
  }

  // Generate JWT token
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone
    }
  };
};
