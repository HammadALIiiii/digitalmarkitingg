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
            <div className="hero-grid container">
                <motion.div className="hero-text-content" style={{ y, opacity }}>


                    <motion.h1
                        className="hero-title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                        Architecting
                        <br />
                        <span className="gradient-text">Digital Excellence</span>
                    </motion.h1>

                    <motion.p
                        className="hero-description"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        We partner with Dubai's most ambitious enterprises to engineer high-impact digital solutions that redefine industry standards.
                    </motion.p>

                    <motion.div
                        className="hero-cta"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Link to="/contact">
                            <motion.button
                                ref={btnPrimaryRef}
                                className="btn-primary"
                                whileTap={{ scale: 0.98 }}
                            >
                                Start Your Transformation
                            </motion.button>
                        </Link>
                        <Link to="/portfolio">
                            <motion.button
                                ref={btnSecondaryRef}
                                className="btn-secondary glass"
                                whileTap={{ scale: 0.98 }}
                                type="button"
                            >
                                Explore Our Work
                            </motion.button>
                        </Link>
                    </motion.div>

                    <motion.div
                        className="hero-trust"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                    >
                        <span className="trust-label">Trusted by industry leaders in</span>
                        <div className="trust-locations">
                            <span>DUBAI</span>
                            <span className="trust-dot"></span>
                            <span>ABU DHABI</span>
                            <span className="trust-dot"></span>
                            <span>LONDON</span>
                            <span className="trust-dot"></span>
                            <span>SINGAPORE</span>
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="hero-visual"
                    initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ 
                        perspective: '2000px',
                        transformStyle: 'preserve-3d'
                    }}
                >
                    <motion.div 
                        className="visual-container"
                        style={{ 
                            rotateX: mousePosition.y * 2,
                            rotateY: mousePosition.x * 2,
                        }}
                    >
                        <img 
                            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200" 
                            alt="Data Analytics Interface" 
                            className="hero-main-image"
                        />
                        <div className="visual-overlay" />
                        
                        {/* Floating Tech Elements */}
                        <motion.div 
                            className="floating-card glass"
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            style={{ top: '20%', right: '-10%' }}
                        >
                            <span className="card-val">+300%</span>
                            <span className="card-label">Growth Rate</span>
                        </motion.div>

                        <motion.div 
                            className="floating-card glass"
                            animate={{ y: [0, 20, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            style={{ bottom: '20%', left: '-10%' }}
                        >
                            <span className="card-val">ROI Focused</span>
                            <span className="card-label">Strategic Growth</span>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>

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

