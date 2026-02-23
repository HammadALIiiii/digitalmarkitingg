import { useState } from 'react'
import { motion } from 'framer-motion'
import './Contact.css'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [status, setStatus] = useState({ type: '', message: '' })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setStatus({ type: '', message: '' })

        try {
            const response = await fetch('http://localhost:5000/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            const data = await response.json()

            if (data.success) {
                setStatus({ type: 'success', message: 'Message sent! We\'ll get back to you soon.' })
                setFormData({ name: '', email: '', subject: '', message: '' })
            } else {
                setStatus({ type: 'error', message: 'Something went wrong. Please try again.' })
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Could not connect to server. Is the backend running?' })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section id="contact" className="contact section">
            <div className="container">
                <div className="contact-wrapper glass-strong">
                    <motion.div
                        className="contact-content"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="section-label glass">Get In Touch</span>
                        <h2 className="section-title">
                            Let's Create Something
                            <br />
                            <span className="gradient-text">Amazing Together</span>
                        </h2>
                        <p className="contact-description">
                            Ready to transform your ideas into reality? We're here to help you
                            build exceptional digital experiences through data-driven marketing.
                        </p>

                        <div className="contact-info">
                            <div className="info-item">
                                <div className="info-icon">📧</div>
                                <div>
                                    <div className="info-label">Email</div>
                                    <div className="info-value">sulman12186@gmail.com</div>
                                </div>
                            </div>
                            <div className="info-item">
                                <div className="info-icon">📱</div>
                                <div>
                                    <div className="info-label">Phone</div>
                                    <div className="info-value">+1 (555) 987-6543</div>
                                </div>
                            </div>
                            <div className="info-item">
                                <div className="info-icon">📍</div>
                                <div>
                                    <div className="info-label">Location</div>
                                    <div className="info-value">Digital Hub, Austin, TX</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.form
                        className="contact-form"
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="form-group">
                            <input
                                name="name"
                                type="text"
                                placeholder="Your Name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="form-input glass"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                name="email"
                                type="email"
                                placeholder="Your Email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="form-input glass"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                name="subject"
                                type="text"
                                placeholder="Subject"
                                required
                                value={formData.subject}
                                onChange={handleChange}
                                className="form-input glass"
                            />
                        </div>
                        <div className="form-group">
                            <textarea
                                name="message"
                                placeholder="Your Message"
                                required
                                rows="5"
                                value={formData.message}
                                onChange={handleChange}
                                className="form-input glass"
                            />
                        </div>

                        {status.message && (
                            <div className={`form-status ${status.type}`}>
                                {status.message}
                            </div>
                        )}

                        <motion.button
                            disabled={isSubmitting}
                            type="submit"
                            className="submit-button"
                            whileHover={{ scale: 1.02, boxShadow: '0 20px 60px rgba(102, 126, 234, 0.4)' }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </motion.button>
                    </motion.form>
                </div>
            </div>
        </section>
    )
}

export default Contact
