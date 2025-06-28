import React, { useState } from 'react';
import { Package, Plus, Search, Filter, Eye, Edit, Trash2, CheckCircle, AlertCircle } from 'lucide-react';

const ProduitsPage = () => {
  const [produits, setProduits] = useState([
    { 
      id: 'PROD-001', 
      name: 'Pompe à chaleur 7kW', 
      category: 'Chauffage', 
      price: '2 500,00 €', 
      stock: 12,
      active: true
    },
    { 
      id: 'PROD-002', 
      name: 'Panneau solaire 350W', 
      category: 'Énergie solaire', 
      price: '180,00 €', 
      stock: 45,
      active: true
    },
    { 
      id: 'PROD-003', 
      name: 'Chaudière condensation', 
      category: 'Chauffage', 
      price: '1 800,00 €', 
      stock: 8,
      active: true
    },
    { 
      id: 'PROD-004', 
      name: 'Radiateur connecté', 
      category: 'Chauffage', 
      price: '350,00 €', 
      stock: 23,
      active: true
    },
    { 
      id: 'PROD-005', 
      name: 'Batterie stockage 5kWh', 
      category: 'Énergie solaire', 
      price: '3 200,00 €', 
      stock: 5,
      active: true
    }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('tous');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const categories = [...new Set(produits.map(p => p.category))];

  const filteredProduits = produits.filter(produit => {
    const matchesSearch = 
      produit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      produit.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'tous' || produit.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const getStockStatusClass = (stock) => {
    if (stock > 10) return 'text-green-600';
    if (stock > 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleDelete = (id) => {
    setProduits(produits.filter(p => p.id !== id));
    setSuccess(`Produit ${id} supprimé avec succès`);
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Gestion des produits</h1>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Nouveau produit</span>
          </button>
        </div>

        {success && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span>{success}</span>
          </div>
        )}

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          <div className="w-full md:w-1/3 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            >
              <option value="tous">Toutes les catégories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Référence
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produit
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Catégorie
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prix
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProduits.map((produit) => (
                <tr key={produit.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {produit.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {produit.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {produit.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {produit.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`font-medium ${getStockStatusClass(produit.stock)}`}>
                      {produit.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="h-5 w-5" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit className="h-5 w-5" />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDelete(produit.id)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredProduits.length === 0 && (
          <div className="text-center py-4">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Aucun produit trouvé</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProduitsPage;