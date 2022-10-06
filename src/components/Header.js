import AppContext from "../contexts/AppContext";
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';

export default function Header() {
  const navigate = useNavigate();

  function handleLogout() {
    firebase.auth().signOut();
    navigate('/login');
  }

  const { user } = useContext(AppContext);

  return (
    <div>
      <h2>Welcome, {user?.displayName}</h2>
      <h2>uid: {user?.uid}</h2>

      <img src={user?.photoURL} alt={`display image for ${user?.displayName}`} /> 

      <button onClick={handleLogout}>Sign Out</button>
    </div>
  )
}