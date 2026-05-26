import Hero from '../components/Hero'
import WhyChooseUs from '../components/WhyChooseUs'
import Services from '../components/Services'
import Stats from '../components/Stats'
import Features from '../components/Features'
import Testimonials from '../components/Testimonials'
import CTASection from '../components/CTASection'

const Home = () => {
    return (
        <div className="home-page">
            <Hero />
            <WhyChooseUs />
            <Services />
            <Features />
            <Stats />
            <Testimonials />
            <CTASection />
        </div>
    )
}


export default Home
