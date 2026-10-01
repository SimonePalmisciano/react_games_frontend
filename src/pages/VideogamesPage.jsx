import { useState, useEffect } from "react"




function VideogamesPage() {
    const [videogames, setVideogames] = useState([]);
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchTitle, setSearchTitle] = useState('');
    const [searchReleaseDate, setSearchReleaseDate] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');

    useEffect(() => {
        const fetchApiData = async () => {
            try {
                const apiUrlGames = import.meta.env.VITE_API_URL_GAMES;
                const apiUrlGenres = import.meta.env.VITE_API_URL_GENRES;

                const [gamesResponse, genresResponse] = await Promise.all([
                    fetch(`${apiUrlGames}`),
                    fetch(`${apiUrlGenres}`)
                ]);

                const gamesData = await gamesResponse.json();
                const genresData = await genresResponse.json();

                setVideogames(gamesData.data);
                setGenres(genresData.data);
            }
            catch {
                console.error("Errore nel recupero dei dati dall'API:");
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
            <div className="container py-5">
                {/* Titolo della Pagina */}
                <h1 className="mb-4 text-center">Catalogo Videogiochi</h1>

                {/* Sezione Filtri di Ricerca */}
                <div className="card shadow-sm p-4 mb-5 bg-light border-0">
                    <h5 className="mb-3 text-secondary">Filtra la ricerca</h5>
                    <div className="row g-3">
                        {/* Filtro per Nome */}
                        <div className="col-md-4">
                            <label htmlFor="searchTitle" className="form-label fw-bold">Nome Videogioco</label>
                            <input
                                type="text"
                                id="searchTitle"
                                className="form-control"
                                placeholder="Cerca per titolo..."
                                value={searchTitle}
                                onChange={(event) => setSearchTitle(event.target.value)}
                            />
                        </div>

                        {/* Filtro per Genere */}
                        <div className="col-md-4">
                            <label htmlFor="selectGenre" className="form-label fw-bold">Genere</label>
                            <select
                                id="selectGenre"
                                className="form-select"
                                value={selectedGenre}
                                onChange={(event) => setSelectedGenre(event.target.value)}
                            >
                                <option value="">Tutti i generi</option>
                                {genres.map((genre) => (
                                    <option key={genre.id} value={genre.id}>
                                        {genre.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Filtro per Data di Uscita */}
                        <div className="col-md-4">
                            <label htmlFor="searchDate" className="form-label fw-bold">Data / Anno di Uscita</label>
                            <input
                                type="text"
                                id="searchDate"
                                className="form-control"
                                placeholder="Es. 2026 o 2026-06"
                                value={searchReleaseDate}
                                onChange={(event) => setSearchReleaseDate(event.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Sezione Griglia Card Videogiochi */}
                {filteredVideogames.length === 0 ? (
                    <div className="alert alert-warning text-center py-4" role="alert">
                        Nessun videogioco corrisponde ai filtri selezionati.
                    </div>
                ) : (
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {filteredVideogames.map((game) => (
                            <div className="col" key={game.id}>
                                <div className="card h-100 shadow-sm border-0">
                                    {/* Se hai un'immagine nel database puoi metterla qui, altrimenti un placeholder */}
                                    <div className="bg-secondary text-white d-flex align-items-center justify-content-center" style={{ height: "180px" }}>
                                        <span className="fs-5 fw-bold">{game.title}</span>
                                    </div>
                                    <div className="card-body d-flex flex-column">
                                        <div className="mb-2">
                                            <span className="badge bg-primary">
                                                {game.genre ? game.genre.name : "Genere non specificato"}
                                            </span>
                                        </div>
                                        <p className="card-text text-muted small flex-grow-1">
                                            {game.description ? game.description.substring(0, 100) + "..." : "Nessuna descrizione disponibile."}
                                        </p>
                                        <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                                            <small className="text-muted">Uscita: {game.release_date || "N.D."}</small>
                                            {/* Esempio di bottone per i dettagli futuri */}
                                            <button className="btn btn-outline-dark btn-sm">Dettagli</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}
export default VideogamesPage