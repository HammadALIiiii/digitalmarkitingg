import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaDownload, FaTrash, FaClock, FaChartLine, FaEnvelope, FaThLarge, FaPlus, FaSignOutAlt, FaUserCircle, FaSearch, FaHistory, FaLock, FaShieldAlt } from 'react-icons/fa'
import { ALL_DEFAULT_DATA } from '../data/services'
import './AdminPanel.css'

const AdminPanel = () => {
    const [messages, setMessages] = useState([])
    const [services, setServices] = useState(ALL_DEFAULT_DATA)
    const [trash, setTrash] = useState([])
    const [activeTab, setActiveTab] = useState('dashboard') // dashboard, messages, services, trash
    const [loading, setLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState(false)
    const [isInitializing, setIsInitializing] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [isApiOnline, setIsApiOnline] = useState(false)

    // Basic root for health check
    const [editingId, setEditingId] = useState(null)
    const [newService, setNewService] = useState({
        title: '',
        description: '',
        category: '',
        icon: '✨',
        gradientIndex: 0,
        screenshots: [],
        features: [],
        demoUrl: ''
    })

    const categories = [
        'Digital Marketing',
        'Website Development',
        'App Development',
        'Branding & Design',
        'Automation & AI Solutions',
        'Digital Products'
    ]

    const catalogCategories = [
        'Product Catalog'
    ]

    const gradients = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
    ]

    const fetchData = async () => {
        try {
            const [msgRes, svcRes, trashRes] = await Promise.all([
                fetch('/api/messages'),
                fetch('/api/services'),
                fetch('/api/recycle-bin')
            ])
            const [msgData, svcData, trashData] = await Promise.all([
                msgRes.json(),
                svcRes.json(),
                trashRes.json()
            ])
            setMessages(msgData || [])
            setServices(svcData || [])
            setTrash(trashData || [])
            setIsApiOnline(true)
        } catch (error) {
            console.error('Error fetching data:', error)
            setIsApiOnline(false)
            // Keep using static fallback data for services display
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            fetchData()
            const interval = setInterval(fetchData, 30000)
            return () => clearInterval(interval)
        } else {
            setLoading(false)
        }
    }, [isAuthenticated])

    const handleLogin = (e) => {
        e.preventDefault()
        setLoginError(false)
        setIsInitializing(true)

        // Simulate secure session handshake
        setTimeout(() => {
            if (password === ROOT_ACCESS_KEY) {
                setIsAuthenticated(true)
                setLoginError(false)
            } else {
                setLoginError(true)
                setIsInitializing(false)
            }
        }, 1500)
    }

    const handleAddService = async (e) => {
        e.preventDefault()
        const serviceData = {
            ...newService,
            gradient: gradients[newService.gradientIndex],
            category: activeTab === 'products' ? 'Product Catalog' : (newService.category || 'Uncategorized')
        }

        if (editingId) {
            // --- EDIT: Update locally immediately ---
            setServices(prev => prev.map(s => s.id === editingId ? { ...s, ...serviceData } : s))
            // Try to sync with API
            fetch(`/api/services/${editingId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(serviceData)
            }).then(r => r.json()).then(d => { if (d.success) fetchData() }).catch(() => { })
        } else {
            // --- ADD: Insert locally immediately ---
            const tempId = Date.now()
            const newItem = { ...serviceData, id: tempId, timestamp: new Date().toISOString() }
            setServices(prev => [...prev, newItem])
            // Try to sync with API
            fetch('/api/services', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(serviceData)
            }).then(r => r.json()).then(d => { if (d.success) fetchData() }).catch(() => { })
        }

        // Reset form
        setNewService({ title: '', description: '', category: '', icon: '✨', gradientIndex: 0, screenshots: [], features: [], demoUrl: '' })
        setEditingId(null)
    }

    const startEdit = (svc) => {
        setEditingId(svc.id)
        const gIndex = gradients.indexOf(svc.gradient)
        setNewService({
            title: svc.title,
            description: svc.description,
            category: svc.category || '',
            icon: svc.icon,
            gradientIndex: gIndex !== -1 ? gIndex : 0,
            screenshots: svc.screenshots || [],
            features: svc.features || [],
            demoUrl: svc.demoUrl || ''
        })
    }

    const handleDeleteService = async (id) => {
        // Optimistic UI Update
        const itemToDelete = services.find(s => s.id === id)
        if (!itemToDelete) return

        setServices(prev => prev.filter(s => s.id !== id))
        setTrash(prev => [...prev, { ...itemToDelete, deletedAt: Date.now() }])

        try {
            const response = await fetch(`/api/services/${id}`, { method: 'DELETE' })
            const data = await response.json()
            if (!data.success) {
                // Rollback on failure if needed, though usually fetchData will correct it
                fetchData()
            }
        } catch (error) {
            console.error('Error deleting service:', error)
            fetchData() // Refresh to sync state on error
        }
    }

    const handleRestoreService = async (id) => {
        // Optimistic UI Update
        const itemToRestore = trash.find(s => s.id === id)
        if (!itemToRestore) return

        setTrash(prev => prev.filter(s => s.id !== id))
        setServices(prev => [...prev, itemToRestore])

        try {
            const response = await fetch(`/api/recycle-bin/${id}/restore`, { method: 'POST' })
            const data = await response.json()
            if (!data.success) {
                fetchData()
            }
        } catch (error) {
            console.error('Error restoring service:', error)
            fetchData()
        }
    }

    const downloadReport = () => {
        if (messages.length === 0) return

        const headers = ['ID', 'Name', 'Email', 'Subject', 'Message', 'Timestamp']
        const csvContent = [
            headers.join(','),
            ...messages.map(m => [
                m.id,
                `"${m.name}"`,
                `"${m.email}"`,
                `"${m.subject}"`,
                `"${m.message.replace(/"/g, '""')}"`,
                m.timestamp
            ].join(','))
        ].join('\n')

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement('a')
        const url = URL.createObjectURL(blob)
        link.setAttribute('href', url)
        link.setAttribute('download', `messages_report_${new Date().toISOString().split('T')[0]}.csv`)
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const stats = [
        { label: 'Total Messages', value: messages.length, icon: <FaEnvelope />, color: '#4facfe' },
        { label: 'Business Services', value: services.filter(s => s.category !== 'Product Catalog').length, icon: <FaThLarge />, color: '#95BF47' },
        { label: 'Product Catalog', value: services.filter(s => s.category === 'Product Catalog').length, icon: <FaDownload />, color: '#ff7675' },
        { label: 'Recoverable Items', value: trash.length, icon: <FaHistory />, color: '#f093fb' }
    ]

    const getTabFilteredServices = () => {
        if (activeTab === 'services') {
            return services.filter(s => s.category !== 'Product Catalog')
        }
        if (activeTab === 'products') {
            return services.filter(s => s.category === 'Product Catalog')
        }
        return services
    }

    const filteredServices = getTabFilteredServices().filter(s =>
        s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.category.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (!isAuthenticated) {
        return (
            <div className="admin-login-page">
                <div className="login-visual-bg">
                    <div className="visual-circle" />
                    <div className="visual-circle" />
                    <div className="visual-circle" />
                </div>

                <motion.div
                    className="login-container glass-strong"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="login-header">
                        <motion.div
                            className="admin-logo"
                            initial={{ y: -20 }}
                            animate={{ y: 0 }}
                            transition={{ delay: 0.2, type: "spring" }}
                        >
                            <FaShieldAlt />
                        </motion.div>
                        <h2>Executive Authority</h2>
                        <p>Zentrix Sol Management Portal</p>
                        <div className="security-badge">
                            <FaLock /> <span>Secure End-to-End Encrypted Session</span>
                        </div>
                    </div>

                    <form onSubmit={handleLogin} className="login-form">
                        <div className="login-input-wrapper glass">
                            <FaLock className="input-icon" />
                            <input
                                type="password"
                                placeholder="Root Access Key"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`admin-input ${loginError ? 'error' : ''}`}
                                required
                                disabled={isInitializing}
                            />
                        </div>

                        <AnimatePresence>
                            {loginError && (
                                <motion.p
                                    className="error-text"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    Access Denied. Incorrect Initialization Key.
                                </motion.p>
                            )}
                        </AnimatePresence>

                        <button
                            type="submit"
                            className={`login-btn ${isInitializing ? 'initializing' : ''}`}
                            disabled={isInitializing}
                        >
                            {isInitializing ? (
                                <div className="initializing-content">
                                    <div className="tiny-loader" />
                                    <span>Establishing Secure Connection...</span>
                                </div>
                            ) : (
                                "Initialize Session"
                            )}
                        </button>
                    </form>

                    <div className="login-footer">
                        <p>© {new Date().getFullYear()} Zentrix Agency. Strategic Systems Division.</p>
                        <small>IP Tracking Active | System Access Logged</small>
                    </div>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="admin-dashboard-layout">
            {/* Sidebar Navigation */}
            <aside className="admin-sidebar glass-strong">
                <div className="sidebar-header">
                    <div className="admin-logo">Z</div>
                    <div className="brand-info">
                        <h3>Zentrix Sol</h3>
                        <span>Management v2.0</span>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    <Link to="/" className="sidebar-link back-to-site">
                        <FaThLarge style={{ transform: 'rotate(90deg)' }} /> Back to Website
                    </Link>
                    <div className="sidebar-divider" />
                    <button
                        className={`sidebar-link ${activeTab === 'dashboard' ? 'active' : ''}`}
                        onClick={() => setActiveTab('dashboard')}
                    >
                        <FaChartLine /> Overview
                    </button>
                    <button
                        className={`sidebar-link ${activeTab === 'messages' ? 'active' : ''}`}
                        onClick={() => setActiveTab('messages')}
                    >
                        <FaEnvelope />
                        Messages
                        {messages.length > 0 && <span className="badge">{messages.length}</span>}
                    </button>
                    <button
                        className={`sidebar-link ${activeTab === 'services' ? 'active' : ''}`}
                        onClick={() => setActiveTab('services')}
                    >
                        <FaThLarge /> Business Services
                    </button>
                    <button
                        className={`sidebar-link ${activeTab === 'products' ? 'active' : ''}`}
                        onClick={() => setActiveTab('products')}
                    >
                        <FaDownload /> Product Catalog
                    </button>
                    <button
                        className={`sidebar-link ${activeTab === 'trash' ? 'active' : ''}`}
                        onClick={() => setActiveTab('trash')}
                    >
                        <FaTrash /> Restore
                    </button>
                </nav>

                <div className="sidebar-footer">
                    <div className={`api-status ${isApiOnline ? 'online' : 'offline'}`}>
                        <div className="status-dot"></div>
                        <span>{isApiOnline ? 'Server Link Active' : 'Server Link Offline'}</span>
                    </div>
                    {!isApiOnline && (
                        <div className="status-warning glass">
                            <small>Changes will NOT persist while offline. Please run "npm run dev:all"</small>
                        </div>
                    )}
                    <button
                        onClick={async () => {
                            if (window.confirm('Restore all hardcoded services? Your current items will be replaced.')) {
                                const res = await fetch('/api/services/reset', { method: 'POST' });
                                const data = await res.json();
                                if (data.success) fetchData();
                            }
                        }}
                        className="sidebar-link maintenance-btn"
                        style={{ marginBottom: '1rem', color: '#95BF47', opacity: 0.8 }}
                    >
                        <FaHistory /> Restore Originals
                    </button>
                    <button onClick={() => setIsAuthenticated(false)} className="logout-btn">
                        <FaSignOutAlt /> Terminate Session
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="admin-main">
                <header className="admin-top-bar glass">
                    <div className="top-bar-left">
                        <h2 className="page-title">
                            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Area
                        </h2>
                    </div>
                    <div className="top-bar-right">
                        <div className="search-bar glass">
                            <FaSearch />
                            <input
                                type="text"
                                placeholder="Search everything..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="user-profile">
                            <div className="user-info">
                                <span>Master Admin</span>
                                <small>Full Access</small>
                            </div>
                            <FaUserCircle className="user-avatar" />
                        </div>
                    </div>
                </header>

                <div className="admin-scroll-content">
                    <AnimatePresence mode="wait">
                        {loading ? (
                            <motion.div
                                className="loading-overlay"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <div className="loader"></div>
                                <p>Synchronizing Data...</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="tab-content-wrapper"
                            >
                                {activeTab === 'dashboard' && (
                                    <div className="dashboard-view">
                                        <div className="stats-grid">
                                            {stats.map((stat, i) => (
                                                <div key={i} className="stat-card glass-strong">
                                                    <div className="stat-icon" style={{ color: stat.color, background: `${stat.color}15` }}>
                                                        {stat.icon}
                                                    </div>
                                                    <div className="stat-info">
                                                        <h4>{stat.label}</h4>
                                                        <span className="stat-value">{stat.value}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="dashboard-grid">
                                            <div className="recent-activity glass">
                                                <div className="card-header">
                                                    <h3>Recent Messages</h3>
                                                    <button onClick={() => setActiveTab('messages')}>View All</button>
                                                </div>
                                                <div className="mini-list">
                                                    {messages.slice(0, 5).map(msg => (
                                                        <div key={msg.id} className="mini-item">
                                                            <div className="item-avatar">{msg.name[0]}</div>
                                                            <div className="item-detail">
                                                                <strong>{msg.name}</strong>
                                                                <p>{msg.subject}</p>
                                                            </div>
                                                            <span className="item-time">{new Date(msg.timestamp).toLocaleDateString()}</span>
                                                        </div>
                                                    ))}
                                                    {messages.length === 0 && <p className="empty">No new messages yet.</p>}
                                                </div>
                                            </div>

                                            <div className="quick-actions glass">
                                                <h3>Quick Actions</h3>
                                                <div className="action-buttons">
                                                    <button onClick={() => setActiveTab('services')} className="action-btn">
                                                        <FaPlus /> New Service
                                                    </button>
                                                    <button onClick={() => setActiveTab('products')} className="action-btn secondary">
                                                        <FaPlus /> New Product
                                                    </button>
                                                    <button onClick={downloadReport} className="action-btn secondary">
                                                        <FaDownload /> Export CSV Report
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'messages' && (
                                    <div className="messages-view">
                                        <div className="view-header">
                                            <p>{messages.length} inquiries received</p>
                                            <button className="btn-primary" onClick={downloadReport}>
                                                <FaDownload /> Download Report
                                            </button>
                                        </div>
                                        <div className="messages-grid">
                                            {messages.length === 0 ? (
                                                <div className="empty-state glass">No active messages found.</div>
                                            ) : (
                                                messages.map((msg, index) => (
                                                    <motion.div
                                                        key={msg.id}
                                                        className="message-card glass"
                                                        initial={{ opacity: 0, scale: 0.95 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: index * 0.05 }}
                                                    >
                                                        <div className="message-card-header">
                                                            <span className="msg-sender">{msg.name}</span>
                                                            <span className="msg-time">
                                                                <FaClock /> {new Date(msg.timestamp).toLocaleTimeString()}
                                                            </span>
                                                        </div>
                                                        <div className="msg-email">{msg.email}</div>
                                                        <div className="msg-subject">Subject: {msg.subject}</div>
                                                        <div className="msg-body">{msg.message}</div>
                                                    </motion.div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                )}

                                {(activeTab === 'services' || activeTab === 'products') && (
                                    <div className="services-admin-layout">
                                        <div className="services-sidebar">
                                            <motion.form
                                                className="service-admin-form glass-strong"
                                                onSubmit={handleAddService}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                            >
                                                <h3><FaThLarge /> {editingId ? 'Update Item' : (activeTab === 'services' ? 'New Service' : 'New Product')}</h3>
                                                <div className="admin-form-grid">
                                                    <div className="form-group">
                                                        <label>Title</label>
                                                        <input
                                                            type="text"
                                                            placeholder="e.g. Meta Ads Expert"
                                                            value={newService.title}
                                                            onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                                                            required
                                                            className="admin-input glass"
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Category</label>
                                                        <input
                                                            list="category-suggestions"
                                                            placeholder="Select or Type"
                                                            value={newService.category}
                                                            onChange={(e) => setNewService({ ...newService, category: e.target.value })}
                                                            required
                                                            className="admin-input glass"
                                                        />
                                                        <datalist id="category-suggestions">
                                                            {categories.map(cat => <option key={cat} value={cat} />)}
                                                        </datalist>
                                                    </div>
                                                    {activeTab === 'services' && (
                                                        <div className="form-group">
                                                            <label>Emoji Icon</label>
                                                            <input
                                                                type="text"
                                                                placeholder="✨"
                                                                value={newService.icon}
                                                                onChange={(e) => setNewService({ ...newService, icon: e.target.value })}
                                                                required
                                                                className="admin-input glass"
                                                            />
                                                        </div>
                                                    )}
                                                    <div className="form-group">
                                                        <label>Description (Strategic Focus)</label>
                                                        <textarea
                                                            placeholder="Describe the value proposition..."
                                                            value={newService.description}
                                                            onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                                                            required
                                                            className="admin-input glass"
                                                            rows="3"
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Aura Gradient</label>
                                                        <div className="gradient-selector">
                                                            {gradients.map((g, i) => (
                                                                <div
                                                                    key={i}
                                                                    className={`gradient-opt ${newService.gradientIndex === i ? 'active' : ''}`}
                                                                    style={{ background: g }}
                                                                    onClick={() => setNewService({ ...newService, gradientIndex: i })}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {activeTab === 'products' && (
                                                        <>
                                                            <div className="form-divider" />
                                                            {/* Product-Specific Fields */}

                                                            <div className="form-group">
                                                                <label>Product Features (One per line)</label>
                                                                <textarea
                                                                    placeholder="Feature 1&#10;Feature 2..."
                                                                    value={newService.features.join('\n')}
                                                                    onChange={(e) => setNewService({ ...newService, features: e.target.value.split('\n').filter(f => f.trim()) })}
                                                                    className="admin-input glass"
                                                                    rows="4"
                                                                />
                                                            </div>

                                                            <div className="form-group">
                                                                <label>Screenshot URLs (One per line)</label>
                                                                <textarea
                                                                    placeholder="https://image1.jpg&#10;https://image2.jpg..."
                                                                    value={newService.screenshots.join('\n')}
                                                                    onChange={(e) => setNewService({ ...newService, screenshots: e.target.value.split('\n').filter(s => s.trim()) })}
                                                                    className="admin-input glass"
                                                                    rows="4"
                                                                />
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                                <div className="form-actions">
                                                    <button type="submit" className="add-svc-btn btn-primary">
                                                        {editingId ? 'Apply Updates' : 'Publish to Live'}
                                                    </button>
                                                    {editingId && (
                                                        <button
                                                            type="button"
                                                            className="cancel-btn glass"
                                                            onClick={() => {
                                                                setEditingId(null)
                                                                setNewService({
                                                                    title: '',
                                                                    description: '',
                                                                    category: '',
                                                                    icon: '✨',
                                                                    gradientIndex: 0,
                                                                    screenshots: [],
                                                                    features: [],
                                                                    demoUrl: ''
                                                                })
                                                            }}
                                                        >
                                                            Cancel
                                                        </button>
                                                    )}
                                                </div>
                                            </motion.form>
                                        </div>

                                        <div className="services-main-list">
                                            <div className="list-header">
                                                <h3>{activeTab === 'services' ? 'Manage Business Services' : 'Manage Product Catalog'}</h3>
                                                <p>Total: {filteredServices.length} items</p>
                                            </div>
                                            <div className="admin-services-list">
                                                {filteredServices.map((svc) => (
                                                    <div key={svc.id} className={`admin-service-item glass ${editingId === svc.id ? 'editing' : ''}`}>
                                                        <div className="svc-info">
                                                            {svc.category !== 'Digital Products' && (
                                                                <div className="svc-icon-box glass" style={{ background: svc.gradient }}>{svc.icon}</div>
                                                            )}
                                                            <div>
                                                                <div className="svc-title-row">
                                                                    <h4>{svc.title}</h4>
                                                                    <span className="svc-category-tag">{svc.category}</span>
                                                                </div>
                                                                <p>{svc.description}</p>
                                                            </div>
                                                        </div>
                                                        <div className="svc-actions">
                                                            <button onClick={() => startEdit(svc)} className="edit-btn">
                                                                Edit
                                                            </button>
                                                            <button onClick={() => handleDeleteService(svc.id)} className="delete-btn">
                                                                <FaTrash />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                                {filteredServices.length === 0 && (
                                                    <div className="empty-search glass">
                                                        <p>No services match your search term.</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'trash' && (
                                    <div className="trash-view">
                                        <div className="trash-header-info glass">
                                            <h3>System Archeology</h3>
                                            <p>Items here are scheduled for permanent deletion in 12 hours.</p>
                                        </div>
                                        <div className="admin-services-list">
                                            {trash.map((svc) => (
                                                <div key={svc.id} className="admin-service-item glass disabled">
                                                    <div className="svc-info">
                                                        <span className="svc-icon">{svc.icon}</span>
                                                        <div>
                                                            <h4>{svc.title}</h4>
                                                            <p>Deletion Timestamp: {new Date(svc.deletedAt).toLocaleString()}</p>
                                                        </div>
                                                    </div>
                                                    <button onClick={() => handleRestoreService(svc.id)} className="restore-btn btn-primary">
                                                        Restore to Live
                                                    </button>
                                                </div>
                                            ))}
                                            {trash.length === 0 && <p className="empty-state">System cleanup complete. No items in trash.</p>}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    )
}

export default AdminPanel
