import React, { useState } from 'react';
import { Workflow } from 'lucide-react';

const DetailPage = ({ item, type = 'template', onBack }) => {
  const [selectedPlatform, setSelectedPlatform] = useState(
    item.dslFiles?.[0]?.platformName || 'Dify'
  );

  const renderTechStack = () => (
    <div className="flex items-center space-x-2 mb-6">
      {item.labels.slice(0, 3).map((label, index) => (
        <span key={index} className="tech-tag">
          {label}
        </span>
      ))}
      {item.labels.length > 3 && (
        <span className="dropdown-item px-2 rounded-card border border-[var(--primary-font-a05)]">+{item.labels.length - 3}</span>
      )}
    </div>
  );

  const renderMetadata = () => (
    <div className="space-y-4 mb-6">
      <div className="flex items-center space-x-3">
        <img
          src={item.author.avatar}
          alt={item.author.name}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-medium text-primary-font">{item.author.name}</span>
            {item.author.isVerified && (
              <span className="text-blue-500 text-sm">✓</span>
            )}
            {item.author.isOfficial && (
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-tag">
                Official
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="text-sm text-secondary-font">
        Last updated {item.lastUpdate}
      </div>
      
      <div className="text-sm text-secondary-font">
        Category: {item.category} {'>'} {item.subcategory}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-light-bg">
      <div className="page-container">
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={onBack}
            className="nav-link"
          >
            Back to Templates
          </button>
          {/* toggler 平台切换器 */}
          {item.dslFiles && item.dslFiles.length > 1 && (
            <div className="toggler-group">
              {item.dslFiles.map((dsl) => (
                <button
                  key={dsl.platformName}
                  className={`toggler-btn${selectedPlatform === dsl.platformName ? " selected" : ""}`}
                  onClick={() => setSelectedPlatform(dsl.platformName)}
                  type="button"
                >
                  {dsl.platformName}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <h1 className="text-3xl font-bold text-primary-font mb-6">
              {item.title}
            </h1>
            {renderTechStack()}
            {renderMetadata()}
          </div>
          
          <div className="lg:col-span-2 flex flex-col">
            {(type === 'template') && (
              <div className="bg-gradient-to-br from-blue-50 to-[var(--sidebar-bg) rounded-2xl shadow-lg border border-gray-200 mb-6 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-white/80">
                  <h2 className="text-lg font-semibold text-gray-800">SVG Preview</h2>
                </div>
                <div className="p-8 flex items-center justify-center min-h-[400px]">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[var(--sidebar-bg)] mb-6">
                      <Workflow className="w-10 h-10 text-[var(--icon-hint)]" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-800 mb-2">Workflow Preview</h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      Interactive preview of the workflow is loading from server ...
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-8 bg-white rounded-card shadow-card p-6 flex-grow">
          <h2 className="text-xl font-semibold text-primary-font mb-4">Documentation</h2>
          <div className="text-secondary-font whitespace-pre-line overflow-y-auto max-h-[500px] pr-2">
            {item.readme}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;