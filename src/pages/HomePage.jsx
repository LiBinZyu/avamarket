import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import SubcategoryCard from '../components/SubcategoryCard';
import ContentCard from '../components/ContentCard';
import { categories, templates, platforms } from '../data/mockData';

const HomePage = ({ onOpenDetail }) => {
  const [selectedCategory, setSelectedCategory] = useState('AI');
  const [searchResults, setSearchResults] = useState(null);
  const [currentView, setCurrentView] = useState('categories');

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setSearchResults(null);
      setCurrentView('categories');
      return;
    }

    const results = [
      ...templates.filter(t => 
        t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.labels.some(label => label.toLowerCase().includes(searchTerm.toLowerCase()))
      ),
      ...platforms.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.labels.some(label => label.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    ];

    setSearchResults(results);
    setCurrentView('results');
  };

  const handleCategorySelect = (categoryKey) => {
    setSelectedCategory(categoryKey);
    setSearchResults(null);
    setCurrentView('categories');
  };

  const handleSubcategoryClick = (subcategory) => {
    const results = [
      ...templates.filter(t => t.subcategory === subcategory.name),
      ...platforms.filter(p => p.subcategory === subcategory.name)
    ];
    setSearchResults(results);
    setCurrentView('results');
  };

  const handleContentClick = (item) => {
    onOpenDetail(item);
  };

  const renderCategoriesView = () => (
    <div className="page-container">
      <h1 className="text-3xl font-bold text-primary-font text-center mb-8">
        {categories[selectedCategory].name}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories[selectedCategory].subcategories.map((subcategory, index) => (
          <SubcategoryCard
            key={subcategory.id}
            subcategory={subcategory}
            onClick={handleSubcategoryClick}
            isFirst={index === 0}
          />
        ))}
      </div>
      
      <div className="text-center mt-8">
        <a href="#" className="text-DifyBlue hover:text-NormalBlue font-medium">
          explore more
        </a>
      </div>
    </div>
  );

  const renderResultsView = () => (
    <div className="page-container">
      <h2 className="text-2xl font-bold text-primary-font mb-6">Results</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchResults.map((item) => (
          <ContentCard
            key={item.id}
            item={item}
            type={item.projectUrl ? 'platform' : 'template'}
            onClick={handleContentClick}
          />
        ))}
      </div>
      
      {searchResults.length === 0 && (
        <div className="text-center py-12">
          <p className="text-secondary-font">没有找到相关结果</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-light-bg">
      <SearchBar onSearch={handleSearch} />
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />
      {currentView === 'categories' ? renderCategoriesView() : renderResultsView()}
    </div>
  );
};

export default HomePage;
