import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post, getPostBySlug, formatDate } from "@/lib/posts";
import Header from "@/components/Header";
import NotFound from "./NotFound";

const Blog = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }
      
      const postData = await getPostBySlug(slug);
      setPost(postData);
      setLoading(false);
    };

    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-24 pb-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded-[15px] mb-4 w-3/4"></div>
              <div className="h-4 bg-muted rounded-[15px] mb-8 w-1/4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-muted rounded-[15px]"></div>
                <div className="h-4 bg-muted rounded-[15px]"></div>
                <div className="h-4 bg-muted rounded-[15px] w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!post) {
    return <NotFound />;
  }

  // JSON-LD Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "datePublished": post.date,
    "author": {
      "@type": "Person",
      "name": "Aeden Manell"
    },
    "description": post.excerpt,
    "image": post.coverImage || "https://yoursite.com/default-og.jpg"
  };

  return (
    <>
      <Header />
      <article className="min-h-screen pt-24 pb-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        
        {post.coverImage && (
          <div className="w-full max-w-5xl mx-auto px-6 mb-12">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-[400px] object-cover rounded-[15px] shadow-xl"
            />
          </div>
        )}

        <div className="max-w-4xl mx-auto px-6">
          <header className="mb-12">
            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight animate-fade-in">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <span className="font-semibold">Aeden Manell</span>
              <span>•</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
          </header>

          <div 
            className="prose prose-lg dark:prose-invert prose-headings:font-black prose-a:text-foreground prose-a:underline prose-code:text-foreground prose-pre:bg-secondary prose-pre:rounded-[15px] max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content || '' }}
          />

          <footer className="mt-16 pt-8 border-t border-border">
            <div className="flex items-center justify-between">
              <a 
                href="/" 
                className="text-foreground hover:text-muted-foreground transition-colors font-semibold"
              >
                ← Back to all posts
              </a>
              <a 
                href="https://twitter.com/share?text=Check out this post by Aeden Manell"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-muted-foreground transition-colors font-semibold"
              >
                Share on Twitter →
              </a>
            </div>
          </footer>
        </div>
      </article>
    </>
  );
};

export default Blog;
