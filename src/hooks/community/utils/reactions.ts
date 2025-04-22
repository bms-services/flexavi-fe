
// This file manages user reactions (likes/dislikes)

// Get user reactions from localStorage
export function getUserReactions(): { [key: string]: 'like' | 'dislike' | null } {
  const reactionsString = localStorage.getItem('userReactions');
  return reactionsString ? JSON.parse(reactionsString) : {};
}

// Save user reactions to localStorage
export function setUserReactions(reactions: { [key: string]: 'like' | 'dislike' | null }): void {
  localStorage.setItem('userReactions', JSON.stringify(reactions));
}
