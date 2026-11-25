import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './AppRoutes'
import { clientPages } from './routes.client'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes pages={clientPages} />
    </BrowserRouter>
  )
}
