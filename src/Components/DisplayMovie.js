import "../Styling/DisplayMovie.css"

const DisplayMovie = (props) => {
    return ( 
        <div className="card">
            <h3>{props.title}</h3>
            <p>Score: {props.vote}</p>
            <img src={props.poster} alt=""/>
            <p className="card--overview">{props.overview}</p>
        </div>
     );
}
 
export default DisplayMovie;