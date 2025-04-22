
export const getUserReactions = () => {
  const stored = localStorage.getItem('communityReactions');
  return stored ? JSON.parse(stored) : {};
};

export const setUserReactions = (reactions: Record<string, 'like' | 'dislike' | null>) => {
  localStorage.setItem('communityReactions', JSON.stringify(reactions));
};
