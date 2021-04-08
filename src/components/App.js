import React from 'react';
import { data } from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard'
import { addMovies, setShowFavourite } from '../actions';

class  App extends React.Component {

  componentDidMount(){
    const {store}=this.props;
    //make apicalls
    //dispatch actions

    store.subscribe(()=>{
      this.forceUpdate();
      console.log('updated');
    })



    store.dispatch(addMovies(data));

    console.log('State : ',store.getState());
  }

  isMovieFavourite=(movie)=>{
    const {movies}=this.props.store.getState();
    const {favourites}=movies;
    const index=favourites.indexOf(movie);
    return index!==-1;
  }

  onchangetab(val){
    this.props.store.dispatch(setShowFavourite(val))
  }

  render()
  {
    const {movies}=this.props.store.getState();
    const {list,favourites,showFavourites}=movies;

    const displayMovies=showFavourites?favourites:list;
    console.log('render');
    console.log('state after rendering: ',this.props.store.getState())
    return (
      <div className="App">
        <Navbar />

        <div className="main">
          <div className="tabs">
            <div className={`tab ${showFavourites} ? '':'active-tab'`} onClick={()=>this.onchangetab(false)}>Movies</div>
            <div className={`tab ${showFavourites} ? 'active-tab':''`} onClick={()=>this.onchangetab(true)}>Favourites</div>
          </div>

          <div className="list">
            {
            displayMovies.map((movie,index)=>(<MovieCard movie={movie} 
            key={`movies-${index}`}
            dispatch={this.props.store.dispatch}
            isMovieFavourite={this.isMovieFavourite(movie)}
            />
            ))}
          </div>
        </div>
      </div>
    );
  }
  
}

export default App;
