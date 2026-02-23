import { useRef, useEffect } from 'react'
import gsap from 'gsap'

/**
 * Custom hook for magnetic hover effect
 * Creates a smooth magnetic pull effect on mouse hover
 */
export const useMagneticEffect = (strength = 0.3) => {
    const magneticRef = useRef(null)

    useEffect(() => {
        const element = magneticRef.current
        if (!element) return

        const handleMouseMove = (e) => {
            const { left, top, width, height } = element.getBoundingClientRect()
            const centerX = left + width / 2
            const centerY = top + height / 2

            const deltaX = (e.clientX - centerX) * strength
            const deltaY = (e.clientY - centerY) * strength

            gsap.to(element, {
                x: deltaX,
                y: deltaY,
                duration: 0.3,
                ease: 'power2.out'
            })
        }

        const handleMouseLeave = () => {
            gsap.to(element, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)'
            })
        }

        element.addEventListener('mousemove', handleMouseMove)
        element.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            element.removeEventListener('mousemove', handleMouseMove)
            element.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [strength])

    return magneticRef
}

/**
 * Hook for 3D tilt effect on hover
 */
/**
 * Hook for 3D tilt effect on hover
 * Modified: Logic completely disabled to prevent shaking and conflicts with Framer Motion.
 * Components should handle hover effects via Framer Motion props.
 */
export const useTiltEffect = (options = {}) => {
    // Return a ref but do not attach any event listeners
    const tiltRef = useRef(null)
    return tiltRef
}
