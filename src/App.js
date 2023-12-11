import {Switch, Route} from 'react-router-dom'
import PopularMovies from './components/PopularMovies'
import TopRatedMovies from './components/TopRatedMovies'
import UpcomingMovies from './components/UpcomingMovies'
import SingleMoviePage from './components/SingleMoviePage'
import SearchedMoviePage from './components/SearchedMoviePage'
import './App.css'

// write your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={PopularMovies} />
    <Route exact path="/top-rated" component={TopRatedMovies} />
    <Route exact path="/upcoming" component={UpcomingMovies} />
    <Route exact path="/movie/:id" component={SingleMoviePage} />
    <Route exact path="/search" component={SearchedMoviePage} />
  </Switch>
)

export default App
