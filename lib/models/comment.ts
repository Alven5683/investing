export interface Comment {
  _id?: string
  postId: string
  author: {
    name: string
    email: string
    avatar?: string
  }
  content: string
  status: "pending" | "approved" | "rejected"
  createdAt: Date
  updatedAt: Date
  parentId?: string // For nested replies
  likes: number
}

export interface CommentStats {
  total: number
  pending: number
  approved: number
  rejected: number
}
