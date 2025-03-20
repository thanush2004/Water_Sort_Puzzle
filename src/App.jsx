import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Board from "./components/Board";
import HomePage from "./components/HomePage";
function App(){
  return (
    <Router>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/board" element={<Board/>} /> 
    </Routes>
  </Router>
  )
}
export default App;