import User from '../models/User.js';
import Client from '../models/Client.js';
import Product from '../models/Product.js';

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
const seedUsers = async () => {
  try {
    // Clear existing data
    // await User.deleteMany();
    // await Client.deleteMany();
    // await Product.deleteMany();
    
    console.log('Checking for existing users...');
    
    // Create users with hashed passwords
    const createdUsers = [];
    for (const user of users) {
      // Check if user already exists
      const existingUser = await User.findOne({ email: user.email });
      if (existingUser) {
        console.log(`User ${user.email} already exists, skipping...`);
        createdUsers.push(existingUser);
        continue;
      }
      
      const createdUser = await User.create(user);
      createdUsers.push(createdUser);
      console.log(`Created user: ${user.email}`);
    }
    
    console.log('Users imported...');
    
    // Create clients and link to client user
    const clientUser = createdUsers.find(u => u.role === 'client');
    if (clientUser) {
      for (const client of clients) {
        // Check if client already exists
        const existingClient = await Client.findOne({ name: client.name });
        if (existingClient) {
          console.log(`Client ${client.name} already exists, skipping...`);
          continue;
        }
        
        await Client.create({
          name: client.name,
          email: client.email,
          phone: client.phone,
          address: client.address,
          userId: clientUser._id
        });
        console.log(`Created client: ${client.name}`);
      }
      
      console.log('Clients imported...');
    }
    
    // Create products and link to fournisseur user
    const fournisseurUser = createdUsers.find(u => u.role === 'fournisseur');
    if (fournisseurUser) {
      for (const product of products) {
        // Check if product already exists
        const existingProduct = await Product.findOne({ name: product.name });
        if (existingProduct) {
          console.log(`Product ${product.name} already exists, skipping...`);
          continue;
        }
        
        await Product.create({
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          userId: fournisseurUser._id,
          active: true
        });
        console.log(`Created product: ${product.name}`);
      }
      
      console.log('Products imported...');
    }
    
    console.log('Data import completed successfully');
  } catch (error) {
    console.error(`Error importing data: ${error.message}`);
  }
};

export default seedUsers;