// Styling
import './App.css';
import 'firebaseui/dist/firebaseui.css'

// React Hooks
import { useEffect } from 'react';

// Context
import AppContext from './AppContext';
import { useContext } from 'react';

// Authentication
// https://firebase.google.com/docs/auth/web/manage-users
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Components
import FirebaseAuthContainer from './FirebaseAuthContainer';

function App() {
  
  const auth = getAuth();
  const {user, setUser} = useContext(AppContext)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [])



  return (
    <div className="App">
      <h1>Welcome to My Awesome App</h1>
      {/* <div id="firebaseui-auth-container"></div> */}
      <FirebaseAuthContainer></FirebaseAuthContainer>
      <div id="loader">Loading...</div>
      <div>{user ? user.uid : 'no uid'}</div>
    </div>
  );
}

export default App;
