import { Link } from "react-router"


function VideogameCard({game}) {
    
    return (
        <div className="card h-100 shadow-sm">
            {/* Immagine del videogioco */}
            {/* {console.log(game)} */}
            <img
                src={game.cover_image || "https://via.placeholder.com/300x200?text=No+Image"}
                className="card-img-top"
                alt={game.title}
                style={{ height: "200px", objectFit: "cover" }}
            />

            <div className="card-body d-flex flex-column">
                {/* Titolo */}
                <h5 className="card-title">{game.title}</h5>

                {/* Pulsante Dettagli spinto in fondo */}
                <div className="mt-auto pt-3">
                    <Link to={`/videogames/${game.id}`} className="btn btn-primary w-100">
                        Vedi Dettagli
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default VideogameCard