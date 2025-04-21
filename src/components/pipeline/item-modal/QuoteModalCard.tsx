
import React from "react";
import { PipelineItem } from "@/types/pipeline";

// Demo data for quote
export const QuoteModalCard: React.FC<{ item: PipelineItem }> = ({ item }) => (
  <div>
    <div className="font-semibold mb-2">Offerte voor: {item.name}</div>
    <div className="text-sm">Status: Verzonden</div>
    <div className="text-sm">Gemaakt op: {(new Date(item.createdAt)).toLocaleDateString("nl")}</div>
    {/* Voel je vrij om meer quote details toe te voegen */}
  </div>
);
