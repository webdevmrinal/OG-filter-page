import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="bg-zinc-200 p-4 h-screen w-screen">
      <App />
    </div>
  </React.StrictMode>
);
