import { useEffect, useState } from 'react';
import Construct from './Construct.js'
import ErrorNotification from './ErrorNotification';
import './App.css';
import MainPage from './MainPage';
import Login from './components/Login';
import SignupForm from './components/Signup';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Nav from './Nav'
import Header from "./components/Header";
import { UserContext } from "./context/UserContext";


function App() {
  // const [launch_info, setLaunchInfo] = useState([]);
  // const [error, setError] = useState(null);  

  // useEffect(() => {
  //   async function getData() {
  //     let url = `${process.env.REACT_APP_API_HOST}/api/launch-details`;
  //     console.log('fastapi url: ', url);
  //     let response = await fetch(url);
  //     console.log("------- hello? -------");
  //     let data = await response.json();

  //     if (response.ok) {
  //       console.log("got launch data!");
  //       setLaunchInfo(data.launch_details);
  //     } else {
  //       console.log("drat! something happened");
  //       setError(data.message);
  //     }
  //   }
  //   getData();
  // }, [])


  return (
    <BrowserRouter>
      <Nav />
        <div className="container">
          <Routes>
      {/* <ErrorNotification error={error} />
      <Construct info={launch_info} /> */}
      {/* <MainPage /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignupForm />} />
          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
