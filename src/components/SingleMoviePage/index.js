import {Component} from 'react'
import Loader from 'react-loader-spinner'
import MovieCasteItem from '../MovieCasteItem'

import Header from '../Header'
import './index.css'

const apiStatusOptions = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieItemDetails extends Component {
  state = {
    movieItemDetailsList: [],
    movieCasteDetailsList: [],
    apiStatus: apiStatusOptions.initial,
  }

  componentDidMount() {
    this.getMovieItemDetails()
    this.getMovieCasteDetailsList()
  }

  getMovieItemDetails = async () => {
    this.setState({apiStatus: apiStatusOptions.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${'0708dc6bd118a9ce59bdc8039ed7eecc'}&language=en-US&page=1`

    const response = await fetch(url)
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedData = {
        adult: data.adult,
        backdropPath: data.backdrop_path,
        budget: data.budget,
        genres: data.genres.map(each => ({
          id: each.id,
          name: each.name,
        })),
        belongsToCollection: data.belongs_to_collection,
        id: data.id,
        title: data.title,
        overview: data.overview,
        posterPath: data.poster_path,
        releaseDate: data.release_date,
        runtime: data.runtime,

        spokenLanguages: data.spoken_languages.map(each => ({
          id: each.id,
          englishName: each.english_name,
        })),

        voteAverage: data.vote_average,
        voteCount: data.vote_count,
      }
      this.setState({
        movieItemDetailsList: updatedData,
        apiStatus: apiStatusOptions.success,
      })
    } else {
      this.setState({apiStatus: apiStatusOptions.failure})
    }
  }

  renderSuccessView = () => {
    const {movieItemDetailsList} = this.state
    const {
      adult,
      budget,
      genres,
      backdropPath,
      overview,
      releaseDate,
      runtime,

      spokenLanguages,
      title,
      voteAverage,
      voteCount,
    } = movieItemDetailsList

    let certificate
    if (adult === false) {
      certificate = 'U/A'
    } else {
      certificate = 'A'
    }
    const hr = Math.floor(runtime / 60)
    const min = Math.ceil((runtime % 60) / 60)

    const releaseYear = releaseDate
    const date = new Date(releaseDate)
    const year = date.getFullYear()

    return (
      <div className="movieItem-container">
        <Header />
        <div className="single-movie-details">
          <h1 className="Movie-Details-Section">Movie Details Section</h1>
          <div
            className="movieItemDetailsTop-con"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500${backdropPath})`,
            }}
          >
            <div className="contents">
              <h1 className="movieItem-title">{title}</h1>
              <div className="rating-and-runtime">
                <p className="card">{`${hr}h ${min}m`}</p>
                <p className="card-c">{certificate}</p>
                <p className="card">{year}</p>
              </div>
              <p className="overview">{overview}</p>
              <button type="button" className="play-button">
                Play
              </button>
            </div>
          </div>

          <div className="other-details-con">
            <div className="movieItem-details-card">
              <h1 className="others-title">genres</h1>
              <div className="unorder-list">
                {genres.map(each => (
                  <li className="movieslist-item" key={each.id}>
                    <p>{each.name}</p>
                  </li>
                ))}
              </div>
            </div>
            <div className="movieItem-details-card">
              <h1 className="others-title">Audio Available</h1>
              <div className="unorder-list">
                {spokenLanguages.map(each => (
                  <li className="movieslist-item" key={each.englishName}>
                    <p>{each.englishName}</p>
                  </li>
                ))}
              </div>
            </div>
            <div className="movieItem-details-card">
              <h1 className="others-title">Rating Count</h1>
              <p className="others-content">{voteCount}</p>
              <h1 className="others-title">Rating Average</h1>
              <p className="others-content">{voteAverage}</p>
            </div>
            <div className="movieItem-details-card">
              <h1 className="others-title">Budget</h1>
              <p className="others-content">{budget}</p>
              <h1 className="others-title">Release Date</h1>
              <p className="others-content">{releaseYear}</p>
            </div>
          </div>
        </div>
        <div className="movie-caste-card">
          <h1 className="movie-caste-card-heading">Movie Caste Details</h1>
          {this.renderMovieCasteDetailsFinalMovies()}
        </div>
      </div>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/ds6o1m3db/image/upload/v1697214403/Background-Complete_mbjg9a.svg"
        alt="failure view"
        className="failure-image"
      />
      <p className="failure-message">Something went wrong. Please try again</p>
      <button type="button" onClick={this.getMovieItemDetails}>
        Try Again
      </button>
    </div>
  )

  renderFinalMovies = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusOptions.success:
        return this.renderSuccessView()
      case apiStatusOptions.failure:
        return this.renderFailureView()
      case apiStatusOptions.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  getMovieCasteDetailsList = async () => {
    this.setState({apiStatus: apiStatusOptions.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${'0708dc6bd118a9ce59bdc8039ed7eecc'}&language=en-US&page=1`
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.cast.map(each => ({
        id: each.cast_id,
        profilePath: each.profile_path,
        originalName: each.original_name,

        characterName: each.character,
      }))
      this.setState({
        movieCasteDetailsList: updatedData,
        apiStatus: apiStatusOptions.success,
      })
    } else {
      this.setState({apiStatus: apiStatusOptions.failure})
    }
  }

  renderLoaderView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderMovieCasteDetailsFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/ds6o1m3db/image/upload/v1697198154/alert-triangle_vdgqti.svg"
        alt="failure view"
        className="failure-image"
      />
      <p className="heading">Something went wrong.Please try again</p>
      <button type="button" onClick={this.getTopRatedMoviesList}>
        Try Again
      </button>
    </div>
  )

  renderMovieCasteDetailsSuccessView = () => {
    const {movieCasteDetailsList} = this.state

    return (
      <div className="main-movie-caste-container">
        <ul className="movies-caste-lists">
          {movieCasteDetailsList.map(each => (
            <MovieCasteItem movieCasteDetails={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderMovieCasteDetailsFinalMovies = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusOptions.success:
        return this.renderMovieCasteDetailsSuccessView()
      case apiStatusOptions.failure:
        return this.renderMovieCasteDetailsFailureView()
      case apiStatusOptions.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderFinalMovies()}</>
  }
}
export default MovieItemDetails
