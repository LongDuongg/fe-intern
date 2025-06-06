import { Routes, Route, HashRouter, Navigate, useNavigate } from "react-router-dom";

import "./App.css";

import { createApis } from "./apis/apis.js";
import { createGuestApis } from "./apis/guest-apis.js";
import { cs } from "./common/chain-services.js";
import { consumeContext, provideContext } from "./common/react/context.js";
import { EmptyFC } from "./common/react/empty-fc.js";
import { Auth } from "./loaders/auth.js";
import { ArticleForm } from "./routes/article/article-form.jsx";
import { Article } from "./routes/article/article.jsx";
import { Home } from "./routes/home/home.jsx";
import { Login } from "./routes/login/login.jsx";
import { Profile } from "./routes/profile/profile.jsx";
import { Setting } from "./routes/setting/setting.jsx";
import { Signup } from "./routes/signup/signup.jsx";

// prettier-ignore
export const App = () => cs(
    ["guestApis", ({}, next) => next(createGuestApis())],
    ({ guestApis }, next) => provideContext("guestApis", guestApis, next),
    ["auth", ({ guestApis }, next) => Auth({ guestApis, next })],
    ({ auth }, next) => provideContext("auth", auth, next),

    ({}, next) => <HashRouter>{next()}</HashRouter>,
    ({}, next) => AppProvider({ next }),
    ({ auth }) => {


        return (
            <Routes>
                <Route path="/" element={Home()} />
                <Route
                    path="/login"
                    element={<RouteProtector requireUnauth>{Login()}</RouteProtector>}
                />
                <Route
                    path="/register"
                    element={<RouteProtector requireUnauth>{Signup()}</RouteProtector>}
                />

                <Route
                    path="/settings"
                    element={<RouteProtector requireAuth>{Setting()}</RouteProtector>}
                />
                <Route
                    path="/editor"
                    element={<RouteProtector requireAuth>{ArticleForm()}</RouteProtector>}
                />
                <Route
                    path="/editor/:slug"
                    element={<RouteProtector requireAuth>{ArticleForm()}</RouteProtector>}
                />
                <Route
                    path="/article/:slug"
                    element={<RouteProtector requireAuth>{Article()}</RouteProtector>}
                />
                <Route
                    path="/profile/:username"
                    element={<RouteProtector requireAuth>{Profile()}</RouteProtector>}
                />
                <Route
                    path="/profile/:username/favorite"
                    element={<RouteProtector requireAuth>{Profile()}</RouteProtector>}
                />
            </Routes>
        );
    }
);

const AppProvider = ({ next }) => {
    return cs(
        consumeContext("auth"),
        ({}, next) => EmptyFC({ next }),
        ["navigate", ({}, next) => next(useNavigate())],

        // prettier-ignore
        ({ auth, navigate }, next) => provideContext( "apis", createApis({
                onUnauthen: (message) => {
                    // auth.logout();
                    // navigate("/login");
                    window.alert(message);
                },
                token: auth.user?.token,
            }),
            next
        ),
        ({}) => next()
    );
};

const RouteProtector = ({ children, requireAuth, requireUnauth }) => {
    return cs(consumeContext("auth"), ({ auth }) => {
        if (auth.loading) {
            return "Loading...";
        }

        if (requireAuth) {
            if (auth.user) {
                return children;
            }
            return <Navigate to="/login" />;
        }

        if (requireUnauth) {
            if (!auth.user) {
                return children;
            }
            return <Navigate to="/" />;
        }
    });
};
