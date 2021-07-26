
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";

import About from './components/About'
import FlowTrace from "./components/FlowTrace";
// import Header from './components/Header'
import Home from './components/Home'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route path="/" exact component={Home}/>     
        <Route path="/About" component={About} />
        <Route path="/FlowTrace" component={FlowTrace} />
        </Switch>
      </Router>
      
      {/* <Home /> */}
      {/* <About /> */}
    </div>
  );
}

export default App;
