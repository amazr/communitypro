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
import Login from '../pages/Login';
import Reservations from '../pages/Reservations';


function Main(props) {
    
  return (
    <Router>
        <div>
            <Navbar />
            <Route exact path="/" component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/reservations" component={Reservations}/>
            <Footer />
        </div>
    </Router>
  )
}

ReactDOM.render(<Main />, document.getElementById('root'));

export default Main;