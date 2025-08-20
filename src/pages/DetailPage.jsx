import React, { useState } from 'react';

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
        <span className="tech-tag">+{item.labels.length - 3}</span>
      )}
    </div>
  );

  const renderActionButtons = () => (
    <div className="space-y-4 mb-6">
      {item.dslFiles && item.dslFiles.length > 1 && (
        <div className="flex space-x-2">
          {item.dslFiles.map((dsl) => (
            <button
              key={dsl.platformName}
              onClick={() => setSelectedPlatform(dsl.platformName)}
              className={`px-4 py-2 rounded-button border transition-colors duration-200 ${
                selectedPlatform === dsl.platformName
                  ? 'border-DifyBlue bg-DifyBlue text-white'
                  : 'border-gray-200 text-secondary-font hover:border-gray-300'
              }`}
            >
              {dsl.platformName}
            </button>
          ))}
        </div>
      )}
      
      <button className="btn-primary w-full">
        获取模板
      </button>
      
      {type === 'platform' && (
        <a
          href={item.projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary w-full text-center"
        >
          Visit Project
        </a>
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
                官方
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="text-sm text-secondary-font">
        最后更新于 {item.lastUpdate}
      </div>
      
      <div className="text-sm text-secondary-font">
        分类: {item.category} {'>'} {item.subcategory}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-light-bg">
      <div className="page-container">
        <div className="mb-6">
          <button onClick={onBack} className="text-DifyBlue hover:text-NormalBlue font-medium">
            ← Back to Templates
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            {renderTechStack()}
            <h1 className="text-3xl font-bold text-primary-font mb-6">
              {item.title}
            </h1>
            {renderActionButtons()}
            {renderMetadata()}
          </div>
          
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-card p-8 mb-6">
              <div className="aspect-video bg-white rounded-card border-2 border-dashed border-gray-200 flex items-center justify-center">
                <div className="text-center text-secondary-font">
                  <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p>预览图加载中...</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-card p-6">
              <h2 className="text-xl font-semibold text-primary-font mb-4">文档说明</h2>
              <div className="text-secondary-font whitespace-pre-line">
                {item.readme}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
