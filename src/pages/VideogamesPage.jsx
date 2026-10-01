import { useState, useEffect } from "react"




function VideogamesPage() {
    const [videogames, setVideogames] = useState([]);

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL)
    })

    return (
        <>

        </>
    )
}
export default VideogamesPage