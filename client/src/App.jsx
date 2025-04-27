import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./Components/Home"
import Chatpage from "./Components/Chatpage"
import Signup from "./Components/signup"
function App() {
 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chatpage />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  )
}

export default App
