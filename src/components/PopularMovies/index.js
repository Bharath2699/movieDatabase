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

class PopularMovies extends Component {
  state = {popularMoviesList: [], apiStatus: apiStatusOptions.initial}

  componentDidMount() {
    this.getPopularMoviesList()
  }

  getPopularMoviesList = async () => {
    this.setState({apiStatus: apiStatusOptions.inProgress})
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${'0708dc6bd118a9ce59bdc8039ed7eecc'}&language=en-US&page=1`
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
        popularMoviesList: updatedData,
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

  renderPopularMoviesFailureView = () => (
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

  renderPopularMoviesSuccessView = () => {
    const {popularMoviesList} = this.state

    return (
      <div className="popular-container">
        <h1>Popular</h1>
        <ul className="popular-movies-lists">
          {popularMoviesList.map(each => (
            <MovieCard movieCardDetails={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderPopularFinalMovies = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusOptions.success:
        return this.renderPopularMoviesSuccessView()
      case apiStatusOptions.failure:
        return this.renderPopularMoviesFailureView()
      case apiStatusOptions.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderPopularFinalMovies()}
      </>
    )
  }
}

export default PopularMovies
