import React from 'react';
import PageHeader from '../common/ui/PageHeader'; 
export default function Customerheading({ title = "Customers", subtitle = "Manage your client relationships and information" }) {
  return (
    <PageHeader
      title={title}
      subtitle={subtitle}
    />
  );
}
