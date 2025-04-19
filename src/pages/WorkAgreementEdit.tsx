
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { WorkAgreementWizard } from '@/components/workagreements/wizard/WorkAgreementWizard';
import { useParams } from 'react-router-dom';
import { WorkAgreementForm } from '@/components/workagreements/forms/WorkAgreementForm';

const WorkAgreementEdit = () => {
  const { id } = useParams();
  const isEditing = !!id;

  return (
    <Layout>
      {isEditing ? (
        <WorkAgreementForm workAgreementId={id} />
      ) : (
        <WorkAgreementWizard />
      )}
    </Layout>
  );
};

export default WorkAgreementEdit;
