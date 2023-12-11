import {Link} from 'react-router-dom'
import './index.css'

const MovieCard = props => {
  const {movieCardDetails} = props
  const {title, posterPath, id} = movieCardDetails
  return (
    <li className="movie-card-container">
      <img
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
        alt="movie-img"
        className="movie-card-image"
      />
      <div className="movie-card-details">
        <h1 className="movie-card-name">{title}</h1>

        <Link to={`/movie/${id}`} className="movie-link">
          <button type="button" className="view-details-button">
            View Details
          </button>
        </Link>
      </div>
    </li>
  )
}

export default MovieCard
