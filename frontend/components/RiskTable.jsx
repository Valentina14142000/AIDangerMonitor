export default function RiskTable({ areas, onDelete }) {
    return (
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Area Name</th>
              <th className="border p-2">Latitude</th>
              <th className="border p-2">Longitude</th>
              <th className="border p-2">Risk Level</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {areas.map((area) => (
              <tr key={area.id}>
                <td className="border p-2">{area.area_name}</td>
                <td className="border p-2">{area.latitude}</td>
                <td className="border p-2">{area.longitude}</td>
                <td className="border p-2">{area.risk_level}</td>
                <td className="border p-2">
                  <button
                    onClick={() => onDelete(area.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  