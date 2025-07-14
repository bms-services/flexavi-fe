
import React from "react";
import { useNavigate } from "react-router-dom";
import { Project } from "@/types/project";
// import { ProjectStatusBadge } from "./ProjectStatusBadge";
import { formatCurrency } from "@/utils/format";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin, Calendar, CircleDollarSign, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectsCardViewProps {
  projects: Project[];
}

export const ProjectsCardView: React.FC<ProjectsCardViewProps> = ({ projects }) => {
  const navigate = useNavigate();

  if (projects.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Geen projecten gevonden</h3>
        <p className="text-gray-500">Er zijn geen projecten die aan de filters voldoen.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project) => (
        <Card
          key={project.id}
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => navigate(`/projects/${project.id}`)}
        >
          <CardContent className="pt-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-medium text-lg line-clamp-2">{project.name}</h3>
              {/* <ProjectStatusBadge status={project.status} /> */}
            </div>

            <p className="text-gray-500 mb-4 line-clamp-2">{project.description}</p>

            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                {project.location}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                {format(new Date(project.startDate), "d MMMM yyyy", { locale: nl })}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CircleDollarSign className="h-4 w-4 mr-2 text-gray-400" />
                {formatCurrency(project.budget)}
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4 flex justify-between">
            <div>
              <span className="text-sm font-medium">Winst: </span>
              <span className={project.profit >= 0 ? "text-green-500" : "text-red-500"}>
                {formatCurrency(project.profit)}
              </span>
            </div>
            <Button size="sm" variant="ghost">
              Details <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
