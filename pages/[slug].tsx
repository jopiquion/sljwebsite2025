import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

interface PageProps {
  title: string;
  description: string;
  bodyHtml: string;
}

// Define the directory where your generic page content (Markdown) lives
const PAGES_CONTENT_DIR = path.join(process.cwd(), 'content', 'pages');

export const getStaticPaths: GetStaticPaths = async () => {
  // Read all filenames from the content/pages directory
  const filenames = fs.readdirSync(PAGES_CONTENT_DIR);
  // Map filenames to slugs for dynamic paths
  const paths = filenames.map((filename) => ({
    params: { slug: filename.replace(/\.md$/, '') },
  }));

  return { 
    paths, 
    fallback: false // If a page path is not found, return 404
  };
};

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const fullPath = path.join(PAGES_CONTENT_DIR, `${slug}.md`);

  // Check if the file exists; if not, return 404
  if (!fs.existsSync(fullPath)) {
    return {
      notFound: true,
    };
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the page's frontmatter and content
  const { data, content } = matter(fileContents);

  // Use remark to convert Markdown into HTML string
  const processedContent = await remark().use(html).process(content);
  const bodyHtml = processedContent.toString();

  return {
    props: {
      title: (data.title as string) || 'Untitled Page',
      description: (data.description as string) || '',
      bodyHtml,
    },
  };
};

const Page: React.FC<PageProps> = ({ title, description, bodyHtml }) => {
  return (
    <div>
      {/* Basic rendering of your page content */}
      <h1>{title}</h1>
      {description && <p>{description}</p>}
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      <p>This is a generic page. Its content comes from content/pages/{'{slug}'}.md</p>
    </div>
  );
};

export default Page;