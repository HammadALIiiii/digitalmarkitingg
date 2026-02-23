import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa'
import './Portfolio.css'

const Portfolio = () => {
    const heroRef = useRef(null)
    const portfolioRef = useRef(null)
    const isHeroInView = useInView(heroRef, { once: true })
    const isPortfolioInView = useInView(portfolioRef, { once: true, margin: '-100px' })
    const [filter, setFilter] = useState('all')

    const categories = [
        'all',
        'marketing',
        'web-dev',
        'app-dev',
        'design',
        'automation',
        'products'
    ]

    const categoryLabels = {
        all: 'All Projects',
        marketing: 'Digital Marketing',
        'web-dev': 'Web Development',
        'app-dev': 'App Development',
        design: 'Branding & Design',
        automation: 'Automation & AI',
        products: 'Digital Products'
    }

    const projects = [
        // Marketing
        {
            id: 1,
            title: 'Real Estate Authority',
            category: 'marketing',
            description: 'Scaling lead generation campaigns for a luxury firm, reaching 500+ leads/month.',
            image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800',
            tags: ['Facebook Ads', 'Lead Gen', 'Scaling'],
        },
        {
            id: 2,
            title: 'SaaS Scale Engine',
            category: 'marketing',
            description: 'Optimizing Performance Max campaigns for a software startup with 4.5x ROAS.',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
            tags: ['Google Ads', 'PMax', 'SEM'],
        },
        // Web Dev
        {
            id: 3,
            title: 'Modern Corporate Portal',
            category: 'web-dev',
            description: 'Fast, secure corporate portal built with React and optimized for enterprise speed.',
            image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
            tags: ['React', 'Business', 'Performance'],
        },
        {
            id: 4,
            title: 'Custom E-commerce Kit',
            category: 'web-dev',
            description: 'Shopify-based luxury store with custom Liquid filtering and dynamic checkout.',
            image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800',
            tags: ['Shopify', 'Liquid', 'E-commerce'],
        },
        // App Dev
        {
            id: 5,
            title: 'Fitness Tracker App',
            category: 'app-dev',
            description: 'Cross-platform mobile application featuring real-time health data sync.',
            image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800',
            tags: ['App Dev', 'UI/UX', 'Cloud'],
        },
        // Branding/Design
        {
            id: 6,
            title: 'Tech Brand Identity',
            category: 'design',
            description: 'Complete visual system redesign for a Silicon Valley consultancy firm.',
            image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800',
            tags: ['Branding', 'Logos', 'Kit'],
        },
        // Automation
        {
            id: 7,
            title: 'GHL Sales Pipeline',
            category: 'automation',
            description: 'Full GoHighLevel automation build-out for a dental clinic network.',
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
            tags: ['GHL', 'CRM', 'Automation'],
        },
        {
            id: 8,
            title: 'AI Support Chatbot',
            category: 'automation',
            description: 'Advanced NLP bot handling 1000+ daily customer queries for e-commerce.',
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
            tags: ['AI', 'Chatbots', 'NLP'],
        },
        // Products
        {
            id: 9,
            title: 'Agency React Template',
            category: 'products',
            description: 'Premium portfolio template sold to 200+ developers worldwide.',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
            tags: ['Template', 'React', 'Product'],
        },
    ]

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(p => p.category === filter)

    return (
        <div className="portfolio-page">
            <section className="portfolio-hero section" ref={heroRef}>
                <div className="container">
                    <motion.div
                        className="portfolio-hero-content"
                        initial={{ opacity: 0, y: 50 }}
                        animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="section-label glass">Our Portfolio</span>
                        <h1 className="portfolio-hero-title">
                            Global Case
                            <br />
                            <span className="gradient-text">Studies</span>
                        </h1>
                        <p className="portfolio-hero-description">
                            Witness how we transform industries through marketing,
                            <br />
                            technology, and automation excellence.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="portfolio-filter-section" ref={portfolioRef}>
                <div className="container">
                    <motion.div
                        className="filter-buttons"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isPortfolioInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        {categories.map((category) => (
                            <motion.button
                                key={category}
                                className={`filter-btn glass ${filter === category ? 'active' : ''}`}
                                onClick={() => setFilter(category)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {categoryLabels[category]}
                            </motion.button>
                        ))}
                    </motion.div>
                </div>
            </section>

            <section className="portfolio-grid-section section">
                <div className="container">
                    <div className="portfolio-grid-full">
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                className="portfolio-project glass"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                whileHover={{ y: -10 }}
                                layout
                            >
                                <img src={project.image} alt={project.title} className="project-bg" />

                                <div className="project-content">
                                    <span className="project-category">{categoryLabels[project.category]}</span>
                                    <h3 className="project-title">{project.title}</h3>
                                    <p className="project-description">{project.description}</p>

                                    <div className="project-tags">
                                        {project.tags.map((tag, i) => (
                                            <span key={i} className="project-tag">{tag}</span>
                                        ))}
                                    </div>

                                    <div className="project-links">
                                        <motion.button
                                            className="project-link-btn"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <FaExternalLinkAlt />
                                        </motion.button>
                                        <motion.button
                                            className="project-link-btn"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <FaGithub />
                                        </motion.button>
                                    </div>
                                </div>

                                <div className="project-overlay" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Portfolio
