import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchInput = (e.target as HTMLFormElement).querySelector('input') as HTMLInputElement;
    if (searchInput?.value.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput.value)}`);
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="player-controls">
          <button>⏮</button>
          <button>⏯</button>
          <button>⏭</button>
          <button>♡</button>
        </div>
        <div className="logo">
          <Link to="/">last.fm</Link>
        </div>
        <nav className="nav">
          <div className="search-tabs" id="search-tabs"></div>
          
          <div className="search-bar">
            <form className="search-form" onSubmit={handleSearch}>
              <input 
                type="text" 
                className="search-input" 
                placeholder="Search for music..." 
              />
              <button type="reset" className="clear-btn">×</button>
              <button type="submit" className="search-btn">🔍</button>
            </form>
            <div className="upgrade-note">
              Don't want to see ads? <a href="#">Upgrade Now</a>
            </div>
          </div>
          
          <Link to="/">Home</Link>
          <a href="#">Live</a>
          <Link to="/">Music</Link>
          <a href="#">Charts</a>
          <a href="#">Events</a>
          <a href="#">Features</a>
          <div className="user-avatar"></div>
        </nav>
      </div>
    </header>
  );
};

export default Header;