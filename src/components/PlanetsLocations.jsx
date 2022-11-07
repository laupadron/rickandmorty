import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Residents from './Residents';
import RingLoader from "react-spinners/RingLoader";
import SearchPage from './SearchPage';


const PlanetsLocations = () => {

  const [location, setLocation] = useState({});
  const [planetId, setPlanetId] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState({});

  const appi = "https://rickandmortyapi.com/api/location"
  const locRandom = Math.floor(Math.random() * 126) + 1;

  useEffect(() => {
    axios.get(`${appi}/${locRandom}`).then(res => setLocation(res.data)).then(() => { setLoading(false) });
    axios.get(`${appi}?page=1`).then(res => setPage(res.data.results))
  }, [])

  const searchId = () => {

    planetId < 126 && planetId > 0 && planetId != 0 ?
      axios.get(`https://rickandmortyapi.com/api/location/${planetId}`)
        .then(res => setLocation(res.data)).then(() => setPlanetId("")) :
      alert("ID INEXISTENTE - (válidos del 1 al 126)");

  }

  const search = (e) => {
    axios.get(`${appi}/${e}`).then(res => setLocation(res.data)).then(() => setPlanetId(""))
  }

  return (
    <>
      {loading ?
        <RingLoader
          className='loading-screen'
          color="#3bae44"
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        :
        <div className='planets-locations'>
          <header>
          </header>
          <main>
            <div className="planet-info">
              <div className='planet1'>
                <div>
                  <h2>Planet name:</h2>
                  <p>{location.name}</p>
                </div>
                <div>
                  <h2>Tipo:</h2>
                  <p>{location.type}</p>
                </div>
              </div>
              <div className='planet2'>
                <div>
                  <h2>Dimension:</h2>
                  <p>{location.dimension}</p>
                </div>
                <div>
                  <h2>Poblacion:</h2>
                  <p>{location.residents?.length}</p>
                </div>
              </div>
            </div>
            <div className='input'>
              <div className="searchBox">
                <input
                  type="text"
                  value={planetId}
                  onChange={e => setPlanetId(e.target.value)} placeholder="Enter name or ID (1-126)" />
                <div className="suggestions">
                  {planetId &&
                    page.map((p) => (
                      <SearchPage
                        key={p?.name}
                        p={p}
                        search={search}
                        planetId={planetId} />
                    ))
                  }
                </div>
              </div>
              <button onClick={searchId}>Search</button>
            </div>
            <div>
              <ul className='cards'>
                {location.residents?.map(residents => (
                  <Residents url={residents} key={residents} />
                ))}
              </ul>
            </div>
          </main>
          <footer>
           <h2 >Made with Passion <i class="fa-solid fa-heart-circle-bolt"></i> by GhostCode</h2>
           <div className='footer'>
            <h2>Elio Maure</h2>
            <h2>Matias Barengo</h2>
            <h2>Laura Padrón</h2>
            <h2>Oscar Ardila</h2>
           </div>       
          </footer>
          
         
        </div>
      }
    </>

  );
};

export default PlanetsLocations;