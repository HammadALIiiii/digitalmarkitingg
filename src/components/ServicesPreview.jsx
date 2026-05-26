import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import ServiceCard from './ServiceCard'
import { DEFAULT_SERVICES } from '../data/services'
import './ServicesPreview.css'

const ServicesPreview = ({ onServiceClick }) => {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
    const [dynamicServices, setDynamicServices] = useState(DEFAULT_SERVICES)

    useEffect(() => {
        fetch('/api/services')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setDynamicServices(data)
            })
            .catch(() => { /* Keep using static fallback */ })
    }, [])

    // Services are now fetched entirely from the backend (excluding Digital Products for preview)
    const allServices = dynamicServices
        .filter(s => s.category !== 'Product Catalog')
        .slice(0, 6)
        .map((s, i) => ({
            ...s,
            delay: 0.1 * (i + 1)
        }))

    return (
        <section id="services" className="services-preview section" ref={sectionRef}>
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label glass">Our Expertise</span>
                    <h2 className="section-title">
                        Tailored Digital <span className="gradient-text">Solutions</span>
                    </h2>
                    <p className="section-description">
                        Comprehensive solutions across marketing, development, and automation
                        <br />
                        designed to elevate your brand globally.
                    </p>
                </motion.div>

                <div className="services-grid-preview">
                    {allServices.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: service.delay }}
                        >
                            <ServiceCard
                                service={service}
                                onClick={() => onServiceClick(service)}
                            />
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="services-cta"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <Link to="/services">
                        <motion.button
                            className="btn-primary"
                            whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(102, 126, 234, 0.4)' }}
                            whileTap={{ scale: 0.95 }}
                        >
                            View All Services
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}

export default ServicesPreview
