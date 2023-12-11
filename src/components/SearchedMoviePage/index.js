import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {HiOutlineSearch} from 'react-icons/hi'
import {Link} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import {GrFormClose} from 'react-icons/gr'
import MovieCard from '../MovieCard'
import './index.css'

const apiStatusOptions = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class SearchedMoviePage extends Component {
  state = {
    searchResults: [],
    searchInput: '',
    showHeader: false,
    apiStatus: apiStatusOptions.initial,
  }

  getSearchResultList = async searchInput => {
    this.setState({apiStatus: apiStatusOptions.inProgress})

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${'0708dc6bd118a9ce59bdc8039ed7eecc'}&language=en-US&query=${searchInput}&page=1`

    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.results.map(each => ({
        id: each.id,
        backdropPath: each.backdrop_path,
        overview: each.overview,
        posterPath: each.poster_path,
        title: each.title,
      }))
      this.setState({
        searchResults: updatedData,
        apiStatus: apiStatusOptions.success,
      })
    } else {
      this.setState({apiStatus: apiStatusOptions.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickKeydown = event => {
    const {searchInput} = this.state
    if (event.key === 'Enter' && searchInput !== '') {
      this.getSearchResultList(searchInput)
    }
  }

  onClickSearchIcon = () => {
    const {searchInput} = this.state
    if (searchInput !== '') {
      this.getSearchResultList(searchInput)
    }
  }

  onClickMenu = () => {
    this.setState({showHeader: true})
  }

  onClickClose = () => {
    this.setState({showHeader: false})
  }

  renderFailureView = () => {
    const {searchInput} = this.state
    return (
      <div className="failure-container">
        <img
          src="https://res.cloudinary.com/ds6o1m3db/image/upload/v1697262659/Layer_2_wwdmn4.svg"
          alt="no movies"
          className="failure-image"
        />
        <p className="failure-content">
          `Your search for 4{searchInput} did not find any matches.`
        </p>
      </div>
    )
  }

  renderSuccessView = () => {
    const {searchResults} = this.state

    return (
      <ul className="search-results">
        {searchResults.map(each => (
          <MovieCard movieCardDetails={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderFinalMovies = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusOptions.success:
        return this.renderSuccessView()

      case apiStatusOptions.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    const {searchInput, showHeader} = this.state
    return (
      <div className="search-container">
        <div className="search-header-card">
          <div className="bg-card">
            <nav className="header-lgContainer">
              <li className="item">
                <Link to="/">
                  <h1>MovieDB</h1>
                </Link>
              </li>

              <div className="large-view">
                <div className="home-popular">
                  <ul className="nav-item">
                    <li className="item">
                      <Link to="/" className="text">
                        Home
                      </Link>
                    </li>
                    <li className="item">
                      <Link to="/top-rated" className="text">
                        Top Rated
                      </Link>
                    </li>
                    <li className="item">
                      <Link to="/upcoming" className="text">
                        Upcoming
                      </Link>
                    </li>
                  </ul>
                </div>
                <ul className="nav-item">
                  <li className="search-con">
                    <div className="search-card-item">
                      <input
                        type="search"
                        className="large-input"
                        onChange={this.onChangeSearchInput}
                        onKeyDown={this.onClickKeydown}
                        value={searchInput}
                      />

                      <HiOutlineSearch
                        size={25}
                        onClick={this.onClickSearchIcon}
                      />
                    </div>
                  </li>

                  <GiHamburgerMenu size={24} onClick={this.onClickMenu} />
                </ul>
              </div>
            </nav>
            {showHeader && (
              <div className="search-header-view">
                <ul className="mobile-header-view">
                  <li className="item">
                    <Link to="/" className="text">
                      Home
                    </Link>
                  </li>
                  <li className="item">
                    <Link to="/top-rated" className="text">
                      Top Rated
                    </Link>
                  </li>
                  <li className="item">
                    <Link to="/upcoming" className="text">
                      Upcoming
                    </Link>
                  </li>

                  <GrFormClose size={18} onClick={this.onClickClose} />
                </ul>
              </div>
            )}
          </div>
        </div>
        {this.renderFinalMovies()}
      </div>
    )
  }
}
export default SearchedMoviePage
