import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import './Portfolio.css'

const Portfolio = () => {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
    const [hoveredIndex, setHoveredIndex] = useState(null)

    const projects = [
        {
            title: 'Viral Fashion Campaign',
            category: 'Social Media',
            description: 'Reached 2M+ users with organic engagement strategy',
            gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            size: 'large',
        },
        {
            id: 2,
            title: 'Tech Store SEO',
            category: 'SEO Optimization',
            description: '300% increase in organic search traffic within 6 months',
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            size: 'medium',
        },
        {
            title: 'Finance App Launch',
            category: 'PPC Advertising',
            description: 'Achieved $0.50 CPC with high conversion landing pages',
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            size: 'medium',
        },
        {
            title: 'Real Estate Chatbot',
            category: 'WhatsApp Marketing',
            description: 'Automated lead qualification for premium properties',
            gradient: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
            size: 'large',
        },
    ]

    return (
        <section id="portfolio" className="portfolio section" ref={sectionRef}>
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label glass">Our Success Stories</span>
                    <h2 className="section-title">
                        Featured <span className="gradient-text">Campaigns</span>
                    </h2>
                    <p className="section-description">
                        Discover how we help brands scale through data-driven marketing strategies.
                    </p>
                </motion.div>

                <div className="portfolio-grid">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            className={`portfolio-item ${project.size} glass`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            whileHover={{ y: -10 }}
                        >
                            <div
                                className="portfolio-bg"
                                style={{ background: project.gradient }}
                            />

                            <div className="portfolio-content">
                                <span className="portfolio-category">{project.category}</span>
                                <h3 className="portfolio-title">{project.title}</h3>
                                <p className="portfolio-description">{project.description}</p>

                                <motion.button
                                    className="portfolio-link"
                                    animate={{ x: hoveredIndex === index ? 5 : 0 }}
                                    transition={{ type: 'spring', stiffness: 400 }}
                                >
                                    View Project →
                                </motion.button>
                            </div>

                            <motion.div
                                className="portfolio-overlay"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Portfolio
