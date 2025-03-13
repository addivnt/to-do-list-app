import React, { createContext, useState } from "react";
import { ThemeContextType } from "./contentType.ts";
import BrowserRouter from "./Components/Routing/BrowserRouter/BrowserRouter.tsx";
import Navbar from "./Components/UI/Navbar/Navbar.tsx";
import Lists from "./Pages/Lists/Lists.tsx";
import Route from "./Components/Routing/Route/Route.tsx";
import Home from "./Pages/Home/Home.tsx";

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
});

function App() {
  const [theme, setTheme] = useState("light");

  return (
    <BrowserRouter>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Navbar />
        <Route path="/">
          <Home />
        </Route>
        <Route path="/lists">
          <Lists />
        </Route>
        <Route path="/lists/:id">
          <div className={theme}>
            <p>Specific list</p>
          </div>
        </Route>
        <Route path="/notes">
          <div className={theme}>
            <p>Notes here, soon :p</p>
          </div>
        </Route>
      </ThemeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
export { ThemeContext };
