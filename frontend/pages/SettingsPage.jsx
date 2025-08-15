
import React from "react";

export default function SettingsPage() {
  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>

      <p className="mb-4">This is where users can adjust their preferences, notifications, or account info.</p>

      {/* Placeholder options */}
      <ul className="space-y-2">
        <li>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox" />
            <span>Enable dark mode</span>
          </label>
        </li>
        <li>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox" />
            <span>Receive alerts</span>
          </label>
        </li>
      </ul>
    </div>
  );
}
