import {Link} from 'react-router-dom'
import {useState} from 'react'
import {HiOutlineSearch} from 'react-icons/hi'
import {GiHamburgerMenu} from 'react-icons/gi'
import {GrFormClose} from 'react-icons/gr'
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
    <div className="bg-card">
      <nav className="header-lgContainer">
        <li className="item">
          <Link to="/">
            <h1>movieDB</h1>
          </Link>
        </li>

        <div className="large-view">
          <div className="home-popular">
            <ul className="nav-item">
              <h1 className="item">
                <Link to="/" className="text">
                  Home
                </Link>
              </h1>
              <h1 className="item">
                <Link to="/top-rated" className="text">
                  Top-Rated Movies
                </Link>
              </h1>
              <h1 className="item">
                <Link to="/upcoming" className="text">
                  Upcoming
                </Link>
              </h1>
            </ul>
          </div>
          <ul className="nav-item">
            <li className="search-c">
              <Link to="/search">
                <HiOutlineSearch size={25} />
              </Link>
            </li>

            <li className="menu">
              <GiHamburgerMenu onClick={onClickMenu} fill="#ffffff" size={24} />
            </li>
          </ul>
        </div>
      </nav>
      {showHeader && (
        <div className="header-view">
          <ul className="mobile-header-view">
            <h1 className="item">
              <Link to="/" className="text">
                Home
              </Link>
            </h1>
            <h1 className="item">
              <Link to="/top-rated" className="text">
                Top-Rated
              </Link>
            </h1>
            <h1 className="item">
              <Link to="/upcoming" className="text">
                Upcoming
              </Link>
            </h1>

            <GrFormClose size={18} fill="#ffffff" onClick={onClickClose} />
          </ul>
        </div>
      )}
    </div>
  )
}

export default Header
