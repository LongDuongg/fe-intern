import "./App.css";
import { Routes, Route } from "react-router-dom";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Home</div>} />
      <Route path="/login" element={<div>Login</div>} />
      <Route path="/register" element={<div>Register</div>} />
      <Route path="/settings" element={<div>settings</div>} />
      <Route path="/editor" element={<div>editor</div>} />
      <Route path="/editor/:slug" element={<div>editor-slug</div>} />
      <Route path="/article/:slug" element={<div>article</div>} />
      <Route path="/profile/:username" element={<div>profile</div>} />
      <Route path="/profile/:username/favorite" element={<div>favorite</div>} />
    </Routes>
  );
};
