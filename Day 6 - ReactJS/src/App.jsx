import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Componenets/Header'
import AboutMe from './Componenets/About'
import Education from './Componenets/Education'
import Experience from './Componenets/Experience'
import Skills from './Componenets/Skills'
import Contact from './Componenets/Contact'

function App() {
  return (
    <div className="container">
            <Header />
            <div className="content">
                <div className="left-column">
                    <AboutMe />
                    <Education />
                    <Experience />
                </div>

                <div className="right-column">
                    <div className="photo-container">
                        <img src="public/Screenshot 2024-12-12 142746.png" alt="Profile" className="profile-photo" />
                    </div>
                    <Skills />
                    <Contact />
                </div>
            </div>
        </div>
  )
}

export default App
