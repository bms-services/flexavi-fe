
import { useState } from "react";
import { Group } from "@/types/community";

// Mock groups data moved from use-community.ts
const communityGroups: Group[] = [
  {
    id: "group-1",
    name: "Algemene discussie",
    description: "Algemene discussie voor de dakdekkersgemeenschap",
    icon: "message-square",
    memberCount: 245,
    postCount: 127,
    color: "#3b82f6",
  },
  {
    id: "group-2",
    name: "Werk en personeel",
    description: "Vind personeel of nieuwe werkgelegenheden",
    icon: "users",
    memberCount: 187,
    postCount: 93,
    color: "#16a34a",
  },
  {
    id: "group-3",
    name: "Project showcases",
    description: "Deel je mooiste dakprojecten met de community",
    icon: "camera",
    memberCount: 211,
    postCount: 154,
    color: "#f59e0b",
  },
  {
    id: "group-4",
    name: "Technisch advies",
    description: "Vragen en advies over dakdektechnieken en materialen",
    icon: "file-image",
    memberCount: 173,
    postCount: 112,
    color: "#8b5cf6",
  },
  {
    id: "group-5",
    name: "Juridisch advies",
    description: "Vragen en advies over juridische zaken voor dakdekkers",
    icon: "briefcase",
    memberCount: 98,
    postCount: 64,
    color: "#ef4444",
  },
  {
    id: "group-6",
    name: "Support vragen",
    description: "Hulp bij problemen met het platform",
    icon: "headphones",
    memberCount: 142,
    postCount: 71,
    color: "#06b6d4",
  },
];

export function useCommunityGroups() {
  const [groups] = useState<Group[]>(communityGroups);
  return { groups };
}
