import {Link} from 'react-router-dom'
import {useState} from 'react'

import './index.css'

const Header = () => {
  const [showHeader, setHeader] = useState(false)

  const onClickMenu = () => {
    setHeader(true)
  }

  const onClickClose = () => {
    setHeader(false)
  }

  return (
    <nav className="bg-card">
      <div className="header-lgContainer">
        <Link to="/">
          <h1>movieDB</h1>
        </Link>

        <div className="large-view">
          <div className="home-popular">
            <ul className="nav-item">
              <li className="item">
                <Link to="/" className="text">
                  <h1>Popular</h1>
                </Link>
              </li>
              <li className="item">
                <Link to="/top-rated" className="text">
                  <h1>Top Rated</h1>
                </Link>
              </li>
              <li className="item">
                <Link to="/upcoming" className="text">
                  <h1>Upcoming</h1>
                </Link>
              </li>
            </ul>
          </div>
          <ul className="nav-item">
            <li className="search-c">
              <Link to="/search">
                <input type="search" />
              </Link>
              <button type="button">Search</button>
            </li>

            <li className="menu">
              <button type="button" onClick={onClickMenu}>
                Menu
              </button>
            </li>
          </ul>
        </div>
      </div>
      {showHeader && (
        <div className="header-view">
          <ul className="mobile-header-view">
            <li className="item">
              <Link to="/" className="text">
                <h1>Popular</h1>
              </Link>
            </li>
            <li className="item">
              <Link to="/top-rated" className="text">
                <h1>Top Rated</h1>
              </Link>
            </li>
            <li className="item">
              <Link to="/upcoming" className="text">
                <h1>Upcoming</h1>
              </Link>
            </li>

            <button type="button" onClick={onClickClose}>
              Close
            </button>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Header
