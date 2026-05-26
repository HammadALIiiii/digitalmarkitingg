import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { FaDownload, FaSearch, FaFilter, FaArrowRight, FaChartPie, FaRocket, FaShieldAlt } from 'react-icons/fa'
import ServiceCard from '../components/ServiceCard'
import { DEFAULT_CATALOG } from '../data/services'
import './Catalog.css'

const Catalog = ({ onServiceClick }) => {
    const [products, setProducts] = useState(DEFAULT_CATALOG)
    const [searchTerm, setSearchTerm] = useState('')
    const [activeFilter, setActiveFilter] = useState('All')
    const heroRef = useRef(null)
    const isHeroInView = useInView(heroRef, { once: true })

    useEffect(() => {
        fetch('/api/services')
            .then(res => res.json())
            .then(data => {
                // Filter specifically for Product Catalog (premium showcase items)
                const catalogItems = data.filter(s => s.category === 'Product Catalog')
                if (catalogItems.length > 0) setProducts(catalogItems)
            })
            .catch(() => { /* Keep using static fallback */ })
    }, [])

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.description.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesFilter = activeFilter === 'All' || p.type === activeFilter
        return matchesSearch && matchesFilter
    })

    const catalogStats = [
        { label: 'Premium Assets', value: products.length, icon: <FaDownload />, color: '#95BF47' },
        { label: 'Global Delivery', value: 'Instant', icon: <FaRocket />, color: '#4facfe' },
        { label: 'Secure Access', value: 'v3.0', icon: <FaShieldAlt />, color: '#f093fb' }
    ]

    return (
        <div className="catalog-page">
            {/* Catalog Hero */}
            <section className="catalog-hero" ref={heroRef}>
                <div className="container">
                    <motion.div
                        className="catalog-hero-content"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="section-label glass">Digital Asset Marketplace</span>
                        <h1 className="catalog-title">
                            Executive <span className="gradient-text">Product</span>
                            <br />
                            Catalog
                        </h1>
                        <p className="catalog-subtitle">
                            High-performance digital assets designed to scale your enterprise operations
                            and dominate your market niche.
                        </p>

                        <div className="catalog-stats-row">
                            {catalogStats.map((stat, i) => (
                                <div key={i} className="mini-stat glass">
                                    <span style={{ color: stat.color }}>{stat.icon}</span>
                                    <div>
                                        <strong>{stat.value}</strong>
                                        <small>{stat.label}</small>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Catalog Controls */}
            <section className="catalog-controls section">
                <div className="container">
                    <div className="controls-wrapper glass-strong">
                        <div className="search-box">
                            <FaSearch />
                            <input
                                type="text"
                                placeholder="Search premium assets..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="filter-group">
                            <button
                                className={`filter-btn ${activeFilter === 'All' ? 'active' : ''}`}
                                onClick={() => handleFilterChange('All')}
                            >
                                All Assets
                            </button>
                            <button
                                className={`filter-btn ${activeFilter === 'Website Templates' ? 'active' : ''}`}
                                onClick={() => handleFilterChange('Website Templates')}
                            >
                                Templates
                            </button>
                            <button
                                className={`filter-btn ${activeFilter === 'Marketing Tools' ? 'active' : ''}`}
                                onClick={() => handleFilterChange('Marketing Tools')}
                            >
                                Tools
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Grid Section */}
            <section className="catalog-grid-section section">
                <div className="container">
                    <div className="catalog-grid">
                        <AnimatePresence>
                            {filteredProducts.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                >
                                    <ServiceCard
                                        service={product}
                                        onClick={() => onServiceClick(product)}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="no-results glass">
                            <h3>No Assets Found</h3>
                            <p>Try adjusting your search or contact us for custom development.</p>
                            <button className="btn-primary" onClick={() => setSearchTerm('')}>Reset Search</button>
                        </div>
                    )}
                </div>
            </section>

            {/* Catalog CTA */}
            <section className="catalog-cta section">
                <div className="container">
                    <div className="cta-box glass-strong">
                        <div className="cta-content">
                            <h2>Need a Custom Solution?</h2>
                            <p>Our executive engineering team can build bespoke digital assets tailored to your specific business requirements.</p>
                            <button className="btn-primary" onClick={() => window.open('https://wa.me/923116119950?text=Hello! I would like to talk to a consultant about custom digital assets.', '_blank')}>
                                Talk to Consultant <FaArrowRight />
                            </button>
                        </div>
                        <div className="cta-visual">
                            <FaChartPie />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Catalog
