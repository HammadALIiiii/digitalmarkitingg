import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import './PortfolioPreview.css'

const PortfolioPreview = () => {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
    const [hoveredIndex, setHoveredIndex] = useState(null)

    const projects = [
        {
            title: 'Real Estate FB Scale',
            category: 'Digital Marketing',
            description: 'Reached 500+ leads/month with data-driven Meta campaigns',
            image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800',
        },
        {
            title: 'SaaS Google PMax',
            category: 'Digital Marketing',
            description: '4.5x ROAS increase through advanced search & shopping ads',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
        },
        {
            title: 'AI Support Chatbot',
            category: 'Automation & AI',
            description: 'Automated 80% of customer support for a global e-commerce brand',
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
        },
    ]

    return (
        <section className="portfolio-preview section" ref={sectionRef}>
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label glass">Our Work</span>
                    <h2 className="section-title">
                        Featured <span className="gradient-text">Projects</span>
                    </h2>
                </motion.div>

                <div className="portfolio-grid-preview">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            className="portfolio-item-preview glass"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <img
                                className="portfolio-bg"
                                src={project.image}
                                alt={project.title}
                            />

                            <div className="portfolio-content">
                                <span className="portfolio-category">{project.category}</span>
                                <h3 className="portfolio-title">{project.title}</h3>
                                <p className="portfolio-description">{project.description}</p>
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

                <motion.div
                    className="portfolio-cta"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <Link to="/portfolio">
                        <motion.button
                            className="btn-primary"
                            whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(102, 126, 234, 0.4)' }}
                            whileTap={{ scale: 0.95 }}
                        >
                            View All Projects
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}

export default PortfolioPreview
