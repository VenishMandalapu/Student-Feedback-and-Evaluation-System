import { Request, Response, NextFunction } from 'express';
import prisma from '../config/database';

// Get dashboard statistics
export const getDashboardStats = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const [
      totalStudents,
      totalTeachers,
      totalCourses,
      totalFeedbackForms,
      recentSubmissions
    ] = await Promise.all([
      prisma.student.count(),
      prisma.teacher.count(),
      prisma.course.count(),
      prisma.feedbackForm.count(),
      prisma.feedbackSubmission.findMany({
        take: 10,
        orderBy: { submittedAt: 'desc' },
        include: {
          student: {
            select: { name: true, rollNo: true }
          },
          feedbackForm: {
            select: { title: true }
          }
        }
      })
    ]);

    // Get department-wise student count
    const departmentStats = await prisma.student.groupBy({
      by: ['department'],
      _count: true
    });

    res.status(200).json({
      status: 'success',
      data: {
        stats: {
          totalStudents,
          totalTeachers,
          totalCourses,
          totalFeedbackForms
        },
        departmentStats,
        recentSubmissions
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get analytics
export const getAnalytics = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get feedback submission rate
    const totalForms = await prisma.feedbackForm.count({ where: { isActive: true } });
    const totalSubmissions = await prisma.feedbackSubmission.count();
    const totalStudents = await prisma.student.count();

    const responseRate = totalForms > 0 
      ? ((totalSubmissions / (totalForms * totalStudents)) * 100).toFixed(2)
      : 0;

    // Get course-wise enrollment
    const courseEnrollment = await prisma.course.findMany({
      select: {
        name: true,
        code: true,
        _count: {
          select: { enrollments: true }
        }
      },
      orderBy: {
        enrollments: {
          _count: 'desc'
        }
      },
      take: 10
    });

    res.status(200).json({
      status: 'success',
      data: {
        responseRate,
        courseEnrollment
      }
    });
  } catch (error) {
    next(error);
  }
};
