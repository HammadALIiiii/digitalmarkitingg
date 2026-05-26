import './SiteBackground.css'

/**
 * Full-page ambient background image (theme-aware overlay).
 */
const SiteBackground = () => (
    <div className="site-bg" aria-hidden="true">
        <div className="site-bg__image" />
        <div className="site-bg__overlay" />
    </div>
)

export default SiteBackground
