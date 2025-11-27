import React from 'react';
import { BarChart3, TrendingUp, Users, Star } from 'lucide-react';
import Chart from '../shared/Chart';
import { courses, analytics } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

const ViewResults = () => {
  const { currentUser } = useApp();
  
  const studentCourses = courses.filter(course => 
    course.students.includes(currentUser?.id || '')
  );

  const courseAnalytics = analytics.slice(0, 3);

  const satisfactionData = [
    { label: 'Excellent', value: 45 },
    { label: 'Good', value: 30 },
    { label: 'Average', value: 18 },
    { label: 'Below Average', value: 5 },
    { label: 'Poor', value: 2 }
  ];

  const courseRatingsData = [
    { label: 'AI', value: 4.5 },
    { label: 'CN', value: 4.2 },
    { label: 'FF', value: 4.8 },
    { label: 'DBMS', value: 4.1 },
    { label: 'OOP', value: 4.3 }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Feedback Results</h1>
        <p className="text-gray-600 mt-2">Aggregated feedback results for transparency and continuous improvement</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Overall Satisfaction', value: '4.3/5', icon: Star, color: 'text-yellow-600' },
          { label: 'Response Rate', value: '87%', icon: Users, color: 'text-green-600' },
          { label: 'Total Responses', value: '1,245', icon: BarChart3, color: 'text-blue-600' },
          { label: 'Improvement Score', value: '+12%', icon: TrendingUp, color: 'text-purple-600' }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <Icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Chart
          type="pie"
          title="Overall Student Satisfaction"
          data={satisfactionData}
          className="shadow-sm border border-gray-100"
        />
        
        <Chart
          type="bar"
          title="Course Ratings (Average)"
          data={courseRatingsData}
          className="shadow-sm border border-gray-100"
        />
      </div>

      {/* Course-wise Results */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Your Course Results</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {studentCourses.map((course) => {
            const courseAnalytic = courseAnalytics.find(a => a.courseId === course.id);
            const rating = courseAnalytic?.averageRating || 4.0;
            const responseRate = courseAnalytic?.responseRate || 80;
            
            return (
              <div key={course.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{course.name}</h3>
                    <p className="text-sm text-gray-500">{course.code}</p>
                  </div>
                  <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-medium">
                    {course.semester}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Average Rating</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="font-medium">{rating}/5</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Response Rate</span>
                    <span className="font-medium">{responseRate}%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Instructor</span>
                    <span className="font-medium text-sm">{course.teacher}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Student Feedback</span>
                    <span className="text-green-600 font-medium">Positive</span>
                  </div>
                  <div className="mt-2 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(rating / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Comments */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Student Comments</h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          {[
            {
              course: 'Computer Network',
              comment: 'Great practical examples and clear explanations of complex concepts.',
              rating: 5,
              date: '2 days ago'
            },
            {
              course: 'Frontend Frameworks',
              comment: 'Hands-on approach really helped in understanding React concepts.',
              rating: 5,
              date: '3 days ago'
            },
            {
              course: 'Artificial Intelligence',
              comment: 'Could use more real-world case studies, but overall excellent content.',
              rating: 4,
              date: '1 week ago'
            }
          ].map((comment, index) => (
            <div key={index} className={`p-6 ${index !== 2 ? 'border-b border-gray-100' : ''}`}>
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900">{comment.course}</h4>
                <div className="flex items-center space-x-1">
                  {[...Array(comment.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                  <span className="text-sm text-gray-500 ml-2">{comment.date}</span>
                </div>
              </div>
              <p className="text-gray-600">{comment.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewResults;
