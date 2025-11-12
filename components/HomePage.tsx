import React from 'react';
import { Observation } from '../types';
import { translations } from '../translations';
import ObservationCard from './ObservationCard';
import { PlusIcon, SpinnerIcon } from './icons';

interface HomePageProps {
    observations: Observation[];
    isProcessing: boolean;
    onStartObservation: () => void;
    t: (key: keyof typeof translations.en) => string;
}

const HomePage: React.FC<HomePageProps> = ({ observations, isProcessing, onStartObservation, t }) => {

    const renderContent = () => {
        if (isProcessing) {
          return (
            <div className="flex flex-col items-center justify-center text-center p-8 text-slate-600 dark:text-slate-300">
                <SpinnerIcon className="w-12 h-12 mb-4" />
                <p className="text-lg">{t('processingObservation')}</p>
            </div>
          );
        }
    
        if (observations.length === 0) {
          return (
            <div className="text-center p-4 md:p-8 bg-white dark:bg-slate-800 rounded-lg shadow-md mb-6">
                <img src="https://picsum.photos/id/106/600/300" alt="Coastal scene" className="rounded-lg shadow-md mb-6 w-full object-cover" />
                <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">{t('welcomeTitle')}</h2>
                <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">{t('welcomeMessage')}</p>
                
                <div className="mt-8 text-left space-y-4">
                    <h3 className="text-2xl font-semibold text-sky-700 dark:text-sky-400">{t('coastlineTitle')}</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{t('coastlinePara1')}</p>
                    <h3 className="text-2xl font-semibold text-sky-700 dark:text-sky-400">{t('faunaTitle')}</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{t('faunaPara1')}</p>
                </div>
            </div>
          );
        }
    
        return (
          <div className="w-full">
            {observations.map(obs => (
              <ObservationCard key={obs.id} observation={obs} />
            ))}
          </div>
        );
      };

    return (
        <>
            <main className="w-full max-w-2xl p-4 flex-grow flex flex-col items-center">
                {renderContent()}
            </main>
      
            <div className="sticky bottom-0 w-full flex justify-center p-4 bg-gradient-to-t from-slate-50 dark:from-slate-900 to-transparent">
                <button
                    onClick={onStartObservation}
                    className="flex items-center gap-2 bg-sky-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-sky-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-sky-300 dark:focus:ring-sky-800"
                >
                    <PlusIcon className="w-6 h-6" />
                    {t('newObservation')}
                </button>
            </div>
        </>
    );
};

export default HomePage;
