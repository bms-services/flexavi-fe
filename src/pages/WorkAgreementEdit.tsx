
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { useParams } from 'react-router-dom';
import { WorkAgreementForm } from '@/components/workagreements/forms/WorkAgreementForm';
import { WorkAgreementWizardSteps } from '@/components/workagreements/wizard/WorkAgreementWizardSteps';

const WorkAgreementEdit = () => {
  const { id } = useParams();
  const isEditing = !!id;

  if (!isEditing) {
    return (
      <Layout>
        <WorkAgreementWizard />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex min-h-screen bg-gray-50">
        <WorkAgreementWizardSteps currentStep={0} />
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <WorkAgreementForm workAgreementId={id} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WorkAgreementEdit;
