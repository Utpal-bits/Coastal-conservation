import React from 'react';
import { Observation } from '../types';
import ObservationCard from './ObservationCard';
import { PlusIcon } from './icons';
import { translations } from '../translations';

interface HomePageProps {
    observations: Observation[];
    onNewObservation: () => void;
    t: (key: keyof typeof translations.en) => string;
}

const HomePage: React.FC<HomePageProps> = ({ observations, onNewObservation, t }) => {
    return (
        <div className="w-full max-w-4xl p-4 flex-grow">
            {observations.length === 0 ? (
                <div className="text-center p-8 bg-white dark:bg-slate-800 rounded-xl shadow-md">
                    <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">{t('welcomeTitle')}</h2>
                    <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-2xl mx-auto">{t('welcomeMessage')}</p>
                    <div className="grid md:grid-cols-2 gap-8 text-left mt-8">
                        <div className="bg-slate-50 dark:bg-slate-700 p-6 rounded-lg">
                           <h3 className="font-semibold text-xl mb-2 text-sky-700 dark:text-sky-400">{t('coastlineTitle')}</h3>
                           <p className="text-slate-600 dark:text-slate-300">{t('coastlinePara1')}</p>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-700 p-6 rounded-lg">
                            <h3 className="font-semibold text-xl mb-2 text-sky-700 dark:text-sky-400">{t('faunaTitle')}</h3>
                           <p className="text-slate-600 dark:text-slate-300">{t('faunaPara1')}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {observations.map((obs) => (
                        <ObservationCard key={obs.id} observation={obs} />
                    ))}
                </div>
            )}

            <button
                onClick={onNewObservation}
                className="fixed bottom-8 right-8 bg-sky-600 text-white rounded-full p-4 shadow-2xl hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-500 focus:ring-opacity-50 transform hover:scale-110 transition-all duration-200"
                aria-label={t('newObservation')}
            >
                <PlusIcon className="w-8 h-8" />
            </button>
        </div>
    );
};

export default HomePage;
