import React from 'react';

const ContentCard = ({ item, type = 'template', onClick }) => {
  const renderLabels = (labels) => {
    if (!labels || labels.length === 0) return null;
    
    const displayLabels = labels.slice(0, 4);
    const remainingCount = labels.length - 4;
    
    return (
      <div className="flex flex-wrap gap-2 mb-3">
        {displayLabels.map((label, index) => (
          <span key={index} className="tech-tag text-xs">
            {label}
          </span>
        ))}
        {remainingCount > 0 && (
          <span className="tech-tag text-xs">
            +{remainingCount}
          </span>
        )}
      </div>
    );
  };

  const renderAuthor = (author) => (
    <div className="flex items-center space-x-2 mb-3">
      <img
        src={author.avatar}
        alt={author.name}
        className="w-6 h-6 rounded-full"
      />
      <span className="text-sm text-secondary-font">{author.name}</span>
      {author.isVerified && (
        <span className="text-blue-500 text-xs">✓</span>
      )}
      {author.isOfficial && (
        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-tag">
          官方
        </span>
      )}
    </div>
  );

  return (
    <div className="content-card" onClick={() => onClick(item)}>
      {/* 技术栈标签 */}
      {renderLabels(item.labels)}
      
      {/* 标题 */}
      <h3 className="text-lg font-semibold text-primary-font mb-3 line-clamp-2">
        {item.title}
      </h3>
      
      {/* 作者信息 */}
      {renderAuthor(item.author)}
      
      {/* 下载量 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm text-secondary-font">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          {item.downloads.toLocaleString()}
        </div>
        
        {/* 类型标识 */}
        {type === 'platform' && (
          <svg className="w-5 h-5 text-icon-hint" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        )}
      </div>
    </div>
  );
};

export default ContentCard;
