import React from 'react'
import { NavLink } from 'react-router-dom'
import Button from 'devextreme-react/button'

const linkStyle = ({ isActive }) => ({
  display: 'block',
  padding: '10px 12px',
  marginBottom: 6,
  textDecoration: 'none',
  color: isActive ? '#1976d2' : '#333',
  fontWeight: isActive ? '600' : '400',
  background: isActive ? '#e3f2fd' : 'transparent',
  borderRadius: 4
})

export default function Sidebar({ onToggle }) {
  return (
    <div
      style={{
        width: 240,
        height: '100%',
        padding: 16,
        background: '#ffffff',
        borderRight: '1px solid #ddd'
      }}
    >
      <div style={{ marginTop: 10 }}>
        <NavLink to="/" style={linkStyle}>
          Home
        </NavLink>
        <NavLink to="/dashboard" style={linkStyle}>
          Dashboard
        </NavLink>
        <NavLink to="/grid" style={linkStyle}>
          DataGrid
        </NavLink>

      </div>
    </div>
  )
}
