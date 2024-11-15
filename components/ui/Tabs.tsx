'use client';
import { ReactNode, useState } from 'react';

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

interface Props {
  tabs: Tab[];
  className?: string;
}

const Tabs = ({ tabs, className = '' }: Props) => {
  const [activeTabId, setActiveTabId] = useState(tabs[0].id);

  return (
    <div className={`w-full flex flex-col ${className}`}>
      <div className="border-b border-gray-200 mb-2">
        <nav className="flex -mb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`whitespace-nowrap py-2 px-6 border-b-2 font-medium text-sm ${
                activeTabId === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="flex-1">
        {tabs.map(
          (tab) =>
            activeTabId === tab.id && <div key={tab.id}>{tab.content}</div>
        )}
      </div>
    </div>
  );
};

export default Tabs;
