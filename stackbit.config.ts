import { defineStackbitConfig } from '@stackbit/types';
import { GitContentSource } from "@stackbit/cms-git";

// Define your content models first, so they can be referenced
const pageModel = {
  type: 'page',
  urlPath: '/{slug}',
  filePath: 'content/pages/{slug}.md',
  fields: [
    { name: 'title', type: 'string', required: true, label: 'Page Title' },
    { name: 'description', type: 'text', label: 'Meta Description' },
    { name: 'layout', type: 'string', default: 'page', hidden: true },
    { name: 'body', type: 'markdown', label: 'Page Content' }
  ]
};

const productModel = {
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
};

const serviceModel = {
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
};

const postModel = {
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
};


export default defineStackbitConfig({
  // Aligning with the newer packages, let's use a version that exists and supports this API.
  // Given your packages are 1.x.x and 2.x.x, a stackbitVersion like '~0.7.0' or '~1.0.0' might be appropriate.
  // Let's try '~0.7.0' as it was often used with slightly newer GitContentSource APIs.
  stackbitVersion: '~0.7.0', 
  ssgName: 'custom',
  nodeVersion: '18',
  
  contentSources: [
    new GitContentSource({
      rootPath: './content',
      contentDirs: ['pages', 'products', 'services', 'blog'],
      
      // CHANGE THIS LINE: Now, instead of strings, reference the actual model objects.
      models: [pageModel, productModel, serviceModel, postModel],
      
      assetsConfig: {
        referenceType: 'static',
        staticDir: 'public',
        uploadDir: 'images',
        publicPath: '/images'
      }
    })
  ],
  
  // The global models object is still needed and where the models are defined.
  models: {
    page: pageModel,
    product: productModel,
    service: serviceModel,
    post: postModel
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
