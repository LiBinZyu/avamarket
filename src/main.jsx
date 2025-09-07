import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index";

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

/**
 * 自动定时刷新页面：每小时自动刷新一次，避免长时间运行导致 preview 崩溃。
 * 仅在前端页面层面生效，不影响后端或 dev server。
 */
try {
    const now = new Date();
    const hourKey = now.toISOString().slice(0, 13); // 'YYYY-MM-DDTHH'
    if (localStorage.getItem('autoRefreshHour') !== hourKey) {
      localStorage.setItem('autoRefreshHour', hourKey);
      window.location.reload();
    }
  } catch (e) {
    // ignore
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          audience,
          redirect_uri: window.location.origin,
        }}
      >
        <Provider store={store}>
          <App />
        </Provider>
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>
);
