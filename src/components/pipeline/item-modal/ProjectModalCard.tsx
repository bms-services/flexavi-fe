
import React from "react";
import { PipelineItem } from "@/types/pipeline";

export const ProjectModalCard: React.FC<{ item: PipelineItem }> = ({ item }) => (
  <div>
    <div className="font-semibold mb-2">Garantiecase voor: {item.name}</div>
    <div className="text-sm">Status: Actief</div>
    <div className="text-sm">Gemaakt op: {(new Date(item.createdAt)).toLocaleDateString("nl")}</div>
    {/* Breid uit met meer info */}
  </div>
);
