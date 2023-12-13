import {Component} from 'react'
import Loader from 'react-loader-spinner'
import MovieCard from '../MovieCard'
import Header from '../Header'
import './index.css'

const apiStatusOptions = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class UpcomingMovies extends Component {
  state = {upcomingMoviesList: [], apiStatus: apiStatusOptions.initial}

  componentDidMount() {
    this.getUpcomingMoviesList()
  }

  getUpcomingMoviesList = async () => {
    this.setState({apiStatus: apiStatusOptions.inProgress})
    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${'0708dc6bd118a9ce59bdc8039ed7eecc'}&language=en-US&page=1`
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.results.map(each => ({
        id: each.id,
        backdropPath: each.backdrop_path,
        overview: each.overview,
        posterPath: each.poster_path,
        title: each.title,
        rating: each.vote_average,
      }))
      this.setState({
        upcomingMoviesList: updatedData,
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

  renderUpcomingMoviesFailureView = () => (
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

  renderUpcomingMoviesSuccessView = () => {
    const {upcomingMoviesList} = this.state

    return (
      <div className="upcoming-container">
        <Header />
        <h1>Upcoming</h1>
        <ul className="upcoming-movies-lists">
          {upcomingMoviesList.map(each => (
            <MovieCard movieCardDetails={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderUpcomingFinalMovies = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusOptions.success:
        return this.renderUpcomingMoviesSuccessView()
      case apiStatusOptions.failure:
        return this.renderUpcomingMoviesFailureView()
      case apiStatusOptions.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderUpcomingFinalMovies()}</>
  }
}

export default UpcomingMovies
