import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaStar, FaQuoteLeft } from 'react-icons/fa'
import './Testimonials.css'

const Testimonials = () => {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

    const testimonials = [
        {
            name: 'Abdul Rahman',
            role: 'CEO, Al-Futtaim Tech',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
            rating: 5,
            text: 'Zentrix transformed our digital presence in just 3 months. Their SEO dominance and targeted ad campaigns delivered a 300% increase in qualified leads.',
        },
        {
            name: 'Sarah Bin Zayed',
            role: 'Marketing Director, Emirates Group',
            image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=200',
            rating: 5,
            text: 'The most professional agency we have worked with in Dubai. Their attention to detail in branding and user experience is truly world-class.',
        },
        {
            name: 'David Miller',
            role: 'Founder, Global Retail Hub',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
            rating: 5,
            text: 'Automating our sales pipeline with Zentrix was a game-changer. We now operate at twice the speed with half the manual overhead. Exceptional ROI.',
        },
    ]

    return (
        <section className="testimonials section" ref={sectionRef}>
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label glass">Testimonials</span>
                    <h2 className="section-title">
                        What Our <span className="gradient-text">Clients Say</span>
                    </h2>
                    <p className="section-description">
                        Don't just take our word for it - hear from our satisfied clients
                    </p>
                </motion.div>

                <div className="testimonials-grid">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            className="testimonial-card glass"
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            whileHover={{ y: -10, scale: 1.02 }}
                        >
                            <FaQuoteLeft className="quote-icon" />

                            <div className="testimonial-rating">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <FaStar key={i} className="star-icon" />
                                ))}
                            </div>

                            <p className="testimonial-text">{testimonial.text}</p>

                            <div className="testimonial-author">
                                <div className="author-image">
                                    <img src={testimonial.image} alt={testimonial.name} className="author-photo" />
                                </div>
                                <div className="author-info">
                                    <div className="author-name">{testimonial.name}</div>
                                    <div className="author-role">{testimonial.role}</div>
                                </div>
                            </div>

                            <div className="testimonial-glow" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Testimonials
