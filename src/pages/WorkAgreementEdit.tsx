
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { WorkAgreementWizard } from '@/components/workagreements/wizard/WorkAgreementWizard';

const WorkAgreementEdit = () => {
  return (
    <Layout>
      <div className="container py-6">
        <WorkAgreementWizard />
      </div>
    </Layout>
  );
};

export default WorkAgreementEdit;
