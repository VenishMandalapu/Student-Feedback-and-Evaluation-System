import { Request, Response, NextFunction } from 'express';
import prisma from '../config/database';
import { createError } from '../middleware/errorHandler';

// Get all students
export const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { department, year, semester, page = 1, limit = 50 } = req.query;

    const where: any = {};
    if (department) where.department = department;
    if (year) where.year = parseInt(year as string);
    if (semester) where.semester = parseInt(semester as string);

    const students = await prisma.student.findMany({
      where,
      skip: (parseInt(page as string) - 1) * parseInt(limit as string),
      take: parseInt(limit as string),
      orderBy: { name: 'asc' }
    });

    const total = await prisma.student.count({ where });

    res.status(200).json({
      status: 'success',
      data: {
        students,
        pagination: {
          page: parseInt(page as string),
          limit: parseInt(limit as string),
          total,
          pages: Math.ceil(total / parseInt(limit as string))
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get student by ID
export const getStudentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const student = await prisma.student.findUnique({
      where: { id },
      include: {
        enrollments: {
          include: {
            course: true
          }
        }
      }
    });

    if (!student) {
      throw createError('Student not found', 404);
    }

    res.status(200).json({
      status: 'success',
      data: { student }
    });
  } catch (error) {
    next(error);
  }
};

// Create student
export const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, rollNo, department, year, semester, userId } = req.body;

    const student = await prisma.student.create({
      data: {
        userId,
        name,
        email,
        rollNo,
        department,
        year,
        semester
      }
    });

    res.status(201).json({
      status: 'success',
      message: 'Student created successfully',
      data: { student }
    });
  } catch (error) {
    next(error);
  }
};

// Update student
export const updateStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const student = await prisma.student.update({
      where: { id },
      data: updateData
    });

    res.status(200).json({
      status: 'success',
      message: 'Student updated successfully',
      data: { student }
    });
  } catch (error) {
    next(error);
  }
};

// Delete student
export const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    await prisma.student.delete({
      where: { id }
    });

    res.status(200).json({
      status: 'success',
      message: 'Student deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
