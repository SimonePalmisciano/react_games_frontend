import { useState, useEffect } from "react"




function VideogamesPage() {
    const [videogames, setVideogames] = useState([]);
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApiData = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL;

                const [gamesResponse, genresResponse] = await Promise.all([
                    fetch(`${apiUrl}/videogames`),
                    fetch(`${apiUrl}/genres`)
                ]);

                const gamesData = await gamesResponse.json();
                const genresData = await genresResponse.json();

                setVideogames(gamesData.data);
                setGenres(genresData.data);
            }
            catch {
                console.error("Errore nel recupero dei dati dall'API:", error);
            }
            finally {
                setLoading(false);
            }
        };

        fetchApiData();
    }, [])

    if (loading) {
        return (
            <div className="container text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Caricamento...</span>
                </div>
                <p className="mt-3 text-muted">Caricamento del catalogo in corso...</p>
            </div>
        );
    }

    return (
        <>

        </>
    )
}
export default VideogamesPage