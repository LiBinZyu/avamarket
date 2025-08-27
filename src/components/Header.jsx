import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Menu, LogIn, Fan, LogOut } from 'lucide-react';

const Header = ({ onNavigate, activeTab = 'template' }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, loginWithRedirect, logout, isLoading } = useAuth0();

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
            {/* Logo + 圆球按钮 */}
            <div className="flex items-center select-none">
              <button
                className="w-7 h-7 mr-2 flex items-center justify-center block md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Open menu"
                style={{ minWidth: 28, minHeight: 28 }}
              >
                <Menu size={20}  color="var(--primary-font)"/>
              </button>
              <span className="roboto-mono-bold text-lg text-primary-font tracking-tight">AvaMarket</span>
            </div>
            
            {/* 主导航 */}
            {/* 桌面端导航 */}
            <nav className="hidden md:flex items-center space-x-2">
              <NavLink id="template">Templates</NavLink>
              <NavLink id="platform">Platforms</NavLink>
              <NavLink id="mcp">MCP</NavLink>
            </nav>
          </div>

          {/* 右侧操作 */}
          <div className="flex items-center space-x-4">
            {/* 桌面端 Publish 按钮 */}
            <button
              className="roboto-mono-light btn-primary h-8.5 items-center gap-2 hidden md:inline-flex"
              onClick={() => {
                if (!isAuthenticated) {
                  loginWithRedirect();
                } else {
                  onNavigate('publish');
                }
              }}
            >
              <Fan size={16} stroekeWidth={1} />
              Publish
            </button>
            {/* 个人中心/登录 */}
            <div className="relative">
              {!isLoading && !isAuthenticated ? (
                <button
                  className="btn-secondary h-8.5 flex items-center gap-2"
                  onClick={() => loginWithRedirect()}
                >
                  <LogIn size={16} stroekeWidth={1} />
                  Login
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="dropdown-select flex items-center h-8.5"
                  >
                    <span
                      className="truncate rounded-full text-sm"
                      title={user?.name || user?.email || 'User'}
                      style={{ maxWidth: 96, display: 'inline-block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                    >
                      {user?.name
                        ? (user.name.length > 16 ? user.name.slice(0, 16) + '…' : user.name)
                        : (user?.email || 'User')}
                    </span>
                    <img
                      src={user?.picture || "https://api.dicebear.com/9.x/bottts/svg?seed=User"}
                      alt={user?.name || "User"}
                      className="w-7 h-7 rounded-full"
                    />
                  </button>
                  {/* 下拉菜单 */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 py-2 z-50 dropdown-menu">
                      <button className="block w-full text-left px-4 py-2 dropdown-item">
                        Profile
                      </button>
                      <button className="dropdown-menu-item">
                        My Posts
                      </button>
                      <hr className="dropdown-menu-divider" />
                      <button
                        className="dropdown-menu-item roboto-mono-semibold text-red-400 hover:text-red-500 hover:bg-red-50"
                        onClick={() => logout({ returnTo: window.location.origin })}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        {/* 移动端下拉菜单 */}
        {isMobileMenuOpen && (
          <div className="block md:hidden absolute left-0 right-0 top-16 z-50 dropdown-menu">
            <nav className="flex flex-col items-start px-6 py-4 space-y-2">
              <NavLink id="template">Templates</NavLink>
              <NavLink id="platform">Platforms</NavLink>
              <NavLink id="mcp">MCP</NavLink>
              <button
                className="roboto-mono-light btn-primary w-full text-left my-2 gap-2"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onNavigate('publish');
                }}
              >
                <Fan size={16} stroekeWidth={1} />
                Publish
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
