import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

interface PostPageProps {
  title: string;
  date: string;
  author: string;
  excerpt: string;
  bodyHtml: string;
  // Add other fields from your post model here (e.g., featured_image, tags, etc.)
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export const getStaticPaths: GetStaticPaths = async () => {
  const filenames = fs.readdirSync(BLOG_DIR);
  const paths = filenames.map((filename) => ({
    params: { slug: filename.replace(/\.md$/, '') },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<PostPageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const fullPath = path.join(BLOG_DIR, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const bodyHtml = processedContent.toString();

  return {
    props: {
      title: data.title || 'No Title',
      date: data.date ? new Date(data.date).toLocaleDateString() : 'No Date',
      author: data.author || 'No Author',
      excerpt: data.excerpt || 'No Excerpt',
      bodyHtml,
      // Pass other fields from 'data' here
    },
  };
};

const PostPage: React.FC<PostPageProps> = ({ title, date, author, excerpt, bodyHtml }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>By {author} on {date}</p>
      <p><em>{excerpt}</em></p>
      <h2>Post Content</h2>
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      <p>This is a blog post. Content is fetched from content/blog/{'{slug}'}.md</p>
    </div>
  );
};

export default PostPage;