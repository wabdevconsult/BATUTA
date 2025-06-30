import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import connectDB from './server/config/db.js';

// Load environment variables
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'batuta-jwt-secret-key';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

console.log('Starting BATUTA CRM Server...');
console.log(`Environment: ${process.env.NODE_ENV || 'production'}`);
console.log(`Target Port: ${PORT}`);

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});

// Middleware
app.use(limiter);
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(mongoSanitize());
app.use(hpp());
app.use(cookieParser());

console.log('✓ Middleware configured');

// Demo mode middleware - adds demo flag to all requests
app.use((req, res, next) => {
  req.demoMode = process.env.NODE_ENV === 'development';
  next();
});

// Setup real routes with database dependency
const setupRealRoutes = async () => {
  try {
    console.log('Setting up database-dependent API routes...');
    
    // Import routes dynamically with error handling
    const routes = await Promise.allSettled([
      import('./server/routes/authRoutes.js').then(m => ({ name: 'auth', router: m.default, path: '/auth' })),
      import('./server/routes/userRoutes.js').then(m => ({ name: 'users', router: m.default, path: '/users' })),
      import('./server/routes/clientRoutes.js').then(m => ({ name: 'clients', router: m.default, path: '/clients' })),
      import('./server/routes/productRoutes.js').then(m => ({ name: 'products', router: m.default, path: '/products' })),
      import('./server/routes/personalizationRoutes.js').then(m => ({ name: 'personalization', router: m.default, path: '/personalization' })),
      import('./server/routes/devisRoutes.js').then(m => ({ name: 'devis', router: m.default, path: '/devis' })),
      import('./server/routes/factureRoutes.js').then(m => ({ name: 'factures', router: m.default, path: '/factures' })),
      import('./server/routes/quoteRequestRoutes.js').then(m => ({ name: 'quote-requests', router: m.default, path: '/quote-requests' })),
      import('./server/routes/interventionRoutes.js').then(m => ({ name: 'interventions', router: m.default, path: '/interventions' })),
      import('./server/routes/messageRoutes.js').then(m => ({ name: 'messages', router: m.default, path: '/messages' })),
      import('./server/routes/equipmentRoutes.js').then(m => ({ name: 'equipments', router: m.default, path: '/equipments' })),
      import('./server/routes/installationRoutes.js').then(m => ({ name: 'installations', router: m.default, path: '/installations' }))
    ]);

    // Setup successfully imported routes
    routes.forEach((result, index) => {
      if (result.status === 'fulfilled' && result.value.router) {
        app.use(result.value.path, result.value.router);
        console.log(`✓ ${result.value.name} routes configured`);
      } else {
        console.log(`⚠ ${['auth', 'users', 'clients', 'products', 'personalization', 'devis', 'factures', 'quote-requests', 'interventions', 'messages', 'equipments', 'installations'][index]} routes failed to load`);
      }
    });

  } catch (error) {
    console.error('Error setting up real routes:', error.message);
    throw error;
  }
};

