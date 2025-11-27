import { Request, Response, NextFunction } from 'express';
import prisma from '../config/database';
import { createError } from '../middleware/errorHandler';

// Get all feedback forms
export const getAllFeedbackForms = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { courseId } = req.query;

    const where: any = {};
    if (courseId) where.courseId = courseId;

    const forms = await prisma.feedbackForm.findMany({
      where,
      include: {
        course: true,
        questions: true
      },
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json({
      status: 'success',
      data: { forms }
    });
  } catch (error) {
    next(error);
  }
};

// Create feedback form
export const createFeedbackForm = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { courseId, title, deadline, questions } = req.body;

    const form = await prisma.feedbackForm.create({
      data: {
        courseId,
        title,
        deadline: new Date(deadline),
        questions: {
          create: questions.map((q: any, index: number) => ({
            type: q.type,
            question: q.question,
            required: q.required,
            order: index + 1
          }))
        }
      },
      include: {
        questions: true
      }
    });

    res.status(201).json({
      status: 'success',
      message: 'Feedback form created successfully',
      data: { form }
    });
  } catch (error) {
    next(error);
  }
};

// Submit feedback
export const submitFeedback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { feedbackFormId, studentId, answers } = req.body;

    // Check if already submitted
    const existing = await prisma.feedbackSubmission.findUnique({
      where: {
        feedbackFormId_studentId: {
          feedbackFormId,
          studentId
        }
      }
    });

    if (existing) {
      throw createError('Feedback already submitted', 400);
    }

    const submission = await prisma.feedbackSubmission.create({
      data: {
        feedbackFormId,
        studentId,
        answers: {
          create: answers.map((a: any) => ({
            questionId: a.questionId,
            value: a.value
          }))
        }
      },
      include: {
        answers: true
      }
    });

    res.status(201).json({
      status: 'success',
      message: 'Feedback submitted successfully',
      data: { submission }
    });
  } catch (error) {
    next(error);
  }
};

// Get feedback results
export const getFeedbackResults = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { courseId } = req.params;

    const forms = await prisma.feedbackForm.findMany({
      where: { courseId },
      include: {
        questions: true,
        submissions: {
          include: {
            answers: true,
            student: {
              select: {
                name: true,
                rollNo: true
              }
            }
          }
        }
      }
    });

    // Calculate analytics
    const analytics = forms.map(form => {
      const totalSubmissions = form.submissions.length;
      const questionAnalytics = form.questions.map(question => {
        const answers = form.submissions.flatMap(s => 
          s.answers.filter(a => a.questionId === question.id)
        );

        if (question.type === 'RATING' || question.type === 'SLIDER') {
          const values = answers.map(a => parseFloat(a.value));
          const average = values.reduce((sum, val) => sum + val, 0) / values.length;
          return {
            questionId: question.id,
            question: question.question,
            type: question.type,
            average: average || 0,
            responses: values.length
          };
        } else {
          return {
            questionId: question.id,
            question: question.question,
            type: question.type,
            responses: answers.map(a => a.value)
          };
        }
      });

      return {
        formId: form.id,
        title: form.title,
        totalSubmissions,
        questionAnalytics
      };
    });

    res.status(200).json({
      status: 'success',
      data: { analytics }
    });
  } catch (error) {
    next(error);
  }
};
