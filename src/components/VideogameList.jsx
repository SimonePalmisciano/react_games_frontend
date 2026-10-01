import { useEffect, useState } from "react";

function VideogameList() {
    const [videogames, setVideogames] = useState([]);

    useEffect(() => {
        fetch(import.meta.env.BASE_API_URL)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
    },[])

    return (
        <div className="container py-4">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {videogames.map((game) => {
                    <div key={game.id} className="col">
                        
                    </div>
                })}
            </div>
        </div>
    )
}
export default VideogameList