// Setup fallback routes for demo mode
const setupFallbackRoutes = () => {
  console.log('Setting up fallback demo routes...');
  
  // Auth fallback
  app.post('/auth/login', (req, res) => {
   const user = {
      id: '507f1f77bcf86cd799439012',
      email: req.body.email || 'demo@batuta.fr',
      firstName: 'Demo',
      lastName: 'User',
      role: 'admin'
    };

    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user });
  });

  app.post('/auth/register', (req, res) => {
     const user = {
      id: '507f1f77bcf86cd799439013',
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      role: 'client'
    };

    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user });
  });

  // Personalization fallback
  app.get('/personalization', (req, res) => {
    res.json([
      {
        _id: '507f1f77bcf86cd799439011',
        userId: {
          _id: '507f1f77bcf86cd799439012',
          email: 'client1@example.com',
          firstName: 'Jean',
          lastName: 'Dupont'
        },
        siteName: 'Électricité Dupont',
        primaryColor: '#3B82F6',
        secondaryColor: '#1E40AF',
        logo: 'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=200',
        heroImage: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Services électriques professionnels depuis 15 ans',
        services: ['Installation électrique', 'Dépannage', 'Mise aux normes'],
        contactInfo: {
          phone: '01 23 45 67 89',
          email: 'contact@electricite-dupont.fr',
          address: '123 Rue de la République, 75001 Paris'
        },
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-20')
      }
    ]);
  });

  app.get('/personalization/my', (req, res) => {
    res.json({
      _id: '507f1f77bcf86cd799439011',
      userId: '507f1f77bcf86cd799439012',
      siteName: 'Demo Site',
      primaryColor: '#3B82F6',
      secondaryColor: '#10B981',
      backgroundColor: '#F9FAFB',
      textColor: '#1F2937',
      fontFamily: 'Inter, sans-serif',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    });
  });

  // Users fallback
  app.get('/users', (req, res) => {
    res.json([
      {
        _id: '507f1f77bcf86cd799439012',
        email: 'admin@batuta.fr',
        firstName: 'Admin',
        lastName: 'BATUTA',
        role: 'admin',
        company: 'BATUTA SAS',
        phone: '01 23 45 67 89',
        createdAt: new Date()
      }
    ]);
  });

  // Clients fallback
  app.get('/clients', (req, res) => {
    res.json([]);
  });

  // Products fallback
  app.get('/products', (req, res) => {
    res.json([]);
  });

  // Devis fallback
  app.get('/devis', (req, res) => {
    res.json([]);
  });

  // Factures fallback
  app.get('/factures', (req, res) => {
    res.json([]);
  });

  // Quote requests fallback
  app.get('/quote-requests', (req, res) => {
    res.json([]);
  });
  
  // Interventions fallback
  app.get('/interventions', (req, res) => {
    res.json([]);
  });
  
  // Messages fallback
  app.get('/messages', (req, res) => {
    res.json([
      {
        _id: '507f1f77bcf86cd799439051',
        sender: {
          _id: '507f1f77bcf86cd799439012',
          firstName: 'Admin',
          lastName: 'BATUTA',
          email: 'admin@batuta.fr'
        },
        recipient: {
          _id: '507f1f77bcf86cd799439013',
          firstName: 'Technicien',
          lastName: 'BATUTA',
          email: 'tech@batuta.fr'
        },
        subject: 'Nouvelle intervention à planifier',
        content: 'Bonjour, pouvez-vous planifier une intervention chez le client Dupont pour la semaine prochaine ? Merci.',
        read: true,
        createdAt: new Date('2025-05-15T10:30:00'),
        updatedAt: new Date('2025-05-15T10:30:00')
      },
      {
        _id: '507f1f77bcf86cd799439052',
        sender: {
          _id: '507f1f77bcf86cd799439013',
          firstName: 'Technicien',
          lastName: 'BATUTA',
          email: 'tech@batuta.fr'
        },
        recipient: {
          _id: '507f1f77bcf86cd799439012',
          firstName: 'Admin',
          lastName: 'BATUTA',
          email: 'admin@batuta.fr'
        },
        subject: 'Re: Nouvelle intervention à planifier',
        content: 'Bonjour, c\'est noté. Je vais contacter le client pour convenir d\'une date. Cordialement.',
        read: false,
        parentMessage: '507f1f77bcf86cd799439051',
        createdAt: new Date('2025-05-15T11:15:00'),
        updatedAt: new Date('2025-05-15T11:15:00')
      }
    ]);
  });
  
  app.get('/messages/unread', (req, res) => {
    res.json({ count: 1 });
  });

  // Equipment fallback
  app.get('/equipments', (req, res) => {
    res.json(mockEquipments);
  });

  app.get('/equipments/:id', (req, res) => {
    const equipment = mockEquipments.find(e => e._id === req.params.id);
    if (equipment) {
      res.json(equipment);
    } else {
      res.status(404).json({ message: 'Equipment not found' });
    }
  });

  app.post('/equipments', (req, res) => {
    const newEquipment = {
      _id: `mock-equipment-${Date.now()}`,
      ...req.body,
      createdBy: {
        _id: req.user?.id || '507f1f77bcf86cd799439024',
        firstName: req.user?.firstName || 'Admin',
        lastName: req.user?.lastName || 'BATUTA',
        email: req.user?.email || 'admin@batuta.fr'
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };
    res.status(201).json(newEquipment);
  });

  app.put('/equipments/:id', (req, res) => {
    const equipment = mockEquipments.find(e => e._id === req.params.id);
    if (equipment) {
      const updatedEquipment = { ...equipment, ...req.body, updatedAt: new Date() };
      res.json(updatedEquipment);
    } else {
      res.status(404).json({ message: 'Equipment not found' });
    }
  });

  // Installations fallback
  app.get('/installations', (req, res) => {
    res.json(mockInstallations);
  });

  app.get('/installations/:id', (req, res) => {
    const installation = mockInstallations.find(i => i._id === req.params.id);
    if (installation) {
      res.json(installation);
    } else {
      res.status(404).json({ message: 'Installation not found' });
    }
  });

  app.post('/installations', (req, res) => {
    const newInstallation = {
      _id: `mock-installation-${Date.now()}`,
      ...req.body,
      createdBy: {
        _id: req.user?.id || '507f1f77bcf86cd799439024',
        firstName: req.user?.firstName || 'Admin',
        lastName: req.user?.lastName || 'BATUTA',
        email: req.user?.email || 'admin@batuta.fr'
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };
    res.status(201).json(newInstallation);
  });

  app.put('/installations/:id', (req, res) => {
    const installation = mockInstallations.find(i => i._id === req.params.id);
    if (installation) {
      const updatedInstallation = { ...installation, ...req.body, updatedAt: new Date() };
      res.json(updatedInstallation);
    } else {
      res.status(404).json({ message: 'Installation not found' });
    }
  });

  console.log('✓ Fallback demo routes configured');
};

// Health check endpoint
app.get('/health', (req, res) => {
  console.log('Health check requested');
  res.json({
    status: 'ok',
    mode: process.env.NODE_ENV === 'development' ? 'demo' : 'production',
    database: process.env.NODE_ENV === 'development' ? 'demo-mode' : 'connected',
    timestamp: new Date().toISOString(),
    message: process.env.NODE_ENV === 'development' ? 'Running in demo mode - data is not persisted' : 'Production mode'
  });
});

// Mock data for equipment and installations
const mockEquipments = [
  {
    _id: '507f1f77bcf86cd799439031',
    name: 'Pompe à chaleur air/eau',
    type: 'Chauffage',
    brand: 'Daikin',
    model: 'Altherma 3',
    serialNumber: 'DAI2023456789',
    installationDate: new Date('2023-05-15'),
    lastMaintenanceDate: new Date('2023-11-15'),
    nextMaintenanceDate: new Date('2024-05-15'),
    status: 'operational',
    location: {
      address: '123 Rue de Paris, 75001 Paris',
      coordinates: {
        lat: 48.856614,
        lng: 2.3522219
      }
    },
    clientId: {
      _id: '507f1f77bcf86cd799439022',
      name: 'Dupont SAS',
      email: 'contact@dupont.com',
      phone: '01 23 45 67 89',
      address: '123 Rue de Paris, 75001 Paris'
    },
    technicianId: {
      _id: '507f1f77bcf86cd799439023',
      firstName: 'Jean',
      lastName: 'Technicien',
      email: 'jean.tech@batuta.fr',
      phone: '06 12 34 56 78'
    },
    warranty: {
      startDate: new Date('2023-05-15'),
      endDate: new Date('2025-05-15'),
      provider: 'Daikin France',
      details: 'Garantie pièces et main d\'œuvre'
    },
    specifications: {
      power: '8 kW',
      energyClass: 'A+++',
      refrigerant: 'R32'
    },
    notes: 'Installation réalisée sans problème. Client satisfait.',
    attachments: [
      {
        name: 'manuel_utilisation.pdf',
        url: 'https://example.com/manuel_utilisation.pdf',
        type: 'application/pdf',
        uploadedAt: new Date('2023-05-15')
      }
    ],
    maintenanceHistory: [
      {
        date: new Date('2023-05-15'),
        type: 'installation',
        technicianId: '507f1f77bcf86cd799439023',
        description: 'Installation initiale',
        cost: 1200
      },
      {
        date: new Date('2023-11-15'),
        type: 'preventive',
        technicianId: '507f1f77bcf86cd799439023',
        description: 'Maintenance préventive semestrielle',
        cost: 150
      }
    ],
    createdBy: {
      _id: '507f1f77bcf86cd799439024',
      firstName: 'Admin',
      lastName: 'BATUTA',
      email: 'admin@batuta.fr'
    },
    createdAt: new Date('2023-05-15'),
    updatedAt: new Date('2023-11-15')
  },
  {
    _id: '507f1f77bcf86cd799439032',
    name: 'Chaudière à condensation',
    type: 'Chauffage',
    brand: 'Viessmann',
    model: 'Vitodens 200-W',
    serialNumber: 'VIE20234567890',
    installationDate: new Date('2022-09-10'),
    lastMaintenanceDate: new Date('2023-09-10'),
    nextMaintenanceDate: new Date('2024-09-10'),
    status: 'maintenance_required',
    location: {
      address: '45 Avenue Victor Hugo, 69002 Lyon',
      coordinates: {
        lat: 45.7578137,
        lng: 4.8320114
      }
    },
    clientId: {
      _id: '507f1f77bcf86cd799439026',
      name: 'Martin & Co',
      email: 'contact@martin.com',
      phone: '01 23 45 67 90',
      address: '45 Avenue Victor Hugo, 69002 Lyon'
    },
    technicianId: {
      _id: '507f1f77bcf86cd799439023',
      firstName: 'Jean',
      lastName: 'Technicien',
      email: 'jean.tech@batuta.fr',
      phone: '06 12 34 56 78'
    },
    warranty: {
      startDate: new Date('2022-09-10'),
      endDate: new Date('2024-09-10'),
      provider: 'Viessmann France',
      details: 'Garantie 2 ans pièces et main d\'œuvre'
    },
    specifications: {
      power: '25 kW',
      energyClass: 'A',
      fuelType: 'Gaz naturel'
    },
    notes: 'Remplacement de l\'ancienne chaudière. Raccordement au circuit existant.',
    attachments: [],
    maintenanceHistory: [
      {
        date: new Date('2022-09-10'),
        type: 'installation',
        technicianId: '507f1f77bcf86cd799439023',
        description: 'Installation initiale',
        cost: 2200
      },
      {
        date: new Date('2023-09-10'),
        type: 'preventive',
        technicianId: '507f1f77bcf86cd799439023',
        description: 'Maintenance annuelle obligatoire',
        cost: 180
      }
    ],
    createdBy: {
      _id: '507f1f77bcf86cd799439024',
      firstName: 'Admin',
      lastName: 'BATUTA',
      email: 'admin@batuta.fr'
    },
    createdAt: new Date('2022-09-10'),
    updatedAt: new Date('2023-09-10')
  },
  {
    _id: '507f1f77bcf86cd799439033',
    name: 'Climatisation multi-split',
    type: 'Climatisation',
    brand: 'Mitsubishi Electric',
    model: 'MSZ-HR25VF',
    serialNumber: 'MIT20234567891',
    installationDate: new Date('2023-06-20'),
    lastMaintenanceDate: null,
    nextMaintenanceDate: new Date('2024-06-20'),
    status: 'operational',
    location: {
      address: '8 Boulevard Haussmann, 75008 Paris',
      coordinates: {
        lat: 48.8738548,
        lng: 2.3400195
      }
    },
    clientId: {
      _id: '507f1f77bcf86cd799439028',
      name: 'Leroy Entreprise',
      email: 'contact@leroy.com',
      phone: '01 23 45 67 91',
      address: '8 Boulevard Haussmann, 75008 Paris'
    },
    technicianId: {
      _id: '507f1f77bcf86cd799439029',
      firstName: 'Marie',
      lastName: 'Technicienne',
      email: 'marie.tech@batuta.fr',
      phone: '06 98 76 54 32'
    },
    warranty: {
      startDate: new Date('2023-06-20'),
      endDate: new Date('2026-06-20'),
      provider: 'Mitsubishi France',
      details: 'Garantie 3 ans'
    },
    specifications: {
      power: '2.5 kW',
      energyClass: 'A++',
      refrigerant: 'R32',
      units: 3
    },
    notes: 'Installation dans les bureaux. 3 unités intérieures.',
    attachments: [],
    maintenanceHistory: [
      {
        date: new Date('2023-06-20'),
        type: 'installation',
        technicianId: '507f1f77bcf86cd799439029',
        description: 'Installation du système multi-split',
        cost: 3500
      }
    ],
    createdBy: {
      _id: '507f1f77bcf86cd799439024',
      firstName: 'Admin',
      lastName: 'BATUTA',
      email: 'admin@batuta.fr'
    },
    createdAt: new Date('2023-06-20'),
    updatedAt: new Date('2023-06-20')
  }
];

const mockInstallations = [
  {
    _id: '507f1f77bcf86cd799439041',
    name: 'Installation pompe à chaleur',
    description: 'Installation complète d\'une pompe à chaleur air/eau',
    equipmentId: {
      _id: '507f1f77bcf86cd799439031',
      name: 'Pompe à chaleur air/eau',
      type: 'Chauffage',
      brand: 'Daikin',
      model: 'Altherma 3'
    },
    clientId: {
      _id: '507f1f77bcf86cd799439022',
      name: 'Dupont SAS',
      email: 'contact@dupont.com',
      phone: '01 23 45 67 89',
      address: '123 Rue de Paris, 75001 Paris'
    },
    technicianId: {
      _id: '507f1f77bcf86cd799439023',
      firstName: 'Jean',
      lastName: 'Technicien',
      email: 'jean.tech@batuta.fr',
      phone: '06 12 34 56 78'
    },
    installationDate: new Date('2025-06-15'),
    completionDate: new Date('2025-06-16'),
    status: 'completed',
    location: {
      address: '123 Rue de Paris, 75001 Paris',
      coordinates: {
        lat: 48.856614,
        lng: 2.3522219
      }
    },
    notes: 'Installation réalisée avec succès. Client satisfait.',
    attachments: [
      {
        name: 'photo_installation.jpg',
        url: 'https://example.com/photo_installation.jpg',
        type: 'image/jpeg',
        uploadedAt: new Date('2025-06-16')
      }
    ],
    createdBy: {
      _id: '507f1f77bcf86cd799439024',
      firstName: 'Admin',
      lastName: 'BATUTA',
      email: 'admin@batuta.fr'
    },
    createdAt: new Date('2025-06-10'),
    updatedAt: new Date('2025-06-16')
  },
  {
    _id: '507f1f77bcf86cd799439042',
    name: 'Installation chaudière',
    description: 'Installation d\'une chaudière à condensation',
    equipmentId: {
      _id: '507f1f77bcf86cd799439032',
      name: 'Chaudière à condensation',
      type: 'Chauffage',
      brand: 'Viessmann',
      model: 'Vitodens 200-W'
    },
    clientId: {
      _id: '507f1f77bcf86cd799439026',
      name: 'Martin & Co',
      email: 'contact@martin.com',
      phone: '01 23 45 67 90',
      address: '45 Avenue Victor Hugo, 69002 Lyon'
    },
    technicianId: {
      _id: '507f1f77bcf86cd799439023',
      firstName: 'Jean',
      lastName: 'Technicien',
      email: 'jean.tech@batuta.fr',
      phone: '06 12 34 56 78'
    },
    installationDate: new Date('2025-06-20'),
    status: 'scheduled',
    location: {
      address: '45 Avenue Victor Hugo, 69002 Lyon',
      coordinates: {
        lat: 45.7578137,
        lng: 4.8320114
      }
    },
    notes: 'Prévoir 4 heures d\'intervention',
    attachments: [],
    createdBy: {
      _id: '507f1f77bcf86cd799439024',
      firstName: 'Admin',
      lastName: 'BATUTA',
      email: 'admin@batuta.fr'
    },
    createdAt: new Date('2025-06-12'),
    updatedAt: new Date('2025-06-12')
  },
  {
    _id: '507f1f77bcf86cd799439043',
    name: 'Installation climatisation',
    description: 'Installation d\'un système de climatisation multi-split',
    equipmentId: {
      _id: '507f1f77bcf86cd799439033',
      name: 'Climatisation multi-split',
      type: 'Climatisation',
      brand: 'Mitsubishi Electric',
      model: 'MSZ-HR25VF'
    },
    clientId: {
      _id: '507f1f77bcf86cd799439028',
      name: 'Leroy Entreprise',
      email: 'contact@leroy.com',
      phone: '01 23 45 67 91',
      address: '8 Boulevard Haussmann, 75008 Paris'
    },
    technicianId: {
      _id: '507f1f77bcf86cd799439029',
      firstName: 'Marie',
      lastName: 'Technicienne',
      email: 'marie.tech@batuta.fr',
      phone: '06 98 76 54 32'
    },
    installationDate: new Date('2025-06-25'),
    status: 'in_progress',
    location: {
      address: '8 Boulevard Haussmann, 75008 Paris',
      coordinates: {
        lat: 48.8738548,
        lng: 2.3400195
      }
    },
    notes: 'Installation en cours, problème d\'accès au faux plafond',
    attachments: [],
    createdBy: {
      _id: '507f1f77bcf86cd799439024',
      firstName: 'Admin',
      lastName: 'BATUTA',
      email: 'admin@batuta.fr'
    },
    createdAt: new Date('2025-06-14'),
    updatedAt: new Date('2025-06-18')
  }
];

// Main application startup function
const startApplication = async () => {
  try {
    // Try to connect to database
    const dbConnected = await connectDB();
    
    if (dbConnected) {
      // Database connected, use real routes
      await setupRealRoutes();
      console.log('✓ Running with database connection');
    } else {
      // No database, use fallback routes
      setupFallbackRoutes();
      console.log('✓ Running in demo mode with fallback routes');
    }

    // Serve static files from the React app (only in production)
    if (process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, 'dist')));
      
      // The "catchall" handler: for any request that doesn't
      // match one above, send back React's index.html file.
      app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'dist', 'index.html'));
      });
    }

    // Error handling middleware
    app.use((err, req, res, next) => {
      console.error('Express error handler:', err.message);
      res.status(500).json({
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Server error',
        mode: process.env.NODE_ENV === 'development' ? 'demo' : 'production'
      });
    });

    // Start server
    const server = app.listen(PORT, () => {
      console.log(`✓ Server running on port ${PORT}`);
      console.log(`✓ Health check: http://localhost:${PORT}/health`);
      if (process.env.NODE_ENV === 'development') {
        console.log('✓ Demo mode active - all data is temporary');
      }
      console.log('✓ Ready to accept connections');
    });

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please use a different port.`);
      } else {
        console.error('Server error:', error.message);
      }
      process.exit(1);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('SIGTERM received, shutting down gracefully');
      server.close(() => {
        console.log('Server closed');
        if (connectDB.connection && connectDB.connection.readyState === 1) {
          connectDB.connection.close();
        }
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      console.log('SIGINT received, shutting down gracefully');
      server.close(() => {
        console.log('Server closed');
        if (connectDB.connection && connectDB.connection.readyState === 1) {
          connectDB.connection.close();
        }
        process.exit(0);
      });
    });

  } catch (error) {
    console.error('Failed to start application:', error.message);
    console.log('Falling back to demo mode...');
    
    // If everything fails, at least setup fallback routes
    setupFallbackRoutes();
    
    // Start server with fallback routes
    const server = app.listen(PORT, () => {
      console.log(`✓ Server running on port ${PORT} (fallback mode)`);
      console.log(`✓ Health check: http://localhost:${PORT}/health`);
      console.log('✓ Demo mode active - all data is temporary');
      console.log('✓ Ready to accept connections');
    });

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please use a different port.`);
      } else {
        console.error('Server error:', error.message);
      }
      process.exit(1);
    });
  }
};

// Start the application
startApplication();