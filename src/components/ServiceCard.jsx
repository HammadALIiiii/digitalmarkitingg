import { motion } from 'framer-motion'
import { useTiltEffect } from '../hooks/useMagneticEffect'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import './ServiceCard.css'

const ServiceCard = ({ service, index, onClick }) => {
    // Removed specific options as we rely on Framer Motion for scale, 
    // and useTiltEffect is now a no-op or specific to just passed ref
    const tiltRef = useTiltEffect()
    const { ref, elementRef } = useScrollAnimation({
        animationType: 'fadeUp',
        duration: 0.6,
        delay: index * 0.1
    })

    return (
        <div ref={ref}>
            <motion.div
                ref={(el) => {
                    tiltRef.current = el
                    elementRef.current = el
                }}
                className="service-card glass hover-lift"
                whileHover={{ scale: 1.05, y: -10 }} // Combined scale and lift here for smoothness
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
                <div className="card-glow animate-pulse" style={{ background: service.gradient }} />

                <div className="card-content">
                    <motion.div
                        className="service-icon"
                        style={{ background: service.gradient }}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                    >
                        <span>{service.icon}</span>
                    </motion.div>

                    <h3 className="service-title">{service.title}</h3>
                    <p className="service-description">{service.description}</p>

                    <motion.button
                        className="service-link"
                        onClick={onClick}
                        whileHover={{ x: 5 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                    >
                        Learn More
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M7.5 15L12.5 10L7.5 5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </motion.button>
                </div>

                {/* 3D Depth Layers */}
                <div className="depth-layer layer-1" />
                <div className="depth-layer layer-2" />
            </motion.div>
        </div>
    )
}

export default ServiceCard

