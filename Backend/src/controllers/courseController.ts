import { Request, Response, NextFunction } from 'express';
import prisma from '../config/database';

export const getAllCourses = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const courses = await prisma.course.findMany({
      include: {
        teachers: true,
        enrollments: true
      }
    });
    res.status(200).json({ status: 'success', data: { courses } });
  } catch (error) {
    next(error);
  }
};

export const getCourseById = async (_req: Request, res: Response, _next: NextFunction) => {
  res.status(501).json({ status: 'error', message: 'Not implemented yet' });
};

export const createCourse = async (_req: Request, res: Response, _next: NextFunction) => {
  res.status(501).json({ status: 'error', message: 'Not implemented yet' });
};

export const updateCourse = async (_req: Request, res: Response, _next: NextFunction) => {
  res.status(501).json({ status: 'error', message: 'Not implemented yet' });
};

export const deleteCourse = async (_req: Request, res: Response, _next: NextFunction) => {
  res.status(501).json({ status: 'error', message: 'Not implemented yet' });
};
