
import { Outlet } from 'react-router'
import './App.css'
import Layout from './components/Layout'
function App() {

  return (
    <>
      <Layout isLoggedIn={true}>
      </Layout>
      <Outlet />
    </>
  )
}

export default App
