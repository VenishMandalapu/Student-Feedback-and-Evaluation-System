import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../config/database';
import { generateToken } from '../utils/jwt';
import { createError } from '../middleware/errorHandler';

// Register new user
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, role, name, department, year, semester, rollNo } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      throw createError('User with this email already exists', 400);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: role || 'STUDENT'
      }
    });

    // Create role-specific record
    if (role === 'STUDENT' || !role) {
      await prisma.student.create({
        data: {
          userId: user.id,
          name,
          email,
          rollNo,
          department,
          year: parseInt(year),
          semester: parseInt(semester)
        }
      });
    } else if (role === 'TEACHER') {
      await prisma.teacher.create({
        data: {
          userId: user.id,
          name,
          email,
          department
        }
      });
    } else if (role === 'ADMIN') {
      await prisma.admin.create({
        data: {
          userId: user.id,
          name,
          email
        }
      });
    }

    // Generate token
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role
    });

    res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      data: {
        user: {
          id: user.id,
          email: user.email,
          role: user.role
        },
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

// Login user
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, role } = req.body;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        student: true,
        teacher: true,
        admin: true
      }
    });

    if (!user) {
      throw createError('Invalid email or password', 401);
    }

    // Check if role matches
    if (role && user.role !== role) {
      throw createError('Invalid credentials for this role', 401);
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw createError('Invalid email or password', 401);
    }

    // Generate token
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role
    });

    // Get role-specific data
    let userData: any = {
      id: user.id,
      email: user.email,
      role: user.role
    };

    if (user.student) {
      userData = { ...userData, ...user.student };
    } else if (user.teacher) {
      userData = { ...userData, ...user.teacher };
    } else if (user.admin) {
      userData = { ...userData, ...user.admin };
    }

    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      data: {
        user: userData,
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get current user
export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        student: true,
        teacher: true,
        admin: true
      }
    });

    if (!user) {
      throw createError('User not found', 404);
    }

    res.status(200).json({
      status: 'success',
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};
