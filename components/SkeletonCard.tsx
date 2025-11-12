import React from 'react';

const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden my-4 w-full max-w-md mx-auto animate-pulse">
      <div className="w-full h-64 bg-slate-200 dark:bg-slate-700"></div>
      <div className="p-6">
        <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-700 rounded mb-3"></div>
        <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
        
        <div className="mb-4 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
           <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-slate-200 dark:bg-slate-600 rounded-full"></div>
              <div className="h-5 w-1/3 bg-slate-200 dark:bg-slate-600 rounded ml-3"></div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center gap-2">
                  <div className="w-6 h-6 bg-slate-200 dark:bg-slate-600 rounded-full"></div>
                  <div className="h-4 w-12 bg-slate-200 dark:bg-slate-600 rounded"></div>
              </div>
              <div className="flex flex-col items-center gap-2">
                  <div className="w-6 h-6 bg-slate-200 dark:bg-slate-600 rounded-full"></div>
                  <div className="h-4 w-12 bg-slate-200 dark:bg-slate-600 rounded"></div>
              </div>
              <div className="flex flex-col items-center gap-2">
                  <div className="w-6 h-6 bg-slate-200 dark:bg-slate-600 rounded-full"></div>
                  <div className="h-4 w-12 bg-slate-200 dark:bg-slate-600 rounded"></div>
              </div>
          </div>
        </div>

        <div className="flex items-start p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
          <div className="w-8 h-8 bg-slate-200 dark:bg-slate-600 rounded-full mr-4 flex-shrink-0 mt-1"></div>
          <div className="flex-grow">
            <div className="h-5 w-1/4 bg-slate-200 dark:bg-slate-600 rounded mb-2"></div>
            <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-600 rounded mb-1"></div>
            <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-600 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
