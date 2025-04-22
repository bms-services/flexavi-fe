
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  Check, 
  Flag, 
  MessageSquare, 
  Trash,
  User,
  X
} from 'lucide-react';
import { formatDistance } from 'date-fns';
import { nl } from 'date-fns/locale';
import { Post, Comment } from '@/types/community';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

// Mock data for reported items
const reportedItems = [
  {
    id: 'report-1',
    itemId: 'post-123',
    itemType: 'post',
    content: 'Dit is een ongepast bericht dat meerdere gebruikers hebben gemeld vanwege scheldwoorden.',
    authorName: 'Jan Dekker',
    authorId: 'user-123',
    reportCount: 3,
    reportedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    reportReason: 'inappropriate',
    status: 'pending'
  },
  {
    id: 'report-2',
    itemId: 'comment-456',
    itemType: 'comment',
    content: 'Deze reactie bevat spam links naar externe websites.',
    authorName: 'Klaas Jansen',
    authorId: 'user-456',
    reportCount: 5,
    reportedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    reportReason: 'spam',
    status: 'pending'
  },
  {
    id: 'report-3',
    itemId: 'post-789',
    itemType: 'post',
    content: 'Dit bericht bevat misleidende informatie over dakisolatie technieken die gevaarlijk kunnen zijn.',
    authorName: 'Peter Bakker',
    authorId: 'user-789',
    reportCount: 2,
    reportedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    reportReason: 'misinformation',
    status: 'pending'
  }
];

const reportReasonLabels: Record<string, { label: string, color: string }> = {
  'inappropriate': { label: 'Ongepast', color: 'bg-red-100 text-red-800' },
  'spam': { label: 'Spam', color: 'bg-yellow-100 text-yellow-800' },
  'misinformation': { label: 'Misleidend', color: 'bg-orange-100 text-orange-800' },
  'harassment': { label: 'Intimidatie', color: 'bg-purple-100 text-purple-800' },
  'other': { label: 'Overig', color: 'bg-gray-100 text-gray-800' }
};

export function ReportedPostsList() {
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [actionDialog, setActionDialog] = useState(false);
  const [action, setAction] = useState<'approve' | 'delete' | null>(null);

  const handleAction = (report: any, actionType: 'approve' | 'delete') => {
    setSelectedReport(report);
    setAction(actionType);
    setActionDialog(true);
    
    if (actionType === 'approve') {
      setNotificationMessage('Dit item zal worden goedgekeurd en de meldingen verwijderd.');
    } else {
      setNotificationMessage('Dit item zal worden verwijderd. Wilt u de auteur hiervan op de hoogte stellen?');
    }
  };

  const confirmAction = () => {
    // Here would be the API call to take the action
    console.log(`Action ${action} confirmed for report ${selectedReport.id}`);
    setActionDialog(false);
    setSelectedReport(null);
    setAction(null);
  };

  if (reportedItems.length === 0) {
    return (
      <div className="text-center py-12">
        <Flag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">Geen meldingen</h3>
        <p className="text-muted-foreground">
          Er zijn momenteel geen gerapporteerde berichten die moderatie vereisen.
        </p>
      </div>
    );
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Inhoud</TableHead>
            <TableHead>Gebruiker</TableHead>
            <TableHead>Reden</TableHead>
            <TableHead>Gemeld</TableHead>
            <TableHead>Aantal</TableHead>
            <TableHead className="text-right">Acties</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reportedItems.map((report) => (
            <TableRow key={report.id}>
              <TableCell>
                {report.itemType === 'post' ? (
                  <Badge variant="outline" className="flex items-center gap-1 bg-blue-50 text-blue-700">
                    <MessageSquare className="h-3 w-3" />
                    Bericht
                  </Badge>
                ) : (
                  <Badge variant="outline" className="flex items-center gap-1 bg-gray-50 text-gray-700">
                    <MessageSquare className="h-3 w-3" />
                    Reactie
                  </Badge>
                )}
              </TableCell>
              <TableCell className="max-w-[250px] truncate">{report.content}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback>{report.authorName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{report.authorName}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge className={reportReasonLabels[report.reportReason].color}>
                  {reportReasonLabels[report.reportReason].label}
                </Badge>
              </TableCell>
              <TableCell>
                {formatDistance(report.reportedAt, new Date(), { addSuffix: true, locale: nl })}
              </TableCell>
              <TableCell>{report.reportCount}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="text-green-600 hover:text-green-700 hover:bg-green-50"
                  onClick={() => handleAction(report, 'approve')}
                >
                  <Check className="h-4 w-4 mr-1" />
                  <span className="sr-only sm:not-sr-only sm:inline">Goedkeuren</span>
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleAction(report, 'delete')}
                >
                  <Trash className="h-4 w-4 mr-1" />
                  <span className="sr-only sm:not-sr-only sm:inline">Verwijderen</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={actionDialog} onOpenChange={setActionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {action === 'approve' ? 'Item goedkeuren' : 'Item verwijderen'}
            </DialogTitle>
            <DialogDescription>
              {notificationMessage}
            </DialogDescription>
          </DialogHeader>
          
          {action === 'delete' && (
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="reason">Reden voor verwijdering</Label>
                <Select defaultValue="inappropriate">
                  <SelectTrigger id="reason">
                    <SelectValue placeholder="Selecteer een reden" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inappropriate">Ongepaste inhoud</SelectItem>
                    <SelectItem value="spam">Spam</SelectItem>
                    <SelectItem value="misinformation">Misleidende informatie</SelectItem>
                    <SelectItem value="harassment">Intimidatie</SelectItem>
                    <SelectItem value="other">Anders</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Bericht aan gebruiker (optioneel)</Label>
                <Textarea 
                  id="message" 
                  placeholder="Laat een bericht achter voor de gebruiker" 
                  className="min-h-[100px]"
                />
              </div>
            </div>
          )}
          
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setActionDialog(false)}>
              Annuleren
            </Button>
            <Button 
              onClick={confirmAction}
              variant={action === 'approve' ? "default" : "destructive"}
            >
              {action === 'approve' ? 'Goedkeuren' : 'Verwijderen'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
