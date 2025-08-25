import React, { useState } from 'react';

const Header = ({ onNavigate, activeTab = 'template' }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const NavLink = ({ id, children }) => (
    <button
      onClick={() => onNavigate(id)}
      className={`nav-item rounded-button px-3 py-1 ${
        activeTab === id
          ? 'nav-item-active'
          : ''
      }`}
    >
      {children}
    </button>
  );

  return (
    <header className="header-bg border-b border-gray-100" style={{ position: 'relative', zIndex: 9 }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* 左侧导航 */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <div className="flex items-center select-none">
              <div className="w-7 h-7 mr-2 bg-[var(--primary-font)] rounded-card flex items-center justify-center shadow-card">
              </div>
              <span className="roboto-mono-bold text-lg text-primary-font tracking-tight">AvaMarket</span>
            </div>
            
            {/* 主导航 */}
            <nav className="flex items-center space-x-2">
              <NavLink id="template">Templates</NavLink>
              <NavLink id="platform">Platforms</NavLink>
              <NavLink id="mcp">MCP</NavLink>
            </nav>
          </div>

          {/* 右侧操作 */}
          <div className="flex items-center space-x-4">
            {/* Post按钮 */}
            <button
              className="roboto-mono-light btn-post btn-shimmer"
              onClick={() => onNavigate('publish')}
            >
              Publish
            </button>
            
            {/* 个人中心 */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="dropdown-select flex items-center h-8.5"
              >
                <span
                  className="truncate px-3 rounded-full text-sm"
                  title={typeof userName === 'string' ? userName : 'User'}
                  style={{ maxWidth: 128, display: 'inline-block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
                  {typeof userName === 'string'
                    ? (userName.length > 16 ? userName.slice(0, 16) + '…' : userName)
                    : 'JasperChen'}
                </span>
                <img
                    src="https://api.dicebear.com/9.x/bottts/svg?seed=JasperChen"
                    alt="Jasper Chen"
                    className="w-7 h-7 rounded-full"
                  />
              </button>

              {/* 下拉菜单 */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 content-card py-2 z-50">
                  <button className="block w-full text-left px-4 py-2 dropdown-item">
                    Profile
                  </button>
                  <button className="dropdown-menu-item">
                    My Posts
                  </button>
                  
                  <hr className="dropdown-menu-divider" />
                  <button className="dropdown-menu-item roboto-mono-semibold text-red-400 hover:text-red-500 hover:bg-red-50">
                    Logout
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
