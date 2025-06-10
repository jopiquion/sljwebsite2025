import { defineStackbitConfig } from '@stackbit/types';
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
  // This stackbitVersion is important as it dictates the expected API behavior.
  // Given the error, it seems to enforce 'models' in GitContentSource.
  stackbitVersion: '~0.6.0',
  ssgName: 'custom',
  nodeVersion: '18', // Ensure this matches your Netlify build environment (which it does)
  
  // Define where your content is stored using GitContentSource
  contentSources: [
    new GitContentSource({
      rootPath: './content', // Relative path from your project root to your content directory
      contentDirs: ['pages', 'products', 'services', 'blog'], // Subdirectories within 'rootPath' where content files live
      
      // THIS LINE IS CRUCIAL AND WAS REQUIRED BY THE ERROR MESSAGE
      // It specifies the names of the models that GitContentSource will manage.
      models: ['page', 'product', 'service', 'post'], 
      
      assetsConfig: {
        referenceType: 'static', // How assets are referenced (e.g., in markdown)
        staticDir: 'public',     // Directory where static assets are stored (e.g., `public/images`)
        uploadDir: 'images',     // Subdirectory within `staticDir` for uploaded assets
        publicPath: '/images'    // Public URL path for accessing these assets
      }
    })
  ],
  
  // Define your content models (the schema for your Markdown files)
  models: {
    // Main pages model
    page: {
      type: 'page', // Stackbit's internal type for pages
      urlPath: '/{slug}', // URL pattern for Next.js to use (e.g., /about, /contact)
      filePath: 'content/pages/{slug}.md', // Path pattern to your Markdown files
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
          name: 'layout', // Often used by SSGs to select a layout component
          type: 'string',
          default: 'page',
          hidden: true
        },
        {
          name: 'body',
          type: 'markdown', // Stackbit will provide a Markdown editor for this field
          label: 'Page Content'
        }
      ]
    },
    
    // Products model
    product: {
      type: 'page', // Products are also considered pages in terms of URL generation
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
    post: { // Changed from 'blog' to 'post' to match typical naming conventions for individual blog articles.
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
  
  // Define the dev command for local development (used by 'stackbit dev')
  devCommand: 'npm run dev',
  
  // Build settings for your SSG (Next.js in this case)
  buildCommand: 'npm run build',
  publishDir: './out', // Next.js 'next export' outputs to 'out' by default
  
  // Presets (optional, for Stackbit's own internal management)
  presets: [
    {
      name: 'default',
      label: 'Default',
      metadata: {
        created_by: 'stackbit',
        created_at: '2025-01-01T00:00:00.000Z' // Placeholder date
      }
    }
  ]
});
