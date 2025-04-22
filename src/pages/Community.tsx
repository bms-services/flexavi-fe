
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { CommunityHeader } from "@/components/community/CommunityHeader";
import { CommunityFeed } from "@/components/community/CommunityFeed";
import { CommunityGroups } from "@/components/community/CommunityGroups";
import { CommunityCreatePost } from "@/components/community/CommunityCreatePost";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CommunityGroupDetail } from "@/components/community/CommunityGroupDetail";
import { Group } from "@/types/community";

export default function Community() {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [createPostOpen, setCreatePostOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <Layout>
      <div className="container mx-auto py-6 px-4 max-w-7xl">
        <CommunityHeader onCreatePost={() => setCreatePostOpen(true)} />
        
        <div className="mt-6 flex flex-col lg:flex-row gap-6">
          {isDesktop && (
            <div className="w-80 flex-shrink-0">
              <CommunityGroups 
                onSelectGroup={(group) => setSelectedGroup(group)}
                selectedGroup={selectedGroup}
              />
            </div>
          )}
          
          <div className="flex-1">
            <CommunityFeed 
              groupFilter={selectedGroup?.id} 
            />
          </div>
        </div>

        <Dialog open={createPostOpen} onOpenChange={setCreatePostOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <CommunityCreatePost 
              onPostCreated={() => setCreatePostOpen(false)}
              preselectedGroup={selectedGroup}
            />
          </DialogContent>
        </Dialog>

        {!isDesktop && selectedGroup && (
          <Dialog open={!!selectedGroup} onOpenChange={() => setSelectedGroup(null)}>
            <DialogContent className="sm:max-w-[600px]">
              <CommunityGroupDetail 
                group={selectedGroup}
                onClose={() => setSelectedGroup(null)}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </Layout>
  );
}
