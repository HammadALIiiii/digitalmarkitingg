import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { FaTimes, FaCheck } from 'react-icons/fa'
import ServiceCard from './ServiceCard'
import './Services.css'

const Services = () => {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
    const [selectedService, setSelectedService] = useState(null)

    const services = [
        {
            id: 1,
            title: 'Digital Marketing',
            description: 'Strategic FB & Google campaigns, SEO, and social media management.',
            longDescription: 'We drive ROI through advanced ad campaigns and organic growth strategies. From Meta Pixel tracking to Google Search dominance, we ensure your brand is seen by the right people at the right time.',
            features: ['Facebook & Google Ads', 'SEO Dominance', 'Social Media Management', 'Campaign Analytics'],
            icon: '📣',
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            delay: 0.1,
        },
        {
            id: 2,
            title: 'Website Development',
            description: 'Custom business sites, e-commerce stores, and high-performance web apps.',
            longDescription: 'We build fast, secure, and beautiful websites using modern technologies like React, Next.js, and Shopify. Whether it\'s a corporate landing page or a complex online store, we deliver perfection.',
            features: ['Business & Custom Sites', 'E-commerce (Shopify/Wix)', 'Next.js & React Builds', 'Mobile First Design'],
            icon: '💻',
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            delay: 0.2,
        },
        {
            id: 3,
            title: 'App Development',
            description: 'Native Android & iOS applications and cross-platform web apps.',
            longDescription: 'Our mobile team crafts premium apps for the Apple and Google ecosystems. We provide end-to-end development, from UI design to app store submission and ongoing support.',
            features: ['Android & iOS Native', 'Web Apps (PWAs)', 'Store Submission', 'Smooth Performance'],
            icon: '📱',
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            delay: 0.3,
        },
        {
            id: 4,
            title: 'Branding & Design',
            description: 'Logo design, brand identity kits, and user-centric UI/UX design.',
            longDescription: 'We create visual identities that tell your story. From memorable logos to complete branding kits and intuitive digital interfaces, we ensure your brand stands out.',
            features: ['Logo & Brand Identity', 'UI/UX Interface Design', 'Style Guides', 'Graphic Assets'],
            icon: '🎨',
            gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            delay: 0.4,
        },
        {
            id: 5,
            title: 'Automation & AI',
            description: 'Chatbots, CRM setups (GHL), and workflow automation with Zapier/Make.',
            longDescription: 'Scale your business with intelligent automation. We set up custom AI chatbots for support, optimize your sales pipeline in GHL, and connect your tools using Zapier & Make.',
            features: ['AI Chatbots', 'CRM Setup (GHL)', 'Zapier & Make.com', 'Business Workflows'],
            icon: '🤖',
            gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
            delay: 0.5,
        },
        {
            id: 6,
            title: 'Digital Products',
            description: 'Premium website templates and specialized digital marketing tools.',
            longDescription: 'Access our catalog of high-impact digital assets. From ready-to-launch website templates to proprietary marketing tools, we give you the edge in a competitive market.',
            features: ['Website Templates', 'Marketing Scripts', 'Digital Assets', 'Ready-to-use Tools'],
            icon: '🛠️',
            gradient: 'linear-gradient(135deg, #ebbba7 0%, #cfc7f8 100%)',
            delay: 0.6,
        },
    ]

    return (
        <section id="services-component" className="services-comp section" ref={sectionRef}>
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label glass">Our Expertise</span>
                    <h2 className="section-title">
                        Tailored Digital <span className="gradient-text">Solutions</span>
                    </h2>
                    <p className="section-description">
                        Comprehensive services designed to scale your business
                        <br />
                        with modern technology and strategy.
                    </p>
                </motion.div>

                <div className="services-grid">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            className={`service-item service-${index + 1}`}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: service.delay }}
                        >
                            <ServiceCard
                                service={service}
                                onClick={() => setSelectedService(service)}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Service Detail Modal */}
            <AnimatePresence>
                {selectedService && (
                    <motion.div
                        className="service-modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedService(null)}
                    >
                        <motion.div
                            className="service-modal-content glass-strong"
                            initial={{ scale: 0.8, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 50 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="close-modal-btn" onClick={() => setSelectedService(null)}>
                                <FaTimes />
                            </button>

                            <div className="modal-header" style={{ background: selectedService.gradient }}>
                                <div className="modal-icon">{selectedService.icon}</div>
                                <h2>{selectedService.title}</h2>
                            </div>

                            <div className="modal-body">
                                <p className="modal-description">{selectedService.longDescription}</p>

                                <h4>Key Features</h4>
                                <ul className="modal-features">
                                    {selectedService.features.map((feature, idx) => (
                                        <li key={idx}>
                                            <FaCheck className="feature-check" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <button className="modal-cta-btn" onClick={() => setSelectedService(null)}>
                                    Inquire Now
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

export default Services
