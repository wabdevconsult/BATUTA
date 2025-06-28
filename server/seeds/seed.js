import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Client from '../models/Client.js';
import Product from '../models/Product.js';
import connectDB from '../config/db.js';

dotenv.config();

// Connect to database
connectDB();

// Sample data
const users = [
  {
    email: 'admin@batuta.fr',
    password: 'admin123',
    role: 'admin',
    firstName: 'Admin',
    lastName: 'BATUTA',
    company: 'BATUTA SAS',
    phone: '01 23 45 67 89'
  },
  {
    email: 'tech@batuta.fr',
    password: 'tech123',
    role: 'technicien',
    firstName: 'Technicien',
    lastName: 'BATUTA',
    company: 'BATUTA SAS',
    phone: '01 23 45 67 90'
  },
  {
    email: 'client@batuta.fr',
    password: 'client123',
    role: 'client',
    firstName: 'Client',
    lastName: 'BATUTA',
    company: 'Client SAS',
    phone: '01 23 45 67 91'
  },
  {
    email: 'fournisseur@batuta.fr',
    password: 'fournisseur123',
    role: 'fournisseur',
    firstName: 'Fournisseur',
    lastName: 'BATUTA',
    company: 'Fournisseur SAS',
    phone: '01 23 45 67 92'
  }
];

const clients = [
  {
    company: 'Dupont SAS',
    address: {
      street: '123 Rue de Paris',
      city: 'Paris',
      postalCode: '75001',
      country: 'France'
    },
    contactPerson: {
      firstName: 'Jean',
      lastName: 'Dupont',
      position: 'Directeur',
      email: 'jean.dupont@example.com',
      phone: '01 23 45 67 89'
    },
    taxId: 'FR12345678901',
    status: 'active'
  },
  {
    company: 'Martin & Co',
    address: {
      street: '45 Avenue Victor Hugo',
      city: 'Lyon',
      postalCode: '69002',
      country: 'France'
    },
    contactPerson: {
      firstName: 'Marie',
      lastName: 'Martin',
      position: 'Gérante',
      email: 'marie.martin@example.com',
      phone: '04 56 78 90 12'
    },
    taxId: 'FR98765432109',
    status: 'active'
  },
  {
    company: 'Leroy Entreprise',
    address: {
      street: '8 Boulevard Haussmann',
      city: 'Paris',
      postalCode: '75008',
      country: 'France'
    },
    contactPerson: {
      firstName: 'Pierre',
      lastName: 'Leroy',
      position: 'PDG',
      email: 'pierre.leroy@example.com',
      phone: '01 87 65 43 21'
    },
    taxId: 'FR45678901234',
    status: 'active'
  }
];

const products = [
  {
    name: 'Pompe à chaleur 7kW',
    description: 'Pompe à chaleur air/eau haute performance',
    sku: 'PAC-7KW-001',
    category: 'Chauffage',
    price: 2500,
    cost: 1800,
    taxRate: 20,
    unit: 'pièce',
    stock: {
      quantity: 12,
      minQuantity: 5,
      location: 'Entrepôt A'
    },
    active: true
  },
  {
    name: 'Panneau solaire 350W',
    description: 'Panneau photovoltaïque monocristallin haute efficacité',
    sku: 'PV-350W-001',
    category: 'Énergie solaire',
    price: 180,
    cost: 120,
    taxRate: 20,
    unit: 'pièce',
    stock: {
      quantity: 45,
      minQuantity: 10,
      location: 'Entrepôt B'
    },
    active: true
  },
  {
    name: 'Chaudière condensation',
    description: 'Chaudière à condensation gaz haute performance énergétique',
    sku: 'CHAUD-COND-001',
    category: 'Chauffage',
    price: 1800,
    cost: 1200,
    taxRate: 20,
    unit: 'pièce',
    stock: {
      quantity: 8,
      minQuantity: 3,
      location: 'Entrepôt A'
    },
    active: true
  }
];

// Seed function
const importData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Client.deleteMany();
    await Product.deleteMany();
    
    console.log('Data cleared...');
    
    // Create users with hashed passwords
    const createdUsers = [];
    for (const user of users) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);
      
      const createdUser = await User.create({
        ...user,
        password: hashedPassword
      });
      
      createdUsers.push(createdUser);
    }
    
    console.log('Users imported...');
    
    // Create clients and link to client user
    const clientUser = createdUsers.find(u => u.role === 'client');
    const createdClients = [];
    
    for (const client of clients) {
      const createdClient = await Client.create({
        name: client.company,
        email: client.contactPerson.email,
        phone: client.contactPerson.phone,
        address: client.address.street + ', ' + client.address.city + ', ' + client.address.postalCode,
        userId: clientUser._id
      });
      
      createdClients.push(createdClient);
    }
    
    console.log('Clients imported...');
    
    // Create products and link to fournisseur user
    const fournisseurUser = createdUsers.find(u => u.role === 'fournisseur');
    
    for (const product of products) {
      await Product.create({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        userId: fournisseurUser._id,
        active: product.active
      });
    }
    
    console.log('Products imported...');
    
    console.log('Data import completed successfully');
    process.exit();
  } catch (error) {
    console.error(`Error importing data: ${error.message}`);
    process.exit(1);
  }
};

// Execute seed function
importData();