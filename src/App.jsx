import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Drawer from 'devextreme-react/drawer'

import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import GridPage from './pages/GridPage'
import Dashboard from './pages/Dashboard'

export default function App() {
  const [open, setOpen] = useState(true)

  return (
    <div className="app-container">
      <Header onToggle={() => setOpen(prev => !prev)} />

      <Drawer
        opened={open}
        position="left"
        revealMode="slide"
        shading={false}
        minSize={0}
        maxSize={240}
        component={() => <Sidebar />}
      >
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/grid" element={<GridPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Drawer>
    </div>
  )
}
