import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { WhatsAppButton } from '../components/whatsapp/WhatsAppButton'

export const Layout = () => {
  const location = useLocation()
  const isAbout = location.pathname.includes('about')

  return (
    <div className={`relative min-h-screen bg-brand-light text-brand-dark font-sans${isAbout ? " about-route" : ""}`}>
      <Outlet />
      <WhatsAppButton />
    </div>
  )
}

