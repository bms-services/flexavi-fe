
import React, { useState } from "react";
import { format, parseISO, addDays, startOfWeek, parse, addWeeks } from "date-fns";
import { Users, Building2, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TeamSection } from "./components/TeamSection";
import { InstallationTeamSection } from "./components/InstallationTeamSection";
import { TeamAvailabilityOverviewProps } from "./types";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { TeamDetails } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { nl } from "date-fns/locale";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/utils/format";
import { CalendarIcon } from "lucide-react";

export const TeamAvailabilityOverview = ({
  startDate,
  appointments,
  teams,
  environments,
  scheduleSettings,
  unavailableDates,
  onTeamUpdate,
  onUnavailableDateAdd,
  onUnavailableDateRemove,
  onDateClick,
}: TeamAvailabilityOverviewProps) => {
  const [searchLocation, setSearchLocation] = useState("");
  const [dateOffset, setDateOffset] = useState(0);
  const [editingTeam, setEditingTeam] = useState<TeamDetails | null>(null);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    startDate ? new Date(startDate) : new Date()
  );
  const isMobile = useIsMobile();
  const daysToShow = 7;

  const dates = Array.from({ length: daysToShow }, (_, i) => {
    const baseDate = startOfWeek(parseISO(startDate), { weekStartsOn: 1 });
    const offsetDate = addDays(baseDate, i + (dateOffset * 7));
    return format(offsetDate, 'yyyy-MM-dd');
  });

  const salesTeams = teams.filter(team => team.type === "sales");
  const installationTeams = teams.filter(team => team.type === "installation");

  const handlePreviousDays = () => {
    setDateOffset(dateOffset - 1);
  };

  const handleNextDays = () => {
    setDateOffset(dateOffset + 1);
  };

  const handleSliderChange = (value: number[]) => {
    setDateOffset(value[0]);
  };

  const handleTeamNameEdit = (team: TeamDetails) => {
    setEditingTeam(team);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      // Calculate new date offset based on selected date
      const selectedWeekStart = startOfWeek(date, { weekStartsOn: 1 });
      const currentWeekStart = startOfWeek(parseISO(startDate), { weekStartsOn: 1 });
      const weekDiff = Math.round(
        (selectedWeekStart.getTime() - currentWeekStart.getTime()) /
        (7 * 24 * 60 * 60 * 1000)
      );
      setDateOffset(weekDiff);
      setDatePickerOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Zoek op plaatsnaam..."
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex flex-col gap-2 sm:items-end">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePreviousDays}
              disabled={dateOffset === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="min-w-[180px] justify-start">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  <span className="text-sm">
                    {format(parseISO(dates[0]), 'dd MMM')} - {format(parseISO(dates[dates.length - 1]), 'dd MMM yyyy')}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  initialFocus
                  locale={nl}
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>

            <Button
              variant="outline"
              size="icon"
              onClick={handleNextDays}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="w-full sm:w-64">
            <Slider
              defaultValue={[0]}
              value={[dateOffset]}
              max={12}
              step={1}
              onValueChange={handleSliderChange}
              className="py-2"
            />
          </div>
        </div>
      </div>

      <div className="overflow-auto pb-4">
        <div className="min-w-[700px]">
          <TeamSection
            title="Verkoopteams"
            icon={<Users className="h-5 w-5 text-primary" />}
            teams={salesTeams}
            dates={dates}
            appointments={appointments}
            scheduleSettings={scheduleSettings}
            searchLocation={searchLocation}
            unavailableDates={unavailableDates}
            onTeamNameEdit={handleTeamNameEdit}
            onDateClick={onDateClick}
            isMobile={isMobile}
          />
        </div>

        <div className="min-w-[700px] mt-6">
          <InstallationTeamSection
            title="Uitvoerende Teams"
            icon={<Building2 className="h-5 w-5 text-primary" />}
            teams={installationTeams}
            dates={dates}
            appointments={appointments}
            searchLocation={searchLocation}
            unavailableDates={unavailableDates}
            onTeamNameEdit={handleTeamNameEdit}
            onDateClick={onDateClick}
            isMobile={isMobile}
          />
        </div>
      </div>
    </div>
  );
};
