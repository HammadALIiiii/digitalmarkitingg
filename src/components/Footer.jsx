import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaTwitter, FaLinkedin, FaGithub, FaDribbble, FaEnvelope, FaPhone } from 'react-icons/fa'
import ZentrixLogo from './ZentrixLogo'
import './Footer.css'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    const socialLinks = [
        { name: 'Twitter', icon: <FaTwitter />, url: 'https://twitter.com' },
        { name: 'LinkedIn', icon: <FaLinkedin />, url: 'https://linkedin.com' },
        { name: 'GitHub', icon: <FaGithub />, url: 'https://github.com' },
        { name: 'Dribbble', icon: <FaDribbble />, url: 'https://dribbble.com' },
    ]

    const footerServices = [
        { name: 'Digital Marketing', path: '/services' },
        { name: 'Website Development', path: '/services' },
        { name: 'App Development', path: '/services' },
        { name: 'Branding & Design', path: '/services' },
        { name: 'Automation & AI', path: '/services' },
    ]

    const company = [
        { name: 'About Us', path: '/about' },
        { name: 'Our Team', path: '/about' },
        { name: 'Portfolio', path: '/portfolio' },
        { name: 'Contact', path: '/contact' },
    ]

    const resources = [
        'Documentation',
        'Tutorials',
        'Case Studies',
        'Support Center',
    ]

    const [subscribed, setSubscribed] = useState(false)
    const [email, setEmail] = useState('')

    const handleSubscribe = (e) => {
        e.preventDefault()
        if (email) {
            setSubscribed(true)
            setEmail('')
            setTimeout(() => setSubscribed(false), 5000)
        }
    }

    return (
        <footer className="footer">
            <div className="container">
                {/* Newsletter Section */}
                <motion.div
                    className="footer-newsletter glass"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="newsletter-content">
                        <h3 className="newsletter-title">
                            Stay Updated with <span className="gradient-text">Our Newsletter</span>
                        </h3>
                        <p className="newsletter-description">
                            Get the latest updates on design trends, tech insights, and exclusive offers.
                        </p>
                    </div>
                    <form className="newsletter-form" onSubmit={handleSubscribe}>
                        <label htmlFor="newsletter-email" className="visually-hidden">Email for newsletter</label>
                        <input
                            id="newsletter-email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="newsletter-input glass"
                            required
                        />
                        <motion.button
                            type="submit"
                            className="newsletter-btn"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {subscribed ? 'Subscribed!' : 'Subscribe'}
                        </motion.button>
                    </form>
                    {subscribed && (
                        <motion.p
                            className="newsletter-success"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{ color: '#95BF47', marginTop: '1rem', fontSize: '0.9rem' }}
                        >
                            Thank you for subscribing! Check your email for updates.
                        </motion.p>
                    )}
                </motion.div>

                {/* Main Footer Content */}
                <div className="footer-content">
                    <motion.div
                        id="footer-brand"
                        className="footer-brand"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link to="/">
                            <div className="footer-logo">
                                <ZentrixLogo variant="footer" />
                            </div>
                        </Link>
                        <p className="footer-tagline">
                            Dubai's premier digital architecture firm. We specialize in transforming complex business goals into high-performance digital realities.
                        </p>

                        {/* Contact Info */}
                        <div className="footer-contact">
                            <div className="contact-item">
                                <FaEnvelope className="contact-icon" />
                                <a href="mailto:info.zentrixagency@gmail.com">info.zentrixagency@gmail.com</a>
                            </div>
                            <div className="contact-item">
                                <FaPhone className="contact-icon" />
                                <a href="tel:+923116119950">+92 (311) 611-9950</a>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="footer-links-section"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <h4 className="footer-heading">Services</h4>
                        {footerServices.map((service, index) => (
                            <Link
                                key={index}
                                to={service.path}
                                className="footer-link"
                            >
                                {service.name}
                            </Link>
                        ))}
                    </motion.div>

                    <motion.div
                        className="footer-links-section"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h4 className="footer-heading">Company</h4>
                        {company.map((item, index) => (
                            <Link
                                key={index}
                                to={item.path}
                                className="footer-link"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </motion.div>

                    <motion.div
                        className="footer-links-section"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <h4 className="footer-heading">Resources</h4>
                        {resources.map((resource, index) => (
                            <a
                                key={index}
                                href="#"
                                className="footer-link"
                            >
                                {resource}
                            </a>
                        ))}
                    </motion.div>

                    <motion.div
                        className="footer-social-section"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <h4 className="footer-heading">Follow Us</h4>
                        <div className="social-links">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-link glass"
                                    whileHover={{ scale: 1.1, y: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                    aria-label={social.name}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>

                        {/* Awards & Recognition */}
                        <div className="footer-awards">
                            <h5 className="awards-title">Awards & Recognition</h5>
                            <div className="awards-list">
                                <span className="award-badge glass">🏆 Best Design 2024</span>
                                <span className="award-badge glass">⭐ Top Rated Agency</span>
                                <span className="award-badge glass">🎨 Awwwards Winner</span>
                            </div>
                        </div>
                    </motion.div>
                </div >

                {/* Footer Bottom */}
                < motion.div
                    className="footer-bottom"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <p className="copyright">
                        © {currentYear} Zentrix Agency. Dubai's Digital Vision & Global Impact.
                    </p>
                    <div className="footer-bottom-links">
                        <a href="#" className="footer-bottom-link">Privacy Policy</a>
                        <span className="separator">•</span>
                        <a href="#" className="footer-bottom-link">Terms of Service</a>
                    </div>
                </motion.div >
            </div >

            {/* Decorative Elements */}
            < div className="footer-decoration" >
                <div className="decoration-circle circle-1" />
                <div className="decoration-circle circle-2" />
            </div >
        </footer >
    )
}

export default Footer
