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
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* 左侧导航 */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <div className="flex items-center select-none">
              <div className="w-6 h-6 mr-2 bg-DifyBlue rounded-card flex items-center justify-center shadow-card">
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
              className="roboto-mono-light btn-post shadow-card hover:bg-NormalBlue focus:shadow-input-focus"
              onClick={() => onNavigate('publish')}
            >
              Publish
            </button>
            
            {/* 个人中心 */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="nav-item flex items-center p-1 rounded-full"
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
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-card shadow-card border border-gray-100 py-2 z-50">
                  <button className="block w-full text-left px-4 py-2 dropdown-item">
                    Profile
                  </button>
                  <button className="block w-full text-left px-4 py-2 dropdown-item">
                    My Posts
                  </button>
                  <hr className="my-2 border-t border-gray-100" />
                  <button className="block w-full text-left px-4 py-2 roboto-mono-semibold text-red-400 hover:text-red-500 hover:bg-red-50">
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
