import { defineStackbitConfig } from '@stackbit/types';
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
  // This version specifies the Stackbit configuration schema your project uses.
  // We're aligning it with the packages we're aiming to install (0.6.0).
  stackbitVersion: '~0.6.0',
  
  // Specifies the Static Site Generator (SSG) you're using.
  // 'nextjs' is the common one for Next.js, but 'custom' is also an option
  // if you're defining your own build/dev commands.
  ssgName: 'custom', 
  
  // Node.js version for the build environment. Ensure this matches Netlify's.
  nodeVersion: '18', 
  
  // Define where your content is stored and how Stackbit interacts with it.
  contentSources: [
    new GitContentSource({
      // The root directory where your content files are located, relative to the project root.
      rootPath: './content', 
      
      // Subdirectories within 'rootPath' that contain content files to be managed by Stackbit.
      // These should correspond to your content structure (e.g., content/pages, content/products).
      contentDirs: ['pages', 'products', 'services', 'blog'],
      
      // IMPORTANT: For `stackbitVersion: '~0.6.0'` and corresponding SDK packages,
      // this 'models' property is required and expects an array of strings
      // representing the names of your content models defined globally.
      models: ['page', 'product', 'service', 'post'], 
      
      // Configuration for how Stackbit handles and references asset files (images, etc.).
      assetsConfig: {
        referenceType: 'static', // Indicates assets are served as static files.
        staticDir: 'public',     // The directory where your SSG places static assets.
        uploadDir: 'images',     // A subdirectory within 'staticDir' where uploaded images will go.
        publicPath: '/images'    // The public URL path to access assets (e.g., /images/my-image.jpg).
      }
    })
  ],
  
  // Define your content models (schemas) for different types of content.
  // These schemas dictate the fields and their types for your Markdown/data files.
  models: {
    page: {
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
    
    post: { // Changed from 'blog' to 'post' for individual articles.
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
  
  // Commands for Stackbit to run your development and build processes.
  devCommand: 'npm run dev',
  buildCommand: 'npm run build',
  publishDir: './out', // The directory where Next.js exports your static site.
  
  // Presets can be used for different site configurations or templates.
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
