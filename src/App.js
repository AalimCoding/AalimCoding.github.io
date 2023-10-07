import logo from './logo.svg';
import './App.css';
import Body from './Body';
import Header from './Header';
import Footer from './Footer';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Body />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
