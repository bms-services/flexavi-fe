
import { Review, ReviewTemplate, ReputationSettings, ReviewPlatform, ReviewStatus } from "@/types/reputation";

export const mockReviews: Review[] = [
  {
    id: "rev-001",
    leadId: "lead-001",
    customerName: "Jan Jansen",
    customerEmail: "jan@example.com",
    rating: 5,
    text: "Fantastisch werk geleverd bij het vervangen van ons dak. De medewerkers waren professioneel en hebben alles netjes opgeruimd. Echt een aanrader!",
    platform: "google",
    status: "published",
    publicDisplay: true,
    createdAt: "2023-08-15T14:30:00Z",
    updatedAt: "2023-08-15T14:30:00Z"
  },
  {
    id: "rev-002",
    leadId: "lead-002",
    customerName: "Petra de Vries",
    customerEmail: "petra@example.com",
    rating: 4,
    text: "Goed werk, planning liep wat uit maar het eindresultaat is prima. De dakkapel ziet er mooi uit en we zijn erg tevreden met de afwerking.",
    platform: "trustpilot",
    status: "published",
    publicDisplay: true,
    createdAt: "2023-09-02T10:15:00Z",
    updatedAt: "2023-09-02T10:15:00Z"
  },
  {
    id: "rev-003",
    leadId: "lead-003",
    customerName: "Sjoerd Bakker",
    customerEmail: "sjoerd@example.com",
    rating: 5,
    text: "Zeer tevreden over de isolatie van ons dak. Merkbaar verschil in de warmte in huis en de energierekening. Het team werkte snel en efficiënt.",
    platform: "internal",
    status: "approved",
    publicDisplay: true,
    createdAt: "2023-10-10T09:45:00Z",
    updatedAt: "2023-10-10T09:45:00Z"
  },
  {
    id: "rev-004",
    leadId: "lead-004",
    customerName: "Marieke van Dijk",
    customerEmail: "marieke@example.com",
    rating: 2,
    text: "De werkzaamheden duurden langer dan gepland en er was miscommunicatie over de materialen. Uiteindelijk wel opgelost maar het proces verliep stroef.",
    platform: "trustpilot",
    status: "internal_review",
    publicDisplay: false,
    createdAt: "2023-11-05T16:20:00Z",
    updatedAt: "2023-11-05T16:20:00Z"
  }
];

export const mockReviewTemplates: ReviewTemplate[] = [
  {
    id: "template-001",
    name: "Standaard review verzoek",
    subject: "Hoe was uw ervaring met [Bedrijfsnaam]?",
    emailBody: "Beste [Naam],\n\nBedankt voor het kiezen van [Bedrijfsnaam] voor uw recente project. We hopen dat u tevreden bent met het resultaat.\n\nWe zouden het zeer waarderen als u een moment neemt om uw ervaring met ons te delen. Uw feedback helpt ons onze service te verbeteren en helpt ook anderen bij het maken van een keuze.\n\nU kunt een review achterlaten via de volgende link: [ReviewLink]\n\nBedankt voor uw tijd en moeite!\n\nMet vriendelijke groet,\nHet team van [Bedrijfsnaam]",
    active: true,
    dayDelay: 3,
    createdAt: "2023-05-10T08:00:00Z",
    updatedAt: "2023-05-10T08:00:00Z"
  },
  {
    id: "template-002",
    name: "Follow-up na 7 dagen",
    subject: "Nog even over uw ervaring met [Bedrijfsnaam]",
    emailBody: "Beste [Naam],\n\nEen week geleden hebben we u gevraagd om uw feedback over [Bedrijfsnaam]. We begrijpen dat u het druk heeft, maar uw mening is erg belangrijk voor ons.\n\nAls u een moment heeft, zouden we het zeer op prijs stellen als u een korte review achterlaat via deze link: [ReviewLink]\n\nBedankt voor uw tijd!\n\nMet vriendelijke groet,\nHet team van [Bedrijfsnaam]",
    active: true,
    dayDelay: 7,
    createdAt: "2023-05-15T09:30:00Z",
    updatedAt: "2023-05-15T09:30:00Z"
  }
];

export const mockReputationSettings: ReputationSettings = {
  automaticRequestEnabled: true,
  minRatingForPublic: 3,
  requestDelay: 3,
  handleNegativeReviewsInternally: true,
  negativeReviewThreshold: 3,
  activeTemplateId: "template-001",
  platforms: [
    {
      platform: "google",
      apiKey: "google-api-key-123",
      locationId: "location-123",
      profileUrl: "https://g.page/example",
      connected: true,
      lastSync: "2023-12-01T12:00:00Z"
    },
    {
      platform: "trustpilot",
      apiKey: "trustpilot-api-key-456",
      apiSecret: "trustpilot-api-secret-456",
      accountId: "account-456",
      profileUrl: "https://www.trustpilot.com/review/example.com",
      connected: true,
      lastSync: "2023-12-01T12:00:00Z"
    },
    {
      platform: "facebook",
      connected: false
    },
    {
      platform: "internal",
      connected: true,
      lastSync: "2023-12-01T12:00:00Z"
    }
  ]
};
