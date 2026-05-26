import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaComments, FaCheckCircle, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useState, useEffect, useId } from 'react'
import { useNavigate } from 'react-router-dom'
import './ProductModal.css'

const ProductModal = ({ product, onClose }) => {
    const [activeImageIndex, setActiveImageIndex] = useState(0)
    const navigate = useNavigate()
    const titleId = useId()

    useEffect(() => {
        if (!product) return undefined

        const onKeyDown = (e) => {
            if (e.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', onKeyDown)
        document.body.style.overflow = 'hidden'

        return () => {
            document.removeEventListener('keydown', onKeyDown)
            document.body.style.overflow = ''
        }
    }, [product, onClose])

    if (!product) return null

    const hasScreenshots = product.screenshots && product.screenshots.length > 0
    const hasFeatures = product.features && product.features.length > 0

    const nextImage = () => {
        setActiveImageIndex((prev) => (prev + 1) % product.screenshots.length)
    }

    const prevImage = () => {
        setActiveImageIndex((prev) => (prev - 1 + product.screenshots.length) % product.screenshots.length)
    }

    const handleContact = () => {
        onClose()
        navigate('/contact')
    }

    return (
        <AnimatePresence>
            <motion.div
                className="product-modal-overlay"
                role="presentation"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="product-modal-container glass-strong"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={titleId}
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button type="button" className="modal-close" onClick={onClose} aria-label="Close dialog">
                        <FaTimes />
                    </button>

                    <div className="product-modal-content">
                        <div className="product-gallery">
                            {hasScreenshots ? (
                                <div className="gallery-main">
                                    <motion.img
                                        key={activeImageIndex}
                                        src={product.screenshots[activeImageIndex]}
                                        alt={`${product.title} screenshot ${activeImageIndex + 1}`}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                    {product.screenshots.length > 1 && (
                                        <>
                                            <button type="button" className="gallery-nav prev" onClick={prevImage} aria-label="Previous image">
                                                <FaChevronLeft />
                                            </button>
                                            <button type="button" className="gallery-nav next" onClick={nextImage} aria-label="Next image">
                                                <FaChevronRight />
                                            </button>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <div className="gallery-placeholder" style={{ background: product.gradient }}>
                                    <span>{product.icon}</span>
                                </div>
                            )}

                            {hasScreenshots && product.screenshots.length > 1 && (
                                <div className="gallery-thumbnails">
                                    {product.screenshots.map((img, i) => (
                                        <button
                                            type="button"
                                            key={i}
                                            className={`thumb ${activeImageIndex === i ? 'active' : ''}`}
                                            onClick={() => setActiveImageIndex(i)}
                                            aria-label={`View screenshot ${i + 1}`}
                                            aria-current={activeImageIndex === i}
                                        >
                                            <img src={img} alt="" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="product-info-panel">
                            <div className="product-badge" style={{ background: product.gradient }}>
                                {product.category}
                            </div>
                            <h2 id={titleId} className="product-title">{product.title}</h2>
                            <p className="product-description">{product.description}</p>

                            {hasFeatures && (
                                <div className="product-features-section">
                                    <h3>Key Features</h3>
                                    <ul className="features-list">
                                        {product.features.map((f, i) => (
                                            <motion.li
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                            >
                                                <FaCheckCircle className="feature-icon" /> {f}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="product-actions">
                                <button type="button" className="btn-primary inquiry-btn" onClick={handleContact}>
                                    <FaComments /> Talk to Consultant
                                </button>
                            </div>

                            <div className="trust-disclaimer">
                                <p>Secure consultation. No upfront payment required.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

export default ProductModal
