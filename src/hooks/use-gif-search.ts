
import { useState } from "react";
import { PostMedia } from "@/types/community";

// Mock GIF results - in a real app this would come from an API
const mockGifResults = [
  { id: "gif1", url: "https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif" },
  { id: "gif2", url: "https://media.giphy.com/media/26FPq8u5gvYO9GzoA/giphy.gif" },
  { id: "gif3", url: "https://media.giphy.com/media/l4FGrHErakgV8GRO0/giphy.gif" },
  { id: "gif4", url: "https://media.giphy.com/media/3og0INs7kEnoBYDGNi/giphy.gif" },
  { id: "gif5", url: "https://media.giphy.com/media/3ohhwytHcusSCXXOUg/giphy.gif" },
  { id: "gif6", url: "https://media.giphy.com/media/3ohze2m5cNyumzUMp2/giphy.gif" },
];

export function useGifSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(mockGifResults);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filteredResults = mockGifResults.filter(gif => 
      gif.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredResults.length > 0 ? filteredResults : mockGifResults);
  };

  return {
    searchTerm,
    setSearchTerm,
    searchResults,
    handleSearch
  };
}
