import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

function VideogameDetailPage() {
    const { id } = useParams();
    const [videogame, setVideogame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const apiUrlGames = import.meta.env.VITE_API_URL_GAMES;

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

                    </div>
                </article>
            )}
        </main>
    );
}

export default VideogameDetailPage;
