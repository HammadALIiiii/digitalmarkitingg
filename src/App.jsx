import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'
import ScrollToTop from './components/ScrollToTop'
import ScrollProgress from './components/ScrollProgress'
import PageTransition from './components/PageTransition'
import AdminPanel from './pages/AdminPanel'
import './App.css'

function AnimatedRoutes() {
    const location = useLocation()

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                <Route path="/about" element={<PageTransition><About /></PageTransition>} />
                <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
                <Route path="/portfolio" element={<PageTransition><Portfolio /></PageTransition>} />
                <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
                <Route path="/admin" element={<PageTransition><AdminPanel /></PageTransition>} />
            </Routes>
        </AnimatePresence>
    )
}

function App() {
    return (
        <Router>
            <div className="app">
                {/* Animated Background Mesh */}
                <div className="bg-gradient-mesh" />

                {/* Scroll Progress Indicator */}
                <ScrollProgress />

                <ScrollToTop />
                <Navbar />

                <AnimatedRoutes />

                <Footer />
            </div>
        </Router>
    )
}

export default App
