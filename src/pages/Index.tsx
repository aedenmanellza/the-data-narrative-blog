import { useEffect, useState } from "react";
import { Post, getAllPosts } from "@/lib/posts";
import BlogCard from "@/components/BlogCard";
import Header from "@/components/Header";

const Index = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      const allPosts = await getAllPosts();
      setPosts(allPosts);
    };
    loadPosts();
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-16">
        {/* Hero Section */}
        <section className="max-w-5xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight animate-fade-in">
            A Data Analyst's Journey | Stories from the trenches of data
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground mb-8 font-semibold">
            Welcome to The Data Narrative.
          </p>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I turn complex data into clear narratives. This is where I document the journey – 
            the SQL queries that changed everything, the Python scripts that saved hundreds of hours, 
            and the hard-won lessons from real projects.
          </p>
        </section>

        {/* Blog Posts Grid */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-black mb-8">Latest Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Index;
