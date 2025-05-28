import { Routes, Route, HashRouter, Navigate } from "react-router-dom";

import "./App.css";

import { createApis } from "./apis/apis.js";
import { cs } from "./common/chain-services.js";
import { provideContext } from "./common/react/context.js";
import { Auth } from "./loaders/auth.js";
import { ArticleForm } from "./routes/article/article-form.jsx";
import { Article } from "./routes/article/article.jsx";
import { Home } from "./routes/home/home.jsx";
import { Login } from "./routes/login/login.jsx";
import { Profile } from "./routes/profile/profile.jsx";
import { Setting } from "./routes/setting/setting.jsx";
import { Signup } from "./routes/signup/signup.jsx";

export const App = () =>
  cs(
    ["auth", ({}, next) => Auth({ next })],
    ({ auth }, next) => provideContext("auth", auth, next),
    ({ auth }, next) =>
      provideContext("apis", createApis({ onUnauthen: auth.clear }), next),
    ({ auth }) => {
      // console.log(auth.user);
      const requireAuth = (element) => {
        if (auth.user) {
          return element;
        }
        return <Navigate to="/login" />;
      };
      const requireUnauth = (element) => {
        if (!auth.user) {
          return element;
        }
        return <Navigate to="/" />;
      };

      return (
        <HashRouter>
          <Routes>
            <Route path="/" element={Home()} />
            <Route path="/login" element={requireUnauth(Login())} />
            <Route path="/register" element={requireUnauth(Signup())} />

            <Route path="/settings" element={requireAuth(Setting())} />
            <Route path="/editor" element={requireAuth(ArticleForm())} />
            <Route path="/editor/:slug" element={requireAuth(ArticleForm())} />
            <Route path="/article/:slug" element={requireAuth(Article())} />
            <Route path="/profile/:username" element={requireAuth(Profile())} />
            <Route
              path="/profile/:username/favorite"
              element={requireAuth(Profile())}
            />
          </Routes>
        </HashRouter>
      );
    }
  );
