import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from "react-router-dom";
import{Routes, Route} from "react-router-dom";
import LandingPage from './LandingPage/LandingPage';
import Profile from './Profile/Profile';
import Home from './Home/Home';
import { profile_path, authorization_scope, authorization_domain, authorization_client_id, authorization_audience, about_path, home_path, text_entry_path, data_view_path } from './constants';
import { Auth0Provider } from "@auth0/auth0-react";
import HealthDataInput from './HealthDataInput/HealthDataInput';
import DataView from './DataView.js/DataView';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain={authorization_domain}
    clientId={authorization_client_id}
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: authorization_audience,
      scope: authorization_scope
    }}
  >
  <React.StrictMode>
    <Router>
    <App />
      <Routes>
        <Route path="/" element={<LandingPage/>}></Route>
        <Route path={text_entry_path} element={<HealthDataInput/>}></Route>
        <Route path={data_view_path} element={<DataView/>}></Route>
        <Route path={about_path} element={<LandingPage/>}></Route>
        <Route path={profile_path} element={<Profile/>}></Route>
        <Route path={home_path} element={<Home />}></Route>
      </Routes>
    </Router>
  </React.StrictMode>
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
