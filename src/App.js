import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy, createContext, useState } from "react";

const LoginLazy = lazy(() => import("./components/Login/Login"));
const ProtectedLazy = lazy(() => import("./components/Protected/Protected"));
const RegisterLazy = lazy(() => import("./components/Register/Register"));

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div>
        <BrowserRouter>
          <Suspense fallback={<h1>Loading...</h1>}>
            <Routes>
              <Route path="/" element={<LoginLazy />} />
              <Route path="/protected" element={<ProtectedLazy />} />
              <Route path="/register" element={<RegisterLazy />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
