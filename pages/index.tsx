import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { GetStaticProps, NextPage } from 'next';

// Define the type for the props that HomePage will receive
interface HomePageProps {
  title: string;
  description: string;
  contentHtml: string;
}

const HomePage: NextPage<HomePageProps> = ({ title, description, contentHtml }) => {
  return (
    <div>
      {/* You can use the title from the frontmatter here */}
      <h1>{title}</h1>
      {/* You can use the description from the frontmatter */}
      {description && <p>{description}</p>}

      {/* Render the HTML content from the Markdown file */}
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />

      {/* You can remove or keep the original placeholder text if you like, but it's redundant now */}
      {/* <p>This is the homepage. Content will eventually come from content/pages/index.md</p> */}
    </div>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const fullPath = path.join(process.cwd(), 'content', 'pages', 'index.md');
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const { data, content } = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(content);
  const contentHtml = processedContent.toString();

  // Ensure data.title and data.description are strings, provide defaults if missing
  const title = (data.title as string) || 'Default Home Title';
  const description = (data.description as string) || 'Default home description.';


  return {
    props: {
      title,
      description,
      contentHtml,
    },
  };
};

export default HomePage;