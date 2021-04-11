import React from 'react';
import { data } from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard'
import { addMovies, setShowFavourite } from '../actions';
import {connect} from '../index'

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
    const {movies}=this.props;
    const {favourites}=movies;
    const index=favourites.indexOf(movie);
    return index!==-1;
  }

  onchangetab=(val)=>{
    this.props.dispatch(setShowFavourite(val))
  }

  render()
  {
    const {movies,search}=this.props;
    const {list,favourites,showFavourites}=movies;

    const displayMovies=showFavourites?favourites:list;
    
    return (
      <div className="App">
        <Navbar search={search}/>

        <div className="main">
          <div className="tabs">
            <div className={`tab ${showFavourites} ? '':'active-tab'`} onClick={()=>this.onchangetab(false)}>Movies</div>
            <div className={`tab ${showFavourites} ? 'active-tab':''`} onClick={()=>this.onchangetab(true)}>Favourites</div>
          </div>

          <div className="list">
            {
            displayMovies.map((movie,index)=>(<MovieCard movie={movie} 
            key={`movies-${index}`}
            dispatch={this.props.dispatch}
            isMovieFavourite={this.isMovieFavourite(movie)}
            />
            ))}
          </div>
        </div>
      </div>
    );
  }
  
}

// class AppWrapper extends React.Component{
//   render(){
//     return(
//       <StoreContext.Consumer >
//           {(store)=>{
//             <App store={store}/>
//           }}
//       </StoreContext.Consumer>
//     );
//   }
// }
function mapStateToProps(state){
  return{
    movies:state.movies,
    search:state.search
  }
}

const connectedAppComponent=connect(mapStateToProps)(App);
export default connectedAppComponent;
