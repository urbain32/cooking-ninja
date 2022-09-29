import { useLocation } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import RecipeList from '../../components/RecipList'
// Styles css
import './Search.css';
export default function Search() {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get('q');
  const url = 'http://localhost:3003/recipes?q=' + query;
  const { data, pending, error } = useFetch(url);
  return (
    <div>
      <h2 className='page-title'>Recipes including "{query}"</h2>
      {error && <p className='error'>{error}</p>}
      {pending && <p className='loading'>Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}
