import React, { useState, useEffect } from 'react';
import { LiquidGlassCard } from './LiquidGlassCard';
import { LanguageTabs } from './LanguageTabs';
import { PrayerModal } from './PrayerModal';
import { detectPrayerTheme, generatePrayer } from './prayerThemeDetector';
import type { PrayerTheme } from './prayerTemplates';

export const PrayerModule: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState<'zh' | 'en'>('zh');
  const [generatedPrayer, setGeneratedPrayer] = useState<{ zh: string; en: string } | null>(null);

  // Detect system language on mount
  useEffect(() => {
    const systemLang = navigator.language.toLowerCase();
    if (systemLang.startsWith('en')) {
      setActiveLanguage('en');
    } else {
      setActiveLanguage('zh');
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    // Detect theme and generate prayer
    const theme = detectPrayerTheme(userInput);
    const zhPrayer = generatePrayer(theme, userInput, 'zh');
    const enPrayer = generatePrayer(theme, userInput, 'en');

    setGeneratedPrayer({ zh: zhPrayer, en: enPrayer });
    setIsModalOpen(true);
  };

  return (
    <>
      <LiquidGlassCard className="prayer-module">
        <h2 className="prayer-module-title">今日祷告</h2>
        <form onSubmit={handleSubmit} className="prayer-module-form">
          <textarea
            className="prayer-module-input"
            placeholder="请输入您想祷告的事项..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            rows={4}
          />
          <button type="submit" className="prayer-module-button">
            生成祷告
          </button>
        </form>
      </LiquidGlassCard>

      <PrayerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div data-testid="prayer-modal">
          {generatedPrayer && (
            <LanguageTabs activeTab={activeLanguage} onChange={setActiveLanguage}>
              <div className="prayer-content">
                <pre className="prayer-text">{generatedPrayer[activeLanguage]}</pre>
              </div>
            </LanguageTabs>
          )}
        </div>
      </PrayerModal>
    </>
  );
};
