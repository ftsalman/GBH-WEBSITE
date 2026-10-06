import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'

export const Layout = () => {
  const location = useLocation()
  const isAbout = location.pathname.includes('about')

  return (
    <div className={`relative min-h-screen bg-brand-light text-brand-dark font-sans${isAbout ? " about-route" : ""}`}>
      <Outlet />
    </div>
  )
}
