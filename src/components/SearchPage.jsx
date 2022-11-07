import React, { useState, useEffect } from 'react';

const SearchPage = ({ p, planetId, search }) => {

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (p.name?.toLowerCase().includes(planetId.toLowerCase())) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [planetId])

  return (
    <div>
      {isVisible && <div onClick={() => search(p.id)}>{p.name}</div>}
    </div>
  );
};

export default SearchPage;