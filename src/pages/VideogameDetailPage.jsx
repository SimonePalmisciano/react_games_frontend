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
        <>
        
        </>
    );
}

export default VideogameDetailPage;
