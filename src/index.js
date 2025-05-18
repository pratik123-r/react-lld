import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProfileList from './components/pages/Profile/ProfileList';
import ProfileDetails from './components/pages/Profile/ProfileDetails';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, 
    children: [
      {
        path: 'profiles',
        element: <ProfileList/>,
      },
      {
        path: 'profiles/:id',
        element: <ProfileDetails/>
      }
    ]

  }
])
root.render(
  // <React.StrictMode>
  <RouterProvider router={router}></RouterProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
