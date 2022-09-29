// Styles
import './Navbar.css';
// end style
import { Link } from 'react-router-dom';
import Searchbar from './Searchbar';
import { useTheme } from '../hooks/useTheme';


// function
export default function Navbar() {
  const {color}=useTheme()
  return (
    <div className='navbar' style={{ background: color }}>
      <nav >
        <Link to='/' className='brand'>
          <h1>Cooking Recipe</h1>
        </Link>
        <Searchbar />
        <Link to='/create'>Create Recipe</Link>
      </nav>
    </div>
  );
}
