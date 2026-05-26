import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useState } from 'react'
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
import ProductModal from './components/ProductModal'
import SiteBackground from './components/SiteBackground'
import './App.css'

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    )
}

const AppContent = () => {
    const location = useLocation()
    const [selectedProduct, setSelectedProduct] = useState(null)
    return (
        <div className="app">
            <SiteBackground />
            <div className="bg-gradient-mesh" />

            {/* Scroll Progress Indicator */}
            <ScrollProgress />

            <ScrollToTop />
            <Navbar />

            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                    <Route path="/about" element={<PageTransition><About /></PageTransition>} />
                    <Route path="/services" element={<PageTransition><Services onServiceClick={(s) => setSelectedProduct(s)} /></PageTransition>} />
                    <Route path="/portfolio" element={<PageTransition><Portfolio /></PageTransition>} />
                    <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
                </Routes>
            </AnimatePresence>

            <Footer />

            {/* Global Product Modal */}
            <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        </div>
    )
}

export default App
