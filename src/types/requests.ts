
export type RequestStatus = "idea" | "planned" | "in_progress" | "beta" | "rolled_out";

export type RequestVote = {
  id: string;
  requestId: string;
  userId: string;
  isUpvote: boolean;
  createdAt: string;
};

export type RequestComment = {
  id: string;
  requestId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
};

export type Request = {
  id: string;
  title: string;
  description: string;
  userId: string;
  userName: string;
  status: RequestStatus;
  upvotes: number;
  downvotes: number;
  createdAt: string;
  updatedAt: string;
  comments: RequestComment[];
};
