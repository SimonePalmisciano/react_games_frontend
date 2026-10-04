import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

function VideogameDetailPage() {
    const { id } = useParams();
    const [videogame, setVideogame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const apiUrlGames = import.meta.env.VITE_API_URL_GAMES;

    console.log(videogame);

    function getFormattedDate() {
        const rowDate = videogame.release_date;
        const dateObj = new Date(rowDate);
        const formattedDateIt = dateObj.toLocaleDateString('it-IT');
        // Formato esteso personalizzato: "17 settembre 2013"
        const formattedDateLong = dateObj.toLocaleDateString('it-IT', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

        return formattedDateIt;
    }

    useEffect(() => {

        const fetchVideogame = async () => {
            setLoading(true);
            setError("");

            try {
                const gamesUrl = apiUrlGames.replace(/\/$/, "");
                const response = await fetch(`${gamesUrl}/${encodeURIComponent(id)}`);

                if (!response.ok) {
                    throw new Error("Impossibile caricare i dettagli del videogioco.");
                }

                const data = await response.json();
                // console.log("risposta della chiamata", data.response);

                setVideogame(data.response);

            } catch (fetchError) {
                if (fetchError.name !== "AbortError") {
                    console.error("Errore nel recupero del videogioco:", fetchError);
                    setError(fetchError.message || "Si è verificato un errore durante il caricamento.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchVideogame();

    }, [apiUrlGames, id]);

    return (
        <main className="container py-5">
            <Link to="/videogames" className="btn btn-outline-secondary mb-4">
                &larr; Torna al catalogo
            </Link>

            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary">
                        <span className="visually-hidden">Caricamento...</span>
                    </div>
                    <p className="mt-3 text-muted">Caricamento dei dettagli...</p>
                </div>
            ) : error ? (
                <div className="alert alert-danger">
                    {error}
                </div>
            ) : (
                <article className="card shadow-sm border-0">
                    {videogame.cover_image && (
                        <img
                            src={videogame.cover_image}
                            className="card-img-top"
                            alt={videogame.title || "Copertina del videogioco"}
                            style={{ maxHeight: "420px", objectFit: "cover" }}
                        />
                    )}
                    <div className="card-body p-4">
                        <h1 className="card-title mb-4">
                            {videogame.title || "Dettagli del videogioco"}
                        </h1>
                        <h6>
                            Casa Produttrice: {videogame.developer}
                        </h6>
                        <h6>
                            Genere: {videogame.genre.name}
                        </h6>
                        <p>
                            Data di uscita: {getFormattedDate()}
                        </p>
                        <section className="detail">
                            <p>
                                Descrizione
                            </p>
                            <p>
                                {videogame.description.slice(0, 250) + " ..."}
                            </p>
                            <p>
                                Prezzo: {videogame.price}&euro;
                            </p>
                        </section>
                    </div>
                </article>
            )}
        </main>
    );
}

export default VideogameDetailPage;
