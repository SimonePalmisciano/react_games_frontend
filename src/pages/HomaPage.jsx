/* 
Creare una homepage in cui è presente una lista di 6 videogiochi in "esposizione"
con un pulsante esplora altri giochi o vai al catalogo completo
e ti porta alla index dei videogiochi
oltre questo deve essere presente un banner iniziale in alto sotto la navbar
successivamente in basso i videogiochi e sotto questa sezione
una sezione con 3 card in cui si racconta qualcosa della passione dei videogiochi
e nella creazione del sito web
*/

import { useEffect, useState } from "react";
import { Link } from "react-router";
import VideogameCard from "../components/Cards/VideogameCard";

function HomePage() {
    const [videogames, setVideogames] = useState([]);

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL_GAMES)
            .then(response => response.json())
            .then(data => {
                // Prendiamo solo i primi 6 giochi per l'esposizione in home
                setVideogames(data.response.slice(0, 6));
            })
            .catch(error => console.error("Errore nel fetch:", error));
    }, []);

    return (
        <div className="">
            {/* 1. Banner iniziale in alto sotto la navbar */}
            <div className="text-center shadow">
                <div className="container">
                    <div className="bg-white rounded-top py-5 mt-5">
                        <h1 className="display-4 fw-bold">
                            Benvenuti nel Catalogo Videogiochi
                        </h1>
                        <p className="col-md-8 fs-5 mx-auto text-secondary">
                            Esplora i migliori titoli, scopri nuove avventure e vivi la tua passione senza limiti.
                        </p>
                    </div>
                </div>
            </div>

            {/* 2. Sezione Videogiochi in esposizione (Massimo 6 card) */}
            <div className="container">
                <div className="bg-white rounded-bottom py-5">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2>
                            Videogiochi in Evidenza
                        </h2>
                        <Link to="/videogames" className="btn btn-outline-primary">
                            Esplora altri giochi &raquo;
                        </Link>
                    </div>

                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {videogames.map((game) => (
                            <div key={game.id} className="col">
                                <VideogameCard game={game} />
                            </div>
                        ))}
                    </div>
                    <div className="btn-container d-flex justify-content-center my-3">
                        <Link to="/videogames" className="btn btn-primary btn-lg mt-3">
                            Vai al catalogo completo
                        </Link>
                    </div>
                </div>
            </div>

            <div className="bg-light py-5 mt-5 border-top">
                <div className="container">
                    <h2 className="text-center mb-4">
                        Chi Siamo & La Nostra Passione
                    </h2>
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {/* Card 1 */}
                        <div className="col">
                            <div className="card h-100 shadow-sm border-0">
                                <div className="card-body">
                                    <h5 className="card-title text-primary">
                                        La Passione per il Gaming
                                    </h5>
                                    <p className="card-text text-muted">
                                        Da quando sono cosciente i videogiochi hanno fatto parte della mia vita
                                        e continuano a farne parte, ho cambiato gusti nei generi a cui gioco,
                                        ma sono rimasti parte importante della mia vita e so che fanno parte anche delle TUA
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="col">
                            <div className="card h-100 shadow-sm border-0">
                                <div className="card-body">
                                    <h5 className="card-title text-primary">
                                        La Nascita del Sito
                                    </h5>
                                    <p className="card-text text-muted">
                                        Questo portale nasce per offrire una raccolta chiara, ordinata e accessibile
                                        dei migliori titoli sul mercato, pensata dai giocatori per i giocatori.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="col">
                            <div className="card h-100 shadow-sm border-0">
                                <div className="card-body">
                                    <h5 className="card-title text-primary">
                                        Tecnologia Moderna
                                    </h5>
                                    <p className="card-text text-muted">
                                        Sviluppato con un solido backend in Laravel e un'interfaccia in
                                        React e Bootstrap, per garantire un'esperienza fluida su ogni dispositivo.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;