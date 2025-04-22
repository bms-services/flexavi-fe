
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Post, Comment, Group, PostFilters, PostType } from "@/types/community";

// Mock user data
const currentUser = {
  id: "current-user",
  name: "Robert de Dakdekker",
  avatar: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=50&h=50",
};

// Mock groups
const communityGroups: Group[] = [
  {
    id: "group-1",
    name: "Algemene discussie",
    description: "Algemene discussie voor de dakdekkersgemeenschap",
    icon: "message-square",
    memberCount: 245,
    postCount: 127,
    color: "#3b82f6",
  },
  {
    id: "group-2",
    name: "Werk en personeel",
    description: "Vind personeel of nieuwe werkgelegenheden",
    icon: "users",
    memberCount: 187,
    postCount: 93,
    color: "#16a34a",
  },
  {
    id: "group-3",
    name: "Project showcases",
    description: "Deel je mooiste dakprojecten met de community",
    icon: "camera",
    memberCount: 211,
    postCount: 154,
    color: "#f59e0b",
  },
  {
    id: "group-4",
    name: "Technisch advies",
    description: "Vragen en advies over dakdektechnieken en materialen",
    icon: "file-image",
    memberCount: 173,
    postCount: 112,
    color: "#8b5cf6",
  },
  {
    id: "group-5",
    name: "Juridisch advies",
    description: "Vragen en advies over juridische zaken voor dakdekkers",
    icon: "briefcase",
    memberCount: 98,
    postCount: 64,
    color: "#ef4444",
  },
  {
    id: "group-6",
    name: "Support vragen",
    description: "Hulp bij problemen met het platform",
    icon: "headphones",
    memberCount: 142,
    postCount: 71,
    color: "#06b6d4",
  },
];

