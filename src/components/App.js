import React from 'react';
import { data } from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard'

class  App extends React.Component {

  componentDidMount(){
    const {store}=this.props;
    //make apicalls
    //dispatch actions

    store.subscribe(()=>{
      console.log('updated');
    })



    store.dispatch({
      type:'ADD_MOVIES',
      movies: data
    });

    console.log('State : ',store.getState());
  }


  render()
  {
    const movies=this.props.store.getState();
    console.log('render');
    return (
      <div className="App">
        <Navbar />

        <div className="main">
          <div className="tabs">
            <div className="tab">Movies</div>
            <div className="tab">Favourites</div>
          </div>

          <div className="list">
            {data.map((movie,index)=>(<MovieCard movie={movie} key={`movies-${index}`}/>))}
          </div>
        </div>
      </div>
    );
  }
  
}

export default App;
