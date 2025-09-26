import React from 'react';
import { Lightbulb, TrendingUp, Users, BookOpen, Target, CheckCircle } from 'lucide-react';
import { courses } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

const ImprovementSuggestions: React.FC = () => {
  const { currentUser } = useApp();
  
  const teacherCourses = courses.filter(course => 
    course.teacherId === currentUser?.id
  );

  const suggestions = [
    {
      category: 'Teaching Methods',
      icon: BookOpen,
      color: 'bg-blue-500',
      items: [
        {
          title: 'Interactive Learning Activities',
          description: 'Incorporate more hands-on exercises and group discussions to improve engagement.',
          impact: 'High',
          effort: 'Medium'
        },
        {
          title: 'Visual Learning Aids',
          description: 'Use more diagrams, flowcharts, and visual representations for complex concepts.',
          impact: 'Medium',
          effort: 'Low'
        },
        {
          title: 'Real-world Case Studies',
          description: 'Include industry examples and practical applications to make content more relevant.',
          impact: 'High',
          effort: 'Medium'
        }
      ]
    },
    {
      category: 'Student Engagement',
      icon: Users,
      color: 'bg-green-500',
      items: [
        {
          title: 'Regular Check-ins',
          description: 'Implement quick polls or quizzes during lectures to gauge understanding.',
          impact: 'Medium',
          effort: 'Low'
        },
        {
          title: 'Peer Learning',
          description: 'Facilitate peer-to-peer learning sessions and study groups.',
          impact: 'High',
          effort: 'Medium'
        },
        {
          title: 'Office Hours Enhancement',
          description: 'Extend office hours and offer online consultation sessions.',
          impact: 'Medium',
          effort: 'High'
        }
      ]
    },
    {
      category: 'Course Structure',
      icon: Target,
      color: 'bg-purple-500',
      items: [
        {
          title: 'Modular Content Design',
          description: 'Break down complex topics into smaller, digestible modules.',
          impact: 'High',
          effort: 'High'
        },
        {
          title: 'Progressive Difficulty',
          description: 'Structure assignments with gradually increasing complexity.',
          impact: 'Medium',
          effort: 'Medium'
        },
        {
          title: 'Learning Objectives',
          description: 'Clearly define and communicate learning outcomes for each session.',
          impact: 'Medium',
          effort: 'Low'
        }
      ]
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-red-100 text-red-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'High': return 'bg-red-100 text-red-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Teaching Improvement Insights</h1>
        <p className="text-gray-600 mt-2">Personalized suggestions based on student feedback analysis</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Active Courses', value: teacherCourses.length, icon: BookOpen, color: 'text-blue-600' },
          { label: 'Suggestions', value: '9', icon: Lightbulb, color: 'text-yellow-600' },
          { label: 'Implemented', value: '4', icon: CheckCircle, color: 'text-green-600' },
          { label: 'Rating Improvement', value: '+0.3', icon: TrendingUp, color: 'text-purple-600' }
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

      {/* Improvement Suggestions */}
      <div className="space-y-8">
        {suggestions.map((section, sectionIndex) => {
          const Icon = section.icon;
          return (
            <div key={sectionIndex}>
              <div className="flex items-center space-x-3 mb-6">
                <div className={`${section.color} w-10 h-10 rounded-lg flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">{section.category}</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">Impact:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(item.impact)}`}>
                          {item.impact}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">Effort:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEffortColor(item.effort)}`}>
                          {item.effort}
                        </span>
                      </div>
                    </div>

                    <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                      Mark as Implemented
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Course-specific Insights */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Course-specific Insights</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {teacherCourses.slice(0, 4).map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{course.name}</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Students want more practical examples</p>
                    <p className="text-xs text-gray-500">Based on 15 feedback responses</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Excellent explanation clarity rated highly</p>
                    <p className="text-xs text-gray-500">Maintain current teaching style</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Consider faster pace for advanced topics</p>
                    <p className="text-xs text-gray-500">Suggestion from top performers</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Items */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Next Steps</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-5 h-5 text-blue-600" />
              <h4 className="font-medium text-gray-900">This Week</h4>
            </div>
            <p className="text-sm text-gray-600">Implement visual aids in 2 courses</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="w-5 h-5 text-green-600" />
              <h4 className="font-medium text-gray-900">This Month</h4>
            </div>
            <p className="text-sm text-gray-600">Start peer learning sessions</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <h4 className="font-medium text-gray-900">Long Term</h4>
            </div>
            <p className="text-sm text-gray-600">Restructure course modules</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImprovementSuggestions;