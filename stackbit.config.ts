import { defineStackbitConfig } from '@stackbit/types';
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
  stackbitVersion: '~0.7.0', 
  ssgName: 'custom',
  nodeVersion: '20', 

  contentSources: [
    new GitContentSource({
      rootPath: './content', 
      contentDirs: ['pages', 'products', 'services', 'blog'],
      
      models: [
        {
          name: 'page', 
          type: 'page',
          urlPath: '/{slug}',
          filePath: 'pages/{slug}.md', // CHANGED: Removed 'content/' prefix
          fields: [
            { name: 'title', type: 'string', required: true, label: 'Page Title' },
            { name: 'description', type: 'text', label: 'Meta Description' },
            { name: 'layout', type: 'string', default: 'page', hidden: true },
            { name: 'body', type: 'markdown', label: 'Page Content' }
          ]
        },
        {
          name: 'product', 
          type: 'page',
          urlPath: '/products/{slug}',
          filePath: 'products/{slug}.md', // CHANGED: Removed 'content/' prefix
          fields: [
            { name: 'title', type: 'string', required: true, label: 'Product Name' },
            { name: 'description', type: 'text', label: 'Product Description' },
            {
              name: 'category',
              type: 'enum',
              options: [
                'agro-commodities',
                'metals',
                'minerals',
                'petroleum-products',
                'sugar',
                'rice',
                'steel',
                'emeralds'
              ],
              label: 'Product Category'
            },
            { name: 'featured_image', type: 'image', label: 'Product Image' },
            { name: 'price_range', type: 'string', label: 'Price Range' },
            {
              name: 'specifications',
              type: 'list',
              items: {
                type: 'object',
                fields: [
                  { name: 'name', type: 'string', label: 'Specification Name' },
                  { name: 'value', type: 'string', label: 'Value' }
                ]
              },
              label: 'Product Specifications'
            },
            { name: 'body', type: 'markdown', label: 'Product Details' }
          ]
        },
        {
          name: 'service', 
          type: 'page',
          urlPath: '/services/{slug}',
          filePath: 'services/{slug}.md', // CHANGED: Removed 'content/' prefix
          fields: [
            { name: 'title', type: 'string', required: true, label: 'Service Name' },
            { name: 'description', type: 'text', label: 'Service Description' },
            { name: 'icon', type: 'image', label: 'Service Icon' },
            {
              name: 'features',
              type: 'list',
              items: { type: 'string' },
              label: 'Key Features'
            },
            { name: 'body', type: 'markdown', label: 'Service Details' }
          ]
        },
        {
          name: 'post', 
          type: 'page',
          urlPath: '/blog/{slug}',
          filePath: 'blog/{slug}.md', // CHANGED: Removed 'content/' prefix
          fields: [
            { name: 'title', type: 'string', required: true, label: 'Post Title' },
            { name: 'date', type: 'datetime', required: true, label: 'Publish Date' },
            { name: 'author', type: 'string', label: 'Author' },
            { name: 'excerpt', type: 'text', label: 'Post Excerpt' },
            { name: 'featured_image', type: 'image', label: 'Featured Image' },
            {
              name: 'tags',
              type: 'list',
              items: { type: 'string' },
              label: 'Tags'
            },
            { name: 'body', type: 'markdown', label: 'Post Content' }
          ]
        }
      ]
    })
  ],
  
  devCommand: 'npm run dev',
  buildCommand: 'npm run build',
  publishDir: './out'
});