import AppContext from "../contexts/AppContext";
import { useContext } from "react";

export default function Header() {
  const { user, handleLogout } = useContext(AppContext);

  return (
    <div>
      <h2>Welcome, {user?.displayName}</h2>

      <img src={user?.photoURL} alt={`display image for ${user?.displayName}`} /> 

      <button onClick={handleLogout}>Sign Out</button>
    </div>
  )
}