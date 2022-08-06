import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
} from 'react-router-dom';
import { AuthContext } from './helpers/AuthContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Userapp from './components/user/Userapp';
import Registration from './components/Registration';
import Login from './components/Login';
import NoPage from './components/NoPage';
import { useNavigate, useParams } from "react-router-dom";

function App() {
 
  const[authState, setAuthState]= useState({username: "", id:0, status:false});
  
  useEffect(()=>{
    axios.get("http://localhost:3001/user/token", {headers:{
      accessToken:localStorage.getItem('accessToken')
    }}).then((response)=>{
      if(response.data.error){
        setAuthState({username: "", id:0, status:false});
      }else{
        setAuthState({
          username: response.data.username, 
          id:response.data.id, 
          status:true
        });
      }
    })
      
    
  }, [])
  const logout=()=>{
    localStorage.removeItem("accessToken");
    localStorage.removeItem("id");
    setAuthState({username: "", id:0, status:false});
    
  }
  return (
    <div className="App">
    <AuthContext.Provider value={{authState, setAuthState}}>
      <Router>
        <div className='nav'>
          
          {!authState.status ?(<>
          <Link to="/login">Login</Link>
          <Link to="/registration">Registraion</Link>
          
          </>): (<>
            <Link to="/userapp">Users</Link>
            <p className='useapp'>Login: <b>{authState.username}</b></p>
            <button onClick={logout}>Logout</button>

            </>
          )}
          
        </div>
        <Routes>
        {!authState.status ?(<>
           <Route path="/login" element={<Login/>}/>
          <Route path="/registration" element={<Registration/>}/>
          </>): (<>
          <Route path="/userapp" element={<Userapp/>}/>
         </>)}
         <Route path="*" element={<NoPage />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  </div>
  );
}

export default App;
