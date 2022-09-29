import {  useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {projectFirestore} from '../../firebase/config'
import { useTheme } from '../../hooks/useTheme';

// Styles css
import './Create.css';

export default function Create() {
  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [newIngredient, setNewIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const ingredientInput = useRef(null);
  const redirect = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const doc = {title,ingredients,method,cookingTime: cookingTime + ' minutes'};
    try {
      await projectFirestore.collection('recipes').add(doc)
      redirect.push('/')
    } catch (err) {
      console.log(err);
    }
  };
  const handleAdd = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();
    if (ing && !ingredients.includes(ing)) {
      setIngredients((prevIngredients) => [...prevIngredients, ing]);
    }
    setNewIngredient('');
    ingredientInput.current.focus();
  };


  const { mode, color } = useTheme();
  return (
    <div className={`create ${mode}`}>
      <h2 className='page-title'>Add a new Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe Title: </span>
          <input
            type='text'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        {/* Ingredients go Here */}

        <label>
          <span>Recipe ingredients:</span>
          <div className='ingredients'>
            <input
              type='text'
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button
              className='btn'
              onClick={handleAdd}
              style={{ background: color }}
            >
              add
            </button>
          </div>
        </label>
        <p>
          Current Ingredient:{' '}
          {ingredients.map((i) => (
            <em key={i}>{i},</em>
          ))}
        </p>

        <label>
          <span>Recipe Method: </span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>
        <label>
          <span>Cooking Time minutes: </span>
          <input
            type='number'
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>
        <button className='btn' style={{ background: color }}>
          {' '}
          Submit
        </button>
      </form>
    </div>
  );
}
