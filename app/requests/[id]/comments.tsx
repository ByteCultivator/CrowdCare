"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Heart, MessageCircle, ThumbsUp, ThumbsDown } from "lucide-react"

interface Comment {
  id: string
  user: {
    name: string
    image: string
    address: string
  }
  content: string
  timestamp: string
  reactions: {
    likes: number
    hearts: number
  }
}

export function Comments() {
  const { toast } = useToast()
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      user: {
        name: "Alex Thompson",
        image: "/placeholder.svg?height=40&width=40",
        address: "0x1234...5678",
      },
      content: "This is a great cause! Happy to support.",
      timestamp: "2 hours ago",
      reactions: {
        likes: 12,
        hearts: 5,
      },
    },
    {
      id: "2",
      user: {
        name: "Maria Garcia",
        image: "/placeholder.svg?height=40&width=40",
        address: "0x8765...4321",
      },
      content: "Wishing you the best with this request. The community is here to help!",
      timestamp: "5 hours ago",
      reactions: {
        likes: 8,
        hearts: 3,
      },
    },
  ])
  const [newComment, setNewComment] = useState("")

  const handleSubmitComment = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: Date.now().toString(),
      user: {
        name: "Current User",
        image: "/placeholder.svg?height=40&width=40",
        address: "0x9999...9999",
      },
      content: newComment,
      timestamp: "Just now",
      reactions: {
        likes: 0,
        hearts: 0,
      },
    }

    setComments([comment, ...comments])
    setNewComment("")
    toast({
      title: "Comment posted",
      description: "Your comment has been posted successfully.",
    })
  }

  const handleReaction = (commentId: string, type: "likes" | "hearts") => {
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            reactions: {
              ...comment.reactions,
              [type]: comment.reactions[type] + 1,
            },
          }
        }
        return comment
      }),
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Comments</h3>
        <div className="space-y-4">
          <Textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[100px]"
          />
          <Button onClick={handleSubmitComment}>Post Comment</Button>
        </div>
      </div>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="space-y-2">
            <div className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage src={comment.user.image} alt={comment.user.name} />
                <AvatarFallback>
                  {comment.user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{comment.user.name}</p>
                  <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                </div>
                <p className="text-sm text-muted-foreground">{comment.content}</p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleReaction(comment.id, "likes")}
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span>{comment.reactions.likes}</span>
                  </button>
                  <button
                    onClick={() => handleReaction(comment.id, "hearts")}
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
                  >
                    <Heart className="h-4 w-4" />
                    <span>{comment.reactions.hearts}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

