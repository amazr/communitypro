import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import ReactDOM from 'react-dom';
import Home from '../pages/Home';
import Footer from '../pages/Footer';
import Navbar from '../pages/Navbar';


function Main(props) {
    
  return (
    <Router>
        <div>
            <Navbar />
            <Route exact path="/" component={Home}/>
            <Footer />
        </div>
    </Router>
  )
}

ReactDOM.render(<Main />, document.getElementById('root'));

export default Main;