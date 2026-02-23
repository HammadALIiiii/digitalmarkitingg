import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaLightbulb, FaArrowRight } from 'react-icons/fa'
import './AboutSection.css'

const AboutSection = () => {
    return (
        <section className="owner-profile section">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label glass">Strategic Consulting</span>
                    <h2 className="section-title">
                        Engineering Your <span className="gradient-text">Global Advantage</span>
                    </h2>
                </motion.div>

                <div className="owner-content">
                    <motion.div
                        className="owner-image-section"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="owner-image-frame">
                            <img
                                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1200"
                                alt="Strategic Boardroom View"
                                className="owner-photo-full"
                            />

                            {/* Signature Badge */}
                            <motion.div
                                className="owner-badge-premium glass-strong"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <span className="badge-icon">🌍</span>
                                <div className="badge-content">
                                    <span className="badge-title">Global Presence</span>
                                    <span className="badge-subtitle">Authorized Strategy</span>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="owner-info"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="owner-quote glass">
                            <FaLightbulb className="quote-icon" />
                            <p className="quote-text">
                                "We move beyond digital presence, implementing proprietary
                                frameworks that convert global ambition into market leadership."
                            </p>
                        </div>

                        <h3 className="owner-name">
                            The Zentrix Method
                            <span className="owner-title">Strategic Architecture</span>
                        </h3>

                        <p className="owner-bio">
                            ZenTrix is an executive digital consultancy. We specialize in the high-level
                            orchestration of technology and marketing, delivering cohesive digital
                            methodologies that ensure sustainable, global-scale expansion.
                        </p>

                        <div className="owner-stats">
                            <div className="stat-item glass">
                                <div className="stat-value gradient-text">500+</div>
                                <div className="stat-label">Clients Served</div>
                            </div>
                            <div className="stat-item glass">
                                <div className="stat-value gradient-text">98%</div>
                                <div className="stat-label">Retention Rate</div>
                            </div>
                            <div className="stat-item glass">
                                <div className="stat-value gradient-text">24/7</div>
                                <div className="stat-label">Support</div>
                            </div>
                        </div>

                        <Link to="/about">
                            <motion.button
                                className="btn-primary"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{ marginTop: '1rem', width: 'fit-content', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                            >
                                More About Us <FaArrowRight size={14} />
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default AboutSection
