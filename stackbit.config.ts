import { defineStackbitConfig } from '@stackbit/types';
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
  stackbitVersion: '~0.7.0', // Keeping this at 0.7.0 as it seems to be accepted for overall config schema
  ssgName: 'custom',
  nodeVersion: '18',
  
  contentSources: [
    new GitContentSource({
      rootPath: './content',
      contentDirs: ['pages', 'products', 'services', 'blog'],
      
      // Here, we define the models directly within the GitContentSource array
      // This is often required by newer Stackbit SDK versions that use strict typing
      // and want the 'name' property directly on the model object being passed.
      models: [
        {
          name: 'page', // Explicitly define the name here
          type: 'page',
          urlPath: '/{slug}',
          filePath: 'content/pages/{slug}.md',
          fields: [
            { name: 'title', type: 'string', required: true, label: 'Page Title' },
            { name: 'description', type: 'text', label: 'Meta Description' },
            { name: 'layout', type: 'string', default: 'page', hidden: true },
            { name: 'body', type: 'markdown', label: 'Page Content' }
          ]
        },
        {
          name: 'product', // Explicitly define the name here
          type: 'page',
          urlPath: '/products/{slug}',
          filePath: 'content/products/{slug}.md',
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
          name: 'service', // Explicitly define the name here
          type: 'page',
          urlPath: '/services/{slug}',
          filePath: 'content/services/{slug}.md',
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
          name: 'post', // Explicitly define the name here
          type: 'page',
          urlPath: '/blog/{slug}',
          filePath: 'content/blog/{slug}.md',
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
  
  // The top-level models object still needs to be defined, but now
  // we're referencing the models by the 'name' property defined above,
  // making the structure flat here.
  models: {
    page: {
      name: 'page', // Keep the name property here too
      type: 'page',
      urlPath: '/{slug}',
      filePath: 'content/pages/{slug}.md',
      fields: [
        { name: 'title', type: 'string', required: true, label: 'Page Title' },
        { name: 'description', type: 'text', label: 'Meta Description' },
        { name: 'layout', type: 'string', default: 'page', hidden: true },
        { name: 'body', type: 'markdown', label: 'Page Content' }
      ]
    },
    
    product: {
      name: 'product', // Keep the name property here too
      type: 'page',
      urlPath: '/products/{slug}',
      filePath: 'content/products/{slug}.md',
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
    
    service: {
      name: 'service', // Keep the name property here too
      type: 'page',
      urlPath: '/services/{slug}',
      filePath: 'content/services/{slug}.md',
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
    
    post: {
      name: 'post', // Keep the name property here too
      type: 'page',
      urlPath: '/blog/{slug}',
      filePath: 'content/blog/{slug}.md',
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
  },
  
  devCommand: 'npm run dev',
  buildCommand: 'npm run build',
  publishDir: './out',
  
  presets: [
    {
      name: 'default',
      label: 'Default',
      metadata: {
        created_by: 'stackbit',
        created_at: '2025-01-01T00:00:00.000Z'
      }
    }
  ]
});