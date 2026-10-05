import { Outlet } from "react-router";
import Header from "../partials/Header/Header.jsx";
import Footer from "../partials/Footer/Footer.jsx";

function MainLayout() {
    return (
        <div className="d-flex flex-column min-vh-100 bg-main">
            <Header />

            <main className="flex-grow-1">
                <Outlet />
            </main>

            <Footer />
        </div>
    )
}
export default MainLayout