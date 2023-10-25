import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// for authentication
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-rq7hhg7f13cj0mrg.us.auth0.com"
      clientId="t17GJgK2wOh7E1JReo2MYeQy8j3DfoPG"
      authorizationParams={{
        redirect_uri: "http://localhost:5173"
      }}
      audience="http://localhost:8000"
      scope="openid profile email"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);

