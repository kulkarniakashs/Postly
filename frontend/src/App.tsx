import { BrowserRouter, Route,Routes } from "react-router-dom"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import Blogid from "./pages/Blogid"
import Dashboard from "./pages/Dashboard"
import Profile from "./pages/Profile"
function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard/>}></Route>
        <Route path="/signup" element = {<Signup/>}></Route>
        <Route path="/signin" element= {<Signin/>}></Route>
        <Route path="/blog/:id" element={<Blogid/>}/>
        <Route path="/profile/:authorquery" element={<Profile/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App