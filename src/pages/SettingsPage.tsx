import { useAppStore } from '../stores/appStore';
import { Moon, Sun, BookOpen, Globe, Type } from 'lucide-react';

export function SettingsPage() {
  const { preferences, setPreferences } = useAppStore();
  
  return (
    <div className="min-h-screen bg-[#FDF8F0] pt-20 pb-24">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-[#3D3229] mb-6">设置</h1>
        
        <div className="space-y-6">
          {/* 语言设置 */}
          <section className="bg-white rounded-2xl p-6 border border-[#D4C4A8]/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#8B7355]/10 rounded-lg flex items-center justify-center">
                <Globe className="text-[#8B7355]" size={20} />
              </div>
              <div>
                <h2 className="font-bold text-[#3D3229]">语言</h2>
                <p className="text-sm text-[#9A8B7A]">选择界面显示语言</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {[
                { key: 'zh', label: '中文' },
                { key: 'en', label: 'English' },
                { key: 'bilingual', label: '双语' },
              ].map((lang) => (
                <button
                  key={lang.key}
                  onClick={() => setPreferences({ language: lang.key as 'zh' | 'en' | 'bilingual' })}
                  className={`py-3 px-4 rounded-xl font-medium transition-colors ${
                    preferences.language === lang.key
                      ? 'bg-[#8B7355] text-white'
                      : 'bg-[#F5EFE6] text-[#6B5D4D] hover:bg-[#D4C4A8]'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </section>
          
          {/* 字体大小 */}
          <section className="bg-white rounded-2xl p-6 border border-[#D4C4A8]/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#8B7355]/10 rounded-lg flex items-center justify-center">
                <Type className="text-[#8B7355]" size={20} />
              </div>
              <div>
                <h2 className="font-bold text-[#3D3229]">字体大小</h2>
                <p className="text-sm text-[#9A8B7A]">调整阅读字体大小</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {[
                { key: 'small', label: '小' },
                { key: 'medium', label: '中' },
                { key: 'large', label: '大' },
              ].map((size) => (
                <button
                  key={size.key}
                  onClick={() => setPreferences({ fontSize: size.key as 'small' | 'medium' | 'large' })}
                  className={`py-3 px-4 rounded-xl font-medium transition-colors ${
                    preferences.fontSize === size.key
                      ? 'bg-[#8B7355] text-white'
                      : 'bg-[#F5EFE6] text-[#6B5D4D] hover:bg-[#D4C4A8]'
                  }`}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </section>
          
          {/* 主题设置 */}
          <section className="bg-white rounded-2xl p-6 border border-[#D4C4A8]/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#8B7355]/10 rounded-lg flex items-center justify-center">
                {preferences.theme === 'dark' ? (
                  <Moon className="text-[#8B7355]" size={20} />
                ) : (
                  <Sun className="text-[#8B7355]" size={20} />
                )}
              </div>
              <div>
                <h2 className="font-bold text-[#3D3229]">主题</h2>
                <p className="text-sm text-[#9A8B7A]">选择界面主题</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {[
                { key: 'light', label: '浅色', icon: Sun },
                { key: 'dark', label: '深色', icon: Moon },
                { key: 'sepia', label: '羊皮纸', icon: BookOpen },
              ].map((theme) => {
                const Icon = theme.icon;
                return (
                  <button
                    key={theme.key}
                    onClick={() => setPreferences({ theme: theme.key as 'light' | 'dark' | 'sepia' })}
                    className={`py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 ${
                      preferences.theme === theme.key
                        ? 'bg-[#8B7355] text-white'
                        : 'bg-[#F5EFE6] text-[#6B5D4D] hover:bg-[#D4C4A8]'
                    }`}
                  >
                    <Icon size={16} />
                    {theme.label}
                  </button>
                );
              })}
            </div>
          </section>
          
          {/* 关于 */}
          <section className="bg-white rounded-2xl p-6 border border-[#D4C4A8]/50">
            <h2 className="font-bold text-[#3D3229] mb-4">关于 Bible101</h2>
            
            <div className="space-y-2 text-sm text-[#6B5D4D]">
              <p>版本：v1.0.0</p>
              <p>圣经章节学习平台</p>
              <p className="text-[#9A8B7A]">帮助用户系统化地理解圣经，通过结构化的内容呈现提供最佳的学习体验。</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
