import { useTheme } from '../context/ThemeContext'
import logoDark from '../assets/logo.jpeg'
import logoLight from '../assets/png.png'
import './ZentrixLogo.css'

const ZentrixLogo = ({ variant = 'navbar', className = '' }) => {
    const { isDarkMode } = useTheme()
    const logoSrc = isDarkMode ? logoDark : logoLight

    return (
        <span
            className={`zentrix-logo-wrap zentrix-logo-wrap--${variant} ${isDarkMode ? 'zentrix-logo-wrap--dark' : 'zentrix-logo-wrap--light'} ${className}`.trim()}
        >
            <img
                src={logoSrc}
                alt="ZENTRIX Digital Solution"
                className="zentrix-logo-img"
                width={variant === 'footer' ? 320 : 300}
                height={variant === 'footer' ? 80 : 64}
                decoding="async"
            />
        </span>
    )
}

export default ZentrixLogo
