import { Routes, Route } from 'react-router-dom';
import './App.css'
import AnnivPage from './pages/AnnivPage';

function App() {

  return (
    <>
      <Routes location={location} key={location.pathname}>
        <Route index element={<AnnivPage />}/>
      </Routes>
    </>
  )
}

export default App
