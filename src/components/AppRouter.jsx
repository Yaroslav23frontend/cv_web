import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Collection from "../pages/Collection";
import EmailChangedSuccess from "../pages/EmailChangedSuccess";
import PasswordChanged from "../pages/PasswordChanged";
import Reset from "../pages/Reset";
import ResetEmail from "../pages/ResetEmail";
import ResetPassword from "../pages/ResetPassword";
import ResetRequest from "../pages/ResetRequest";
import Settings from "../pages/Settings";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import UserDeleted from "../pages/UserDeleted";
import CurrentCV from "../pages/CurrentCV";
import NotFound from "../pages/NotFound";

export default function AppRouter() {
  const { isAuth } = useAuth();
  console.log(isAuth);
  return (
    <Routes>
      {isAuth ? (
        <>
          <Route path="/cv" element={<Collection />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/resetEmail" element={<ResetEmail />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route exact path="/cv/:id" element={<CurrentCV />} />
          <Route path="" element={<Navigate to="/cv" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/resetMassege" element={<ResetRequest />} />
          <Route path="/emailChanged" element={<EmailChangedSuccess />} />
          <Route path="/passwordChanged" element={<PasswordChanged />} />
          <Route path="/userDeleted" element={<UserDeleted />} />
        </>
      )}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
