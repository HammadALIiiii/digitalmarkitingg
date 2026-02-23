import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './Features.css'

const Features = () => {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

    const features = [
        {
            title: 'Lightning Fast',
            description: 'Optimized performance for instant loading and smooth interactions.',
            stat: '99%',
            label: 'Performance Score',
        },
        {
            title: 'Fully Responsive',
            description: 'Perfect experience across all devices and screen sizes.',
            stat: '100%',
            label: 'Mobile Optimized',
        },
        {
            title: 'SEO Optimized',
            description: 'Built with best practices for maximum search visibility.',
            stat: 'A+',
            label: 'SEO Rating',
        },
        {
            title: 'Secure & Reliable',
            description: 'Enterprise-grade security and 99.9% uptime guarantee.',
            stat: '99.9%',
            label: 'Uptime',
        },
    ]

    return (
        <section id="features" className="features section" ref={sectionRef}>
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label glass">Why Choose Us</span>
                    <h2 className="section-title">
                        Built for <span className="gradient-text">Excellence</span>
                    </h2>
                </motion.div>

                <div className="features-grid">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="feature-card glass-strong"
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ y: -10, scale: 1.02 }}
                        >
                            <div className="feature-stat gradient-text">{feature.stat}</div>
                            <div className="feature-label">{feature.label}</div>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-description">{feature.description}</p>
                            <div className="feature-glow" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Features
