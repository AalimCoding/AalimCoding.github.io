import WordleStyleGame from './WordleStyleGame';
import Battleships from './Battleships';
import SudokuSolver from './SudokuSolver';
import ProjectTBC from './ProjectTBC';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import { ChakraProvider } from '@chakra-ui/react'
import ProjectsPreview from './Homepage';


function App() {

  // TODO ADD STREAK CHECKER FOR GITHUB AND LEETCODE
  return (
    <div className="App">
      <HashRouter>
        <ThemeProvider>
          <ChakraProvider>
            <Header />
            <Routes        >
              <Route path="/" element={<ProjectsPreview />} />
              <Route path="/WordleStyleGame" element={<WordleStyleGame />} />
              <Route path="/Battleships" element={<Battleships />} />
              <Route path="/SudokuSolver" element={<SudokuSolver />} />
              <Route path="/ProjectTBC" element={<ProjectTBC />} />
            </Routes>
            <Footer />
          </ChakraProvider>
        </ThemeProvider>
      </HashRouter>
    </div>
  );
}

export default App;
