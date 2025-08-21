import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import PublishPage from './pages/PublishPage';
import Header from './components/Header';
import './App.css';

function App() {
  const [route, setRoute] = useState({ name: 'home' });
  const [activeTab, setActiveTab] = useState('template');

  const navigate = (name, payload) => {
    if (name === 'template' || name === 'platform' || name === 'mcp') {
      setActiveTab(name);
      setRoute({ name: 'home' });
      return;
    }
    setRoute({ name, payload });
  };

  return (
    <div className="App">
      <Header onNavigate={(name) => navigate(name)} activeTab={activeTab} />
      {route.name === 'home' && (
        <HomePage onOpenDetail={(item) => navigate('detail', { item })} />
      )}
      {route.name === 'detail' && (
        <DetailPage item={route.payload.item} type={route.payload.item.projectUrl ? 'platform' : 'template'} onBack={() => navigate('home')} />
      )}
      {route.name === 'publish' && (
        <PublishPage />
      )}
      
    </div>
  );
}

export default App;
