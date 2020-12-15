import React from "react";
import { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import TaskMain from './components/TaskMain';
import Login from './login';
class App extends Component{
    render(){
        return(
            <Router>
                <Switch>
                    <Route path='/home'><TaskMain/></Route>
                    <Route path='/'><Login/></Route>
                </Switch>
            </Router>
        );

    }
}

export default App;