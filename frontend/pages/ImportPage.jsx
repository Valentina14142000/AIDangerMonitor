import Papa from 'papaparse';
import { importRiskAreas } from '../services/api';

export default function ImportPage() {
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: async (results) => {
        await importRiskAreas(results.data);
        alert('Import Successful!');
      }
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Import Risk Areas</h1>
      <input type="file" accept=".csv" onChange={handleFileChange} />
    </div>
  );
}
