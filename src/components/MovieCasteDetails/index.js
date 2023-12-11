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

class MovieCasteDetails extends Component {
  state = {movieCasteDetailsList: [], apiStatus: apiStatusOptions.initial}

  componentDidMount() {
    this.getMovieCasteDetailsList()
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
      const updatedData = data.results.map(each => ({
        id: each.id,
        backdropPath: each.backdrop_path,
        originalName: each.original_name,
        posterPath: each.poster_path,
        characterName: each.character_name,
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
      <div className="movie-caste-container">
        <Header />
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
    return <>{this.renderMovieCasteDetailsFinalMovies()}</>
  }
}

export default MovieCasteDetails
