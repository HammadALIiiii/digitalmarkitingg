import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaDownload, FaTrash, FaClock } from 'react-icons/fa'
import './AdminPanel.css'

const AdminPanel = () => {
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchMessages = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/messages')
            const data = await response.json()
            setMessages(data)
        } catch (error) {
            console.error('Error fetching messages:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMessages()
        const interval = setInterval(fetchMessages, 30000) // Refresh every 30s
        return () => clearInterval(interval)
    }, [])

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

    return (
        <div className="admin-panel-page section">
            <div className="container">
                <motion.div
                    className="admin-header glass-strong"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div>
                        <h1 className="admin-title">Admin Dashboard</h1>
                        <p className="admin-subtitle">Live Message Reports (Auto-deletes after 4 hours)</p>
                    </div>
                    <button
                        className="download-btn"
                        onClick={downloadReport}
                        disabled={messages.length === 0}
                    >
                        <FaDownload /> Download CSV
                    </button>
                </motion.div>

                <div className="messages-grid">
                    {loading ? (
                        <div className="loading-state">Loading messages...</div>
                    ) : messages.length === 0 ? (
                        <div className="empty-state glass">No active messages found.</div>
                    ) : (
                        messages.map((msg, index) => (
                            <motion.div
                                key={msg.id}
                                className="message-card glass"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
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
        </div>
    )
}

export default AdminPanel
