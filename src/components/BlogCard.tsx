import { Link } from "react-router-dom";
import { Post } from "@/lib/posts";
import { formatDate } from "@/lib/posts";

interface BlogCardProps {
  post: Post;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Link 
      to={`/blog/${post.slug}`}
      className="card block overflow-hidden group"
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 group-hover:text-muted-foreground transition-colors">
          {post.title}
        </h2>
        <p className="text-sm text-muted-foreground mb-3">
          {formatDate(post.date)}
        </p>
        <p className="text-muted-foreground leading-relaxed">
          {post.excerpt}
        </p>
      </div>
    </Link>
  );
};

export default BlogCard;
