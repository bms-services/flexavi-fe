
export type Integration = {
  id: string;
  name: string;
  platformType: "trustoo" | "generic_webhook" | "custom_api";
  webhookUrl?: string;
  apiKey?: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
};
