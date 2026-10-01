function Footer() {
    return (
        <footer className="bg-dark text-white text-center py-4 mt-auto border-top border-secondary">
            <div className="container">
                <p className="mb-0 text-secondary" style={{ fontSize: "0.9rem" }}>
                    &copy; {new Date().getFullYear()} VideogameApp. Tutti i diritti riservati.
                </p>
            </div>
        </footer>
    )
}
export default Footer