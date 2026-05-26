import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaChartLine, FaHandshake, FaLightbulb } from 'react-icons/fa'
import './WhyChooseUs.css'

const WhyChooseUs = () => {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

    const reasons = [
        {
            icon: <FaChartLine />,
            title: 'Data-Driven ROI',
            description: 'We don\'t guess. Every strategy is backed by deep analytics, ensuring every dollar spent translates to measurable business growth.'
        },
        {
            icon: <FaHandshake />,
            title: 'Strategic Partnership',
            description: 'We act as an extension of your team. Transparent reporting, proactive communication, and aligned business goals.'
        },
        {
            icon: <FaLightbulb />,
            title: 'Innovative Execution',
            description: 'Leveraging cutting-edge AI and automation to deliver high-performance solutions faster and more efficiently than traditional agencies.'
        }
    ]

    return (
        <section className="why-choose-us section" ref={sectionRef}>
            <div className="container">
                <div className="wcu-grid">
                    <motion.div 
                        className="wcu-content"
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="section-label glass">Our Philosophy</span>
                        <h2 className="section-title">
                            Why Industry Leaders <span className="gradient-text">Trust Us</span>
                        </h2>
                        <p className="wcu-description">
                            In a crowded digital landscape, we differentiate ourselves through unwavering commitment to results. We build robust digital architectures designed not just to look good, but to perform exceptionally well.
                        </p>
                        
                        <div className="wcu-stats">
                            <div className="wcu-stat-item">
                                <span className="wcu-stat-number gradient-text">98%</span>
                                <span className="wcu-stat-label">Client Retention</span>
                            </div>
                            <div className="wcu-stat-item">
                                <span className="wcu-stat-number gradient-text">20+</span>
                                <span className="wcu-stat-label">Industry Awards</span>
                            </div>
                        </div>
                    </motion.div>

                    <div className="wcu-features">
                        {reasons.map((reason, index) => (
                            <motion.div 
                                key={index}
                                className="wcu-feature-card glass"
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.2 + (index * 0.2) }}
                            >
                                <div className="wcu-feature-icon">
                                    {reason.icon}
                                </div>
                                <div className="wcu-feature-text">
                                    <h3>{reason.title}</h3>
                                    <p>{reason.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WhyChooseUs
