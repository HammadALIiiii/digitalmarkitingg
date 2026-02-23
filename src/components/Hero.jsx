import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useMagneticEffect } from '../hooks/useMagneticEffect'
import './Hero.css'

const Hero = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const heroRef = useRef(null)
    const requestRef = useRef(null)
    const isMobile = useRef(false)

    const btnPrimaryRef = useMagneticEffect(0.4)
    const btnSecondaryRef = useMagneticEffect(0.4)

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start']
    })

    useEffect(() => {
        // Check if mobile/touch device
        if (typeof window !== 'undefined') {
            isMobile.current = window.matchMedia('(pointer: coarse)').matches
        }

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current)
        }
    }, [])

    const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

    const handleMouseMove = (e) => {
        if (isMobile.current) return

        if (requestRef.current) return // Throttle

        requestRef.current = requestAnimationFrame(() => {
            if (!e.currentTarget) {
                requestRef.current = null
                return
            }
            const rect = e.currentTarget.getBoundingClientRect()
            const x = (e.clientX - rect.left - rect.width / 2) / 20
            const y = (e.clientY - rect.top - rect.height / 2) / 20
            setMousePosition({ x, y })
            requestRef.current = null
        })
    }

    return (
        <section id="home" className="hero" ref={heroRef} onMouseMove={handleMouseMove}>
            <motion.div className="hero-content" style={{ y, opacity }}>
                <div className="hero-badge-container">
                    <motion.div
                        className="hero-badge glass"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <span className="badge-dot animate-pulse" />
                        <span>Executive Strategic Partner</span>
                    </motion.div>
                </div>

                <motion.h1
                    className="hero-title"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                    Scale Your Global
                    <br />
                    <span className="gradient-text">Digital Authority</span>
                </motion.h1>

                <motion.p
                    className="hero-description"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                    We engineer high-performance digital ecosystems and ROI-driven marketing
                    <br />
                    strategies for ambitious brands ready to lead their industries.
                </motion.p>

                <motion.div
                    className="hero-cta"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    <Link to="/contact">
                        <motion.button
                            ref={btnPrimaryRef}
                            className="btn-primary"
                            whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(102, 126, 234, 0.4)' }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                        >
                            Get Started
                        </motion.button>
                    </Link>
                    <motion.button
                        ref={btnSecondaryRef}
                        className="btn-secondary glass"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    >
                        View Our Work
                    </motion.button>
                </motion.div>

                <motion.div
                    className="hero-social-proof"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                >
                    <span className="proof-label">Trusted by industry leaders across</span>
                    <div className="proof-badges">
                        <span>USA</span>
                        <span className="proof-dot"></span>
                        <span>UK</span>
                        <span className="proof-dot"></span>
                        <span>UAE</span>
                        <span className="proof-dot"></span>
                        <span>SINGAPORE</span>
                    </div>
                </motion.div>

                {/* 3D Floating Elements with Enhanced Parallax - Only render if not mobile or use simplified styling */}
                <motion.div
                    className="floating-element element-1 animate-glow"
                    style={{
                        x: mousePosition.x * 3,
                        y: mousePosition.y * 3,
                    }}
                    animate={{
                        y: [0, -20, 0],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
                <motion.div
                    className="floating-element element-2 animate-glow"
                    style={{
                        x: mousePosition.x * -2,
                        y: mousePosition.y * -2,
                    }}
                    animate={{
                        y: [0, 20, 0],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
                <motion.div
                    className="floating-element element-3 animate-glow"
                    style={{
                        x: mousePosition.x * 4,
                        y: mousePosition.y * 4,
                    }}
                    animate={{
                        y: [0, -30, 0],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="scroll-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
            >
                <motion.div
                    className="scroll-line"
                    animate={{ height: ['0%', '100%', '0%'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </motion.div>
        </section>
    )
}

export default Hero

