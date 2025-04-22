
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MessageSquare, Flag, Trash2, Eye, CheckCircle, AlertTriangle, Plus, Search, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const MOCK_POSTS = [
  { 
    id: 1, 
    title: 'Probleem met EPDM platte dak lekkage', 
    author: 'Jan Jansen', 
    category: 'Technisch advies',
    date: '2024-04-20',
    likes: 24,
    comments: 8,
    status: 'approved'
  },
  { 
    id: 2, 
    title: 'Personeel gezocht voor groot project in Amsterdam', 
    author: 'Piet Peters', 
    category: 'Personeel zoeken',
    date: '2024-04-18',
    likes: 12,
    comments: 5,
    status: 'approved'
  },
  { 
    id: 3, 
    title: 'Uitbesteden van bitumen werkzaamheden', 
    author: 'Klaas Krol', 
    category: 'Werk uitbesteden',
    date: '2024-04-15',
    likes: 5,
    comments: 2,
    status: 'flagged',
    reason: 'Ongepaste inhoud gemeld door gebruikers'
  },
  { 
    id: 4, 
    title: 'Contract voorbeelden voor particuliere klanten?', 
    author: 'Lisa van Dijk', 
    category: 'Juridisch advies',
    date: '2024-04-10',
    likes: 18,
    comments: 7,
    status: 'pending'
  },
  { 
    id: 5, 
    title: 'Foto\'s van mijn laatste zinkwerk project', 
    author: 'Mark Visser', 
    category: 'Werk delen',
    date: '2024-04-08',
    likes: 32,
    comments: 14,
    status: 'approved'
  },
];

const MOCK_CATEGORIES = [
  { id: 1, name: 'Technisch advies', count: 37, status: 'active' },
  { id: 2, name: 'Personeel zoeken', count: 24, status: 'active' },
  { id: 3, name: 'Werk uitbesteden', count: 18, status: 'active' },
  { id: 4, name: 'Juridisch advies', count: 42, status: 'active' },
  { id: 5, name: 'Werk delen', count: 56, status: 'active' },
];

