import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaEnvelope, FaPhone, FaPaperPlane, FaCheck, FaWhatsapp, FaClock, FaUserTie, FaShieldAlt, FaTimes } from 'react-icons/fa'
import { BsWhatsapp } from 'react-icons/bs'
import { submitWeb3Form } from '../lib/web3forms'
import './Contact.css'

const Contact = () => {
    const heroRef = useRef(null)
    const formRef = useRef(null)
    const [formStatus, setFormStatus] = useState('idle') // idle, selection, submitting, success
    const [successType, setSuccessType] = useState('email') // email, whatsapp

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        service: 'Digital Marketing',
        message: ''
    })

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormStatus('selection')
    }

    const handleSelection = async (type) => {
        setSuccessType(type)

        if (type === 'whatsapp') {
            const text = `*New Project Inquiry*%0A%0A*Name:* ${formData.name}%0A*Service:* ${formData.service}%0A*Email:* ${formData.email}%0A%0A*Message:*%0A${formData.message}`
            window.open(`https://wa.me/923116119950?text=${text}`, '_blank')
            setFormStatus('success')
            return
        }

        setFormStatus('submitting')

        try {
            await submitWeb3Form({
                name: formData.name,
                email: formData.email,
                service: formData.service,
                subject: `Project Inquiry: ${formData.service}`,
                message: formData.message,
            })
            setFormStatus('success')
        } catch (error) {
            console.error('Submission error:', error)
            setFormStatus('error')
        }
    }

    const highlights = [
        {
            icon: <FaClock />,
            title: 'Fast Response',
            desc: 'We reply within 24 hours'
        },
        {
            icon: <FaUserTie />,
            title: 'Professional Support',
            desc: 'Dedicated team for your project'
        },
        {
            icon: <FaShieldAlt />,
            title: 'Trusted Service',
            desc: '100% Secure & Confidential'
        }
    ]

    return (
        <div className="contact-page">
            <section className="contact-section section" ref={formRef}>
                <div className="container">
                    <div className="contact-split-layout">
                        {/* Left Side: Information & Highlights */}
                        <motion.div
                            className="contact-left"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="section-label glass">Let's Work Together</span>
                            <h1 className="contact-heading">
                                Ready to Start Your <br />
                                <span className="gradient-text">Next Project?</span>
                            </h1>
                            <p className="contact-text">
                                Whether you have a specific idea or need expert advice, we're here to help you build something amazing.
                            </p>

                            <div className="contact-highlights">
                                {highlights.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        className="highlight-item glass"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <div className="highlight-icon">{item.icon}</div>
                                        <div className="highlight-content">
                                            <h3>{item.title}</h3>
                                            <p>{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mini-contact-info">
                                <a href="mailto:info.zentrixagency@gmail.com" className="mini-link">
                                    <FaEnvelope /> info.zentrixagency@gmail.com
                                </a>
                                <a href="tel:+923116119950" className="mini-link">
                                    <FaPhone /> +92 311 6119950
                                </a>
                            </div>
                        </motion.div>

                        {/* Right Side: Advanced Form */}
                        <motion.div
                            className="contact-right"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="contact-card glass-strong">
                                <AnimatePresence mode="wait">
                                    {formStatus === 'idle' || formStatus === 'submitting' ? (
                                        <motion.form
                                            key="form"
                                            className="contact-form"
                                            onSubmit={handleSubmit}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <h3 className="form-title">Send a Message</h3>

                                            <div className="form-group">
                                                <label>Full Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    placeholder="John Doe"
                                                    className="form-input glass"
                                                    required
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label>Email Address</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    placeholder="john@example.com"
                                                    className="form-input glass"
                                                    required
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label>Service Interested In</label>
                                                <select
                                                    name="service"
                                                    value={formData.service}
                                                    onChange={handleInputChange}
                                                    className="form-select glass"
                                                >
                                                    <option>Digital Marketing</option>
                                                    <option>Website Development</option>
                                                    <option>App Development</option>
                                                    <option>Branding & Design</option>
                                                    <option>Automation & AI Solutions</option>
                                                    <option>Digital Products</option>
                                                    <option>Other</option>
                                                </select>
                                            </div>

                                            <div className="form-group">
                                                <label>Your Message</label>
                                                <textarea
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleInputChange}
                                                    rows="4"
                                                    placeholder="Tell us about your project..."
                                                    className="form-input glass"
                                                    required
                                                ></textarea>
                                            </div>

                                            <motion.button
                                                type="submit"
                                                className="submit-btn"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                Proceed <FaPaperPlane />
                                            </motion.button>
                                        </motion.form>
                                    ) : formStatus === 'selection' ? (
                                        <motion.div
                                            key="selection"
                                            className="selection-card"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                        >
                                            <h3>Choose Delivery Method</h3>
                                            <p>How would you like to send this message?</p>

                                            <div className="selection-buttons">
                                                <button onClick={() => handleSelection('email')} className="select-btn email">
                                                    <div className="icon-box"><FaEnvelope /></div>
                                                    <span>Send via Email</span>
                                                    <small>Official Inquiry</small>
                                                </button>

                                                <button onClick={() => handleSelection('whatsapp')} className="select-btn whatsapp">
                                                    <div className="icon-box"><BsWhatsapp /></div>
                                                    <span>Chat on WhatsApp</span>
                                                    <small>Faster Response</small>
                                                </button>
                                            </div>

                                            <button onClick={() => setFormStatus('idle')} className="back-link">
                                                Back to Form
                                            </button>
                                        </motion.div>
                                    ) : formStatus === 'error' ? (
                                        <motion.div
                                            key="error"
                                            className="success-message error-message"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                        >
                                            <div className="success-icon error-icon" style={{ background: '#ff4d4d' }}>
                                                <FaTimes />
                                            </div>
                                            <h3>Oops! Something went wrong</h3>
                                            <p>We couldn't send your email at this time. Please try again or use WhatsApp.</p>
                                            <button onClick={() => setFormStatus('idle')} className="reset-btn">
                                                Try Again
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="success"
                                            className="success-message"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                        >
                                            <div className="success-icon">
                                                <FaCheck />
                                            </div>
                                            <h3>Request Submitted!</h3>
                                            <p>
                                                {successType === 'email'
                                                    ? 'Your email has been sent successfully. We will get back to you shortly.'
                                                    : 'Redirecting you to WhatsApp to finalize your message...'}
                                            </p>

                                            {successType === 'email' && (
                                                <button onClick={() => {
                                                    setFormStatus('idle')
                                                    setFormData({ name: '', email: '', service: 'Digital Marketing', message: '' })
                                                }} className="reset-btn">
                                                    Send Another Message
                                                </button>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Contact
