import { projectFirestore } from '../../firebase/config';
// Styles css
import './Home.css';
// Component
import RecipList from '../../components/RecipList';
import { useEffect, useState } from 'react';
import Loader from '../../components/Loader';

export default function Home() {
  const [data, setData] = useState(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    setPending(true);
   const cleanUpFunc =  projectFirestore
      .collection('recipes')
      .onSnapshot((snapshot) => {
        if (snapshot.empty) {
          setError("No recipes to load")
        } else {
          let results = []
          snapshot.docs.forEach(doc => {
            results.push({id:doc.id,...doc.data()})
          })
          setData(results)
          setPending(false)
        }
      }, (err) => {
        setError(err.message)
        setPending(false)
      })
    return () => cleanUpFunc();  // calling our clean up function
  }, []);


  return (
    <div className='home'>
      {error && <p className='error'>{error}</p>}
      {pending && (
        <div className='loading'>
          <Loader />
        </div>
      )}
      {data && <RecipList recipes={data} />}
    </div>
  );
}
