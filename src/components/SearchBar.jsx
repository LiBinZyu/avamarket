import React, { useState } from 'react';

const SearchBar = ({ onSearch, placeholder = "搜索模板、平台或MCP..." }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="flex justify-center py-8">
      <form onSubmit={handleSubmit} className="relative w-full max-w-2xl">
        <div className="search-bar">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-icon-hint mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={placeholder}
              className="flex-1 bg-transparent outline-none text-primary-font placeholder-secondary-font"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="ml-3 p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <svg className="w-4 h-4 text-icon-hint" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
