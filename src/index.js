import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
//import { AppProvider } from "./AppContext";
import SearchContextProvider from "./context/SearchContext";
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import { AuthContextProvider } from "./context/AuthContext";


ReactDOM.render(
  <React.StrictMode>
    {/* <AppProvider> */}
    <AuthContextProvider>
    <SearchContextProvider>
    <BrowserRouter>
      
          <App />
   
      </BrowserRouter>
    </SearchContextProvider>
    {/* </AppProvider> */}
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
