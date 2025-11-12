import React, { useState } from 'react';
import { translations } from '../translations';

interface ObservationDetailsProps {
    imageData: string;
    onSave: (details: { name?: string }) => void;
    onCancel: () => void;
    t: (key: keyof typeof translations.en) => string;
}

const ObservationDetails: React.FC<ObservationDetailsProps> = ({ imageData, onSave, onCancel, t }) => {
    const [name, setName] = useState('');

    const handleSave = () => {
        onSave({ name: name.trim() || undefined });
    };

    return (
        <div className="w-full max-w-2xl p-4 flex-grow flex flex-col items-center">
            <div className="w-full bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">{t('newObservation')}</h2>
                <img src={imageData} alt="Captured observation" className="rounded-lg w-full h-64 object-cover mb-4" />
                
                <div className="mb-4">
                    <label htmlFor="observation-name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        {t('observationNameLabel')}
                    </label>
                    <input
                        type="text"
                        id="observation-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t('observationNamePlaceholder')}
                        className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-50 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                </div>

                <div className="flex justify-end gap-4">
                    <button 
                        onClick={onCancel}
                        className="bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-200 font-bold py-2 px-4 rounded-full hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors"
                    >
                        {t('cancel')}
                    </button>
                    <button 
                        onClick={handleSave}
                        className="bg-sky-600 text-white font-bold py-2 px-4 rounded-full hover:bg-sky-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                    >
                        {t('saveObservation')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ObservationDetails;
