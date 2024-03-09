import { useLocation } from 'react-router-dom'
import './App.css'
import NavBar from './components/Navbar'
import InitialRoutes from './routes/InitialRoute'
import RecordsRoutes from './routes/RecordsRoute'

function App() {

  const {pathname} = useLocation()
  console.log(pathname)

  return (
    <>
      <NavBar/>
      <InitialRoutes/>
      {pathname.includes("view") && <RecordsRoutes path='/view'/>}
      {pathname.includes("create") && <RecordsRoutes path='/create'/>}
      {pathname.includes("edit") && <RecordsRoutes path='/edit'/>}
    </>
  )
}

export default App
