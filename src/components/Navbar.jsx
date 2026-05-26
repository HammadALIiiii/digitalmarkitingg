import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'
import ZentrixLogo from './ZentrixLogo'
import './Navbar.css'

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [footerInView, setFooterInView] = useState(false)
    const location = useLocation()
    const { isDarkMode, toggleTheme } = useTheme()

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

    /* Hide top logo when footer brand is visible — avoids double-logo clash */
    useEffect(() => {
        const footerBrand = document.getElementById('footer-brand')
        if (!footerBrand) return undefined

        const observer = new IntersectionObserver(
            ([entry]) => setFooterInView(entry.isIntersecting),
            {
                root: null,
                rootMargin: '-70px 0px 0px 0px',
                threshold: 0.12,
            }
        )

        observer.observe(footerBrand)
        return () => observer.disconnect()
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
                <Link
                    to="/"
                    className={`navbar-logo-link ${footerInView ? 'navbar-logo-link--hidden' : ''}`}
                    aria-hidden={footerInView}
                    tabIndex={footerInView ? -1 : 0}
                >
                    <motion.div
                        className="navbar-logo"
                        whileHover={footerInView ? undefined : { scale: 1.05 }}
                        whileTap={footerInView ? undefined : { scale: 0.95 }}
                    >
                        <ZentrixLogo variant="navbar" />
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
                            className="cta-button"
                            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(102, 126, 234, 0.5)' }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Get Started
                        </motion.button>
                    </Link>

                    <motion.button
                        type="button"
                        className="theme-toggle-btn glass"
                        onClick={toggleTheme}
                        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                            background: 'transparent',
                            border: '1px solid var(--glass-border)',
                            color: 'var(--text-primary)',
                            padding: '0.6rem',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            marginLeft: '1rem'
                        }}
                    >
                        {isDarkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
                    </motion.button>

                    {/* Mobile Menu Toggle */}
                    <motion.button
                        type="button"
                        className="mobile-menu-toggle"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={mobileMenuOpen}
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
