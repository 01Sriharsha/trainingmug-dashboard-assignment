import { Post } from "@/types";
import CardActions from "./card-actions";

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  return (
    <div key={post.id} className="card bg-primary text-primary-content h-full">
      <div className="card-body flex flex-col justify-between">
        <h2 className="card-title capitalize">{post.title}</h2>
        <p>{post.body}</p>
        <CardActions post={post} />
      </div>
    </div>
  );
}

export const PostCardSkeleton = () => {
  return (
    <div className="card h-full w-full">
      <div className="card-body">
        <h2 className="card-title skeleton h-8 w-full" />
        <div className="space-y-6 my-3">
          <p className="skeleton h-5" />
          <p className="skeleton h-5" />
          <p className="skeleton h-5" />
        </div>
        <div className="w-full flex justify-between items-center">
          <div className="h-6 w-16 skeleton rounded-xl" />
          <div className="h-6 w-16 skeleton rounded-xl" />
        </div>
      </div>
    </div>
  );
};
