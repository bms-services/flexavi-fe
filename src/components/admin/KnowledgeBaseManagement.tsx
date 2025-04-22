
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export function KnowledgeBaseManagement() {
  const navigate = useNavigate();

  const navigateToKnowledgeBase = () => {
    navigate('/admin/knowledge-base');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Book className="h-5 w-5" />
          Kennisbank Beheer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-8 gap-4">
          <p className="text-muted-foreground text-center">
            Via het kennisbank beheer kunt u alle veelgestelde vragen en antwoorden beheren die klanten kunnen raadplegen.
          </p>
          <Button onClick={navigateToKnowledgeBase}>
            Ga naar Kennisbank beheer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
