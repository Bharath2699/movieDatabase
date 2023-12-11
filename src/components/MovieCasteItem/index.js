import './index.css'

const MovieCasteItem = props => {
  const {movieCasteDetails} = props
  const {originalName, profilePath, characterName} = movieCasteDetails
  return (
    <li className="movie-caste-container">
      <img
        src={`https://image.tmdb.org/t/p/w500${profilePath}`}
        alt="movie-img"
        className="movie-caste-image"
      />
      <div className="movie-caste-name-details">
        <h1 className="movie-caste-name">Original Name : {originalName}</h1>
        <h1 className="movie-caste-name">Character Name: {characterName}</h1>
      </div>
    </li>
  )
}

export default MovieCasteItem
