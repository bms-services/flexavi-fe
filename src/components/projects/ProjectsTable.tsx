
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { formatCurrency } from "@/utils/format";
import { Project } from "@/types/project";
import { ProjectStatusBadge } from "./ProjectStatusBadge";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

interface ProjectsTableProps {
  projects: Project[];
}

export const ProjectsTable: React.FC<ProjectsTableProps> = ({ projects }) => {
  const navigate = useNavigate();

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Naam</TableHead>
            <TableHead>Locatie</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Startdatum</TableHead>
            <TableHead>Budget</TableHead>
            <TableHead className="text-right">Winst</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow 
              key={project.id}
              className="cursor-pointer"
              onClick={() => navigate(`/projects/${project.id}`)}
            >
              <TableCell className="font-medium">{project.name}</TableCell>
              <TableCell>{project.location}</TableCell>
              <TableCell>
                <ProjectStatusBadge status={project.status} />
              </TableCell>
              <TableCell>
                {format(new Date(project.startDate), "d MMM yyyy", { locale: nl })}
              </TableCell>
              <TableCell>{formatCurrency(project.budget)}</TableCell>
              <TableCell className="text-right">
                <span className={project.profit >= 0 ? "text-green-500" : "text-red-500"}>
                  {formatCurrency(project.profit)}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
