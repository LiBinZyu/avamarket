import React from 'react';
import { ShieldCheck, BadgeCheck, User as UserIcon, ArrowDownToLine } from 'lucide-react';

const ContentCard = ({ item, type = 'template', onClick }) => {
  const renderLabels = (labels) => {
    if (!labels || labels.length === 0) return null;
    
    // 先显示前3个标签
    const displayLabels = labels.slice(0, 3);
    const remainingCount = labels.length - 3;
    
    return (
      <div className="flex gap-1 mb-2 overflow-hidden whitespace-nowrap">
        {displayLabels.map((label, index) => (
          <span key={index} className="tech-tag text-xs flex-shrink-0">
            {label}
          </span>
        ))}
        {remainingCount > 0 && (
          <span className="tech-tag text-xs flex-shrink-0">
            +{remainingCount}
          </span>
        )}
      </div>
    );
  };

  return (
    <div
      className="content-card cursor-pointer transition-transform duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-NormalBlue border border-transparent flex flex-col h-40 min-w-0"
      onClick={() => onClick(item)}
    >
      {/* 技术栈标签 */}
      {renderLabels(item.labels)}

      {/* 标题 */}
      <h3 className="text-base font-semibold text-primary-font mb-2 line-clamp-2 card-title">
        {item.title}
      </h3>

      {/* 底部信息区域 - 固定在左下角 */}
      <div className="flex items-center mt-auto pt-2">
        {/* 作者头像 */}
        <div className="flex items-center space-x-2 flex-grow min-w-0">
          <img
            src={item.author.avatar}
            alt={item.author.name}
            className="w-6 h-6 rounded-full flex-shrink-0"
          />
          <span className="text-sm text-secondary-font truncate">{item.author.name}</span>
          {item.author.isOfficial ? (
            <span className="badge badge-official" title="Official"><ShieldCheck className="badge-icon" /></span>
          ) : item.author.isVerified ? (
            <span className="badge badge-verified" title="Verified"><BadgeCheck className="badge-icon" /></span>
          ) : (
            <span></span>
          )}
        </div>

        {/* 下载量 */}
        <div className="flex items-center text-xs roboto-mono-light text-secondary-font flex-shrink-0">
          <ArrowDownToLine size={12} color="var(--secondary-font)" />
          {item.downloads.toLocaleString()}
        </div>

        {/* 类型标识 */}
        {type === 'platform' && (
          <svg className="w-4 h-4 text-icon-hint ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        )}
      </div>
    </div>
  );
};

export default ContentCard;