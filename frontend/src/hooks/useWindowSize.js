import { useState, useEffect } from 'react';

function useWindowSize() {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (evt) => {
      setWindowSize(evt.target.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
}

export default useWindowSize;
