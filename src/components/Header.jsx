import React, { useState } from 'react';

const Header = ({ onNavigate, activeTab = 'template' }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const NavLink = ({ id, children }) => (
    <button
      onClick={() => onNavigate(id)}
      className={`nav-link ${activeTab === id ? 'nav-link-active' : ''}`}
    >
      {children}
    </button>
  );

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* 左侧导航 */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-8 h-8 bg-DifyBlue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="ml-2 text-xl font-bold text-primary-font">AvaMarket</span>
            </div>
            
            {/* 主导航 */}
            <nav className="flex items-center space-x-6">
              <NavLink id="template">Template</NavLink>
              <NavLink id="platform">Platform</NavLink>
              <NavLink id="mcp">MCP</NavLink>
            </nav>
          </div>

          {/* 右侧操作 */}
          <div className="flex items-center space-x-4">
            {/* Post按钮 */}
            <button className="btn-post" onClick={() => onNavigate('publish')}>
              Post
            </button>
            
            {/* 个人中心 */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                <img
                  src="https://via.placeholder.com/32"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <svg className="w-4 h-4 text-secondary-font" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* 下拉菜单 */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-card shadow-lg border border-gray-100 py-2 z-50">
                  <button className="block w-full text-left px-4 py-2 text-sm text-secondary-font hover:bg-gray-50 transition-colors duration-200">
                    个人中心
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-secondary-font hover:bg-gray-50 transition-colors duration-200">
                    我的发布
                  </button>
                  <hr className="my-2" />
                  <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors duration-200">
                    登出
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
