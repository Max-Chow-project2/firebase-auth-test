import './App.css';
import { useState, useEffect } from 'react';

import firebaseApp from './firebase';
// https://firebase.google.com/docs/auth/web/manage-users
import { onAuthStateChanged } from 'firebase/auth';

import Login from './components/Login';

function App() {
  const [user, setUser] = useState('');

  useEffect(() => {
    onAuthStateChanged(firebaseApp.auth(), (user) => {
      //user.email to get their email
      //user.uid to get their unique id
      setUser(user.uid);
    })
  }, [])
  
  return (
    <div className="App">
      <Login auth={firebaseApp.auth()} user={user}/>
    </div>
  );
}

export default App;
