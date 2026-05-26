import express from 'express';
import cors from 'cors';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 🚀 [API] Environment & Paths
const isVercel = process.env.VERCEL || process.env.NODE_ENV === 'production';
// Robust pathing: use __dirname (api folder) and go up to project root
const storagePath = isVercel ? '/tmp' : path.join(__dirname, '..', 'data');

const MESSAGES_FILE = path.join(storagePath, 'messages.json');
const SERVICES_FILE = path.join(storagePath, 'services.json');
const RECYCLE_BIN_FILE = path.join(storagePath, 'trash.json');

// Ensure storage directory exists
console.log('📂 [API] Storage Directory:', storagePath);
if (!fs.existsSync(storagePath)) {
    try {
        fs.ensureDirSync(storagePath);
        console.log('✅ [API] Storage directory created');
    } catch (err) {
        console.error('❌ [API] Error creating storage directory:', err);
    }
}

const DEFAULT_SERVICES = [
    // 1. Digital Marketing
    { id: 1, category: 'Digital Marketing', title: 'Facebook Ads', description: 'High-conversion Meta campaigns targeting your ideal customer profile.', icon: '📱', gradient: 'linear-gradient(135deg, #1877F2 0%, #0056b3 100%)' },
    { id: 2, category: 'Digital Marketing', title: 'Google Ads', description: 'Search, Display, and Shopping ads that place you in front of customers.', icon: '🔍', gradient: 'linear-gradient(135deg, #4285F4 0%, #34a853 100%)' },
    { id: 3, category: 'Digital Marketing', title: 'Social Media Management', description: 'Full-service handling of your social profiles to build community.', icon: '🤝', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { id: 4, category: 'Digital Marketing', title: 'SEO', description: 'Organic growth strategies to rank #1 on search engines long-term.', icon: '📈', gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' },

    // 2. Website Development
    { id: 5, category: 'Website Development', title: 'Business Websites', description: 'Professional corporate sites that establish authority and generate leads.', icon: '🏢', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
    { id: 6, category: 'Website Development', title: 'E-commerce Stores', description: 'Seamless shopping experiences built on Shopify, WooCommerce, or Wix.', icon: '🛍️', gradient: 'linear-gradient(135deg, #95BF47 0%, #5E8E3E 100%)' },
    { id: 7, category: 'Website Development', title: 'Custom Websites', description: 'Tailor-made web solutions for unique business requirements.', icon: '⚛️', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },

    // 3. App Development
    { id: 8, category: 'App Development', title: 'Android Apps', description: 'Robust and scalable mobile applications for the Google Play Store.', icon: '🤖', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
    { id: 9, category: 'App Development', title: 'iOS Apps', description: 'Premium Apple ecosystem apps designed for iPhone and iPad.', icon: '🍎', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
    { id: 10, category: 'App Development', title: 'Web Apps', description: 'Progressive Web Apps that work on any device and browser.', icon: '🌐', gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' },

    // 4. Branding & Design
    { id: 11, category: 'Branding & Design', title: 'Logo Design', description: 'Memorable brand marks that represent your values and vision.', icon: '🎨', gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' },
    { id: 12, category: 'Branding & Design', title: 'Brand Identity', description: 'Full visual identity systems including typography and color palettes.', icon: '💎', gradient: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)' },
    { id: 13, category: 'Branding & Design', title: 'UI/UX Design', description: 'User-centric research and interface design for apps and websites.', icon: '✨', gradient: 'linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)' },

    // 5. Automation & AI Solutions
    { id: 14, category: 'Automation & AI Solutions', title: 'Chatbots', description: 'Intelligent AI-driven bots for customer support and sales qualifying.', icon: '💬', gradient: 'linear-gradient(135deg, #4de8b2 0%, #15a8bf 100%)' },
    { id: 15, category: 'Automation & AI Solutions', title: 'CRM Setup', description: 'GoHighLevel and specialized CRM builds for sales team efficiency.', icon: '⚙️', gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' },
    { id: 16, category: 'Automation & AI Solutions', title: 'Business Automation', description: 'Workflow optimization using Zapier, Make.com, and custom scripts.', icon: '🚀', gradient: 'linear-gradient(135deg, #ff0844 0%, #ffb199 100%)' },

    // 6. Digital Products (Service offerings)
    { id: 17, category: 'Digital Products', title: 'Website Templates', description: 'Premium, ready-to-launch templates for various industries.', icon: '📄', gradient: 'linear-gradient(135deg, #ebbba7 0%, #cfc7f8 100%)' },
    { id: 18, category: 'Digital Products', title: 'Marketing Tools', description: 'Proprietary software and scripts to supercharge your growth.', icon: '🛠️', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },

    // 7. Premium Product Catalog (Showcase items - not shown on Services page)
    {
        id: 19,
        category: 'Product Catalog',
        title: 'Nexus AI: Enterprise Dashboard',
        description: 'A cutting-edge SaaS dashboard template with real-time data visualization and AI insights integration.',
        icon: '📊',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        screenshots: [
            'https://images.unsplash.com/photo-1551288049-bbbda536ad31?auto=format&fit=crop&q=80&w=1200',
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
            'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200'
        ],
        features: ['React & Tailwind CSS', 'Dark Mode Support', 'Interactive Charts', 'Role-based Access'],
        demoUrl: ''
    },
    {
        id: 20,
        category: 'Product Catalog',
        title: 'EstatePro: Luxury Real Estate',
        description: 'Premium web solution for high-end real estate agencies with advanced property search and virtual tour support.',
        icon: '🏡',
        gradient: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        screenshots: [
            'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200',
            'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=1200',
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200'
        ],
        features: ['Property Map Integration', 'Lead Management', 'Premium UI Kit', 'Social Sharing'],
        demoUrl: ''
    },
    {
        id: 21,
        category: 'Product Catalog',
        title: 'SwiftCommerce: Next-Gen Store',
        description: 'High-performance e-commerce template optimized for conversion and lightning-fast page loads.',
        icon: '🛒',
        gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        screenshots: [
            'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=1200',
            'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200',
            'https://images.unsplash.com/photo-1556742049-04ff4d87214d?auto=format&fit=crop&q=80&w=1200'
        ],
        features: ['One-Click Checkout', 'Advanced Filtering', 'SEO Optimized', 'Mobile First'],
        demoUrl: ''
    },
    {
        id: 22,
        category: 'Product Catalog',
        title: 'Astra Pro: Executive Theme',
        description: 'Multi-purpose WordPress-style theme built for high-scale corporate agencies and consulting firms.',
        icon: '🎨',
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        screenshots: [
            'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200',
            'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
            'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=1200'
        ],
        features: ['Elementor Ready', 'WooCommerce Sync', 'Custom Headers', 'Mega Menu Support'],
        demoUrl: ''
    },
    {
        id: 23,
        category: 'Product Catalog',
        title: 'Marketing OS: Growth Hub',
        description: 'A comprehensive operating system for digital marketers to track campaigns, ROI, and client reporting in one place.',
        icon: '🚀',
        gradient: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
        screenshots: [
            'https://images.unsplash.com/photo-1551288049-bbbda536ad31?auto=format&fit=crop&q=80&w=1200',
            'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200'
        ],
        features: ['KPI Dashboard', 'Automated Reports', 'Multi-Platform Sync', 'Team Collaboration'],
        demoUrl: ''
    },
    {
        id: 24,
        category: 'Product Catalog',
        title: 'Zenith AI: CRM Solution',
        description: 'Next-generation CRM for agencies to manage leads, pipelines, and customer relations with built-in AI assistant.',
        icon: '💼',
        gradient: 'linear-gradient(135deg, #00b4db 0%, #0083b0 100%)',
        screenshots: [
            'https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80&w=1200',
            'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1200'
        ],
        features: ['Lead Scoring', 'Email Automation', 'Sales Pipeline', '24/7 AI Support'],
        demoUrl: ''
    },
    {
        id: 25,
        category: 'Product Catalog',
        title: 'Titan: Visual Page Builder',
        description: 'Drag-and-drop website builder for high-conversion landing pages and complex corporate layouts.',
        icon: '🏗️',
        gradient: 'linear-gradient(135deg, #f857a6 0%, #ff5858 100%)',
        screenshots: [
            'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200',
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200'
        ],
        features: ['60+ Widgets', 'Global Styles', 'Responsive Editing', 'Template Library'],
        demoUrl: ''
    }
];

// --- EMAIL CONFIGURATION (Using Environment Variables) ---
const EMAIL_CONFIG = {
    user: process.env.GMAIL_USER || 'hammaddd1230@gmail.com',
    pass: process.env.GMAIL_PASS || 'lxtv orux wlcq zjym',
    target: process.env.TARGET_EMAIL || 'info.zentrixagency@gmail.com'
};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_CONFIG.user,
        pass: EMAIL_CONFIG.pass
    }
});
// ----------------------------

app.use(cors());
app.use(express.json());

// Global Request Logger
app.use((req, res, next) => {
    console.log(`📡 [API] ${req.method} ${req.url}`);
    next();
});

// Ensure files exist
if (!fs.existsSync(MESSAGES_FILE)) {
    fs.writeJsonSync(MESSAGES_FILE, []);
}

// Service initialization: Create if not exists
try {
    if (!fs.existsSync(SERVICES_FILE)) {
        fs.writeJsonSync(SERVICES_FILE, DEFAULT_SERVICES);
        console.log('✅ [API] Services file initialized with defaults');
    } else {
        // Read to verify if it's valid JSON
        const currentServices = fs.readJsonSync(SERVICES_FILE);
        console.log(`📊 [API] Loaded ${currentServices.length} services from storage`);
    }
} catch (err) {
    console.error('❌ [API] Critical Error reading/initializing services.json:', err);
    // Only reset if the file is genuinely missing or corrupted beyond repair
    // but avoid silent overwrites of user data.
}

if (!fs.existsSync(RECYCLE_BIN_FILE)) {
    fs.writeJsonSync(RECYCLE_BIN_FILE, []);
}

// POST: Save a new message and forward to email
app.post('/api/messages', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        const messages = await fs.readJson(MESSAGES_FILE);

        const newMessage = {
            id: Date.now(),
            name,
            email,
            subject,
            message,
            timestamp: new Date().toISOString()
        };

        messages.push(newMessage);
        await fs.writeJson(MESSAGES_FILE, messages);

        // Try to forward to email
        if (EMAIL_CONFIG.pass !== 'your-app-password-here') {
            const mailOptions = {
                from: EMAIL_CONFIG.user,
                to: EMAIL_CONFIG.target,
                subject: `New Portfolio Message: ${subject}`,
                text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Email forwarding error:', error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        } else {
            console.log('Email skip: Please set a valid Gmail App Password in server.js');
        }

        res.status(201).json({ success: true, message: 'Message saved successfully!' });
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// --- SERVICES ENDPOINTS ---

// GET: Retrieve all services
app.get('/api/services', async (req, res) => {
    try {
        const services = await fs.readJson(SERVICES_FILE);
        res.json(services);
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// POST: Add a new service
app.post('/api/services', async (req, res) => {
    try {
        const { title, description, icon, gradient, category, screenshots, features, demoUrl } = req.body;
        const services = await fs.readJson(SERVICES_FILE);

        const newService = {
            id: Date.now(),
            title,
            description,
            category: category || 'Uncategorized',
            icon: icon || '✨',
            gradient: gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            screenshots: screenshots || [],
            features: features || [],
            demoUrl: demoUrl || '',
            timestamp: new Date().toISOString()
        };

        services.push(newService);
        await fs.writeJson(SERVICES_FILE, services);
        console.log('💾 [API] Service saved:', newService.title);

        res.status(201).json({ success: true, service: newService });
    } catch (error) {
        console.error('Error saving service:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// DELETE: Move a service to recycle bin
app.delete('/api/services/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`🗑️ [API] Deletion Request for ID: ${id} (Type: ${typeof id})`);

        const services = await fs.readJson(SERVICES_FILE);
        const trash = await fs.readJson(RECYCLE_BIN_FILE);

        // Use string comparison to be safe across types
        const serviceToDelete = services.find(s => String(s.id) === String(id));

        if (!serviceToDelete) {
            console.warn(`⚠️ [API] Service NOT found for ID: ${id}`);
            return res.status(404).json({ success: false, error: 'Service not found' });
        }

        const filteredServices = services.filter(s => String(s.id) !== String(id));
        await fs.writeJson(SERVICES_FILE, filteredServices);
        console.log(`✅ [API] Success: Deleted "${serviceToDelete.title}" and updated services.json`);

        // Add to trash with deletion timestamp
        trash.push({
            ...serviceToDelete,
            deletedAt: Date.now()
        });
        await fs.writeJson(RECYCLE_BIN_FILE, trash);

        res.json({ success: true, message: 'Moved to recycle bin' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// GET: Retrieve items in recycle bin (autodelete > 12h)
app.get('/api/recycle-bin', async (req, res) => {
    try {
        let trash = await fs.readJson(RECYCLE_BIN_FILE);
        const TWELVE_HOURS = 12 * 60 * 60 * 1000;
        const now = Date.now();

        // Cleanup: remove items older than 12 hours
        const activeTrash = trash.filter(item => (now - item.deletedAt) < TWELVE_HOURS);
        if (activeTrash.length !== trash.length) {
            await fs.writeJson(RECYCLE_BIN_FILE, activeTrash);
        }

        res.json(activeTrash);
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// POST: Restore a service from recycle bin
app.post('/api/recycle-bin/:id/restore', async (req, res) => {
    try {
        const { id } = req.params;
        const services = await fs.readJson(SERVICES_FILE);
        const trash = await fs.readJson(RECYCLE_BIN_FILE);

        const itemToRestore = trash.find(s => s.id == id);
        if (!itemToRestore) return res.status(404).json({ success: false, error: 'Item not found in trash' });

        // Remove from trash
        const newTrash = trash.filter(s => s.id != id);
        await fs.writeJson(RECYCLE_BIN_FILE, newTrash);

        // Add back to services (clean the deletedAt tag)
        const { deletedAt, ...restoredService } = itemToRestore;
        services.push(restoredService);
        await fs.writeJson(SERVICES_FILE, services);

        res.json({ success: true, service: restoredService });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// PUT: Update a service
app.put('/api/services/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, icon, gradient, category, screenshots, features, demoUrl } = req.body;
        console.log(`📝 [API] Updating Service ID: ${id}`);

        const services = await fs.readJson(SERVICES_FILE);
        const index = services.findIndex(s => String(s.id) === String(id));

        if (index === -1) {
            console.warn(`⚠️ [API] Update failed: Service ID ${id} not found`);
            return res.status(404).json({ success: false, error: 'Service not found' });
        }

        services[index] = {
            ...services[index],
            title: title || services[index].title,
            description: description || services[index].description,
            icon: icon || services[index].icon,
            gradient: gradient || services[index].gradient,
            category: category || services[index].category,
            screenshots: screenshots !== undefined ? screenshots : services[index].screenshots,
            features: features !== undefined ? features : services[index].features,
            demoUrl: demoUrl !== undefined ? demoUrl : services[index].demoUrl,
            updatedAt: new Date().toISOString()
        };

        await fs.writeJson(SERVICES_FILE, services);
        res.json({ success: true, service: services[index] });
    } catch (error) {
        console.error('Error updating service:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// POST: Reset all services to hardcoded defaults
app.post('/api/services/reset', async (req, res) => {
    try {
        await fs.writeJson(SERVICES_FILE, DEFAULT_SERVICES);
        res.json({ success: true, message: 'All services reset to hardcoded defaults', services: DEFAULT_SERVICES });
    } catch (error) {
        console.error('Error resetting services:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// Basic root for health check
app.get('/api', (req, res) => {
    res.json({ status: 'API is running in serverless mode' });
});

export default app;
