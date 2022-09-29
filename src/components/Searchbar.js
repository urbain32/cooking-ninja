import React, { useState } from 'react';
import { useHistory } from 'react-router';
// Styles
import './Searchbar.css';
export default function Searchbar() {
  const [term, setTerm] = useState('');
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?q=${term}`);
  };
  return (
    <div className='searchbar'>
      <form onSubmit={handleSubmit}>
        <label>Search:</label>
        <input
          type='text'
          onChange={(e) => setTerm(e.target.value)}
          id='search'
          required
        />
      </form>
    </div>
  );
}