// Mock posts
const getBasePosts = (): Post[] => [
  {
    id: "post-1",
    title: "Nieuwe isolatietechniek voor platte daken",
    content: "Ik heb onlangs een nieuwe isolatietechniek toegepast bij een project die echt fantastisch werkt. Het betreft een combinatie van PIR-platen met een reflecterende laag. De warmteweerstand is aanzienlijk verbeterd.\n\nHeeft iemand hier ervaring mee? Ik ben benieuwd naar jullie ervaringen en tips.",
    authorId: "user-1",
    authorName: "Jan Dekker",
    authorAvatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=50&h=50",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    groupId: "group-4",
    groupName: "Technisch advies",
    type: PostType.TECHNICAL_ADVICE,
    likeCount: 24,
    dislikeCount: 2,
    commentCount: 8,
    media: [
      {
        id: "media-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1605095141947-6c41d79fca19?auto=format&fit=crop&q=80&w=1000",
      },
      {
        id: "media-2",
        type: "image",
        url: "https://images.unsplash.com/photo-1625472603517-1b0dc8ecc3cd?auto=format&fit=crop&q=80&w=1000",
      }
    ],
  },
  {
    id: "post-2",
    title: "Dakdekker gezocht voor groot project in Rotterdam",
    content: "Wij zijn op zoek naar ervaren dakdekkers voor een groot project in Rotterdam. Het betreft een nieuwbouwproject met ongeveer 30 woningen. Start: februari 2025. Duur: ongeveer 3 maanden. Goede betaling en mogelijkheid voor langdurige samenwerking. Stuur een bericht bij interesse!",
    authorId: "user-2",
    authorName: "Bouwbedrijf De Toekomst",
    authorAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=50&h=50",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    groupId: "group-2",
    groupName: "Werk en personeel",
    type: PostType.JOB_LISTING,
    likeCount: 7,
    dislikeCount: 0,
    commentCount: 12,
  },
  {
    id: "post-3",
    title: "Mijn laatste project: renovatie monumentaal pand",
    content: "Eindelijk klaar met de renovatie van dit monumentale pand in Utrecht. Het was een uitdagend project vanwege de historische waarde en de vele details in het dak. We hebben bijzondere leien gebruikt die speciaal geïmporteerd zijn. Trots op het resultaat!",
    authorId: "user-3",
    authorName: "Michael van Dijk",
    authorAvatar: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&q=80&w=50&h=50",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    groupId: "group-3",
    groupName: "Project showcases",
    type: PostType.PROJECT_SHOWCASE,
    likeCount: 47,
    dislikeCount: 0,
    commentCount: 16,
    media: [
      {
        id: "media-3",
        type: "image",
        url: "https://images.unsplash.com/photo-1599619351208-3e6c839d6828?auto=format&fit=crop&q=80&w=1000",
      },
      {
        id: "media-4",
        type: "image",
        url: "https://images.unsplash.com/photo-1604014236812-0389b1263bb1?auto=format&fit=crop&q=80&w=1000",
      },
      {
        id: "media-5",
        type: "image",
        url: "https://images.unsplash.com/photo-1605276374105-dee8cbbbaecd?auto=format&fit=crop&q=80&w=1000",
      }
    ],
  },
  {
    id: "post-4",
    title: "Vragen over garantiebepaling bij lekkage",
    content: "Ik heb vorig jaar een dak vervangen voor een klant. Nu klaagt de klant over lekkage die volgens hem onder de garantie valt. Maar bij inspectie blijkt dat de lekkage komt door een beschadiging die later is ontstaan (waarschijnlijk door werkzaamheden van een andere partij).\n\nHoe gaan jullie hiermee om? Ben ik verplicht dit kosteloos te herstellen onder de garantie?",
    authorId: "user-4",
    authorName: "Peter Vos",
    authorAvatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=50&h=50",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    groupId: "group-5",
    groupName: "Juridisch advies",
    type: PostType.LEGAL_ADVICE,
    likeCount: 3,
    dislikeCount: 0,
    commentCount: 9,
  },
  {
    id: "post-5",
    title: "Zoek partner voor groot zonnedak project",
    content: "Wij hebben een grote opdracht binnengehaald voor het plaatsen van 200+ zonnepanelen op een bedrijfspand, maar kunnen dit niet alleen aan binnen de gestelde termijn. We zoeken een betrouwbare partner om mee samen te werken. Het betreft een project in de regio Eindhoven. Start over 3 weken. Reacties graag via DM.",
    authorId: "user-5",
    authorName: "Duurzame Daken BV",
    authorAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=50&h=50",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    groupId: "group-2",
    groupName: "Werk en personeel",
    type: PostType.OUTSOURCE_WORK,
    likeCount: 12,
    dislikeCount: 0,
    commentCount: 5,
  },
  {
    id: "post-6",
    title: "Problemen met inloggen op app",
    content: "Sinds de laatste update kan ik niet meer inloggen op de app. Ik krijg steeds een foutmelding dat mijn wachtwoord niet klopt, maar ik ben zeker van mijn wachtwoord. Ik heb al geprobeerd mijn cache te wissen en de app opnieuw te installeren. Heeft iemand hetzelfde probleem of een oplossing?",
    authorId: "user-6",
    authorName: "Thomas Bosman",
    authorAvatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&q=80&w=50&h=50",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    groupId: "group-6",
    groupName: "Support vragen",
    type: PostType.GENERAL,
    likeCount: 1,
    dislikeCount: 0,
    commentCount: 3,
  },
];

// Mock comments
const commentsMap: { [key: string]: Comment[] } = {
  "post-1": [
    {
      id: "comment-1-1",
      postId: "post-1",
      content: "Ja, ik heb hiermee gewerkt. Werkt inderdaad heel goed, vooral in combinatie met een goede dampremmer. Let wel op bij extreem warme zomers, dan kan het binnen soms te warm worden.",
      authorId: "user-7",
      authorName: "Erik Jansen",
      authorAvatar: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?auto=format&fit=crop&q=80&w=50&h=50",
      createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
      likeCount: 5,
      dislikeCount: 0,
    },
    {
      id: "comment-1-2",
      postId: "post-1",
      content: "Wat zijn de kosten vergeleken met traditionele methoden? Ik overweeg het ook te gaan gebruiken.",
      authorId: "user-8",
      authorName: "Stefan de Wit",
      authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=50&h=50",
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      likeCount: 2,
      dislikeCount: 0,
    },
  ],
  "post-4": [
    {
      id: "comment-4-1",
      postId: "post-4",
      content: "Dit is een klassieker. In je garantiebepaling zou duidelijk moeten staan wat wel en niet onder garantie valt. Beschadigingen door derden vallen normaal gesproken niet onder garantie.",
      authorId: "user-9",
      authorName: "Laura Mulder",
      authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=50&h=50",
      createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
      likeCount: 8,
      dislikeCount: 0,
    },
    {
      id: "comment-4-2",
      postId: "post-4",
      content: "Je kunt eventueel een expert inschakelen die onafhankelijk kan vaststellen wat de oorzaak is. Dit kan helpen als de klant twijfelt aan jouw beoordeling.",
      authorId: "user-10",
      authorName: "Robert Bakker",
      authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=50&h=50",
      createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
      likeCount: 4,
      dislikeCount: 1,
    },
  ],
};

