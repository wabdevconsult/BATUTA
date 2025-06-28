import React, { useState, useEffect } from 'react';
import { Calculator, Download, Save, Share2, Eye, Settings } from 'lucide-react';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

const SimulateurUniversel = ({ 
  config, 
  onSave,
  isEditable = false,
  className = ""
}) => {
  // État pour stocker les valeurs des champs
  const [values, setValues] = useState({});
  // État pour stocker le résultat calculé
  const [result, setResult] = useState(null);
  // État pour le mode d'affichage (preview ou édition)
  const [previewMode, setPreviewMode] = useState(true);
  // État pour le titre personnalisé
  const [title, setTitle] = useState(config?.nom || "Simulateur");
  // État pour la formule personnalisée
  const [formula, setFormula] = useState(config?.formule || "");
  // État pour les champs personnalisés
  const [fields, setFields] = useState(config?.champs || []);

  // Fonction de nettoyage de label → variable JS valide
  const sanitizeLabel = (label) => {
    return label.toLowerCase().replace(/\s+/g, '_').replace(/[^\w]/g, '');
  };

  // Fonction sécurisée pour calculer le résultat
  const computeResult = (champs, formValues, formule) => {
    try {
      // Créer un mapping entre les labels originaux et les noms de variables sanitisés
      const labelMap = {};
      const sanitizedValues = {};
      
      champs.forEach(field => {
        const sanitizedLabel = sanitizeLabel(field.label);
        labelMap[field.label] = sanitizedLabel;
        sanitizedValues[sanitizedLabel] = formValues[field.label] || 0;
      });
      
      // Extraire les noms de variables et leurs valeurs
      const varNames = Object.values(labelMap);
      const varValues = varNames.map(name => sanitizedValues[name]);
      
      // Construire une fonction JS sécurisée
      const fn = new Function(...varNames, `try { return ${formule}; } catch(e) { return "Erreur"; }`);
      return fn(...varValues);
    } catch (err) {
      console.error("Erreur dans le calcul:", err);
      return "⚠️ Erreur de formule";
    }
  };

  // Initialiser les valeurs par défaut des champs
  useEffect(() => {
    if (config?.champs) {
      const initialValues = {};
      config.champs.forEach(field => {
        initialValues[field.label] = field.defaultValue || (field.type === 'slider' ? field.min : 0);
      });
      setValues(initialValues);
      setTitle(config.nom);
      setFormula(config.formule);
      setFields(config.champs);
    }
  }, [config]);

  // Calculer le résultat lorsque les valeurs changent
  useEffect(() => {
    if (Object.keys(values).length > 0 && formula) {
      const calculatedResult = computeResult(fields, values, formula);
      setResult(calculatedResult);
    }
  }, [values, formula, fields]);

  // Gérer les changements de valeurs des champs
  const handleValueChange = (label, value) => {
    setValues(prev => ({
      ...prev,
      [label]: value
    }));
  };

  // Ajouter un nouveau champ
  const addField = () => {
    setFields([...fields, {
      label: `Champ ${fields.length + 1}`,
      type: 'number',
      defaultValue: 0
    }]);
  };

  // Supprimer un champ
  const removeField = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
    
    // Mettre à jour les valeurs
    const newValues = {...values};
    delete newValues[fields[index].label];
    setValues(newValues);
  };

  // Mettre à jour un champ
  const updateField = (index, field) => {
    const newFields = [...fields];
    
    // Si le label a changé, mettre à jour les valeurs
    if (newFields[index].label !== field.label) {
      const newValues = {...values};
      newValues[field.label] = newValues[newFields[index].label];
      delete newValues[newFields[index].label];
      setValues(newValues);
    }
    
    newFields[index] = field;
    setFields(newFields);
  };

  // Exporter la configuration du simulateur
  const exportConfig = () => {
    const config = {
      nom: title,
      champs: fields,
      formule: formula
    };
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `simulateur_${title.toLowerCase().replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  // Exporter les résultats en PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    
    // Titre
    doc.setFontSize(18);
    doc.text(title, 20, 20);
    
    // Paramètres
    doc.setFontSize(12);
    doc.text("Paramètres:", 20, 30);
    
    let yPos = 40;
    Object.entries(values).forEach(([key, value]) => {
      doc.text(`${key}: ${value}`, 30, yPos);
      yPos += 10;
    });
    
    // Résultat
    doc.setFontSize(14);
    doc.text("Résultat:", 20, yPos + 10);
    doc.text(`${result}`, 30, yPos + 20);
    
    // Date
    doc.setFontSize(10);
    doc.text(`Généré le ${new Date().toLocaleDateString()}`, 20, yPos + 40);
    
    doc.save(`simulation_${title.toLowerCase().replace(/\s+/g, '_')}.pdf`);
  };

  // Exporter les résultats en Excel
  const exportExcel = () => {
    const wb = XLSX.utils.book_new();
    
    // Créer les données
    const data = [
      ["Simulateur", title],
      ["Date", new Date().toLocaleDateString()],
      [""],
      ["Paramètres"]
    ];
    
    // Ajouter les paramètres
    Object.entries(values).forEach(([key, value]) => {
      data.push([key, value]);
    });
    
    // Ajouter le résultat
    data.push([""], ["Résultat", result]);
    
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Simulation");
    XLSX.writeFile(wb, `simulation_${title.toLowerCase().replace(/\s+/g, '_')}.xlsx`);
  };

  // Sauvegarder la configuration
  const saveConfig = () => {
    if (onSave) {
      onSave({
        nom: title,
        champs: fields,
        formule: formula
      });
    }
  };

  // Rendu du mode édition
  const renderEditMode = () => (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">Configuration du simulateur</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Titre du simulateur
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Formule de calcul
        </label>
        <textarea
          value={formula}
          onChange={(e) => setFormula(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          placeholder="Exemple: (Puissance * Durée).toFixed(2)"
        />
        <p className="text-xs text-gray-500 mt-1">
          Utilisez les noms des champs exactement comme dans les labels. Exemple: (Puissance * Durée).toFixed(2)
        </p>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-md font-medium">Champs du simulateur</h4>
          <button
            onClick={addField}
            className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
          >
            + Ajouter un champ
          </button>
        </div>
        
        {fields.map((field, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-md mb-3">
            <div className="flex justify-between mb-2">
              <h5 className="font-medium">Champ #{index + 1}</h5>
              <button
                onClick={() => removeField(index)}
                className="text-red-600 text-sm hover:text-red-800"
              >
                Supprimer
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Label
                </label>
                <input
                  type="text"
                  value={field.label}
                  onChange={(e) => updateField(index, {...field, label: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={field.type}
                  onChange={(e) => updateField(index, {...field, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="number">Nombre</option>
                  <option value="slider">Curseur</option>
                  <option value="select">Liste déroulante</option>
                </select>
              </div>
              
              {field.type === 'slider' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Valeur minimum
                    </label>
                    <input
                      type="number"
                      value={field.min || 0}
                      onChange={(e) => updateField(index, {...field, min: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Valeur maximum
                    </label>
                    <input
                      type="number"
                      value={field.max || 100}
                      onChange={(e) => updateField(index, {...field, max: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pas
                    </label>
                    <input
                      type="number"
                      value={field.step || 1}
                      onChange={(e) => updateField(index, {...field, step: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}
              
              {field.type === 'select' && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Options (séparées par des virgules)
                  </label>
                  <input
                    type="text"
                    value={field.options?.join(', ') || ''}
                    onChange={(e) => updateField(index, {
                      ...field, 
                      options: e.target.value.split(',').map(opt => opt.trim())
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Option 1, Option 2, Option 3"
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Valeur par défaut
                </label>
                <input
                  type="number"
                  value={field.defaultValue || 0}
                  onChange={(e) => updateField(index, {...field, defaultValue: Number(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={() => setPreviewMode(true)}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 flex items-center space-x-2"
        >
          <Eye className="h-4 w-4" />
          <span>Prévisualiser</span>
        </button>
        
        <div className="space-x-2">
          <button
            onClick={saveConfig}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>Sauvegarder</span>
          </button>
          
          <button
            onClick={exportConfig}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Exporter JSON</span>
          </button>
        </div>
      </div>
    </div>
  );

  // Rendu du simulateur
  const renderSimulator = () => (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}>
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Calculator className="h-6 w-6 text-white" />
          <h2 className="text-xl font-bold text-white">{title}</h2>
        </div>
        
        {isEditable && (
          <button
            onClick={() => setPreviewMode(false)}
            className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all"
          >
            <Settings className="h-5 w-5 text-white" />
          </button>
        )}
      </div>
      
      <div className="p-6">
        <div className="space-y-4 mb-6">
          {fields.map((field, index) => (
            <div key={index} className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {field.label}
              </label>
              
              {field.type === 'slider' ? (
                <div className="space-y-2">
                  <input
                    type="range"
                    min={field.min || 0}
                    max={field.max || 100}
                    step={field.step || 1}
                    value={values[field.label] || field.min || 0}
                    onChange={(e) => handleValueChange(field.label, Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{field.min || 0}</span>
                    <span>{values[field.label] || field.min || 0}</span>
                    <span>{field.max || 100}</span>
                  </div>
                </div>
              ) : field.type === 'select' ? (
                <select
                  value={values[field.label] || ''}
                  onChange={(e) => handleValueChange(field.label, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {field.options?.map((option, i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="number"
                  value={values[field.label] || 0}
                  onChange={(e) => handleValueChange(field.label, Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
          ))}
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="text-sm text-gray-500 mb-1">Résultat</div>
          <div className="text-2xl font-bold text-blue-600">
            {result !== null ? result : 'Entrez des valeurs pour calculer'}
          </div>
        </div>
        
        <div className="flex justify-end space-x-2">
          <button
            onClick={exportPDF}
            className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm flex items-center space-x-1"
          >
            <Download className="h-4 w-4" />
            <span>PDF</span>
          </button>
          
          <button
            onClick={exportExcel}
            className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm flex items-center space-x-1"
          >
            <Download className="h-4 w-4" />
            <span>Excel</span>
          </button>
          
          <button
            onClick={() => {}}
            className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm flex items-center space-x-1"
          >
            <Share2 className="h-4 w-4" />
            <span>Partager</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {isEditable && !previewMode && renderEditMode()}
      {(previewMode || !isEditable) && renderSimulator()}
    </div>
  );
};

export default SimulateurUniversel;