import { useState } from "react"
import "../Styling/SearchMovie.css"
const apiKey = "d8addadd247bdc6bbf2641da6385bac3"

const SearchMovie = () => {

    const [query, setQuery] = useState("")
    const [moviesData, setMoviesData] = useState([])

    const search = (e) => {
        e.preventDefault()
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${query}`)
        .then((response) => {
            if(!response.ok) {
                throw Error(`Error code is: ${response.status}`)
            }
            return response.json()
        })
        .then((data) => {
            console.log(data)
            setMoviesData(data.results)
        })
    }

    const handleChange = (e) => {
        setQuery(e.target.value)
    }

    return ( 
        <div>
            <h1>Find a Movie</h1>
            <form action="#" onSubmit={search}>
                {/* <label htmlFor="query">Movie Name</label> */}
                <input 
                    type="text" 
                    placeholder="Search for movie here"
                    // name="query"
                    value={query}
                    onChange={handleChange}
                />
                <button>Search</button>
            </form>
            <div>{moviesData.filter((e) => e.poster_path).map((e) => (
                <div key={e.id}>
                    <h1>{e.original_title}</h1>
                    <img src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`} alt=""/>
                </div>
            ))}</div>
        </div>
     );
}
 
export default SearchMovie;