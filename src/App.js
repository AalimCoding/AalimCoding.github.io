import WordleStyleGame from './WordleStyleGame';
import Battleships from './Battleships';
import SudokuSolver from './SudokuSolver';
import ProjectTBC from './ProjectTBC';
import './App.css';

import Header from './Header';
import Footer from './Footer';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import { ChakraProvider } from '@chakra-ui/react'
import ProjectsPreview from './Homepage';

function App() {
  return (
    <div className="App">
      <Router>
        <ThemeProvider>
          <ChakraProvider>
            <Header />
            <Routes>
              <Route path="/" element={<ProjectsPreview />} />
              <Route path="/WordleStyleGame" element={<WordleStyleGame />} />
              <Route path="/Battleships" element={<Battleships />} />
              <Route path="/SudokuSolver" element={<SudokuSolver />} />
              <Route path="/ProjectTBC" element={<ProjectTBC />} />
            </Routes>
            <Footer />
          </ChakraProvider>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
