import "./App.css";
import { Routes, Route } from "react-router-dom";

import { Home } from "./routes/home/home.jsx";
import { Login } from "./routes/login/login.jsx";
import { Signup } from "./routes/signup/signup.jsx";
import { Setting } from "./routes/setting/setting.jsx";
import { Article } from "./routes/article/article.jsx";
import { ArticleForm } from "./routes/article/article-form.jsx";
import { Profile } from "./routes/profile/profile.jsx";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/settings" element={<Setting />} />
      <Route path="/editor" element={<ArticleForm />} />
      <Route path="/editor/:slug" element={<ArticleForm />} />
      <Route path="/article/:slug" element={<Article />} />
      <Route path="/profile/:username" element={<Profile />} />
      <Route path="/profile/:username/favorite" element={<Profile />} />
    </Routes>
  );
};
