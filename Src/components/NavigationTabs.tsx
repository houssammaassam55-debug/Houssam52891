import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Settings, BookOpen, Compass } from 'lucide-react';
import { Card } from "@/components/ui/card";

export const NavigationTabs: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { id: 'home', label: 'الرئيسية', icon: BookOpen, path: '/' },
    { id: 'adhkar', label: 'الأذكار', icon: BookOpen, path: '/adhkar' },
    { id: 'quran-web', label: 'Quran', icon: BookOpen, path: '/quran-web' },
    { id: 'compass', label: 'القبلة', icon: Compass, path: '/compass' },
    { id: 'settings', label: 'الإعدادات', icon: Settings, path: '/settings' }
  ];

  const handleTabClick = (path: string) => {
    navigate(path);
  };

  return (
    <Card className="fixed bottom-4 left-4 right-4 z-50">
      <div className="flex justify-around items-center p-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.path;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.path)}
              style={{
                borderRadius:12,
                padding:12,
                border:'1px solid #eee',
                background: isActive ? '#16a34a' : '#fff',
                color: isActive ? '#fff' : '#111',
                minWidth:72
              }}
              type="button"
            >
              <Icon className="w-5 h-5 mb-1" />
              <div style={{fontSize:12}}>{tab.label}</div>
            </button>
          );
        })}
      </div>
    </Card>
  );
};

export default NavigationTabs;
