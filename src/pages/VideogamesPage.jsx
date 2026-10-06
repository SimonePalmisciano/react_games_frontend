import { useState, useEffect } from "react"
import VideogameCard from "../components/Cards/VideogameCard";

function VideogamesPage() {
    const [videogames, setVideogames] = useState([]);
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);

    // Stati per i campi del form di ricerca
    const [searchTitle, setSearchTitle] = useState('');
    const [searchReleaseDate, setSearchReleaseDate] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');

    const apiUrlGames = import.meta.env.VITE_API_URL_GAMES;
    const apiUrlGenres = import.meta.env.VITE_API_URL_GENRE;

    // console.log('videogiochi:', videogames);
    // console.log('GENERI:', genres);


    // Funzione centralizzata per recuperare i videogiochi (supporta i filtri via query string)

    const fetchFilteredVideogames = async (title = '', genreId = '', releaseDate = '') => {
        try {
            const params = new URLSearchParams(); // URLSearchParams è un interfaccia nativa del browser, ci fornisce
            // metodi per modificare le query string di un URL
            if (title) params.append("title", title); // appendiamo la coppia chiave-valore all URLSearchParams
            if (genreId) params.append("genre_id", genreId);
            if (releaseDate) params.append("release_date", releaseDate);

            // compongo l'endpoint, facendo un controllo sui parametri inviati 
            const url = `${apiUrlGames}${params.toString() ? `?${params.toString()}` : ""}`;

            const response = await fetch(url);
            if (!response.ok) throw new Error("Errore nel recupero dei videogiochi");

            const data = await response.json();
            setVideogames(data.response || data);
        } catch (error) {
            console.error("Errore nella ricerca:", error);
        }
    };

    // Al caricamento iniziale: carica generi e lista completa dei giochi in parallelo
    useEffect(() => {
        const fetchInitialData = async () => {
            // console.log(apiUrlGames);
            // console.log(apiUrlGenres);

            try {
                const [gamesResponse, genresResponse] = await Promise.all([

                    fetch(apiUrlGames),
                    fetch(apiUrlGenres)
                ]);

                if (!gamesResponse.ok || !genresResponse.ok) throw new Error("Errore di caricamento");

                const gamesData = await gamesResponse.json();
                const genresData = await genresResponse.json();

                // console.log("gamesData: ", gamesData);
                // console.log("genresData: ", gamesData);

                setVideogames(gamesData.response);
                setGenres(genresData.response);
            }
            catch (error) {
                console.error("Errore nel recupero dei dati dall'API:", error);
            }
            finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, [apiUrlGames, apiUrlGenres]);

    // Gestore dell'invio del form
    const submitHandler = (event) => {
        event.preventDefault();
        fetchFilteredVideogames(searchTitle, selectedGenre, searchReleaseDate);
    };

    // Funzione opzionale per resettare i campi e ricaricare tutti i giochi
    const handleReset = () => {
        setSearchTitle('');
        setSelectedGenre('');
        setSearchReleaseDate('');
        fetchFilteredVideogames(); // Ricarica senza filtri
    };

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
                <div className="bg-white rounded-top py-3">
                    <h1 className="mb-4 text-center">
                        Catalogo Videogiochi
                    </h1>

                    {/* Sezione Filtri strutturata come Form (ispirata alla tua SearchBar) */}
                    <div className="card p-4 border-0">
                        <h5 className="mb-3 text-secondary">Filtra la ricerca</h5>
                        <form onSubmit={submitHandler}>
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

                            {/* Bottoni di Invio e Reset */}
                            <div className="mt-4 d-flex gap-2 justify-content-end">
                                <button type="button" className="btn btn-outline-secondary" onClick={handleReset}>
                                    Reset
                                </button>
                                <button type="submit" className="btn btn-dark">
                                    Cerca
                                </button>
                            </div>
                        </form>
                    </div>
                    <hr />
                </div>


                {/* Sezione Griglia Card Videogiochi */}
                {videogames.length === 0 ? (
                    <div className="alert alert-warning text-center py-4" role="alert">
                        Nessun videogioco trovato con i parametri selezionati.
                    </div>
                ) : (
                    <div className="bg-white rounded-bottom py-4 px-2">
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                            {videogames.map((game) => (
                                <div key={game.id} className="col">
                                    <VideogameCard game={game} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default VideogamesPage;