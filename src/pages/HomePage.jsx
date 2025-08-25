import React, { useState } from 'react';
import { Search, Sparkles, Image as ImageIcon, Video, Text, Mic, Code, ChartBar, Palette, User, Filter, SortAsc, Briefcase, Server, Mail, BookOpen, LucideArrowLeftRight, ArrowRight, ChevronRight, ShieldCheck, BadgeCheck, User as UserIcon } from 'lucide-react';
import ContentCard from '../components/ContentCard';
import BentoGrid from '../components/BentoGrid';
import { categories, templates, platforms } from '../data/mockData';
import Footer from '../components/Footer';

const categoryIconMap = {
  "AI": <Sparkles size={16} strokeWidth={1.5} />,
  "Sales": <Briefcase size={16} strokeWidth={1.5}/>,
  "IT Ops": <Server size={16} strokeWidth={1.5}/>,
  "Marketing": <Mail size={16} strokeWidth={1.5}/>,
  "Document Ops": <BookOpen size={16}strokeWidth={1.5} />,
  "Other": <Palette size={16} strokeWidth={1.5}/>,
  "Support": <User size={16} strokeWidth={1.5}/>,
};

const HomePage = ({ onOpenDetail }) => {
  const [selectedCategory, setSelectedCategory] = useState('AI');
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [currentView, setCurrentView] = useState('categories');
  const [showBentoGrid, setShowBentoGrid] = useState(true);

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setSearchResults(null);
      setCurrentView('categories');
      setShowBentoGrid(true);
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
    setShowBentoGrid(false);
  };

  const handleCategorySelect = (categoryKey) => {
    setSelectedCategory(categoryKey);
    setSelectedSubcategory(null);
    setSearchResults(null);
    setCurrentView('categories');
    setShowBentoGrid(false);
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory.name);
    const results = [
      ...templates.filter(t => t.subcategory === subcategory.name),
      ...platforms.filter(p => p.subcategory === subcategory.name)
    ];
    setSearchResults(results);
    setCurrentView('results');
    setShowBentoGrid(false);
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
    setShowBentoGrid(false);
  };

  const handleContentClick = (item) => {
    onOpenDetail(item);
  };

  
  // 首页分区式渲染：每个二级分类一个区块（标题+卡片+explore more）
  const renderCategoriesView = () => {
    if (!selectedCategory) return null;
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
                <h2>{subcategory.name}</h2>
                <button
                  className="nav-link"
                  onClick={() => handleExploreMore(subcategory.name)}
                >
                  Explore more templates <ArrowRight size={12} strokeWidth={1}/>
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6 w-full">
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
        <div className="divide-y divide-gray-100 bg-white rounded-card shadow-card w-full">
          {filteredResults.length === 0 && (
            <div className="text-center py-12 w-full">
              <p className="text-secondary-font">No results found</p>
            </div>
          )}
          {filteredResults.map((item) => (
            <div
              key={item.id}
              className="px-6 py-6 hover:bg-LightBlue transition-colors duration-150 cursor-pointer"
              onClick={() => handleContentClick(item)}
            >
              {/* 内容区域 */}
              <div className="w-full">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg font-semibold text-primary-font line-clamp-1 card-title">{item.title}</span>
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
                  {item.author.isOfficial ? (
                    <span className="badge badge-official" title="Official"><ShieldCheck className="badge-icon" /></span>
                  ) : item.author.isVerified ? (
                    <span className="badge badge-verified" title="Verified"><BadgeCheck className="badge-icon" /></span>
                  ) : (
                    <span></span>
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
    <div className="min-h-screen bg-home-gradient flex flex-col gap-0">
      {/* 顶部分类导航+搜索栏+分类按钮 */}
      <div className="w-full flex flex-col items-center pt-8 pb-4">
        {/* 搜索栏，左侧显示当前选中分类 */}
        <div className="w-full max-w-3xl flex flex-col items-center">
          <div className="flex gap-4 items-center bg-white border border-[var(--border-color)] rounded-page-container px-4 py-3 shadow-[var(--shadow-lg)] w-full">
            {/* 面包屑区域：flex + gap-2 控制子元素间距 */}
            <div className="flex items-center gap-2">
              {selectedCategory && (
                <span className="category-tag gap-1 flex items-center">
                  <span className="h-2 inline-flex items-center leading-none">{categoryIconMap[selectedCategory]}</span>
                  <span className="leading-none">{selectedCategory}</span>
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setSelectedSubcategory(null);
                      setCurrentView('categories');
                      setSearchResults(null);
                      setShowBentoGrid(true);
                    }}
                    className="ml-2 text-gray-400 hover:text-gray-600 text-sm font-bold"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedSubcategory && selectedCategory && (
                <>
                  <span className="category-tag gap-1 flex items-center">
                    <span className="leading-none">{categories[selectedCategory].subcategories.find(s => s.name === selectedSubcategory)?.icon || ""}</span>
                    <span className="leading-none">{selectedSubcategory}</span>
                    <button
                      onClick={() => {
                        setSelectedSubcategory(null);
                        setCurrentView('categories');
                        setSearchResults(null);
                      }}
                      className="ml-2 text-gray-400 hover:text-gray-600 text-sm font-bold"
                    >
                      ×
                    </button>
                  </span>
                </>
              )}
            </div>
            <input
              type="text"
              placeholder="Search anywhere..."
              className="flex-1 bg-transparent outline-none border-none roboto-mono-regular"
              onKeyDown={e => {
                if (e.key === 'Enter') handleSearch(e.target.value);
              }}
            />
            <Search size={20} className="text-icon-hint ml-2" />
          </div>
          {/* 一级分类横向icon导航 */}
          <div className="w-full flex justify-center">
            <div className="max-w-7xl overflow-x-auto flex gap-2 mb-2 pt-6">
              {Object.keys(categories).map((cat) => (
                <button
                  key={cat}
                  className={`nav-item flex items-center gap-1 min-w-[80px] px-3 py-2 rounded-card ${
                    selectedCategory === cat ? 'nav-item-active' : ''
                  }`}
                  style={{
                    background: selectedCategory === cat ? 'var(--primary-font-a05)' : 'transparent',
                    color: selectedCategory === cat ? 'var(--primary-font)' : 'var(--secondary-font)',
                    fontWeight: selectedCategory === cat ? 700 : 400,
                  }}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSelectedSubcategory(null);
                    setCurrentView('categories');
                    setSearchResults(null);
                    setShowBentoGrid(false);
                  }}
                >
                  <span className="inline-flex items-center leading-none">{categoryIconMap[cat]}</span>
                  <span className="text-sm leading-none">{cat}</span>
                </button>
              ))}
            </div>
          </div>
          {/* 二级分类区，emoji+文字一排，紧凑 */}
          {selectedCategory && (
            <div className="w-full flex justify-center">
              <div className="max-w-7xl flex flex-wrap gap-2">
                {categories[selectedCategory].subcategories.map((subcat) => (
                  <button
                    key={subcat.id}
                    className={`nav-item flex flex-row items-center gap-1 min-w-[80px] px-3 py-2 rounded-card border-none ${
                      selectedSubcategory === subcat.name ? 'nav-item-active' : ''
                    }`}
                    style={{
                      background: selectedSubcategory === subcat.name ? 'var(--primary-font-a05)' : 'transparent',
                      color: selectedSubcategory === subcat.name ? 'var(--primary-font)' : 'var(--secondary-font)',
                      fontWeight: selectedSubcategory === subcat.name ? 700 : 400,
                    }}
                    onClick={() => {
                      setSelectedSubcategory(subcat.name);
                      setCurrentView('results');
                      const results = [
                        ...templates.filter(t => t.subcategory === subcat.name),
                        ...platforms.filter(p => p.subcategory === subcat.name)
                      ];
                      setSearchResults(results);
                      setShowBentoGrid(false);
                    }}
                  >
                    <span className="leading-none">{subcat.icon}</span>
                    <span className="text-xs leading-none">{subcat.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* BentoGrid 区块 - 只在没有选择分类时显示 */}
      {showBentoGrid && <BentoGrid />}
      {/* 内容区，宽度自适应一致 */}
      <div className="flex-1 flex flex-col w-full max-w-7xl mx-auto">
        {currentView === 'categories' ? renderCategoriesView() : renderResultsView()}
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
