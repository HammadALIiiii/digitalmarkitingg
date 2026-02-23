import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaArrowRight } from 'react-icons/fa'
import './CTASection.css'

const CTASection = () => {
    return (
        <section className="cta-section section">
            <div className="container">
                <motion.div
                    className="cta-wrapper glass-strong"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="cta-content">
                        <motion.h2
                            className="cta-title"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            Ready to Start Your
                            <br />
                            <span className="gradient-text">Next Project?</span>
                        </motion.h2>

                        <motion.p
                            className="cta-description"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            Let's collaborate and bring your vision to life with cutting-edge technology
                            <br />
                            and stunning design that sets you apart from the competition.
                        </motion.p>

                        <motion.div
                            className="cta-buttons"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <Link to="/contact">
                                <motion.button
                                    className="btn-cta-primary"
                                    whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(102, 126, 234, 0.4)' }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Get Started Now
                                    <FaArrowRight className="btn-icon" />
                                </motion.button>
                            </Link>

                            <Link to="/portfolio">
                                <motion.button
                                    className="btn-cta-secondary glass"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    View Our Work
                                </motion.button>
                            </Link>
                        </motion.div>
                    </div>

                    <div className="cta-decoration">
                        <motion.div
                            className="decoration-circle circle-1"
                            animate={{
                                y: [0, -20, 0],
                                rotate: [0, 180, 360],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        />
                        <motion.div
                            className="decoration-circle circle-2"
                            animate={{
                                y: [0, 20, 0],
                                rotate: [0, -180, -360],
                            }}
                            transition={{
                                duration: 10,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default CTASection
