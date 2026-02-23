import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaStar, FaQuoteLeft } from 'react-icons/fa'
import './Testimonials.css'

const Testimonials = () => {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

    const testimonials = [
        {
            name: 'Sarah Johnson',
            role: 'CEO, TechStart Inc.',
            image: 'https://images.unsplash.com/photo-1494433222041-356d79cabe82?auto=format&fit=crop&q=80&w=200',
            rating: 5,
            text: 'Working with Zentrix was an absolute game-changer. Their attention to detail and innovative approach exceeded all our expectations.',
        },
        {
            name: 'Michael Chen',
            role: 'Founder, DesignHub',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
            rating: 5,
            text: 'The team delivered a stunning website that perfectly captures our brand. The 3D effects and animations are simply breathtaking!',
        },
        {
            name: 'Emily Rodriguez',
            role: 'Marketing Director, GrowthCo',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
            rating: 5,
            text: 'Outstanding work! They transformed our vision into reality with incredible precision and creativity. Highly recommended!',
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
