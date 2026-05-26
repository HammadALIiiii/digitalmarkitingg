import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { FaChevronDown } from 'react-icons/fa'
import './FAQ.css'

const FAQ = () => {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
    const [activeIndex, setActiveIndex] = useState(null)

    const faqs = [
        {
            question: 'What is your typical project engagement timeline?',
            answer: 'Timelines vary depending on the scope. A corporate website typically takes 4-8 weeks from discovery to launch. Digital marketing campaigns require a minimum 3-month commitment to gather data, optimize, and scale effectively.'
        },
        {
            question: 'Do you work with startups or only established enterprises?',
            answer: 'We partner with ambitious companies of all sizes. While we have deep experience with enterprise clients, we also build robust digital architectures for well-funded startups looking to scale aggressively.'
        },
        {
            question: 'How do you measure success and report on ROI?',
            answer: 'We are fiercely data-driven. During the discovery phase, we establish clear KPIs (e.g., Target CPA, ROAS, Lead Volume). We provide real-time dashboards and detailed monthly strategic reviews to ensure complete transparency.'
        },
        {
            question: 'Can you integrate with our existing CRM and tech stack?',
            answer: 'Absolutely. Our development and automation teams specialize in complex integrations. Whether you use Salesforce, HubSpot, GoHighLevel, or bespoke internal systems, we ensure seamless data flow.'
        },
        {
            question: 'What is the minimum budget required to work with you?',
            answer: 'To ensure we can dedicate the necessary elite resources to drive significant impact, our minimum engagement starts at $5,000/month for marketing retainers, and $10,000 for custom development projects.'
        }
    ]

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index)
    }

    return (
        <section className="faq section" ref={sectionRef}>
            <div className="container">
                <div className="faq-grid">
                    <motion.div
                        className="faq-header"
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="section-label glass">Common Questions</span>
                        <h2 className="section-title">
                            Clarity & <span className="gradient-text">Transparency</span>
                        </h2>
                        <p className="faq-description">
                            We believe in open communication. Here are answers to the most common questions our prospective partners ask before engaging.
                        </p>
                    </motion.div>

                    <motion.div
                        className="faq-list"
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {faqs.map((faq, index) => (
                            <div 
                                key={index} 
                                className={`faq-item glass ${activeIndex === index ? 'active' : ''}`}
                            >
                                <button
                                    type="button"
                                    className="faq-question"
                                    onClick={() => toggleFAQ(index)}
                                    aria-expanded={activeIndex === index}
                                >
                                    <span>{faq.question}</span>
                                    <FaChevronDown className="faq-icon" />
                                </button>
                                <AnimatePresence>
                                    {activeIndex === index && (
                                        <motion.div
                                            className="faq-answer-wrapper"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="faq-answer">
                                                <p>{faq.answer}</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default FAQ
