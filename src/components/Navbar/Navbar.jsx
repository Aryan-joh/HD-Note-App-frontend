import React, { useState } from 'react';
import ProfileInfo from '../Cards/ProfileInfo';
import { useNavigate } from 'react-router-dom';
import Searchbar from '../Searchbar/Searchbar';
import noteIcon from '../../assets/note-icon.png'; // ✅ import your icon

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
      
      {/* ✅ Title with Icon */}
      <div className='flex items-center gap-2'>
        <img
          src={noteIcon}
          alt="Notes Icon"
          className="w-6 h-6 object-contain"
        />
        <h2 className='text-xl font-medium text-black py-2'>HD</h2>
      </div>

      <Searchbar
        value={searchQuery}
        onChange={({ target }) => setSearchQuery(target.value)}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />

      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  );
};

export default Navbar;
