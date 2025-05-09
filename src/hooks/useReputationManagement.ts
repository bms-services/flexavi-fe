
import { useState, useEffect } from "react";
import { 
  Review, 
  ReviewTemplate, 
  ReputationSettings, 
  ReviewStatus,
  ReviewPlatform,
  IntegrationCredentials
} from "@/types/reputation";
import { mockReviews, mockReviewTemplates, mockReputationSettings } from "@/data/mockReviews";

import { v4 as uuidv4 } from "uuid";

export const useReputationManagement = () => {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [templates, setTemplates] = useState<ReviewTemplate[]>(mockReviewTemplates);
  const [settings, setSettings] = useState<ReputationSettings>(mockReputationSettings);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>(mockReviews);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<ReviewStatus | "all">("all");
  const [platformFilter, setPlatformFilter] = useState<ReviewPlatform | "all">("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  

  // Filter reviews based on status, platform, and search term
  useEffect(() => {
    let filtered = [...reviews];
    
    // Filter by status
    if (activeFilter !== "all") {
      filtered = filtered.filter(review => review.status === activeFilter);
    }
    
    // Filter by platform
    if (platformFilter !== "all") {
      filtered = filtered.filter(review => review.platform === platformFilter);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(review => 
        review.customerName.toLowerCase().includes(term) ||
        review.text.toLowerCase().includes(term)
      );
    }
    
    // Sort by date, newest first
    filtered = filtered.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    setFilteredReviews(filtered);
  }, [reviews, activeFilter, platformFilter, searchTerm]);

  // Function to handle review status change
  const updateReviewStatus = (reviewId: string, newStatus: ReviewStatus) => {
    setIsLoading(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      const updatedReviews = reviews.map(review => {
        if (review.id === reviewId) {
          return {
            ...review,
            status: newStatus,
            updatedAt: new Date().toISOString(),
            publicDisplay: newStatus === "published"
          };
        }
        return review;
      });
      
      setReviews(updatedReviews);
      setIsLoading(false);
   
    }, 600);
  };

  // Function to add response to a review
  const addReviewResponse = (reviewId: string, responseText: string) => {
    setIsLoading(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      const updatedReviews = reviews.map(review => {
        if (review.id === reviewId) {
          return {
            ...review,
            responseText,
            responseDate: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
        }
        return review;
      });
      
      setReviews(updatedReviews);
      setIsLoading(false);
      
     
    }, 600);
  };

  // Function to toggle public display of a review
  const togglePublicDisplay = (reviewId: string) => {
    const updatedReviews = reviews.map(review => {
      if (review.id === reviewId) {
        return {
          ...review,
          publicDisplay: !review.publicDisplay,
          updatedAt: new Date().toISOString()
        };
      }
      return review;
    });
    
    setReviews(updatedReviews);
    
    const review = updatedReviews.find(r => r.id === reviewId);
   
  };

  // Function to save template
  const saveTemplate = (template: ReviewTemplate) => {
    setIsLoading(true);
    
    setTimeout(() => {
      let updatedTemplates;
      
      if (template.id) {
        // Update existing template
        updatedTemplates = templates.map(t => 
          t.id === template.id ? { ...template, updatedAt: new Date().toISOString() } : t
        );
      } else {
        // Create new template
        const newTemplate = {
          ...template,
          id: `template-${uuidv4().substring(0, 8)}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        updatedTemplates = [...templates, newTemplate];
      }
      
      setTemplates(updatedTemplates);
      setIsLoading(false);
     
    }, 600);
  };

  // Function to delete template
  const deleteTemplate = (templateId: string) => {
    const updatedTemplates = templates.filter(t => t.id !== templateId);
    setTemplates(updatedTemplates);
    
    // If the deleted template was active, set active to null
    if (settings.activeTemplateId === templateId) {
      updateSettings({ ...settings, activeTemplateId: null });
    }
    
   
  };

  // Function to set a template as active
  const setActiveTemplate = (templateId: string) => {
    updateSettings({ ...settings, activeTemplateId: templateId });
    
   
  };

  // Function to update reputation settings
  const updateSettings = (newSettings: ReputationSettings) => {
    setIsLoading(true);
    
    setTimeout(() => {
      setSettings(newSettings);
      setIsLoading(false);
      
      
    }, 600);
  };

  // Function to update platform integration
  const updatePlatformIntegration = (platformData: IntegrationCredentials) => {
    setIsLoading(true);
    
    setTimeout(() => {
      const updatedSettings = {
        ...settings,
        platforms: settings.platforms.map(p => 
          p.platform === platformData.platform ? { ...platformData, lastSync: new Date().toISOString() } : p
        )
      };
      
      setSettings(updatedSettings);
      setIsLoading(false);
      
    }, 800);
  };

  // Function to manually request a review
  const requestReview = (leadId: string, customerEmail: string, customerName: string, invoiceId?: string) => {
    setIsLoading(true);
    
    // Find active template
    const activeTemplate = templates.find(t => t.id === settings.activeTemplateId);
    
    if (!activeTemplate) {
      
      setIsLoading(false);
      return;
    }
    
    // In a real app, this would send an email and create a pending review
    setTimeout(() => {
      const newReview: Review = {
        id: `rev-${uuidv4().substring(0, 8)}`,
        leadId,
        customerName,
        customerEmail,
        invoiceId,
        rating: 0, // Not rated yet
        text: "",
        platform: "internal",
        status: "pending",
        publicDisplay: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setReviews([...reviews, newReview]);
      setIsLoading(false);
      
     
    }, 1000);
  };

  // Get statistics
  const getStats = () => {
    const totalReviews = reviews.length;
    const publishedReviews = reviews.filter(r => r.status === "published").length;
    const pendingReviews = reviews.filter(r => r.status === "pending").length;
    const internalReviews = reviews.filter(r => r.status === "internal_review").length;
    
    const averageRating = reviews
      .filter(r => r.rating > 0)
      .reduce((sum, r) => sum + r.rating, 0) / 
      reviews.filter(r => r.rating > 0).length || 0;
    
    return {
      totalReviews,
      publishedReviews,
      pendingReviews,
      internalReviews,
      averageRating
    };
  };

  return {
    reviews,
    filteredReviews,
    templates,
    settings,
    isLoading,
    activeFilter,
    platformFilter,
    searchTerm,
    setActiveFilter,
    setPlatformFilter,
    setSearchTerm,
    updateReviewStatus,
    addReviewResponse,
    togglePublicDisplay,
    saveTemplate,
    deleteTemplate,
    setActiveTemplate,
    updateSettings,
    updatePlatformIntegration,
    requestReview,
    getStats
  };
};
