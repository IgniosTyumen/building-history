import React from 'react';
import './App.css';
import ReactMapGL from 'react-map-gl'
import Map from "./Map";

class App extends React.Component {
    state = {
        viewport: {
            width: "100vw",
            height: "100vh",
            latitude: 57,
            longitude: 65,
            zoom: 10
        }
    };
  render() {
      return (
          <div className="App">
            <Map/>
          </div>
      );
  }
}

export default App;
