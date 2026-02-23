import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'
import './Navbar.css'

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        setMobileMenuOpen(false)
    }, [location])

    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/services', label: 'Services' },
        { path: '/portfolio', label: 'Portfolio' },
        { path: '/contact', label: 'Contact' },
    ]

    return (
        <motion.nav
            className={`navbar ${scrolled ? 'scrolled' : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <div className="navbar-container">
                <Link to="/">
                    <motion.div
                        className="navbar-logo"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="logo-text gradient-text">ZENTRIX</span>
                        <div className="logo-dot" />
                    </motion.div>
                </Link>

                {/* Desktop Menu */}
                <div className="navbar-menu">
                    {navItems.map((item, index) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                        >
                            <motion.span
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -2 }}
                            >
                                {item.label}
                            </motion.span>
                            {location.pathname === item.path && (
                                <motion.div
                                    className="nav-indicator"
                                    layoutId="nav-indicator"
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                />
                            )}
                        </Link>
                    ))}
                </div>

                <div className="navbar-actions">
                    <Link to="/contact">
                        <motion.button
                            className="cta-button glass"
                            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(102, 126, 234, 0.5)' }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Get Started
                        </motion.button>
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <motion.button
                        className="mobile-menu-toggle"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        whileTap={{ scale: 0.9 }}
                    >
                        {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className="mobile-menu glass-strong"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {navItems.map((item, index) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`mobile-nav-link ${location.pathname === item.path ? 'active' : ''}`}
                            >
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    {item.label}
                                </motion.div>
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}

export default Navbar
