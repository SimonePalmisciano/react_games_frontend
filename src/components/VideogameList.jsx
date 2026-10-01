import { useEffect, useState } from "react";
import VideogameCard from "./Cards/VideogameCard";

function VideogameList() {
    const [videogames, setVideogames] = useState([]);

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL)
            .then(response => {
                return response.json();
            })
            .then(data => {
                setVideogames(data.response);
            })
            .catch(error => console.error("Errore nel fetch:", error));
    }, [])

    console.log(videogames);


    return (
        <div className="container py-4">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {
                    videogames.map((game) => {
                        return (
                            <div key={game.id} className="col">
                                <VideogameCard game={game} />
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}
export default VideogameList