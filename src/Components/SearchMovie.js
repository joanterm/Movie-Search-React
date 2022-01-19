import { useState } from "react"
import "../Styling/SearchMovie.css"
import DisplayMovie from "./DisplayMovie"
const apiKey = "d8addadd247bdc6bbf2641da6385bac3"

const SearchMovie = () => {

    const [query, setQuery] = useState("")
    const [moviesData, setMoviesData] = useState([])

    //SET UP FOR FETCHING + ASSIGNING FETCHED DATA TO SETMOVIESDATA
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

    //FOR INPUT
    const handleChange = (e) => {
        setQuery(e.target.value)
    }

    //MAPS OVER DATA THAT WILL BE SENT OUT AS PROPS TO DISPLAYMOVIE COMPONENT
    //FILTER-> MAKE SURE ONLY MOVIES WITH POSTERS SHOW
    const movieElement = moviesData.filter(e => e.poster_path && e.overview).map((e) => {
        return <DisplayMovie key={e.id} title={e.original_title} poster={`https://image.tmdb.org/t/p/w500/${e.poster_path}`} overview={e.overview} vote={e.vote_average}/>
    })

    return ( 
        <main className="main-area">
            <h1>Find Your Favorite Movie</h1>
            <form action="#" onSubmit={search}>
                {/* <label htmlFor="query">Movie Name</label> */}
                <input 
                    type="text" 
                    placeholder="e.g. Harry Potter"
                    // name="query"
                    value={query}
                    onChange={handleChange}
                />
                <button>SEARCH MOVIE</button>
            </form>
            <section className="movie-area">
                {movieElement}
            </section>
        </main>
     );
}
 
export default SearchMovie;