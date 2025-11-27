import React from 'react';

const Chart = ({ type, data, title, className = '' }) => {
  if (type === 'bar') {
    const maxValue = Math.max(...data.map((d) => d.value));
    
    return (
      <div className={`bg-white rounded-lg p-6 ${className}`}>
        {title && <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>}
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="w-20 text-sm text-gray-600">{item.label}</div>
              <div className="flex-1 mx-3">
                <div className="bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                    style={{ width: `${(item.value / maxValue) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="w-12 text-sm font-medium text-gray-800">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'pie') {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let cumulativePercentage = 0;

    return (
      <div className={`bg-white rounded-lg p-6 ${className}`}>
        {title && <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>}
        <div className="flex items-center justify-center">
          <div className="relative w-48 h-48">
            <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#e5e7eb"
                strokeWidth="8"
              />
              {data.map((item, index) => {
                const percentage = (item.value / total) * 100;
                const strokeDasharray = `${percentage * 2.51327} ${251.327}`;
                const strokeDashoffset = -cumulativePercentage * 2.51327;
                cumulativePercentage += percentage;

                const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
                
                return (
                  <circle
                    key={index}
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke={colors[index % colors.length]}
                    strokeWidth="8"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-300"
                  />
                );
              })}
            </svg>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          {data.map((item, index) => {
            const colors = ['bg-blue-600', 'bg-green-600', 'bg-yellow-600', 'bg-red-600', 'bg-purple-600'];
            return (
              <div key={index} className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${colors[index % colors.length]} mr-3`}></div>
                <span className="text-sm text-gray-600">{item.label}</span>
                <span className="ml-auto text-sm font-medium">{item.value}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return <div>Chart type not implemented</div>;
};

export default Chart;
