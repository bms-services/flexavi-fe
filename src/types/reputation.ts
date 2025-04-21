
export type ReviewPlatform = "google" | "trustpilot" | "facebook" | "internal";

export type ReviewStatus = 
  | "pending" 
  | "approved" 
  | "rejected" 
  | "published" 
  | "internal_review";

export type Review = {
  id: string;
  leadId: string;
  customerName: string;
  customerEmail: string;
  projectId?: string;
  invoiceId?: string;
  rating: number; // 1-5 stars
  text: string;
  platform: ReviewPlatform;
  status: ReviewStatus;
  responseText?: string;
  responseDate?: string;
  publicDisplay: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ReviewTemplate = {
  id: string;
  name: string;
  subject: string;
  emailBody: string;
  active: boolean;
  dayDelay: number; // Days after invoice before sending
  createdAt: string;
  updatedAt: string;
};

export type IntegrationCredentials = {
  platform: ReviewPlatform;
  apiKey?: string;
  apiSecret?: string;
  accountId?: string;
  locationId?: string; // For Google My Business
  profileUrl?: string;
  connected: boolean;
  lastSync?: string;
};

export type ReputationSettings = {
  automaticRequestEnabled: boolean;
  minRatingForPublic: number; // Minimum rating to display publicly
  requestDelay: number; // Days after invoice before sending
  handleNegativeReviewsInternally: boolean; // Whether to process negative reviews internally first
  negativeReviewThreshold: number; // Rating threshold for negative reviews (e.g., 3 stars or below)
  activeTemplateId: string | null;
  platforms: IntegrationCredentials[];
};
