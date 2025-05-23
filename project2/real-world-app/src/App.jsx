import "./App.css";
import { Routes, Route, HashRouter, Navigate } from "react-router-dom";

import { Home } from "./routes/home/home.jsx";
import { Login } from "./routes/login/login.jsx";
import { Signup } from "./routes/signup/signup.jsx";
import { Setting } from "./routes/setting/setting.jsx";
import { Article } from "./routes/article/article.jsx";
import { ArticleForm } from "./routes/article/article-form.jsx";
import { Profile } from "./routes/profile/profile.jsx";

import { cs } from "./common/chain-services.js";
import { provideContext } from "./common/react/context.js";
import { rLsStore } from "./common/react/ls-store.js";


export const App = () => {
  return cs(
    ["auth", ({}, next) => Auth({ next })],
    ({auth}, next) => provideContext("auth", auth, next),
    ({auth}) => {
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

            <Route path="/settings" element={requireAuth( Setting() )} />
            <Route path="/editor" element={requireAuth( ArticleForm() )} />
            <Route path="/editor/:slug" element={requireAuth( ArticleForm() )} />
            <Route path="/article/:slug" element={requireAuth( Article() )} />
            <Route path="/profile/:username" element={requireAuth( Profile() )} />
            <Route path="/profile/:username/favorite" element={requireAuth( Profile() )} />
          </Routes>
        </HashRouter>
      );
    }
  );
};

const Auth = ({ next }) => {
  return cs(
    ["userInfo", rLsStore("user")], 
    ({ userInfo }) => next({
      user: userInfo.value?.user,
      login: (user) => {
        userInfo.onChange(user);
      },
      logout: () => {
        userInfo.onChange(null);
      },
    })
  );
};
