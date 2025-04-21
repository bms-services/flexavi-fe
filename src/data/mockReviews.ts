
import { Review, ReviewTemplate, ReputationSettings } from "@/types/reputation";
import { mockLeads } from "./mockLeads";
import { mockProjects } from "./mockProjects";
import { mockInvoices } from "./mockInvoices";

// Generate random dates in the past 3 months
const getRandomDate = () => {
  const now = new Date();
  const threeMonthsAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
  const randomTime = threeMonthsAgo.getTime() + Math.random() * (now.getTime() - threeMonthsAgo.getTime());
  return new Date(randomTime).toISOString();
};

// Generate mock reviews
export const mockReviews: Review[] = [
  // Positive reviews
  {
    id: "rev-001",
    leadId: mockLeads[0].id,
    customerName: `${mockLeads[0].firstName} ${mockLeads[0].lastName}`,
    customerEmail: mockLeads[0].email,
    projectId: mockProjects[0].id,
    invoiceId: mockInvoices[0].id,
    rating: 5,
    text: "Fantastisch werk geleverd bij het vervangen van ons dak. De medewerkers waren professioneel en hebben alles netjes opgeruimd. Echt een aanrader!",
    platform: "google",
    status: "published",
    publicDisplay: true,
    createdAt: getRandomDate(),
    updatedAt: getRandomDate()
  },
  {
    id: "rev-002",
    leadId: mockLeads[1].id,
    customerName: `${mockLeads[1].firstName} ${mockLeads[1].lastName}`,
    customerEmail: mockLeads[1].email,
    projectId: mockProjects[1].id,
    invoiceId: mockInvoices[1].id,
    rating: 4,
    text: "Goed werk, planning liep wat uit maar het eindresultaat is prima. De dakkapel ziet er mooi uit en we zijn erg tevreden met de afwerking.",
    platform: "trustpilot",
    status: "published",
    publicDisplay: true,
    createdAt: getRandomDate(),
    updatedAt: getRandomDate()
  },
  {
    id: "rev-003",
    leadId: mockLeads[2].id,
    customerName: `${mockLeads[2].firstName} ${mockLeads[2].lastName}`,
    customerEmail: mockLeads[2].email,
    projectId: mockProjects[2].id,
    invoiceId: mockInvoices[2].id,
    rating: 5,
    text: "Zeer tevreden over de isolatie van ons dak. Merkbaar verschil in de warmte in huis en de energierekening. Het team werkte snel en efficiënt.",
    platform: "internal",
    status: "approved",
    publicDisplay: true,
    createdAt: getRandomDate(),
    updatedAt: getRandomDate()
  },
  // Negative review in internal review
  {
    id: "rev-004",
    leadId: mockLeads[3].id,
    customerName: `${mockLeads[3].firstName} ${mockLeads[3].lastName}`,
    customerEmail: mockLeads[3].email,
    projectId: mockProjects[3].id,
    invoiceId: mockInvoices[3].id,
    rating: 2,
    text: "De werkzaamheden duurden langer dan gepland en er was miscommunicatie over de materialen. Uiteindelijk wel opgelost maar het proces verliep stroef.",
    platform: "trustpilot",
    status: "internal_review",
    responseText: "Beste klant, hartelijk dank voor uw feedback. We nemen contact met u op om de situatie te bespreken en te kijken hoe we dit kunnen oplossen.",
    responseDate: getRandomDate(),
    publicDisplay: false,
    createdAt: getRandomDate(),
    updatedAt: getRandomDate()
  },
  // Pending review
  {
    id: "rev-005",
    leadId: mockLeads[4].id,
    customerName: `${mockLeads[4].firstName} ${mockLeads[4].lastName}`,
    customerEmail: mockLeads[4].email,
    invoiceId: mockInvoices[4].id,
    rating: 0, // Not rated yet
    text: "",
    platform: "internal",
    status: "pending", // Email sent, waiting for review
    publicDisplay: false,
    createdAt: getRandomDate(),
    updatedAt: getRandomDate()
  },
  // More positive reviews for demonstration
  {
    id: "rev-006",
    leadId: mockLeads[5].id,
    customerName: `${mockLeads[5].firstName} ${mockLeads[5].lastName}`,
    customerEmail: mockLeads[5].email,
    projectId: mockProjects[4].id,
    invoiceId: mockInvoices[5].id,
    rating: 5,
    text: "Uitstekende service! Van offerte tot oplevering alles perfect verlopen. De nieuwe dakgoten zien er prachtig uit.",
    platform: "google",
    status: "published",
    publicDisplay: true,
    createdAt: getRandomDate(),
    updatedAt: getRandomDate()
  },
  {
    id: "rev-007",
    leadId: mockLeads[6].id,
    customerName: `${mockLeads[6].firstName} ${mockLeads[6].lastName}`,
    customerEmail: mockLeads[6].email,
    projectId: mockProjects[5].id,
    invoiceId: mockInvoices[6].id,
    rating: 4,
    text: "Vakkundig team dat snel en efficiënt heeft gewerkt. Goede communicatie en netjes opgeruimd na afloop.",
    platform: "facebook",
    status: "published",
    publicDisplay: true,
    createdAt: getRandomDate(),
    updatedAt: getRandomDate()
  },
  {
    id: "rev-008",
    leadId: mockLeads[7].id,
    customerName: `${mockLeads[7].firstName} ${mockLeads[7].lastName}`,
    customerEmail: mockLeads[7].email,
    invoiceId: mockInvoices[7].id,
    rating: 3,
    text: "Redelijk tevreden over het resultaat. Er waren wat vertragingen, maar het einderesultaat is naar wens.",
    platform: "internal",
    status: "approved",
    publicDisplay: true,
    createdAt: getRandomDate(),
    updatedAt: getRandomDate()
  }
];

