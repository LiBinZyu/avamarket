import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onCategorySelect }) => {
  return (
    <div className="py-6">
      <div className="flex flex-wrap gap-3 justify-center">
        {Object.entries(categories).map(([key, category]) => (
          <button
            key={key}
            onClick={() => onCategorySelect(key)}
            className={`category-tag ${
              selectedCategory === key 
                ? 'bg-DifyBlue text-white hover:bg-NormalBlue' 
                : ''
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