// Create a local storage to persist user reactions
const getUserReactions = () => {
  const stored = localStorage.getItem('communityReactions');
  return stored ? JSON.parse(stored) : {};
};

const setUserReactions = (reactions: Record<string, 'like' | 'dislike' | null>) => {
  localStorage.setItem('communityReactions', JSON.stringify(reactions));
};

// Hook for groups
export function useCommunityGroups() {
  const [groups, setGroups] = useState<Group[]>(communityGroups);
  
  return { groups };
}

// Hook for posts
export function useCommunityPosts(filters?: PostFilters) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load posts with filters
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      let filteredPosts = [...getBasePosts()];
      
      // Apply filters
      if (filters) {
        if (filters.groupId) {
          filteredPosts = filteredPosts.filter(post => post.groupId === filters.groupId);
        }
        
        if (filters.type) {
          filteredPosts = filteredPosts.filter(post => post.type === filters.type);
        }
        
        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          filteredPosts = filteredPosts.filter(
            post => 
              post.title.toLowerCase().includes(searchLower) || 
              post.content.toLowerCase().includes(searchLower)
          );
        }
        
        // Sort
        if (filters.sortBy === 'popular') {
          filteredPosts.sort((a, b) => (b.likeCount - b.dislikeCount) - (a.likeCount - a.dislikeCount));
        } else if (filters.sortBy === 'trending') {
          filteredPosts.sort((a, b) => b.commentCount - a.commentCount);
        } else {
          // Default: newest
          filteredPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }
      }
      
      // Add user reactions
      const userReactions = getUserReactions();
      
      filteredPosts = filteredPosts.map(post => ({
        ...post,
        userReaction: userReactions[post.id] || null,
      }));
      
      setPosts(filteredPosts);
      setIsLoading(false);
    }, 700);
  }, [filters?.groupId, filters?.type, filters?.search, filters?.sortBy]);
  
  // Create a new post
  const createPost = async (postData: any) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const newPost: Post = {
          id: `post-${uuidv4()}`,
          title: postData.title,
          content: postData.content,
          authorId: currentUser.id,
          authorName: currentUser.name,
          authorAvatar: currentUser.avatar,
          createdAt: new Date().toISOString(),
          groupId: postData.groupId,
          groupName: communityGroups.find(g => g.id === postData.groupId)?.name || "Onbekende groep",
          type: postData.type,
          likeCount: 0,
          dislikeCount: 0,
          commentCount: 0,
          media: postData.media || [],
        };
        
        // Update group post count
        const groupIndex = communityGroups.findIndex(g => g.id === postData.groupId);
        if (groupIndex !== -1) {
          communityGroups[groupIndex].postCount += 1;
        }
        
        // Add to mock data
        const basePosts = getBasePosts();
        basePosts.unshift(newPost);
        
        resolve();
      }, 1000);
    });
  };
  
  return { posts, isLoading, createPost };
}

