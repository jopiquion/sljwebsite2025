import { defineStackbitConfig } from '@stackbit/types';
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
  stackbitVersion: '~0.6.0',
  ssgName: 'custom',
  nodeVersion: '18',
  
  // Define where your content is stored
  contentSources: [
    {
      name: 'local',
      type: 'file',
      rootPath: './content'
    }
  ],

  // Define your content models
  models: {
    // Main pages model
    page: {
      type: 'page',
      urlPath: '/{slug}',
      filePath: 'content/pages/{slug}.md',
      fields: [
        {
          name: 'title',
          type: 'string',
          required: true,
          label: 'Page Title'
        },
        {
          name: 'description',
          type: 'text',
          label: 'Meta Description'
        },
        {
          name: 'layout',
          type: 'string',
          default: 'page',
          hidden: true
        },
        {
          name: 'body',
          type: 'markdown',
          label: 'Page Content'
        }
      ]
    },

    // Products model - based on your HTML files
    product: {
      type: 'page',
      urlPath: '/products/{slug}',
      filePath: 'content/products/{slug}.md',
      fields: [
        {
          name: 'title',
          type: 'string',
          required: true,
          label: 'Product Name'
        },
        {
          name: 'description',
          type: 'text',
          label: 'Product Description'
        },
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
        {
          name: 'featured_image',
          type: 'image',
          label: 'Product Image'
        },
        {
          name: 'price_range',
          type: 'string',
          label: 'Price Range'
        },
        {
          name: 'specifications',
          type: 'list',
          items: {
            type: 'object',
            fields: [
              {
                name: 'name',
                type: 'string',
                label: 'Specification Name'
              },
              {
                name: 'value',
                type: 'string',
                label: 'Value'
              }
            ]
          },
          label: 'Product Specifications'
        },
        {
          name: 'body',
          type: 'markdown',
          label: 'Product Details'
        }
      ]
    },

    // Services model
    service: {
      type: 'page',
      urlPath: '/services/{slug}',
      filePath: 'content/services/{slug}.md',
      fields: [
        {
          name: 'title',
          type: 'string',
          required: true,
          label: 'Service Name'
        },
        {
          name: 'description',
          type: 'text',
          label: 'Service Description'
        },
        {
          name: 'icon',
          type: 'image',
          label: 'Service Icon'
        },
        {
          name: 'features',
          type: 'list',
          items: {
            type: 'string'
          },
          label: 'Key Features'
        },
        {
          name: 'body',
          type: 'markdown',
          label: 'Service Details'
        }
      ]
    },

    // Blog posts model
    post: {
      type: 'page',
      urlPath: '/blog/{slug}',
      filePath: 'content/blog/{slug}.md',
      fields: [
        {
          name: 'title',
          type: 'string',
          required: true,
          label: 'Post Title'
        },
        {
          name: 'date',
          type: 'datetime',
          required: true,
          label: 'Publish Date'
        },
        {
          name: 'author',
          type: 'string',
          label: 'Author'
        },
        {
          name: 'excerpt',
          type: 'text',
          label: 'Post Excerpt'
        },
        {
          name: 'featured_image',
          type: 'image',
          label: 'Featured Image'
        },
        {
          name: 'tags',
          type: 'list',
          items: {
            type: 'string'
          },
          label: 'Tags'
        },
        {
          name: 'body',
          type: 'markdown',
          label: 'Post Content'
        }
      ]
    }
  },

  // Define the dev command for local development
  devCommand: 'npm run dev',
  
  // Build settings
  buildCommand: 'npm run build',
  publishDir: './',
  
  // Define how content maps to your site
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
