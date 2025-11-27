import React, { useState } from 'react';
import { Star, ThumbsUp, MessageSquare, BookOpen } from 'lucide-react';
import { courses } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

const GiveFeedback = () => {
  const { currentUser } = useApp();
  const [selectedCourse, setSelectedCourse] = useState('');
  const [ratings, setRatings] = useState({
    content: 0,
    teaching: 0,
    difficulty: 5
  });
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const studentCourses = courses.filter(course => 
    course.students.includes(currentUser?.id || '')
  );

  const handleStarRating = (category, rating) => {
    setRatings(prev => ({ ...prev, [category]: rating }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCourse) return;
    
    // Simulate submission
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <ThumbsUp className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-green-800 mb-2">Feedback Submitted!</h2>
          <p className="text-green-600 mb-6">
            Thank you for your valuable feedback. It helps us improve the learning experience.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setSelectedCourse('');
              setRatings({ content: 0, teaching: 0, difficulty: 5 });
              setFeedback('');
            }}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Submit Another Feedback
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Course Feedback</h1>
        <p className="text-gray-600 mt-2">Share your experience and help improve the courses</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Course Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Course
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {studentCourses.map((course) => (
                <button
                  key={course.id}
                  type="button"
                  onClick={() => setSelectedCourse(course.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedCourse === course.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <BookOpen className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div className="text-left">
                      <h3 className="font-medium text-gray-900">{course.name}</h3>
                      <p className="text-sm text-gray-500">{course.code}</p>
                      <p className="text-sm text-gray-500">{course.teacher}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {selectedCourse && (
            <>
              {/* Course Content Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  How would you rate the course content?
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleStarRating('content', star)}
                      className="p-1"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= ratings.content
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-3 text-sm text-gray-600">
                    {ratings.content > 0 ? `${ratings.content} out of 5` : 'Not rated'}
                  </span>
                </div>
              </div>

              {/* Teaching Quality Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  How would you rate the instructor's teaching?
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleStarRating('teaching', star)}
                      className="p-1"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= ratings.teaching
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-3 text-sm text-gray-600">
                    {ratings.teaching > 0 ? `${ratings.teaching} out of 5` : 'Not rated'}
                  </span>
                </div>
              </div>

              {/* Difficulty Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Course Difficulty Level: {ratings.difficulty}/10
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={ratings.difficulty}
                  onChange={(e) => setRatings(prev => ({ ...prev, difficulty: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>Very Easy</span>
                  <span>Very Difficult</span>
                </div>
              </div>

              {/* Written Feedback */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Additional Comments (Optional)
                </label>
                <div className="relative">
                  <MessageSquare className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={4}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Share your thoughts on how this course could be improved..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!selectedCourse || ratings.content === 0 || ratings.teaching === 0}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  Submit Feedback
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default GiveFeedback;
