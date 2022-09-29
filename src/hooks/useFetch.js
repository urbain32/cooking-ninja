import { useState, useEffect } from 'react';

export const useFetch = (url,method='GET') => {
  const [data, setData] = useState(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState(null);
  const postData = (postData) => {
    setOptions({
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify(postData)
    })
  }

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async (fetchOptions) => {
      setPending(true);

      try {
        const res = await fetch(url, {...fetchOptions,signal: controller.signal });
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const data = await res.json();

        setPending(false);
        setData(data);
        setError(null);
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('the fetch was aborted');
        } else {
          setPending(false);
          setError('Could not fetch the data');
        }
      }
    }

    if (method ==='GET') {
    fetchData()
    }
    if (method === 'POST' && options) {
      fetchData(options)
    }
    return () => {
      controller.abort();
    };
  }, [url,options,method]);

  return { data, pending, error,postData };
};
