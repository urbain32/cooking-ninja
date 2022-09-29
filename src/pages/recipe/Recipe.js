import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Loader from '../../components/Loader';
import { projectFirestore } from '../../firebase/config';
import { useTheme } from '../../hooks/useTheme';
// Styles css
import './Recipe.css';

export default function Recipe() {
  const { id } = useParams();
  const { mode,color} = useTheme();
  const [recipe, setRecipe] = useState(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setPending(true);
    const unSub =   projectFirestore
      .collection('recipes')
      .doc(id)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setPending(false)
          setRecipe(doc.data())
        } else {
          setPending(false)
          setError('Could not find the recipe')
        }
      })
    return ()=>unSub()
  }, [id]);
  const handleUpdate = () => {
    projectFirestore.collection('recipes').doc(id).update({
      title:'Something new' // we are updating the title of this id to something new
    })
  }
  return (
    <div className={`recipe ${mode}`}>
      {error && <p className='error'>{error}</p>}
      {pending && (
        <div className='loading'>
          <Loader />
        </div>
      )}
      {recipe && (
        <>
          <h2 className='page-title'>{recipe.title}</h2>
          <p>{recipe.cookingTime} to make</p>

          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
          <p>{recipe.method}</p>
          <button onClick={handleUpdate} style={{ background: color }}>
            Update Me
          </button>
        </>
      )}
    </div>
  );
}
