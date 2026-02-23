import { motion, AnimatePresence } from 'framer-motion'
import './PageTransition.css'

const pageVariants = {
    initial: {
        opacity: 0,
        y: 10, // Reduced movement for subtlety
        scale: 0.99
    },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1], // Custom smooth ease (cubic-bezier)
            staggerChildren: 0.1
        }
    },
    exit: {
        opacity: 0,
        y: -10, // Reduced movement
        scale: 0.99,
        transition: {
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1]
        }
    }
}

const PageTransition = ({ children }) => {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                className="page-transition"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                style={{ width: '100%' }} // Ensure full width
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}

export default PageTransition