export function CommunityManagement() {
  const { toast } = useToast();
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [categories, setCategories] = useState(MOCK_CATEGORIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  
  // Filter posts based on search query, status, and category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });
  
  const handlePostAction = (postId: number, action: 'approve' | 'flag' | 'delete') => {
    if (action === 'delete') {
      setPosts(posts.filter(post => post.id !== postId));
      toast({
        title: "Post verwijderd",
        description: "De community post is succesvol verwijderd.",
      });
    } else {
      setPosts(posts.map(post => 
        post.id === postId ? { ...post, status: action === 'approve' ? 'approved' : 'flagged' } : post
      ));
      
      toast({
        title: action === 'approve' ? "Post goedgekeurd" : "Post gemarkeerd",
        description: `De community post is succesvol ${action === 'approve' ? 'goedgekeurd' : 'gemarkeerd'}.`,
      });
    }
  };
  
  const addNewCategory = () => {
    if (newCategory.name.trim()) {
      const newId = Math.max(...categories.map(c => c.id)) + 1;
      setCategories([...categories, {
        id: newId,
        name: newCategory.name,
        count: 0,
        status: 'active'
      }]);
      
      setNewCategory({ name: '', description: '' });
      
      toast({
        title: "Categorie toegevoegd",
        description: `De categorie "${newCategory.name}" is succesvol toegevoegd.`,
      });
    }
  };
  
  const toggleCategoryStatus = (categoryId: number) => {
    setCategories(categories.map(category => 
      category.id === categoryId ? 
        { ...category, status: category.status === 'active' ? 'inactive' : 'active' } : 
        category
    ));
    
    const category = categories.find(c => c.id === categoryId);
    toast({
      title: "Categorie bijgewerkt",
      description: `De categorie "${category?.name}" is ${category?.status === 'active' ? 'gedeactiveerd' : 'geactiveerd'}.`,
    });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6" />
            Community Beheer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="posts">
            <TabsList className="mb-4">
              <TabsTrigger value="posts">Community Posts</TabsTrigger>
              <TabsTrigger value="categories">Categorieën</TabsTrigger>
              <TabsTrigger value="reports">Gerapporteerde Content</TabsTrigger>
            </TabsList>
            
            <TabsContent value="posts">
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Zoeken op titel of auteur..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-[200px]">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter op status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Alle statussen</SelectItem>
                        <SelectItem value="pending">In afwachting</SelectItem>
                        <SelectItem value="approved">Goedgekeurd</SelectItem>
                        <SelectItem value="flagged">Gemarkeerd</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-full md:w-[250px]">
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter op categorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Alle categorieën</SelectItem>
                        {MOCK_CATEGORIES.map(category => (
                          <SelectItem key={category.id} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow>
                        <TableHead>Titel</TableHead>
                        <TableHead>Auteur</TableHead>
                        <TableHead>Categorie</TableHead>
                        <TableHead>Datum</TableHead>
                        <TableHead>Activiteit</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Acties</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPosts.map(post => (
                        <TableRow key={post.id}>
                          <TableCell className="font-medium">{post.title}</TableCell>
                          <TableCell>{post.author}</TableCell>
                          <TableCell>{post.category}</TableCell>
                          <TableCell>{post.date}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center text-sm">
                                <MessageSquare className="h-3 w-3 mr-1 text-muted-foreground" /> 
                                {post.comments}
                              </div>
                              <div className="flex items-center text-sm">
                                <Heart className="h-3 w-3 mr-1 text-muted-foreground" /> 
                                {post.likes}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={post.status} />
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="icon" title="Bekijken">
                                <Eye className="h-4 w-4" />
                              </Button>
                              
                              {post.status !== 'approved' && (
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  title="Goedkeuren"
                                  className="text-green-600"
                                  onClick={() => handlePostAction(post.id, 'approve')}
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                              )}
                              
                              {post.status !== 'flagged' && (
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  title="Markeren"
                                  className="text-amber-600"
                                  onClick={() => handlePostAction(post.id, 'flag')}
                                >
                                  <Flag className="h-4 w-4" />
                                </Button>
                              )}
                              
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    title="Verwijderen"
                                    className="text-destructive"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Post verwijderen</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Weet je zeker dat je de post "{post.title}" wilt verwijderen? 
                                      Deze actie kan niet ongedaan worden gemaakt.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Annuleren</AlertDialogCancel>
                                    <AlertDialogAction 
                                      onClick={() => handlePostAction(post.id, 'delete')}
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      Verwijderen
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="categories">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Community Categorieën</h3>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Categorie toevoegen
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Nieuwe categorie</DialogTitle>
                        <DialogDescription>
                          Voeg een nieuwe categorie toe aan de community.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="categoryName">Naam</Label>
                          <Input 
                            id="categoryName" 
                            value={newCategory.name}
                            onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                            placeholder="Categorie naam"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="categoryDescription">Beschrijving</Label>
                          <Textarea 
                            id="categoryDescription" 
                            value={newCategory.description}
                            onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                            placeholder="Beschrijf waar deze categorie voor bedoeld is"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={addNewCategory}>Categorie toevoegen</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow>
                        <TableHead>Naam</TableHead>
                        <TableHead>Aantal posts</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Acties</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categories.map(category => (
                        <TableRow key={category.id}>
                          <TableCell className="font-medium">{category.name}</TableCell>
                          <TableCell>{category.count}</TableCell>
                          <TableCell>
                            <Badge variant={category.status === 'active' ? 'outline' : 'secondary'}>
                              {category.status === 'active' ? 'Actief' : 'Inactief'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => toggleCategoryStatus(category.id)}
                              >
                                {category.status === 'active' ? 'Deactiveren' : 'Activeren'}
                              </Button>
                              
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="text-destructive border-destructive hover:bg-destructive/10"
                                  >
                                    Verwijderen
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Categorie verwijderen</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Weet je zeker dat je de categorie "{category.name}" wilt verwijderen? 
                                      Alle posts in deze categorie zullen worden verplaatst naar "Uncategorized".
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Annuleren</AlertDialogCancel>
                                    <AlertDialogAction 
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      Verwijderen
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reports">
              <div className="space-y-4">
                <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 mr-2" />
                    <div>
                      <h3 className="font-medium text-amber-800">Gerapporteerde content</h3>
                      <p className="text-amber-700 text-sm">
                        Hier vindt u content die door gebruikers is gerapporteerd als ongepast of in strijd met de community richtlijnen.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow>
                        <TableHead>Content</TableHead>
                        <TableHead>Auteur</TableHead>
                        <TableHead>Gerapporteerd door</TableHead>
                        <TableHead>Reden</TableHead>
                        <TableHead>Datum</TableHead>
                        <TableHead>Acties</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Uitbesteden van bitumen werkzaamheden</TableCell>
                        <TableCell>Klaas Krol</TableCell>
                        <TableCell>Jan Jansen</TableCell>
                        <TableCell>Bevat ongepaste taal</TableCell>
                        <TableCell>2024-04-16</TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="icon" title="Bekijken">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" title="Goedkeuren" className="text-green-600">
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" title="Verwijderen" className="text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Re: Personeel gezocht (comment)</TableCell>
                        <TableCell>Mark Visser</TableCell>
                        <TableCell>Lisa van Dijk</TableCell>
                        <TableCell>Spam / Reclame</TableCell>
                        <TableCell>2024-04-17</TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="icon" title="Bekijken">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" title="Goedkeuren" className="text-green-600">
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" title="Verwijderen" className="text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-6 w-6" />
            Community Statistieken
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Totaal Posts" value="183" trend="+12% t.o.v. vorige maand" />
            <StatCard title="Actieve Gebruikers" value="56" trend="+8% t.o.v. vorige maand" />
            <StatCard title="Nieuwe Discussies" value="24" trend="+15% t.o.v. vorige maand" />
            <StatCard title="Gemiddelde Reacties" value="6.2" trend="+5% t.o.v. vorige maand" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case 'approved':
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Goedgekeurd</Badge>;
    case 'pending':
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">In afwachting</Badge>;
    case 'flagged':
      return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Gemarkeerd</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

function StatCard({ title, value, trend }: { title: string; value: string; trend: string }) {
  const isPositive = trend.includes('+');
  
  return (
    <div className="bg-card rounded-lg border shadow-sm p-6">
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-3xl font-semibold">{value}</p>
      </div>
      <p className={`mt-2 text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {trend}
      </p>
    </div>
  );
}

function Heart({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}
