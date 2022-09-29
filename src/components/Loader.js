import React from 'react';
import { useTheme } from '../hooks/useTheme';
import './Loader.css'
export default function Loader() {
    const { color } = useTheme()
  return (
    <div className='loader'>
      <div className='load' style={{ backgroundColor: color }}></div>
      <div className='load' ></div>
    </div>
  );
}
