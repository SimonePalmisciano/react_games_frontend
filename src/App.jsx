import { BrowserRouter, Route, Routes } from "react-router";
import HomaPage from "./pages/HomaPage";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route Component={LayoutPage}> */}
          <Route index Component={HomaPage} />
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </>

  )
}
export default App;
