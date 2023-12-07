import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import { LayoutConnexion } from './layout/LayoutConnexion'
import { SignIn } from './layout/SignIn'
import { SignUp } from './layout/SignUp'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route element= {<layoutConnexion />}>
            <Route path='/' element={<Home />} />
            <Route path='/connexion' element={<SignIn />} />
            <Route path='/inscription' element={<SignUp />} />
          </Route>
          <Route path='*' element={<h1> Erreur 404</h1>} />
        </Routes>
    </BrowserRouter>
  )
}
export default App
