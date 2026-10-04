import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout.jsx";
import HomaPage from "./pages/HomaPage.jsx";
import VideogamesPage from "./pages/VideogamesPage.jsx"
import VideogameDetailPage from "./pages/VideogameDetailPage.jsx"


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route Component={MainLayout}>
            <Route index Component={HomaPage} />
            <Route path="/videogames" Component={VideogamesPage} />
            <Route path="/videogames/:id" Component={VideogameDetailPage} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>

  )
}
export default App;
