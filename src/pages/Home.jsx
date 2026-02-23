import Hero from '../components/Hero'
import Stats from '../components/Stats'
import ServicesPreview from '../components/ServicesPreview'
import Features from '../components/Features'
import AboutSection from '../components/AboutSection'
import PortfolioPreview from '../components/PortfolioPreview'
import Testimonials from '../components/Testimonials'
import CTASection from '../components/CTASection'

const Home = () => {
    return (
        <div className="home-page">
            <Hero />
            <Stats />
            <ServicesPreview />
            <Features />
            <AboutSection />
            <PortfolioPreview />
            <Testimonials />
            <CTASection />
        </div>
    )
}

export default Home
