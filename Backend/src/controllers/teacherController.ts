import { Request, Response, NextFunction } from 'express';
import prisma from '../config/database';
import { createError } from '../middleware/errorHandler';

// Get all teachers
export const getAllTeachers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { department } = req.query;

    const where: any = {};
    if (department) where.department = department;

    const teachers = await prisma.teacher.findMany({
      where,
      include: {
        courses: true
      },
      orderBy: { name: 'asc' }
    });

    res.status(200).json({
      status: 'success',
      data: { teachers }
    });
  } catch (error) {
    next(error);
  }
};

// Get teacher by ID
export const getTeacherById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const teacher = await prisma.teacher.findUnique({
      where: { id },
      include: {
        courses: {
          include: {
            enrollments: true
          }
        }
      }
    });

    if (!teacher) {
      throw createError('Teacher not found', 404);
    }

    res.status(200).json({
      status: 'success',
      data: { teacher }
    });
  } catch (error) {
    next(error);
  }
};

// Create, update, delete functions similar to studentController
export const createTeacher = async (_req: Request, res: Response, _next: NextFunction) => {
  res.status(501).json({ status: 'error', message: 'Not implemented yet' });
};

export const updateTeacher = async (_req: Request, res: Response, _next: NextFunction) => {
  res.status(501).json({ status: 'error', message: 'Not implemented yet' });
};

export const deleteTeacher = async (_req: Request, res: Response, _next: NextFunction) => {
  res.status(501).json({ status: 'error', message: 'Not implemented yet' });
};
