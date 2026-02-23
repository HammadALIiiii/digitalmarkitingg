import { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import gsap from 'gsap'

/**
 * Custom hook for scroll-triggered animations
 * @param {Object} options - Animation options
 * @returns {Object} - ref and inView state
 */
export const useScrollAnimation = (options = {}) => {
    const {
        threshold = 0.2,
        triggerOnce = true,
        animationType = 'fadeUp',
        duration = 0.8,
        delay = 0,
        stagger = 0
    } = options

    const { ref, inView } = useInView({
        threshold,
        triggerOnce
    })

    const elementRef = useRef(null)

    useEffect(() => {
        if (inView && elementRef.current) {
            const element = elementRef.current

            // Different animation types
            const animations = {
                fadeUp: {
                    from: { opacity: 0, y: 60 },
                    to: { opacity: 1, y: 0 }
                },
                fadeDown: {
                    from: { opacity: 0, y: -60 },
                    to: { opacity: 1, y: 0 }
                },
                fadeLeft: {
                    from: { opacity: 0, x: -60 },
                    to: { opacity: 1, x: 0 }
                },
                fadeRight: {
                    from: { opacity: 0, x: 60 },
                    to: { opacity: 1, x: 0 }
                },
                scale: {
                    from: { opacity: 0, scale: 0.8 },
                    to: { opacity: 1, scale: 1 }
                },
                scaleRotate: {
                    from: { opacity: 0, scale: 0.5, rotation: -10 },
                    to: { opacity: 1, scale: 1, rotation: 0 }
                }
            }

            const animation = animations[animationType] || animations.fadeUp

            // Check if element has children for stagger animation
            const children = element.children
            if (stagger > 0 && children.length > 0) {
                gsap.fromTo(
                    children,
                    animation.from,
                    {
                        ...animation.to,
                        duration,
                        delay,
                        stagger,
                        ease: 'power3.out'
                    }
                )
            } else {
                gsap.fromTo(
                    element,
                    animation.from,
                    {
                        ...animation.to,
                        duration,
                        delay,
                        ease: 'power3.out'
                    }
                )
            }
        }
    }, [inView, animationType, duration, delay, stagger])

    return { ref, inView, elementRef }
}

/**
 * Hook for text reveal animation (split by characters/words)
 */
export const useTextReveal = (options = {}) => {
    const {
        threshold = 0.2,
        triggerOnce = true,
        splitBy = 'words', // 'words' or 'chars'
        duration = 0.6,
        stagger = 0.03
    } = options

    const { ref, inView } = useInView({
        threshold,
        triggerOnce
    })

    const textRef = useRef(null)

    useEffect(() => {
        if (inView && textRef.current) {
            const text = textRef.current
            const originalText = text.textContent

            // Split text
            const elements = splitBy === 'chars'
                ? originalText.split('')
                : originalText.split(' ')

            // Clear and rebuild with spans
            text.innerHTML = ''
            elements.forEach((item, index) => {
                const span = document.createElement('span')
                span.style.display = 'inline-block'
                span.style.opacity = '0'
                span.textContent = splitBy === 'chars' ? item : item + ' '
                text.appendChild(span)
            })

            // Animate
            gsap.to(text.children, {
                opacity: 1,
                y: 0,
                duration,
                stagger,
                ease: 'power3.out',
                delay: 0.1
            })
        }
    }, [inView, splitBy, duration, stagger])

    return { ref, inView, textRef }
}
