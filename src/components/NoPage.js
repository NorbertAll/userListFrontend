import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";


const NoPage = () => {
  let navigate=useNavigate();
  return <div className="createForm">
    <div className="loginContaine">
    <h2>You're not logged in</h2>
    <Button variant="contained" onClick={()=>navigate(`/login`)}>Login</Button>

    </div>
  </div>;
};

export default NoPage;
