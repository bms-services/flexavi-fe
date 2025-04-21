
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, MessageSquare, Clock, AlertTriangle, Award } from "lucide-react";
import { ReputationChart } from "./charts/ReputationChart";
import { RecentReviewsWidget } from "./widgets/RecentReviewsWidget";
import { ReviewsPieChart } from "./charts/ReviewsPieChart";
import { PlatformDistributionChart } from "./charts/PlatformDistributionChart";
import { TopReviewsCarousel } from "./widgets/TopReviewsCarousel";

export const ReputationDashboard = ({ reputation }: { reputation: any }) => {
  const stats = reputation.getStats();

  return (
    <div className="space-y-6 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center pt-6">
            <div className="p-2 bg-primary/10 rounded-full mr-4">
              <Star className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Gemiddelde beoordeling</p>
              <h3 className="text-2xl font-bold">
                {stats.averageRating.toFixed(1)} / 5.0
              </h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center pt-6">
            <div className="p-2 bg-primary/10 rounded-full mr-4">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Totaal reviews</p>
              <h3 className="text-2xl font-bold">{stats.totalReviews}</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center pt-6">
            <div className="p-2 bg-primary/10 rounded-full mr-4">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Wachtend op actie</p>
              <h3 className="text-2xl font-bold">{stats.pendingReviews + stats.internalReviews}</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center pt-6">
            <div className="p-2 bg-primary/10 rounded-full mr-4">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Gepubliceerd</p>
              <h3 className="text-2xl font-bold">{stats.publishedReviews}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Beoordelingen trend</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ReputationChart reviews={reputation.reviews} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Beoordeling verdeling</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ReviewsPieChart reviews={reputation.reviews} />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Top reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <TopReviewsCarousel reviews={reputation.reviews} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Platform verdeling</CardTitle>
          </CardHeader>
          <CardContent className="h-60">
            <PlatformDistributionChart reviews={reputation.reviews} />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Recente reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentReviewsWidget 
              reviews={reputation.reviews.slice(0, 5)} 
              onUpdateStatus={reputation.updateReviewStatus}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
