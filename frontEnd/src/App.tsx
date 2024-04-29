
import { Outlet } from 'react-router'
import './App.css'
import Layout from './components/Layout'
function App() {

  return (
    <>
      <Layout isLoggedIn={false}>
      </Layout>
      <Outlet />
    </>
  )
}

export default App
