import React, { Component } from 'react';
import Navigation from '../components/Navigation/Navigation';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import Logo from '../components/Logo/Logo';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Signin from '../components/Signin/Signin';
import Register from '../components/Register/Register';
import Rank from '../components/Rank/Rank';
import Particles from 'react-particles-js';
import 'tachyons';
import './App.css';


const particlesParameters = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 1000
      }
    },
    size: {
      "value": 3
    }
  },
}

const initialState = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSigneIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
    }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }
  
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = (event) => {
    this.setState({imageUrl: this.state.input}, () => {
          fetch('http://localhost:3000/imageurl', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              input: this.state.input
            })
          })
          .then(response => response.json())
          .then(response => {
            if (response) {
              fetch('http://localhost:3000/image', {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                  id: this.state.user.id
                })
              })
              .then(response => response.json())
              .then(count => {
                this.setState(Object.assign(this.state.user, {entries: count}))
              })
              .catch(error => console.log(error)
              )
            }
            this.displayFaceBox(this.calculateFaceLocation(response))
          })
          .catch(error => console.log(error));
      }
    );
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSigneIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { isSigneIn, route, box, imageUrl } = this.state;
    return (
      <div className='app'>
        <Particles 
          params={particlesParameters}
          className='particles'
        />
        <Navigation isSignedIn={isSigneIn} onRouteChange={this.onRouteChange}/>
        { 
          route === 'home'
          ? <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
              {this.state.imageUrl.length ? <FaceRecognition box={box} imageUrl={imageUrl} /> : null}
             </div>
          : (
              route === 'signin' 
              ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : ( route === 'register'
                ? <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                : <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                )
            )
        }
      </div>
    );
  }
}


export default App;
