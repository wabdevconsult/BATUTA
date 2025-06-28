import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the exports directory exists
const exportDir = path.join(__dirname, '../exports');
if (!fs.existsSync(exportDir)) {
  fs.mkdirSync(exportDir, { recursive: true });
}

/**
 * Export data to CSV file
 * @param {string} modelName - Name of the model (used for filename)
 * @param {Array} data - Array of objects to export
 * @param {Array} headers - Array of header objects { id, title }
 * @returns {Promise<string>} - Path to the exported file
 */
export const exportToCsv = async (modelName, data, headers) => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filePath = path.join(exportDir, `${modelName}_${timestamp}.csv`);
  
  // Create CSV content
  const headerRow = headers.map(h => `"${h.title}"`).join(',');
  const rows = data.map(item => {
    return headers.map(header => {
      const value = item[header.id];
      // Handle different types of values
      if (value === null || value === undefined) return '""';
      if (typeof value === 'string') return `"${value.replace(/"/g, '""')}"`;
      if (typeof value === 'object') return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
      return `"${value}"`;
    }).join(',');
  });
  
  const csvContent = [headerRow, ...rows].join('\n');
  
  // Write to file
  fs.writeFileSync(filePath, csvContent, 'utf8');
  
  return filePath;
};

export default exportToCsv;