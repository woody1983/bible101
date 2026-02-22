import React from 'react';

interface LanguageTabsProps {
  activeTab: 'zh' | 'en';
  onChange: (lang: 'zh' | 'en') => void;
  children: React.ReactNode;
}

export const LanguageTabs: React.FC<LanguageTabsProps> = ({
  activeTab,
  onChange,
  children,
}) => {
  return (
    <div className="language-tabs">
      <div className="language-tabs-header">
        <button
          className={`language-tab ${activeTab === 'zh' ? 'active' : ''}`}
          onClick={() => onChange('zh')}
        >
          中文
        </button>
        <button
          className={`language-tab ${activeTab === 'en' ? 'active' : ''}`}
          onClick={() => onChange('en')}
        >
          English
        </button>
      </div>
      <div className="language-tabs-content">{children}</div>
    </div>
  );
};
