import { motion } from 'framer-motion'
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa'
import './TeamGallery.css'

const TeamGallery = () => {
    const team = [
        {
            name: 'Sarah Mitchell',
            role: 'Creative Director',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            expertise: 'UI/UX Design',
            social: {
                linkedin: '#',
                twitter: '#',
                github: '#',
            },
        },
        {
            name: 'David Park',
            role: 'Lead Developer',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            expertise: 'Full Stack',
            social: {
                linkedin: '#',
                twitter: '#',
                github: '#',
            },
        },
        {
            name: 'Emma Wilson',
            role: 'UX Designer',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
            gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            expertise: 'User Research',
            social: {
                linkedin: '#',
                twitter: '#',
                github: '#',
            },
        },
        {
            name: 'Michael Chen',
            role: 'Frontend Developer',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
            gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
            expertise: 'React & Vue',
            social: {
                linkedin: '#',
                twitter: '#',
                github: '#',
            },
        },
        {
            name: 'Lisa Anderson',
            role: 'Product Manager',
            image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
            gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            expertise: 'Strategy',
            social: {
                linkedin: '#',
                twitter: '#',
                github: '#',
            },
        },
        {
            name: 'James Rodriguez',
            role: 'Backend Developer',
            image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
            gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
            expertise: 'Node.js & Python',
            social: {
                linkedin: '#',
                twitter: '#',
                github: '#',
            },
        },
    ]

    return (
        <section className="team-gallery section">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label glass">Our Team</span>
                    <h2 className="section-title">
                        Meet Our <span className="gradient-text">Expert Team</span>
                    </h2>
                    <p className="section-description">
                        Talented professionals dedicated to bringing your vision to life
                    </p>
                </motion.div>

                <div className="team-grid">
                    {team.map((member, index) => (
                        <motion.div
                            key={index}
                            className="team-member-card glass"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ y: -15, scale: 1.02 }}
                        >
                            {/* Member Image */}
                            <div className="member-image-wrapper">
                                <div
                                    className="member-image"
                                    style={{ background: member.gradient }}
                                >
                                    <img src={member.image} alt={member.name} className="member-photo" />

                                    {/* Hover Overlay */}
                                    <motion.div
                                        className="member-overlay"
                                        initial={{ opacity: 0 }}
                                        whileHover={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="member-social">
                                            <motion.a
                                                href={member.social.linkedin}
                                                className="social-icon glass"
                                                whileHover={{ scale: 1.2, rotate: 360 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <FaLinkedin />
                                            </motion.a>
                                            <motion.a
                                                href={member.social.twitter}
                                                className="social-icon glass"
                                                whileHover={{ scale: 1.2, rotate: 360 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <FaTwitter />
                                            </motion.a>
                                            <motion.a
                                                href={member.social.github}
                                                className="social-icon glass"
                                                whileHover={{ scale: 1.2, rotate: 360 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <FaGithub />
                                            </motion.a>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Expertise Badge */}
                                <div className="expertise-badge glass">
                                    <span>{member.expertise}</span>
                                </div>
                            </div>

                            {/* Member Info */}
                            <div className="member-info">
                                <h3 className="member-name">{member.name}</h3>
                                <p className="member-role">{member.role}</p>
                            </div>

                            {/* Decorative Corner */}
                            <div className="card-corner" style={{ background: member.gradient }} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default TeamGallery
