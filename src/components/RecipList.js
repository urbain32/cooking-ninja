// styles
import './RecipeList.css'
import deleteIcon from '../assets/delete-icon.svg'
import React from "react";
import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import {projectFirestore} from '../firebase/config'
export default function RecipList({ recipes }) {
  const {color,mode}=useTheme()
  if (recipes.length === 0) {
    return <div className="error">No recipes to load ...</div>  
  }
  const handleDelete = (id) => {
    projectFirestore.collection('recipes').doc(id).delete()
  }
    return (
      <div className='recipe-list'>
        {recipes.map((recipe) => (
          <div className={`card ${mode}`} key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.cookingTime} to make.</p>
            <div>{recipe.method.substring(0, 100)}...</div>
            <Link to={`/recipes/${recipe.id}`} style={{ color: color }}>
              Cook this
            </Link>
            <img
              className='delete'
              src={deleteIcon}
              alt='delete'
              onClick={() => handleDelete(recipe.id)}
              style={{
                filter: mode === 'dark' ? 'invert(100%)' : 'invert(20%)',
              }}
            />
          </div>
        ))}
      </div>
    );
}