// Email templates for review requests
export const mockReviewTemplates: ReviewTemplate[] = [
  {
    id: "template-001",
    name: "Standaard review verzoek",
    subject: "Hoe was uw ervaring met [Bedrijfsnaam]?",
    emailBody: `Beste [Naam],

Hartelijk dank voor het vertrouwen in ons bedrijf. We hopen dat u tevreden bent met het resultaat van de werkzaamheden.

Zou u een moment willen nemen om uw ervaring met ons te delen? Uw feedback helpt ons om onze service te verbeteren en helpt andere klanten bij het maken van hun keuze.

U kunt een review achterlaten door op onderstaande link te klikken:
[ReviewLink]

Alvast bedankt voor uw tijd!

Met vriendelijke groet,
[Bedrijfsnaam]`,
    active: true,
    dayDelay: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "template-002",
    name: "Follow-up review verzoek",
    subject: "Nog een herinnering: deel uw ervaring met [Bedrijfsnaam]",
    emailBody: `Beste [Naam],

Een tijdje geleden hebben we werkzaamheden bij u uitgevoerd en we zijn benieuwd naar uw ervaring.

We hebben u eerder een verzoek gestuurd om een review te plaatsen, maar mogelijk is dit aan uw aandacht ontsnapt. Uw mening is belangrijk voor ons!

U kunt een review achterlaten door op onderstaande link te klikken:
[ReviewLink]

Hartelijk dank voor uw tijd.

Met vriendelijke groet,
[Bedrijfsnaam]`,
    active: false,
    dayDelay: 7,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Default reputation management settings
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
      apiKey: "example_google_api_key",
      locationId: "example_location_id",
      profileUrl: "https://g.page/r/your-business",
      connected: true,
      lastSync: new Date().toISOString()
    },
    {
      platform: "trustpilot",
      apiKey: "example_trustpilot_api_key",
      apiSecret: "example_trustpilot_api_secret",
      accountId: "example_business_unit_id",
      profileUrl: "https://www.trustpilot.com/review/your-business",
      connected: true,
      lastSync: new Date().toISOString()
    },
    {
      platform: "facebook",
      profileUrl: "https://www.facebook.com/your-business",
      connected: false
    },
    {
      platform: "internal",
      connected: true
    }
  ]
};
