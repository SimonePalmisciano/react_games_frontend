import { BrowserRouter, Route, Routes } from "react-router";
import HomaPage from "./pages/HomaPage";
import MainLayout from "./layouts/MainLayout";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route Component={MainLayout}>
          <Route index Component={HomaPage} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>

  )
}
export default App;
