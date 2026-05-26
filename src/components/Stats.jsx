import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import './Stats.css'

const Stats = () => {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true })

    const stats = [
        { value: 500, suffix: '%+', label: 'Average ROAS', duration: 2 },
        { value: 12, suffix: 'M+', label: 'Ad Spend Managed', duration: 2.5 },
        { value: 98, suffix: '%', label: 'Client Retention', duration: 2 },
        { value: 250, suffix: '+', label: 'Global Case Studies', duration: 2.5 },
    ]

    return (
        <section className="stats section" ref={sectionRef}>
            <div className="container">
                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <StatCard key={index} stat={stat} isInView={isInView} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}

const StatCard = ({ stat, isInView, index }) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!isInView) return

        let startTime
        const duration = stat.duration * 1000

        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime
            const progress = Math.min((currentTime - startTime) / duration, 1)

            setCount(Math.floor(progress * stat.value))

            if (progress < 1) {
                requestAnimationFrame(animate)
            }
        }

        requestAnimationFrame(animate)
    }, [isInView, stat.value, stat.duration])

    return (
        <motion.div
            className="stat-card glass"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
        >
            <div className="stat-value gradient-text">
                {count}{stat.suffix}
            </div>
            <div className="stat-label">{stat.label}</div>
            <div className="stat-glow" />
        </motion.div>
    )
}

export default Stats
