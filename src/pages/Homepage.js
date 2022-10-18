// components
import Header from "../components/Header";
import FormCreateSeason from "../components/FormCreateSeason";
import FormDisplaySeason from "../components/FormDisplaySeason";
import FormSelectSplit from "../components/FormSelectSplit";
import FormCreateStats from "../components/FormCreateStats";

import AppContext from "../contexts/AppContext";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate('/login');
    }
  }, [])

  // Helper function to pad season number for alphabetic ordering
  const padStart = (num) => {
    return num.toString().padStart(3, "0")
  }

  return (
    <div>
      <Header />
      <FormCreateSeason />
      <FormDisplaySeason />
      {/* <FormSelectSplit /> */}
      {/* <FormCreateStats /> */}
    </div>
  )
}

