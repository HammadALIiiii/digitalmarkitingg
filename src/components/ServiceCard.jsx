import { motion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import './ServiceCard.css'

const ServiceCard = ({ service, onClick }) => {
    return (
        <div className="service-card-wrapper" style={{ '--card-gradient': service.gradient }}>
            <motion.div
                className="service-card premium-glass"
                onClick={onClick}
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
                {/* Subtle background glow based on the service's color */}
                <div className="card-ambient-glow" style={{ background: service.gradient }} />
                
                <div className="card-top-row">
                    <div className="service-icon-box">
                        <div className="icon-bg" style={{ background: service.gradient }} />
                        <span className="icon-element">{service.icon}</span>
                    </div>
                    <div className="service-arrow-link">
                        <FiArrowUpRight />
                    </div>
                </div>

                <div className="card-body">
                    <h3 className="service-title">{service.title}</h3>
                    <p className="service-description">{service.description}</p>
                </div>
                
                <div className="card-footer">
                    <span className="explore-text">Explore Solutions</span>
                    <div className="explore-line" />
                </div>
            </motion.div>
        </div>
    )
}

export default ServiceCard
