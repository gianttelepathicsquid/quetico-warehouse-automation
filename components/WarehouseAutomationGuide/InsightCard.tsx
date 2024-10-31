import React, { useState } from 'react';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import { InsightCardProps } from './types';

const InsightCard: React.FC<InsightCardProps> = ({ insight, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const Icon = insight.icon;

  return (
    <div
      className={`transform transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`bg-white rounded-lg p-6 shadow-lg border border-gray-200 transition-all duration-300 ${
          isHovered ? 'transform scale-102' : ''
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`bg-[#00204E] p-2 rounded-lg transform transition-all duration-300 ${
              isHovered ? 'rotate-12' : ''
            }`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-[#00204E]">{insight.title}</h3>
          </div>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-[#00204E] hover:bg-gray-100 rounded-full p-1 transition-colors duration-300"
          >
            {showDetails ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
          </button>
        </div>
        
        <div className={`transition-all duration-500 overflow-hidden ${
          showDetails ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          {Array.isArray(insight.content) ? (
            <ul className="space-y-2">
              {insight.content.map((item, idx) => (
                <li
                  key={idx}
                  className={`flex items-center gap-2 text-gray-600 transition-all duration-300 ${
                    showDetails ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                  }`}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <ArrowRight className="h-4 w-4 text-[#00204E]" />
                  {typeof item === 'string' ? item : (
                    <div>
                      <span className="font-semibold text-[#00204E]">{item.challenge}:</span>
                      <span className="text-gray-600 ml-1">{item.example}</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">{insight.content}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InsightCard;
