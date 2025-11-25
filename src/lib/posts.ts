import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
  content?: string;
}

// This is a mock implementation since we can't read the filesystem in the browser
// In a real implementation with a build step, you'd read from the filesystem
const mockPosts = [
  {
    slug: 'sql-optimization-lessons',
    frontmatter: {
      title: ' ',
      date: '2025-01-18',
      excerpt: ' ',
      coverImage: ' '
    },
    content: `
    
# h1
### h3
## h2
**bold**

    `
  },
  
  {
    slug: '',
    frontmatter: {
      title: '',
      date: ' ',
      excerpt: ' ',
      coverImage: ' '
    },
    content: `
    
 `
  }
];

export async function getAllPosts(): Promise<Post[]> {
  const posts = mockPosts.map(post => ({
    slug: post.slug,
    ...post.frontmatter
  }));
  
  // Sort by date descending
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const post = mockPosts.find(p => p.slug === slug);
  
  if (!post) return null;
  
  // Process markdown to HTML
  const processedContent = await remark()
    .use(html)
    .process(post.content);
  
  const contentHtml = processedContent.toString();
  
  return {
    slug: post.slug,
    ...post.frontmatter,
    content: contentHtml
  };
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}
