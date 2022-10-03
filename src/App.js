import './App.css';

import Login from './components/Login';
import FormCreateStats from './components/FormCreateStats';
import FormCreateSeason from './components/FormCreateSeason';
import FormDisplaySeason from './components/FormDisplaySeason';
import FormSelectSplit from './components/FormSelectSplit';
import { Routes, Route } from 'react-router-dom';
import AppContext from './contexts/AppContext';
import { useContext } from 'react';

function App() {

  const {user} = useContext(AppContext)
  
  return (
    <div className="App">
      <Login></Login>
      {user ? <FormCreateSeason /> : null}

      <Routes>

        
        {/* Only display this if no seasons exist currently */}
        {/* <Route path="season/" element={} /> */}
        <Route path="season/:seasonID" element={<FormDisplaySeason />} />

      </Routes>

      {/* Only display this after creating a season, or if seasons already exist (i.e. path is /seasonNumber) */}
      {/* <FormSelectSeason /> */}

      {/* Only display this after selecting a season */}
      {/* <FormSelectSplit /> */}
      
      {/* <FormCreateStats /> */}
    </div>
  );
}

export default App;
