import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

interface ProductPageProps {
  title: string;
  description: string;
  bodyHtml: string;
  // Add other fields from your product model here (e.g., category, featured_image, etc.)
}

const PRODUCTS_DIR = path.join(process.cwd(), 'content', 'products');

export const getStaticPaths: GetStaticPaths = async () => {
  const filenames = fs.readdirSync(PRODUCTS_DIR);
  const paths = filenames.map((filename) => ({
    params: { slug: filename.replace(/\.md$/, '') },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<ProductPageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const fullPath = path.join(PRODUCTS_DIR, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const { data, content } = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).process(content);
  const bodyHtml = processedContent.toString();

  // You would typically map 'data' (front matter) to your props
  // For simplicity, just pulling title and description here.
  // Add all other fields from your product model as needed.
  return {
    props: {
      title: data.title || 'No Title',
      description: data.description || 'No Description',
      bodyHtml,
      // Pass other fields from 'data' here
    },
  };
};

const ProductPage: React.FC<ProductPageProps> = ({ title, description, bodyHtml }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <h2>Product Details</h2>
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      <p>This is a product page. Content is fetched from content/products/{'{slug}'}.md</p>
    </div>
  );
};

export default ProductPage;