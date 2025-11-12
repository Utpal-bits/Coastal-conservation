import React from 'react';
import { Language, translations } from '../translations';

interface HeaderProps {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: keyof typeof translations.en) => string;
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage, t }) => {
  return (
    <header className="w-full bg-white dark:bg-slate-800 shadow-md sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-sky-600 dark:text-sky-400 tracking-tight">
          {t('appTitle')}
        </h1>
        <div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            aria-label="Select language"
          >
            <option value="en">English</option>
            <option value="or">ଓଡ଼ିଆ</option>
            <option value="bn">বাংলা</option>
            <option value="te">తెలుగు</option>
          </select>
        </div>
      </div>
    </header>
  );
};

export default Header;
