import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import SubcategoryCard from '../components/SubcategoryCard';
import ContentCard from '../components/ContentCard';
import { categories, templates, platforms } from '../data/mockData';

const HomePage = ({ onOpenDetail }) => {
  const [selectedCategory, setSelectedCategory] = useState('AI');
  const [selectedSubcategory, setSelectedSubcategory] = useState(null); // 新增：当前选中的二级分类
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
    setSelectedSubcategory(null);
    setSearchResults(null);
    setCurrentView('categories');
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory.name);
    const results = [
      ...templates.filter(t => t.subcategory === subcategory.name),
      ...platforms.filter(p => p.subcategory === subcategory.name)
    ];
    setSearchResults(results);
    setCurrentView('results');
  };

  // 新增：点击 explore more 跳转到该二级分类完整列表
  const handleExploreMore = (subcategoryName) => {
    setSelectedSubcategory(subcategoryName);
    const results = [
      ...templates.filter(t => t.subcategory === subcategoryName),
      ...platforms.filter(p => p.subcategory === subcategoryName)
    ];
    setSearchResults(results);
    setCurrentView('results');
  };

  const handleContentClick = (item) => {
    onOpenDetail(item);
  };

  // 首页分区式渲染：每个二级分类一个区块（标题+卡片+explore more）
  const renderCategoriesView = () => {
    const subcategories = categories[selectedCategory].subcategories;

    return (
      <div className="page-container flex flex-col gap-12">
        {subcategories.map((subcategory) => {
          // 获取该二级分类下的所有模板和平台
          const items = [
            ...templates.filter(t => t.subcategory === subcategory.name),
            ...platforms.filter(p => p.subcategory === subcategory.name)
          ].slice(0, 6);

          if (items.length === 0) return null;

          return (
            <section key={subcategory.id}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-primary-font">{subcategory.name}</h2>
                <button
                  className="text-DifyBlue hover:text-NormalBlue font-medium underline underline-offset-4 transition-colors duration-150 text-base"
                  onClick={() => handleExploreMore(subcategory.name)}
                >
                  Explore more templates
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                  <ContentCard
                    key={item.id}
                    item={item}
                    type={item.projectUrl ? 'platform' : 'template'}
                    onClick={handleContentClick}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    );
  };

  // 二级分类结果页/搜索结果页
  const renderResultsView = () => {
    // 结果筛选
    let filteredResults = searchResults || [];
    // 如果有 selectedSubcategory，且不是全局搜索，则只显示该二级分类
    if (selectedSubcategory) {
      filteredResults = filteredResults.filter(
        (item) => item.subcategory === selectedSubcategory
      );
    }
    // 排序（默认按下载量降序）
    filteredResults = [...filteredResults].sort((a, b) => b.downloads - a.downloads);

    return (
      <div className="page-container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-primary-font">
            Results
            {selectedSubcategory && (
              <span className="ml-2 text-base text-secondary-font font-normal">
                [{filteredResults.length}]
              </span>
            )}
          </h2>
          <div>
            <select className="input-field w-40 text-sm" defaultValue="relevancy">
              <option value="relevancy">Sort: Relevancy</option>
              <option value="downloads">Sort: Downloads</option>
              <option value="latest">Sort: Latest</option>
            </select>
          </div>
        </div>
        <div className="divide-y divide-gray-100 bg-white rounded-card shadow-card">
          {filteredResults.length === 0 && (
            <div className="text-center py-12">
              <p className="text-secondary-font">No results found</p>
            </div>
          )}
          {filteredResults.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-start gap-4 px-6 py-6 hover:bg-LightBlue transition-colors duration-150 cursor-pointer"
              onClick={() => handleContentClick(item)}
            >
              {/* 左侧缩略图/图标 */}
              <div className="flex-shrink-0 w-16 h-16 bg-gray-50 rounded-card flex items-center justify-center overflow-hidden">
                <img
                  src={item.svgPreview || 'https://via.placeholder.com/64x64'}
                  alt={item.title}
                  className="object-cover w-12 h-12"
                />
              </div>
              {/* 右侧内容 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg font-semibold text-primary-font line-clamp-1">{item.title}</span>
                  {item.labels && item.labels.slice(0, 3).map((label, idx) => (
                    <span key={idx} className="tech-tag text-xs">{label}</span>
                  ))}
                  {item.labels && item.labels.length > 3 && (
                    <span className="tech-tag text-xs">+{item.labels.length - 3}</span>
                  )}
                </div>
                <div className="text-secondary-font text-sm mb-2 line-clamp-2">
                  {item.description}
                </div>
                <div className="flex items-center gap-2 text-xs text-secondary-font">
                  <img src={item.author.avatar} alt={item.author.name} className="w-5 h-5 rounded-full" />
                  <span>{item.author.name}</span>
                  {item.author.isVerified && <span className="text-blue-500">✓</span>}
                  {item.author.isOfficial && (
                    <span className="bg-yellow-100 text-yellow-800 px-1 rounded-tag ml-1">官方</span>
                  )}
                  <span>·</span>
                  <span>{item.lastUpdate}</span>
                  <span>·</span>
                  <span>{item.downloads.toLocaleString()} downloads</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-light-bg flex flex-col gap-0">
      <div className="w-full flex flex-col items-center pt-8 pb-2">
        <div className="w-full max-w-2xl">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="w-full max-w-4xl mt-4">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
          />
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        {currentView === 'categories' ? renderCategoriesView() : renderResultsView()}
      </div>
    </div>
  );
};

export default HomePage;
