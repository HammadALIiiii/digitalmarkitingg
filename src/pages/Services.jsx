import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { FaTimes, FaCheck, FaBullhorn, FaGlobe, FaMobileAlt, FaPalette, FaRobot, FaDownload } from 'react-icons/fa'
import ServiceCard from '../components/ServiceCard'
import './Services.css'

const Services = () => {
    const heroRef = useRef(null)
    const isHeroInView = useInView(heroRef, { once: true })
    const [selectedService, setSelectedService] = useState(null)

    const serviceCategories = [
        {
            title: 'Digital Marketing',
            icon: <FaBullhorn />,
            id: 'marketing',
            services: [
                {
                    id: 1,
                    title: 'Facebook Ads',
                    description: 'High-conversion Meta campaigns targeting your ideal customer profile.',
                    longDescription: 'We build and manage advanced Facebook and Instagram ad campaigns. Our team focuses on audience testing, creative optimization, and tracking (Pixel/CAPI) to ensure every dollar spent brings a return.',
                    features: ['Audience Segmentation', 'Creative Ads', 'Pixel & CAPI Setup', 'ROAS Optimization'],
                    icon: '📱',
                    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800',
                    gradient: 'linear-gradient(135deg, #1877F2 0%, #0056b3 100%)',
                },
                {
                    id: 2,
                    title: 'Google Ads',
                    description: 'Search, Display, and Shopping ads that place you in front of ready-to-buy customers.',
                    longDescription: 'Dominate search results with Google Ads. We handle Keyword Research, Performance Max setups, and Shopping Campaigns to drive high-intent traffic to your site.',
                    features: ['Keyword Analysis', 'PMax Campaign Setup', 'Bidding Strategy', 'Landing Page Audits'],
                    icon: '🔍',
                    image: 'https://images.unsplash.com/photo-1572021335469-3171624c1c5c?auto=format&fit=crop&q=80&w=800',
                    gradient: 'linear-gradient(135deg, #4285F4 0%, #34a853 100%)',
                },
                {
                    id: 3,
                    title: 'Social Media Management',
                    description: 'Full-service handling of your social profiles to build community and trust.',
                    longDescription: 'We manage your social presence across all platforms, creating calendars, engaging with followers, and ensuring your brand voice is consistent and professional.',
                    features: ['Content Calendars', 'Community Mgmt', 'Brand Voice Growth', 'Engagement Tracking'],
                    icon: '🤝',
                    image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80&w=800',
                    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                },
                {
                    id: 4,
                    title: 'SEO',
                    description: 'Organic growth strategies to rank #1 on search engines long-term.',
                    longDescription: 'Our SEO experts optimize your technical structure and content to ensure you own your niche\'s keywords organically. No ad spend required, just pure growth.',
                    features: ['Technical Audit', 'On-page Content', 'Link Building', 'Monthly Reporting'],
                    icon: '📈',
                    image: 'https://images.unsplash.com/photo-1562577353-2ba332df264d?auto=format&fit=crop&q=80&w=800',
                    gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
                },
            ],
        },
        {
            title: 'Website Development',
            icon: <FaGlobe />,
            id: 'web-dev',
            services: [
                {
                    id: 5,
                    title: 'Business Websites',
                    description: 'Professional corporate sites that establish authority and generate leads.',
                    longDescription: 'We build fast, responsive, and SEO-friendly corporate websites. Perfect for service providers, agencies, and enterprise firms looking for a premium online presence.',
                    features: ['Custom Design', 'Fast Load Times', 'SEO Optimized', 'Mobile First'],
                    icon: '🏢',
                    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
                    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                },
                {
                    id: 6,
                    title: 'E-commerce Stores',
                    description: 'Seamless shopping experiences built on Shopify, WooCommerce, or Wix.',
                    longDescription: 'Turn visitors into customers. We build high-converting online stores with optimized checkout flows, inventory management, and marketing integrations.',
                    features: ['Shopify/WooCommerce', 'Payment Gateways', 'Inventory Sync', 'Conversion Focus'],
                    icon: '🛍️',
                    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800',
                    gradient: 'linear-gradient(135deg, #95BF47 0%, #5E8E3E 100%)',
                },
                {
                    id: 7,
                    title: 'Custom Websites',
                    description: 'Tailor-made web solutions for unique business requirements.',
                    longDescription: 'When out-of-the-box CMS isn\'t enough, we build custom web applications using modern frameworks like React and Next.js. Fast, secure, and infinitely scalable.',
                    features: ['React/Next.js Build', 'Global State Mgmt', 'Custom Backend', 'Scalable Arch.'],
                    icon: '⚛️',
                    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
                    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                },
            ],
        },
        {
            title: 'App Development',
            icon: <FaMobileAlt />,
            id: 'app-dev',
            services: [
                {
                    id: 8,
                    title: 'Android Apps',
                    description: 'Robust and scalable mobile applications for the Google Play Store.',
                    longDescription: 'We develop native and cross-platform Android apps that provide a smooth user experience and integrate perfectly with your business ecosystem.',
                    features: ['Native Development', 'Store Submission', 'API Integration', 'UI/UX Excellence'],
                    icon: '🤖',
                    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800',
                    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                },
                {
                    id: 9,
                    title: 'iOS Apps',
                    description: 'Premium Apple ecosystem apps designed for iPhone and iPad.',
                    longDescription: 'Elegant and performant iOS applications. We follow Apple\'s design guidelines to ensure your app feels premium and works flawlessly on all Apple devices.',
                    features: ['Swift & SwiftUI', 'FaceID/Biometrics', 'App Store Setup', 'Secure Payments'],
                    icon: '🍎',
                    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800',
                    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                },
                {
                    id: 10,
                    title: 'Web Apps',
                    description: 'Progressive Web Apps (PWAs) that work on any device and browser.',
                    longDescription: 'Bridge the gap between web and mobile. We build PWAs that offer app-like functionality, offline access, and fast performance across all platforms.',
                    features: ['Mobile Installable', 'Offline Mode', 'Push Notifications', 'Cross-Platform'],
                    icon: '🌐',
                    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
                },
            ],
        },
        {
            title: 'Branding & Design',
            icon: <FaPalette />,
            id: 'design',
            services: [
                {
                    id: 11,
                    title: 'Logo Design',
                    description: 'Memorable brand marks that represent your values and vision.',
                    longDescription: 'A logo is the face of your brand. We design unique, scalable, and timeless logos that make a lasting impression on your target audience.',
                    features: ['Custom Sketches', 'Vector Files', 'Color Variations', 'Icon Symbols'],
                    icon: '🎨',
                    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800',
                    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                },
                {
                    id: 12,
                    title: 'Brand Identity',
                    description: 'Full visual identity systems including typography and color palettes.',
                    longDescription: 'Go beyond the logo. We create complete Brand Identity Kits that ensure your brand looks consistent across social media, print, and digital platforms.',
                    features: ['Brand Style Guide', 'Social Media Assets', 'Stationery Design', 'Visual Hierarchy'],
                    icon: '💎',
                    gradient: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
                },
                {
                    id: 13,
                    title: 'UI/UX Design',
                    description: 'User-centric research and interface design for apps and websites.',
                    longDescription: 'We design experiences that users love. Our UI/UX process involves deep prototyping and research to reduce friction and increase user satisfaction.',
                    features: ['Figma Prototype', 'User Journey Map', 'Wireframing', 'Visual Interf.'],
                    icon: '✨',
                    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=800',
                    gradient: 'linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)',
                },
            ],
        },
        {
            title: 'Automation & AI Solutions',
            icon: <FaRobot />,
            id: 'automation',
            services: [
                {
                    id: 14,
                    title: 'Chatbots',
                    description: 'Intelligent AI-driven bots for customer support and sales qualifying.',
                    longDescription: '24/7 automation for your website or socials. Our AI chatbots handle FAQs, qualify leads, and book appointments without human intervention.',
                    features: ['NLP Processing', 'Lead Qualification', '24/7 Support', 'CRM Integration'],
                    icon: '💬',
                    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
                    gradient: 'linear-gradient(135deg, #4de8b2 0%, #15a8bf 100%)',
                },
                {
                    id: 15,
                    title: 'CRM Setup',
                    description: 'GoHighLevel and specialized CRM builds for sales team efficiency.',
                    longDescription: 'We set up and optimize GoHighLevel (GHL) workflows. Track your leads, automate your pipeline, and close deals faster with a custom CRM setup.',
                    features: ['Pipeline Setup', 'Workflow Autom.', 'Snapshot Import', 'API Hookups'],
                    icon: '⚙️',
                    gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
                },
                {
                    id: 16,
                    title: 'Business Automation',
                    description: 'Workflow optimization using Zapier, Make.com, and custom scripts.',
                    longDescription: 'Stop manual data entry. We connect your entire tech stack using automation tools to save hours of work every single week.',
                    features: ['Zapier/Make.com', 'Data Automation', 'Error Handlers', 'Multi-app Connect'],
                    icon: '🚀',
                    gradient: 'linear-gradient(135deg, #ff0844 0%, #ffb199 100%)',
                },
            ],
        },
        {
            title: 'Digital Products',
            icon: <FaDownload />,
            id: 'products',
            services: [
                {
                    id: 17,
                    title: 'Website Templates',
                    description: 'Premium, ready-to-launch templates for various industries.',
                    longDescription: 'Get a head start with our high-end React, Framer, and HTML templates. Designed for performance and visual impact out of the box.',
                    features: ['Responsive Build', 'Modern Code', 'Easy Customize', 'Fast Loading'],
                    icon: '📄',
                    gradient: 'linear-gradient(135deg, #ebbba7 0%, #cfc7f8 100%)',
                },
                {
                    id: 18,
                    title: 'Marketing Tools',
                    description: 'Proprietary software and scripts to supercharge your growth.',
                    longDescription: 'Access specialized marketing scripts and tools that automate research, lead scraping, or campaign auditing to give you a competitive edge.',
                    features: ['Lead Scraping', 'Campaign Audit', 'Niche Analysis', 'Custom Tools'],
                    icon: '🛠️',
                    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                },
            ],
        },
    ]

    return (
        <div className="services-page">
            {/* Hero Section */}
            <section className="services-hero section" ref={heroRef}>
                <div className="container">
                    <motion.div
                        className="services-hero-content"
                        initial={{ opacity: 0, y: 50 }}
                        animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="section-label glass">Our Global Expertise</span>
                        <h1 className="services-hero-title">
                            Tailored Digital
                            <br />
                            <span className="gradient-text">Solutions</span>
                        </h1>
                        <p className="services-hero-description">
                            Combining creativity, technical innovation, and data-driven strategy
                            <br />
                            to help your business dominate the global market.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Categorized Services Section */}
            {serviceCategories.map((category, catIndex) => (
                <section key={category.id} className="services-category section">
                    <div className="container">
                        <motion.div
                            className="section-header"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="category-icon-wrapper glass">
                                {category.icon}
                            </span>
                            <h2 className="section-title">
                                {category.title}
                            </h2>
                        </motion.div>

                        <div className="services-grid-full">
                            {category.services.map((service, index) => (
                                <motion.div
                                    key={service.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <ServiceCard
                                        service={service}
                                        onClick={() => setSelectedService(service)}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            ))}

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

                            <div className="modal-header">
                                <img src={selectedService.image} alt={selectedService.title} className="modal-bg-image" />
                                <div className="modal-header-overlay" style={{ background: selectedService.gradient + 'cc' }}></div>
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
        </div>
    )
}

export default Services
