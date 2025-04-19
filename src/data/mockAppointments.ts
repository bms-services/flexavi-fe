import { Appointment, AppointmentStatus, TeamType } from "@/types";
import { mockLeads } from "./mockLeads";

// Helper function to create appointment status
const getRandomStatus = (): AppointmentStatus => {
  const statuses: AppointmentStatus[] = [
    "scheduled", "completed", "quote_request", "warranty", 
    "new_assignment", "extra_assignment"
  ];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

// Helper function to create team type
const getRandomTeamType = (): TeamType => {
  const types: TeamType[] = ["sales", "installation"];
  return types[Math.floor(Math.random() * types.length)];
};

const generateAppointments = () => {
  const appointments: Appointment[] = [];
  const today = new Date();
  
  // Create 30 appointments spanning across 14 days
  for (let i = 0; i < 40; i++) {
    // Randomly distribute appointments across 14 days
    const dayOffset = Math.floor(Math.random() * 14);
    const appointmentDate = new Date(today);
    appointmentDate.setDate(today.getDate() + dayOffset);
    
    const date = appointmentDate.toISOString().split('T')[0];
    
    // Generate random time slots
    const hours = [9, 10, 11, 13, 14, 15, 16, 17];
    const startHour = hours[Math.floor(Math.random() * hours.length)];
    const startTime = `${startHour}:00`;
    const endTime = `${startHour + 1}:30`;
    
    // Assign to random team (or leave unassigned)
    const teamAssignment = Math.random();
    let teamId = "";
    if (teamAssignment > 0.3) {
      // 70% chance of being assigned to a team
      teamId = Math.random() > 0.5 ? "1" : "2";  // 50% team 1, 50% team 2
      if (i % 3 === 0) {
        teamId = Math.random() > 0.5 ? "3" : "4"; // Some to installation teams
      }
    }
    
    // Random lead
    const leadId = mockLeads[Math.floor(Math.random() * mockLeads.length)].id;
    const leadInfo = mockLeads.find(lead => lead.id === leadId);
    
    const teamType = getRandomTeamType();
    const status = getRandomStatus();
    
    const appointment: Appointment = {
      id: `app-${i + 1}`,
      leadId,
      title: teamType === "sales" ? "Verkoopgesprek" : "Dak installatie",
      description: status === "warranty" 
        ? "Garantie inspectie na eerdere installatie" 
        : "Bespreking van mogelijkheden en prijsopgave",
      date,
      startTime,
      endTime,
      status,
      teamId,
      teamType,
      location: leadInfo?.address || "Onbekend adres",
      createdAt: new Date(today.getTime() - 1000 * 60 * 60 * 24 * 10).toISOString(),
      updatedAt: new Date(today.getTime() - 1000 * 60 * 60 * 24 * 5).toISOString()
    };
    
    appointments.push(appointment);
  }
  
  // Add specific appointments for today and tomorrow to ensure some data is visible
  const todayString = today.toISOString().split('T')[0];
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowString = tomorrow.toISOString().split('T')[0];
  
  // Unassigned appointments for today
  for (let i = 0; i < 5; i++) {
    appointments.push({
      id: `today-unassigned-${i}`,
      leadId: mockLeads[i % mockLeads.length].id,
      title: "Nieuwe offerte aanvraag",
      description: "Klant heeft interesse in zonnepanelen installatie op hun dak",
      date: todayString,
      startTime: `${10 + i}:00`,
      endTime: `${11 + i}:00`,
      status: "quote_request",
      teamId: "",
      teamType: "sales",
      location: mockLeads[i % mockLeads.length].address,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  }
  
  // Assigned appointments for tomorrow
  for (let i = 0; i < 3; i++) {
    appointments.push({
      id: `tomorrow-assigned-${i}`,
      leadId: mockLeads[(i + 3) % mockLeads.length].id,
      title: "Geplande installatie",
      description: "Installatie van dakisolatie en nieuwe dakbedekking",
      date: tomorrowString,
      startTime: `${9 + i * 2}:00`,
      endTime: `${11 + i * 2}:00`,
      status: "scheduled",
      teamId: `${i + 1}`,
      teamType: "installation",
      location: mockLeads[(i + 3) % mockLeads.length].address,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  }
  
  return appointments;
};

export const mockAppointments: Appointment[] = generateAppointments();

export const getUpcomingAppointments = () => {
  const today = new Date();
  const next7Days = new Date();
  next7Days.setDate(today.getDate() + 7);
  
  return mockAppointments
    .filter(appointment => {
      const appDate = new Date(appointment.date);
      return appDate >= today && appDate <= next7Days;
    })
    .slice(0, 5);
};
