import React from 'react';

const SubcategoryCard = ({ subcategory, onClick, isFirst = false }) => {
  return (
    <div 
      className={`category-card ${isFirst ? 'col-span-full' : ''} cursor-pointer`}
      onClick={() => onClick(subcategory)}
    >
      <div className="flex items-center space-x-3">
        <span className="text-2xl">{subcategory.icon}</span>
        <div className="flex-1">
          <h3 className="font-semibold text-primary-font mb-1">
            {subcategory.name}
          </h3>
          <p className="text-sm text-secondary-font">
            {subcategory.description}
          </p>
        </div>
        <svg className="w-5 h-5 text-icon-hint" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
};

export default SubcategoryCard;
