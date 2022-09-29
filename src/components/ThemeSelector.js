import React from 'react';
import { useTheme } from '../hooks/useTheme';
import './ThemeSelector.css';
import modeIcon from '../assets/mode-icon.svg';
export default function ThemeSelector() {
  const themeColors = ['#58249c', '#249c6b', '#b70233'];
  const { changeColor, changeMode, mode } = useTheme();
  const handleToggle = () => {
    changeMode(mode==='dark'?'light':'dark')
  }
  return (
    <div className='theme-selector'>
      <div className='mode-toggle'>
        <img
          src={modeIcon}
          onClick={handleToggle}
          alt='dark and light mode toggle '
          style={{ filter: mode === 'dark' ? 'invert(100%)' : 'invert(20%)' }}
        />
      </div>
      <div className='theme-buttons'>
        {themeColors.map((color) => (
          <div
            key={color}
            onClick={() => changeColor(color)}
            style={{ background: color }}
          />
        ))}
      </div>
    </div>
  );
}
