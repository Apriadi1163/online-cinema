import React, {useContext, useEffect} from "react";
import { Routes, Route, useNavigate } from "react-router-dom"
import { UserContext } from "./context/userContext"; 

// import NavbarAuth from "./Navbar/NavbarAuth";
import LandingPage from "./Page/LandingPage";
import LandingHome from "./Page/LandingHome";
import MyListFilm from "./Page/MyListFilm";
import DetailFilm from "./Page/DetailFilm";
import DetailFilmAfter from "./Page/DetailFilmAfter";
import Profile from "./Page/Profile";
import ListTransaction from "./Page/ListTransaction";
import AddFilm from "./Page/AddFilm";
import ComplainUser from "./Page/ComplainUser";
import ComplainAdmin from "./Page/ComplainAdmin";

import { API, setAuthToken } from "./config/api"

if (localStorage.token){
  setAuthToken(localStorage.token)
}

function App() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    // Redirect Auth
    if (state.isLogin === false) {
      navigate('/landing');
    } else {
      if (state.user.status === 'admin') {
        navigate('/list-transaction');
      } else if (state.user.status === 'customer') {
        navigate('/');
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }

      // Get user data
      let payload = response.data.data.user;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      checkUser();
    }
  }, []);
  return (
    <Routes>
      <Route exact path="/" element={<LandingHome />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/mylist" element={<MyListFilm />} />
      <Route path="/detail/:id" element={<DetailFilm />} />
      <Route path="/detail-after/:id" element={<DetailFilmAfter />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/list-transaction" element={<ListTransaction />} />
      <Route path="/add-film" element={<AddFilm />} />
      <Route path="/complain-user" element={<ComplainUser />} />
      <Route path="/complain-admin" element={<ComplainAdmin />} />
    </Routes>
  );
}

export default App;
