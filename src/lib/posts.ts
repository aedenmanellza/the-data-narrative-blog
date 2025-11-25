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
const mockPosts = [/*
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
  },*/
  
  {
   slug: 'data-analyst-roadmap-2025',
   frontmatter: {
     title: 'How to Become a Data Analyst in 2025: Your 8-Step T-Shaped Roadmap',
     date: '2025-01-18',
     excerpt: 'Overwhelmed by all the skills needed to become a Data Analyst? Focus on building a strong, T-shaped foundation with this 8-step roadmap, prioritizing Excel, SQL, and a BI tool, and leveraging AI to accelerate your learning and career.',
     coverImage: 'https://www.lummi.ai/api/render/image/7bd9fb97-afda-4bbf-a5b4-12c283ea706c?token=eyJhbGciOiJIUzI1NiJ9.eyJpZHMiOlsiN2JkOWZiOTctYWZkYS00YmJmLWE1YjQtMTJjMjgzZWE3MDZjIl0sInJlc29sdXRpb24iOiJtZWRpdW0iLCJyZW5kZXJTcGVjcyI6eyJlZmZlY3RzIjp7InJlZnJhbWUiOnt9fX0sInNob3VsZEF1dG9Eb3dubG9hZCI6ZmFsc2UsImp0aSI6Ii1ocmF4TTBXbWtJejdVaUJWVzhDWSIsImlhdCI6MTc2NDEwOTUxNiwiZXhwIjoxNzY0MTA5NTc2fQ.XWPDs6gHYvjh7dra2EFZPZl3Hu3y3T-x2pannfEH4Z8'
   },
content: `
# 🚀 How to Become a Data Analyst in 2025: Your 8-Step T-Shaped Roadmap

### Focus on Depth: Why T-Shaped Learning Trumps Breadth

Becoming a data analyst in 2025 can feel overwhelming. The key to cutting through the noise is **T-shaped learning**: going deep on a few core skills rather than spreading yourself thin across many. This approach builds the expertise that employers truly value. While AI is accelerating the field, it's an ally, not a replacement. Use it as a powerful tool to accelerate your journey.

This proven 8-step roadmap is designed to get you hired by prioritizing the most critical skills first.

---

## 1. Adopt the Right Mindset and Understand AI's Role

* Focus on **depth over breadth**: Avoid learning too many skills superficially. Master a few essentials (like SQL) first to build a solid foundation.
* **Leverage AI appropriately**: Treat AI (like ChatGPT or Grok) as a personal assistant, not a genie. It accelerates coding and problem-solving but doesn't replace hands-on learning.
* **Master prompt engineering**: Get good at giving AI detailed context. Practice conversing with it daily to refine your queries and understand its output.

## 2. Master Excel as Your Foundation Tool

**Why Excel?** It’s the most widely used tool in every organization—a versatile Swiss Army knife for quick data manipulation and ad-hoc analysis.

* **Start with the basics**: Core functions (SUM, AVERAGE, VLOOKUP, IF) and Pivot Tables for aggregation.
* **Advance your skills**: Dive into Power Query for data cleaning/transformation and Power Pivot/DAX for advanced calculations and larger datasets.

## 3. Learn SQL for Database Interaction

**Why SQL?** It is the fundamental language for querying databases, essential for pulling, cleaning, and analyzing data. Expect live coding tests in most interviews.

* **Start with the essentials (the "big six")**:
    * **SELECT**, **FROM**, **WHERE** (filtering)
    * **GROUP BY** (aggregation), **ORDER BY** (sorting)
    * **HAVING** (filtering aggregated data)
* **Build on the basics**: Master **joins** (INNER, LEFT) and **CASE** statements.
* **Advance your skills**: Explore **window functions** and **CTEs** for complex queries.

## 4. Pick and Master a Business Intelligence (BI) Tool

**Why BI tools?** They enable you to create interactive dashboards, visualize data, and tell compelling stories that drive business decisions.

* **Choose a tool**: Start with **Power BI** (strong Microsoft integration) or **Tableau** (widely popular).
* **Start with the basics**: Learn data modeling and when to use specific charts (e.g., bar for comparison, line for trends).
* **Advance your skills**: Focus on **UX/UI principles** to make dashboards intuitive and visually appealing.

## 5. Avoid Advanced Programming Languages Initially

**Why skip Python or R for now?** They are not essential for most entry-level roles. Learning them too early dilutes your focus on the core three (Excel, SQL, BI). Prioritize what gets you hired fastest. Only learn them once you are proficient in the core skills or a role demands it.

## 6. Focus on Hands-On Projects and Continuous Building

**Why projects?** They prove your skills, stop "course purgatory," and give you portfolio pieces for interviews.

* **Build progressively**: Start simple (Analyze in Excel $\rightarrow$ Query with SQL $\rightarrow$ Visualize in BI tool).
* **Create multiple projects**: Keep building to improve quality and depth.
* **Post online**: Share on **LinkedIn** or **GitHub** to attract recruiters.

## 7. Earn Relevant Certifications for Credibility

A few targeted certifications add legitimacy to your self-taught skills.

* **Recommended ones**:
    * Microsoft PL-300 for Power BI
    * Tableau Desktop Specialist or Tableau Data Analyst
* **Action item**: Study for and pass these *after* gaining hands-on experience with the tools.

## 8. Apply, Network, and Iterate

* **Launch your job search**: Tailor your resume to highlight your core skills and projects.
* **Network and seek feedback**: Post projects on LinkedIn to build visibility.
* **Stay persistent**: The market may require live SQL tests, so keep practicing.

> **Conclusion:** By following this lean roadmap, you'll build a competitive skill set efficiently. Focus on consistent practice, and remember: progress comes from **depth and application**, not breadth. With AI as your ally, you are well-equipped to land your first data analyst role in 2025. Good luck!
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
