import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaRocket, FaLightbulb, FaUsers, FaCheckCircle, FaCogs, FaChartLine, FaShieldAlt } from 'react-icons/fa'
import AboutSection from '../components/AboutSection'
import './About.css'

const About = () => {
    const heroRef = useRef(null)
    const isInView = useInView(heroRef, { once: true })

    const processSteps = [
        {
            icon: <FaLightbulb />,
            title: 'Strategy & Planning',
            description: 'We start by understanding your goals and crafting a data-driven roadmap for success.',
        },
        {
            icon: <FaCogs />,
            title: 'Design & Development',
            description: 'Our experts build high-performance solutions with premium design and cutting-edge tech.',
        },
        {
            icon: <FaRocket />,
            title: 'Launch & Optimize',
            description: 'We deploy your project and continuously optimize for maximum ROI and engagement.',
        },
    ]

    const whyChooseUs = [
        {
            icon: <FaShieldAlt />,
            title: 'Reliability',
            description: 'A proven track record of delivering high-impact results for global brands.',
        },
        {
            icon: <FaUsers />,
            title: 'Expert Team',
            description: 'Access to a diverse pool of digital experts in marketing and development.',
        },
        {
            icon: <FaChartLine />,
            title: 'Result Driven',
            description: 'We focus on metrics that matter—leads, conversions, and business growth.',
        },
    ]

    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="about-hero section" ref={heroRef}>
                <div className="container">
                    <motion.div
                        className="about-hero-content"
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="section-label glass">About Zentrix Agency</span>
                        <h1 className="about-hero-title">
                            Empowering Brands
                            <br />
                            <span className="gradient-text">Globally</span>
                        </h1>
                        <p className="about-hero-description">
                            We are a forward-thinking digital agency specializing in high-end design,
                            <br />
                            strategic marketing, and innovative technology solutions.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="mission-vision section">
                <div className="container">
                    <div className="mission-vision-grid">
                        <motion.div
                            className="mission-card glass-strong"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="section-title">Our <span className="gradient-text">Mission</span></h2>
                            <p className="vision-text">
                                To provide innovative digital solutions that help businesses scale globally
                                through technical excellence and creative strategy.
                            </p>
                        </motion.div>
                        <motion.div
                            className="vision-card glass-strong"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="section-title">Our <span className="gradient-text">Vision</span></h2>
                            <p className="vision-text">
                                To become the world's most trusted partner for digital transformation,
                                setting new standards in design and performance.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="about-story section">
                <div className="container">
                    <div className="story-grid">
                        <motion.div
                            className="story-content"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="section-title">
                                Our <span className="gradient-text">Story</span>
                            </h2>
                            <p className="story-text">
                                Zentrix Agency was built on the foundation of technical curiosity and a passion
                                for digital growth. Recognizing the gap between standard marketing and true
                                technical innovation, we set out to create an agency that does both.
                            </p>
                            <p className="story-text">
                                Today, we serve clients across continents, delivering everything from high-conversion
                                ad campaigns to complex web applications. Our global mindset ensures that we
                                understand the nuances of different markets and cultures.
                            </p>
                        </motion.div>

                        <motion.div
                            className="story-image glass"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000"
                                alt="Zentrix Story"
                                className="story-photo"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="about-process section">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="section-label glass">The Zentrix Way</span>
                        <h2 className="section-title">
                            Our <span className="gradient-text">Process</span>
                        </h2>
                    </motion.div>

                    <div className="process-grid">
                        {processSteps.map((step, index) => (
                            <motion.div
                                key={index}
                                className="process-card glass"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <div className="process-icon">{step.icon}</div>
                                <h3 className="process-title">{step.title}</h3>
                                <p className="process-description">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Zentrix Section */}
            <section className="why-zentrix section">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="section-label glass">Why Us</span>
                        <h2 className="section-title">
                            Why <span className="gradient-text">Zentrix Agency</span>
                        </h2>
                    </motion.div>

                    <div className="why-grid">
                        {whyChooseUs.map((item, index) => (
                            <motion.div
                                key={index}
                                className="why-card glass"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <div className="why-icon-container">
                                    <div className="why-icon">{item.icon}</div>
                                </div>
                                <div className="why-content">
                                    <h3 className="why-title">{item.title}</h3>
                                    <p className="why-description">{item.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Shared AboutSection from Home */}
            <AboutSection />
        </div>
    )
}

export default About

