import logo from './logo.svg';
import './App.css';
import Body from './Body';
import Header from './Header';
import Footer from './Footer';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <div className="App">
      <Router>
        <ThemeProvider>
          <ChakraProvider>
            <Header />
            <Body />
            <Footer />
          </ChakraProvider>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
