import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './Methodology.css'

const Methodology = () => {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

    const steps = [
        {
            number: '01',
            title: 'Discovery & Audit',
            description: 'We dive deep into your business model, current digital infrastructure, and competitive landscape to identify growth bottlenecks and opportunities.',
            color: '#4facfe'
        },
        {
            number: '02',
            title: 'Strategic Architecture',
            description: 'Our team engineers a bespoke blueprint—whether it\'s a high-converting web platform, a targeted ad campaign, or a comprehensive brand overhaul.',
            color: '#f093fb'
        },
        {
            number: '03',
            title: 'Precision Execution',
            description: 'We deploy the strategy using industry best practices, ensuring pixel-perfect design, robust code, and hyper-targeted ad placements.',
            color: '#4de8b2'
        },
        {
            number: '04',
            title: 'Optimization & Scale',
            description: 'Post-launch, we rely on hard data to refine performance. We continuously A/B test, optimize CPA, and scale what works to maximize ROI.',
            color: '#ffb199'
        }
    ]

    return (
        <section className="methodology section" ref={sectionRef}>
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label glass">How We Work</span>
                    <h2 className="section-title">
                        Our Proven <span className="gradient-text">Methodology</span>
                    </h2>
                    <p className="section-description">
                        We don't leave success to chance. Our structured, data-first approach ensures consistent, predictable growth for our partners.
                    </p>
                </motion.div>

                <div className="methodology-timeline">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="methodology-step"
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            <div className="step-number" style={{ color: step.color }}>
                                {step.number}
                            </div>
                            <div className="step-content glass">
                                <h3 className="step-title">{step.title}</h3>
                                <p className="step-description">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                    <div className="timeline-line"></div>
                </div>
            </div>
        </section>
    )
}

export default Methodology
