import React from 'react';
import CustomerHeading from '../../components/history/historyhedings';

export default function Customer() {
  return (
    <div>
      <CustomerHeading title="History" subtitle="View all your client activity and service history in one place." />
      <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow-1 p-10 text-center text-text-light dark:text-text-dark mt-6 border border-border-light dark:border-border-dark">
        No History
      </div>
    </div>
  );
}
