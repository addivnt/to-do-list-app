import React from "react";
import BrowserRouter from "./Components/Routing/BrowserRouter/BrowserRouter.tsx";
import Navbar from "./Components/UI/Navbar/Navbar.tsx";
import Lists from "./Pages/Lists/Lists.tsx";
import Route from "./Components/Routing/Route/Route.tsx";
import Home from "./Pages/Home/Home.tsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Route path="/">
        <Home />
      </Route>
      <Route path="/lists">
        <Lists />
      </Route>
      <Route path="/lists/:id">
        <p>Specific list</p>
      </Route>
      <Route path="/notes">
        <p>Notes here, soon :p</p>
      </Route>
    </BrowserRouter>
  );
}

export default App;
