
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PostType } from "@/types/community";

interface CommunityHeaderProps {
  onCreatePost: () => void;
}

export function CommunityHeader({ onCreatePost }: CommunityHeaderProps) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get("search") as string;
    
    if (search) {
      searchParams.set("search", search);
    } else {
      searchParams.delete("search");
    }
    
    setSearchParams(searchParams);
  };
  
  const handleFilterChange = (value: string) => {
    if (value) {
      searchParams.set("type", value);
    } else {
      searchParams.delete("type");
    }
    setSearchParams(searchParams);
  };
  
  const handleSortChange = (value: string) => {
    if (value) {
      searchParams.set("sortBy", value);
    } else {
      searchParams.delete("sortBy");
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Community</h1>
        <Button 
          onClick={onCreatePost} 
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          Nieuw bericht
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <form onSubmit={handleSearch} className="flex-1 relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              name="search"
              placeholder="Zoek in de community..." 
              className="pl-8"
              defaultValue={searchParams.get("search") || ""}
            />
          </form>
          
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <Select 
              defaultValue={searchParams.get("type") || "all"} 
              onValueChange={handleFilterChange}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter op type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle berichten</SelectItem>
                <SelectItem value={PostType.GENERAL}>Algemeen</SelectItem>
                <SelectItem value={PostType.JOB_LISTING}>Personeel gezocht</SelectItem>
                <SelectItem value={PostType.PROJECT_SHOWCASE}>Project showcase</SelectItem>
                <SelectItem value={PostType.OUTSOURCE_WORK}>Werk uitbesteden</SelectItem>
                <SelectItem value={PostType.TECHNICAL_ADVICE}>Technisch advies</SelectItem>
                <SelectItem value={PostType.LEGAL_ADVICE}>Juridisch advies</SelectItem>
              </SelectContent>
            </Select>
            
            <Select 
              defaultValue={searchParams.get("sortBy") || "newest"} 
              onValueChange={handleSortChange}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sorteer op" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Meest recent</SelectItem>
                <SelectItem value="popular">Meest populair</SelectItem>
                <SelectItem value="trending">Trending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
