import {
  Routes,
  Route,
  HashRouter,
  Navigate,
  useNavigate,
} from "react-router-dom";

import "./App.css";

import {createApis}                       from "./apis/apis.js";
import {createGuestApis}                  from "./apis/guest-apis.js";
import {cs}                               from "./common/chain-services.js";
import { consumeContext, provideContext } from "./common/react/context.js";
import {EmptyFC}                          from "./common/react/empty-fc.js";
import {Auth}                             from "./loaders/auth.js";
import {ArticleForm}                      from "./routes/article/article-form.jsx";
import {Article}                          from "./routes/article/article.jsx";
import {Home}                             from "./routes/home/home.jsx";
import {Login}                            from "./routes/login/login.jsx";
import {Profile}                          from "./routes/profile/profile.jsx";
import {Setting}                          from "./routes/setting/setting.jsx";
import {Signup}                           from "./routes/signup/signup.jsx";

export const App = () =>
  cs(
    ["guestApis", ({}, next) => next(createGuestApis())],
    ({ guestApis }, next) => provideContext("guestApis", guestApis, next),
    ["auth", ({guestApis}, next) => Auth({guestApis, next })],
    ({ auth }, next) => provideContext("auth", auth, next),

    ({}, next) => <HashRouter>{next()}</HashRouter>,
    ({}, next) => AppProvider({next}),
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
          <Routes>
              <Route path="/" element={Home()} />
              <Route path="/login" element={requireUnauth(Login())} />
              <Route path="/register" element={requireUnauth(Signup())} />

              <Route path="/settings" element={requireAuth(Setting())} />
              <Route path="/editor" element={requireAuth(ArticleForm())} />
              <Route
                  path="/editor/:slug"
                  element={requireAuth(ArticleForm())}
              />
              <Route path="/article/:slug" element={requireAuth(Article())} />
              <Route
                  path="/profile/:username"
                  element={requireAuth(Profile())}
              />
              <Route
                  path="/profile/:username/favorite"
                  element={requireAuth(Profile())}
              />
          </Routes>

      );
    }
  );

const AppProvider = ({ next }) => {
  return cs(
    ({}, next) => EmptyFC({ next }),
    ["navigate", ({}, next) => next(useNavigate())],
    consumeContext("auth"),
    ({ auth, navigate }, next) =>
      provideContext(
        "apis",
        createApis({
          onUnauthen: (message) => {
            // auth.logout();
            // navigate("/login");
            window.alert(message);
          },
          token: auth.user?.token,
        }),
        next
      ),
    ({}) => next(),
  );
};
