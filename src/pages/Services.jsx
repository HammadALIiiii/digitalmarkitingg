import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaDownload } from 'react-icons/fa'
import ServiceCard from '../components/ServiceCard'
import Methodology from '../components/Methodology'
import FAQ from '../components/FAQ'
import CTASection from '../components/CTASection'
import { DEFAULT_SERVICES } from '../data/services'
import './Services.css'

const Services = ({ onServiceClick }) => {
    const heroRef = useRef(null)
    const isHeroInView = useInView(heroRef, { once: true })
    const [dynamicServices, setDynamicServices] = useState(DEFAULT_SERVICES)

    useEffect(() => {
        fetch('/api/services')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    // Filter out catalog if any snuck in
                    setDynamicServices(data.filter(s => s.category !== 'Product Catalog'))
                }
            })
            .catch(() => { /* Keep using static fallback */ })
    }, [])

    const groupedServices = dynamicServices.reduce((acc, svc) => {
        const cat = svc.category || 'Uncategorized';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(svc);
        return acc;
    }, {});

    const sortedCategories = Object.keys(groupedServices).sort();

    return (
        <div className="services-page">
            {/* Hero Section */}
            <section className="services-hero section" ref={heroRef}>
                <div className="container">
                    <motion.div
                        className="services-hero-content"
                        initial={{ opacity: 0, y: 50 }}
                        animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="section-label glass">Our Expertise</span>
                        <h1 className="services-hero-title">
                            Engineering Digital
                            <br />
                            <span className="gradient-text">Dominance</span>
                        </h1>
                        <p className="services-hero-description">
                            We don't just build websites or run ads. We architect comprehensive digital ecosystems designed to dominate markets, capture high-intent leads, and scale your revenue aggressively.
                        </p>
                    </motion.div>
                </div>
            </section>

            <Methodology />

            {/* Categorized Services Section */}
            {sortedCategories.map((category) => (
                <section key={category} className="services-category section">
                    <div className="container">
                        <motion.div
                            className="section-header"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="category-icon-wrapper glass">
                                {groupedServices[category][0]?.icon || <FaDownload />}
                            </span>
                            <h2 className="section-title">
                                {category}
                            </h2>
                        </motion.div>

                        <div className="services-grid-full">
                            {groupedServices[category].map((service, index) => (
                                <motion.div
                                    key={service.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true, margin: '-50px' }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <ServiceCard
                                        service={service}
                                        onClick={() => onServiceClick(service)}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            ))}

            <FAQ />
            <CTASection />
        </div>
    )
}

export default Services
