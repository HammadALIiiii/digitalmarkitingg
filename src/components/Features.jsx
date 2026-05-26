import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiActivity, FiZap, FiBox, FiShield, FiCpu, FiGlobe } from 'react-icons/fi'
import './Features.css'

const Features = () => {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

    const features = [
        {
            title: 'ROI-Driven Strategy',
            description: 'Every campaign we launch is backed by deep data analysis and a commitment to measurable returns.',
            icon: <FiActivity />,
            size: 'bento-large'
        },
        {
            title: 'Global Reach',
            description: 'Scale your brand across borders with specialized GCC and international marketing expertise.',
            icon: <FiGlobe />,
            size: 'bento-small'
        },
        {
            title: 'Lead Automation',
            description: 'Capture and nurture leads automatically using our advanced AI-driven CRM workflows.',
            icon: <FiZap />,
            size: 'bento-small'
        },
        {
            title: 'Brand Protection',
            description: 'Maintain brand integrity with high-fidelity creative assets and secure data management.',
            icon: <FiShield />,
            size: 'bento-medium'
        },
        {
            title: 'AI Personalization',
            description: 'Leverage machine learning to deliver hyper-personalized ad experiences to your audience.',
            icon: <FiCpu />,
            size: 'bento-medium'
        },
        {
            title: 'Omnichannel Growth',
            description: 'Sync your presence across Meta, Google, LinkedIn, and TikTok for a unified brand story.',
            icon: <FiBox />,
            size: 'bento-small'
        }
    ]

    return (
        <section id="features" className="features section" ref={sectionRef}>
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label glass">Platform Capabilities</span>
                    <h2 className="section-title">
                        Everything you need to <span className="gradient-text">Scale</span>
                    </h2>
                </motion.div>

                <div className="features-bento">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className={`bento-card ${feature.size}`}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <div>
                                <div className="feature-icon">{feature.icon}</div>
                                <h3 className="feature-title">{feature.title}</h3>
                                <p className="feature-description">{feature.description}</p>
                            </div>
                            <div className="feature-glow" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Features
