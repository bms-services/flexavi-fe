import { Comment } from "@/types/community";

export const commentsMap: { [key: string]: Comment[] } = {
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
