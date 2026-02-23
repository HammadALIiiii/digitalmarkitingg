import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import ServiceCard from './ServiceCard'
import './ServicesPreview.css'

const ServicesPreview = () => {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

    const services = [
        {
            id: 1,
            title: 'Digital Marketing',
            description: 'Scale your ROI with data-driven Facebook & Google Ads and SEO strategies.',
            icon: '📣',
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            delay: 0.1,
        },
        {
            id: 2,
            title: 'Website & App Dev',
            description: 'Custom business sites, E-commerce stores, and native mobile applications.',
            icon: '💻',
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            delay: 0.2,
        },
        {
            id: 3,
            title: 'Automation & AI',
            description: 'Streamline your operations with CRM setup and intelligent AI Chatbots.',
            icon: '🤖',
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            delay: 0.3,
        },
    ]

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
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: service.delay }}
                        >
                            <ServiceCard service={service} />
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
