import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MoviesContextProvider } from "./contexts/MoviesContext.tsx";
import { MovieContextProvider } from "./contexts/MovieContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MoviesContextProvider>
      <MovieContextProvider>
        <App />
      </MovieContextProvider>
    </MoviesContextProvider>
  </React.StrictMode>
);
