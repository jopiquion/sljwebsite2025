import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

interface ServicePageProps {
  title: string;
  description: string;
  bodyHtml: string;
  // Add other fields from your service model here (e.g., icon, features, etc.)
}

const SERVICES_DIR = path.join(process.cwd(), 'content', 'services');

export const getStaticPaths: GetStaticPaths = async () => {
  const filenames = fs.readdirSync(SERVICES_DIR);
  const paths = filenames.map((filename) => ({
    params: { slug: filename.replace(/\.md$/, '') },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<ServicePageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const fullPath = path.join(SERVICES_DIR, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const bodyHtml = processedContent.toString();

  return {
    props: {
      title: data.title || 'No Title',
      description: data.description || 'No Description',
      bodyHtml,
      // Pass other fields from 'data' here
    },
  };
};

const ServicePage: React.FC<ServicePageProps> = ({ title, description, bodyHtml }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <h2>Service Details</h2>
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      <p>This is a service page. Content is fetched from content/services/{'{slug}'}.md</p>
    </div>
  );
};

export default ServicePage;