import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./Components/Home"
import Chatpage from "./Components/Chatpage"
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chatpage />} />
      </Routes>
    </Router>
  )
}

export default App
