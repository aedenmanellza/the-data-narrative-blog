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
const mockPosts = [***
  {
    slug: 'sql-optimization-lessons',
    frontmatter: {
      title: 'SQL Optimization: 5 Lessons That Changed Everything',
      date: '2025-01-18',
      excerpt: 'How I reduced a 45-minute query to 12 seconds, and the fundamental lessons I learned about database optimization.',
      coverImage: '/images/sql-optimization.jpg'
    },
    content: `
# The Problem

I once wrote a query that took **45 minutes** to run. Every. Single. Time.

The stakeholders were patient at first. Then frustrated. Then they stopped asking for the report altogether.

## The Journey to 12 Seconds

Here's what I learned:

### 1. Indexes Are Not Optional

\`\`\`sql
-- Before: Table scan on 50M rows
SELECT * FROM orders WHERE customer_id = 12345;

-- After: Index seek in milliseconds
CREATE INDEX idx_customer ON orders(customer_id);
\`\`\`

### 2. JOIN Order Matters

Filter early, join late. Always.

### 3. EXISTS vs IN

When checking for existence, \`EXISTS\` is almost always faster than \`IN\` for large datasets.

### 4. Avoid SELECT *

Only request the columns you need. This isn't just best practice – it's performance insurance.

### 5. Explain Plans Are Your Best Friend

\`\`\`sql
EXPLAIN ANALYZE
SELECT ...
\`\`\`

Learn to read them. They'll tell you exactly where your query is struggling.

## The Result

That 45-minute query? Now runs in **12 seconds**. The stakeholders are happy. The database is happy. And I learned more about optimization in one week than in my previous two years combined.

**The lesson:** Performance problems are almost always opportunities in disguise.
    `***
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
