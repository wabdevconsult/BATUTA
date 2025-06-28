import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Client from '../models/Client.js';
import Product from '../models/Product.js';
import mongoose from 'mongoose';

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
    name: 'Dupont SAS',
    email: 'contact@dupont.com',
    phone: '01 23 45 67 89',
    address: '123 Rue de Paris, 75001 Paris'
  },
  {
    name: 'Martin & Co',
    email: 'contact@martin.com',
    phone: '01 23 45 67 90',
    address: '45 Avenue Victor Hugo, 69002 Lyon'
  },
  {
    name: 'Leroy Entreprise',
    email: 'contact@leroy.com',
    phone: '01 23 45 67 91',
    address: '8 Boulevard Haussmann, 75008 Paris'
  }
];

const products = [
  {
    name: 'Pompe à chaleur 7kW',
    description: 'Pompe à chaleur air/eau haute performance',
    price: 2500,
    category: 'Chauffage'
  },
  {
    name: 'Panneau solaire 350W',
    description: 'Panneau photovoltaïque monocristallin haute efficacité',
    price: 180,
    category: 'Énergie solaire'
  },
  {
    name: 'Chaudière condensation',
    description: 'Chaudière à condensation gaz haute performance énergétique',
    price: 1800,
    category: 'Chauffage'
  }
];

// Seed function
export const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');
    
    // Create users
    const createdUsers = [];
    for (const userData of users) {
      // Check if user already exists
      const existingUser = await User.findOne({ email: userData.email });
      if (!existingUser) {
        const user = new User(userData);
        await user.save();
        createdUsers.push(user);
        console.log(`Created user: ${user.email}`);
      } else {
        console.log(`User ${userData.email} already exists, skipping...`);
        createdUsers.push(existingUser);
      }
    }
    
    // Create clients
    const clientUser = createdUsers.find(u => u.role === 'client');
    for (const clientData of clients) {
      // Check if client already exists by name
      const existingClient = await Client.findOne({ name: clientData.name });
      
      if (!existingClient) {
        const client = new Client({
          ...clientData,
          userId: clientUser._id
        });
        await client.save();
        console.log(`Created client: ${client.name}`);
      } else {
        console.log(`Client ${clientData.name} already exists, skipping...`);
      }
    }
    
    // Create products
    const fournisseurUser = createdUsers.find(u => u.role === 'fournisseur');
    for (const productData of products) {
      // Check if product already exists by name
      const existingProduct = await Product.findOne({ name: productData.name });
      
      if (!existingProduct) {
        const product = new Product({
          ...productData,
          userId: fournisseurUser._id
        });
        await product.save();
        console.log(`Created product: ${product.name}`);
      } else {
        console.log(`Product ${productData.name} already exists, skipping...`);
      }
    }
    
    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};