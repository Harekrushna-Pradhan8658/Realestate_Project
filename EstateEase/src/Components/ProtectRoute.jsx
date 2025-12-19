import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom';

const ProtectRoute = ({ children }) => {


  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  if (!user){
    return <Navigate to="/login" replace/>;
  }

  return children;
}

export default ProtectRoute;