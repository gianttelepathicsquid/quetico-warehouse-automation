'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Settings, 
  ArrowRight, 
  ChevronDown, 
  CheckCircle, 
  Building2, 
  Users, 
  Boxes,
  Code,
  BarChart,
  Plus,
  Minus,
  Info
} from 'lucide-react';

const AnimatedCounter = ({ value, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [value, duration]);

  return count;
};

const InsightCard = ({ insight, isVisible }) => {
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

const WarehouseAutomationGuide = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [showStats, setShowStats] = useState(false);
  const [visibleInsights, setVisibleInsights] = useState([]);
  const [hoveredAlt, setHoveredAlt] = useState(null);

  const insights = [
    {
      id: 'adoption',
      icon: BarChart,
      title: 'Current Adoption',
      content: '90% of organizations have not implemented warehouse automation technology as of 2022',
      stats: { value: 90, label: 'Non-Automated' }
    },
    {
      id: 'considerations',
      icon: Settings,
      title: 'Key Considerations',
      content: [
        'Scale requirements for automation implementation',
        'Flexibility needed for changing business needs',
        'Customization capabilities for specific products',
        'IT integration complexity with existing systems',
        'Cost justification and ROI analysis'
      ]
    },
    {
      id: 'challenges',
      icon: Boxes,
      title: 'Implementation Challenges',
      content: [
        { challenge: 'Material Handling', example: 'Vacuum grippers may struggle with sustainable packaging' },
        { challenge: 'System Integration', example: 'Complex WMS/TMS/ERP interfaces required' },
        { challenge: 'Flexibility', example: 'Limited ability to adapt to new product types' },
        { challenge: 'Training', example: 'Specialized skills required for maintenance' }
      ]
    }
  ];

  const alternatives = [
    {
      id: 'wms',
      icon: Code,
      title: 'WMS Optimization',
      benefit: 'Improve efficiency through better software without heavy infrastructure investment'
    },
    {
      id: 'training',
      icon: Users,
      title: 'Cross-Training',
      benefit: 'Develop a flexible workforce capable of handling multiple tasks and roles'
    },
    {
      id: 'scaling',
      icon: Building2,
      title: 'Strategic Scaling',
      benefit: 'Gradual implementation of automation based on proven ROI and needs'
    }
  ];

  useEffect(() => {
    const timeouts = insights.slice(1).map((_, index) => {
      return setTimeout(() => {
        setVisibleInsights(prev => [...prev, true]);
      }, index * 200);
    });

    return () => timeouts.forEach(timeout => clearTimeout(timeout));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative">
              <Box className="h-12 w-12 text-[#00204E] animate-pulse" />
              <div className="absolute inset-0 bg-[#00204E] rounded-full opacity-20 animate-ping" />
            </div>
            <h2 className="text-3xl font-bold text-[#00204E]">
              Quetico Warehouse Automation Guide
            </h2>
          </div>
        </div>

        <div 
          className="bg-white rounded-lg p-6 mb-8 transform transition-all duration-500 hover:scale-105 shadow-lg border border-gray-200 cursor-pointer"
          onClick={() => setShowStats(!showStats)}
        >
          <div className="flex items-center justify-between text-[#00204E] mb-2">
            <span className="font-semibold flex items-center gap-2">
              <Info className="h-5 w-5" />
              Industry Adoption Statistics
            </span>
            <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${showStats ? 'rotate-180' : ''}`} />
          </div>
          
          {showStats && (
            <div className="mt-4 flex items-center justify-center">
              <div className="relative w-48 h-48">
                <svg className="transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#00204E"
                    strokeWidth="10"
                    strokeDasharray={`${90 * 2.827} ${100 * 2.827}`}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="text-3xl font-bold text-[#00204E]">
                    <AnimatedCounter value={90} />%
                  </div>
                  <div className="text-sm text-gray-600">Non-Automated</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {insights.slice(1).map((insight, index) => (
            <InsightCard 
              key={insight.id}
              insight={insight}
              isVisible={visibleInsights[index]}
            />
          ))}
        </div>

        <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-[#00204E] mb-6">Alternative Approaches</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {alternatives.map((alt) => {
              const Icon = alt.icon;
              const isHovered = hoveredAlt === alt.id;
              
              return (
                <div 
                  key={alt.id}
                  className="bg-gray-50 rounded-lg p-4 transform transition-all duration-300 hover:scale-105 border border-gray-200 cursor-pointer"
                  onMouseEnter={() => setHoveredAlt(alt.id)}
                  onMouseLeave={() => setHoveredAlt(null)}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className={`h-5 w-5 text-[#00204E] transform transition-all duration-300 ${
                      isHovered ? 'rotate-12 scale-110' : ''
                    }`} />
                    <h4 className="font-semibold text-[#00204E]">{alt.title}</h4>
                  </div>
                  <p className={`text-gray-600 text-sm transform transition-all duration-300 ${
                    isHovered ? 'translate-x-2' : ''
                  }`}>{alt.benefit}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarehouseAutomationGuide;
