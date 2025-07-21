import { Layout } from "@/components/layout/Layout";
import { ProjectDetailContent } from "@/components/projects/detail/ProjectDetailContent";

const ProjectDetail = () => {
  return (
    <Layout>
      <div className="px-[24px] py-6 space-y-6">
        <ProjectDetailContent />
      </div>
    </Layout>
  );
};

export default ProjectDetail;