// Hook for comments
export function useCommunityComments(postId: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  
  // Load comments
  useEffect(() => {
    // Get comments for the post, or empty array if none exist
    const postComments = commentsMap[postId] || [];
    
    // Add user reactions
    const userReactions = getUserReactions();
    
    // Structureer reacties om reacties op reacties te ondersteunen
    const commentsWithReplies: Comment[] = [];
    const replyMap: Record<string, Comment[]> = {};
    
    // Eerst alle reacties sorteren op parentId
    postComments.forEach(comment => {
      const commentWithReaction = {
        ...comment,
        userReaction: userReactions[comment.id] || null,
        replies: [],
      };
      
      if (!comment.parentId) {
        // Dit is een top-level reactie
        commentsWithReplies.push(commentWithReaction);
      } else {
        // Dit is een reactie op een reactie
        if (!replyMap[comment.parentId]) {
          replyMap[comment.parentId] = [];
        }
        replyMap[comment.parentId].push(commentWithReaction);
      }
    });
    
    // Voeg reacties toe aan hun ouders
    commentsWithReplies.forEach(comment => {
      if (replyMap[comment.id]) {
        comment.replies = replyMap[comment.id];
      }
    });
    
    setComments(commentsWithReplies);
  }, [postId]);
  
  // Add comment
  const addComment = (commentData: { content: string; postId: string; parentId?: string }) => {
    const newComment: Comment = {
      id: `comment-${postId}-${uuidv4()}`,
      postId: commentData.postId,
      content: commentData.content,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      createdAt: new Date().toISOString(),
      likeCount: 0,
      dislikeCount: 0,
      parentId: commentData.parentId,
    };
    
    // Als dit geen nieuwe reactie op reacties is, voeg dan toe aan de lijst
    if (!commentData.parentId) {
      setComments(prev => {
        const newCommentWithReplies = {...newComment, replies: []};
        return [newCommentWithReplies, ...prev];
      });
    } else {
      // Als dit een reactie op een reactie is, voeg het toe aan de replies van de parent
      setComments(prev => {
        return prev.map(comment => {
          if (comment.id === commentData.parentId) {
            return {
              ...comment,
              replies: [...(comment.replies || []), newComment]
            };
          }
          return comment;
        });
      });
    }
    
    // If this is the first comment for this post, initialize the array
    if (!commentsMap[postId]) {
      commentsMap[postId] = [];
    }
    
    // Add to mock data
    commentsMap[postId].unshift(newComment);
    
    // Update post comment count
    const posts = getBasePosts();
    const postIndex = posts.findIndex(p => p.id === postId);
    if (postIndex !== -1) {
      posts[postIndex].commentCount += 1;
    }
  };
  
  return { comments, addComment };
}

// Hook for post reactions (likes, dislikes)
export function useCommunityReactions() {
  const handleReaction = (
    itemId: string, 
    reactionType: 'like' | 'dislike', 
    isComment: boolean = false
  ) => {
    // Get current reactions
    const userReactions = getUserReactions();
    const currentReaction = userReactions[itemId];
    
    // Toggle reaction
    if (currentReaction === reactionType) {
      // Remove reaction if clicking the same button
      userReactions[itemId] = null;
    } else {
      // Set new reaction
      userReactions[itemId] = reactionType;
    }
    
    // Save reactions
    setUserReactions(userReactions);
    
    if (isComment) {
      // Update comment like/dislike count
      for (const postId in commentsMap) {
        const commentIndex = commentsMap[postId].findIndex(c => c.id === itemId);
        if (commentIndex !== -1) {
          // Reset counts first
          if (currentReaction === 'like') commentsMap[postId][commentIndex].likeCount--;
          if (currentReaction === 'dislike') commentsMap[postId][commentIndex].dislikeCount--;
          
          // Then add the new reaction
          if (userReactions[itemId] === 'like') commentsMap[postId][commentIndex].likeCount++;
          if (userReactions[itemId] === 'dislike') commentsMap[postId][commentIndex].dislikeCount++;
          
          break;
        }
      }
    } else {
      // Update post like/dislike count
      const posts = getBasePosts();
      const postIndex = posts.findIndex(p => p.id === itemId);
      
      if (postIndex !== -1) {
        // Reset counts first
        if (currentReaction === 'like') posts[postIndex].likeCount--;
        if (currentReaction === 'dislike') posts[postIndex].dislikeCount--;
        
        // Then add the new reaction
        if (userReactions[itemId] === 'like') posts[postIndex].likeCount++;
        if (userReactions[itemId] === 'dislike') posts[postIndex].dislikeCount++;
      }
    }
  };
  
  const handleLike = (itemId: string, isComment: boolean = false) => {
    handleReaction(itemId, 'like', isComment);
  };
  
  const handleDislike = (itemId: string, isComment: boolean = false) => {
    handleReaction(itemId, 'dislike', isComment);
  };
  
  return { handleLike, handleDislike };
}
