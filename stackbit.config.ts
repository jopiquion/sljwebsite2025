// stackbit.config.ts
import { defineStackbitConfig } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
  stackbitVersion: "~0.6.0",
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ["content"],
      models: [
        // Main Pages
        {
          name: "Page",
          type: "page",
          urlPath: "/{slug}",
          filePath: "content/pages/{slug}.json",
          fields: [
            { name: "title", type: "string", required: true },
            { name: "slug", type: "string", required: true },
            { name: "metaTitle", type: "string" },
            { name: "metaDescription", type: "text" },
            { name: "heroImage", type: "image" },
            { name: "heroVideo", type: "file" },
            { name: "heroTitle", type: "string" },
            { name: "heroSubtitle", type: "text" },
            { name: "heroOverlay", type: "boolean", default: false },
            { name: "content", type: "markdown" },
            { name: "sections", type: "list", of: {
              type: "object",
              fields: [
                { name: "title", type: "string" },
                { name: "content", type: "markdown" },
                { name: "image", type: "image" },
                { name: "video", type: "file" },
                { name: "imageOverlay", type: "boolean", default: false },
                { name: "videoOverlay", type: "boolean", default: false },
                { name: "overlayText", type: "text" },
                { name: "buttonText", type: "string" },
                { name: "buttonLink", type: "string" }
              ]
            }},
            { name: "seo", type: "object", fields: [
              { name: "title", type: "string" },
              { name: "description", type: "text" },
              { name: "image", type: "image" },
              { name: "keywords", type: "string" }
            ]}
          ]
        },

        // Products
        {
          name: "Product",
          type: "page",
          urlPath: "/products/{slug}",
          filePath: "content/products/{slug}.json",
          fields: [
            { name: "name", type: "string", required: true },
            { name: "slug", type: "string", required: true },
            { name: "description", type: "markdown", required: true },
            { name: "shortDescription", type: "text" },
            { name: "image", type: "image", required: true },
            { name: "gallery", type: "list", of: { type: "image" }},
            { name: "category", type: "string", required: true },
            { name: "subcategory", type: "string" },
            { name: "features", type: "list", of: { type: "string" }},
            { name: "specifications", type: "list", of: {
              type: "object",
              fields: [
                { name: "name", type: "string" },
                { name: "value", type: "string" }
              ]
            }},
            { name: "applications", type: "list", of: { type: "string" }},
            { name: "relatedProducts", type: "list", of: { type: "string" }},
            { name: "price", type: "string" },
            { name: "availability", type: "string" },
            { name: "minimumOrder", type: "string" },
            { name: "leadTime", type: "string" },
            { name: "certifications", type: "list", of: { type: "string" }},
            { name: "dataSheet", type: "file" },
            { name: "video", type: "file" },
            { name: "featured", type: "boolean", default: false },
            { name: "active", type: "boolean", default: true },
            { name: "metaTitle", type: "string" },
            { name: "metaDescription", type: "text" },
            { name: "seo", type: "object", fields: [
              { name: "title", type: "string" },
              { name: "description", type: "text" },
              { name: "image", type: "image" },
              { name: "keywords", type: "string" }
            ]}
          ]
        },

        // Services
        {
          name: "Service",
          type: "page",
          urlPath: "/services/{slug}",
          filePath: "content/services/{slug}.json",
          fields: [
            { name: "name", type: "string", required: true },
            { name: "slug", type: "string", required: true },
            { name: "description", type: "markdown", required: true },
            { name: "shortDescription", type: "text" },
            { name: "image", type: "image", required: true },
            { name: "gallery", type: "list", of: { type: "image" }},
            { name: "category", type: "string" },
            { name: "features", type: "list", of: { type: "string" }},
            { name: "process", type: "list", of: {
              type: "object",
              fields: [
                { name: "step", type: "string" },
                { name: "description", type: "text" },
                { name: "icon", type: "image" }
              ]
            }},
            { name: "benefits", type: "list", of: { type: "string" }},
            { name: "industries", type: "list", of: { type: "string" }},
            { name: "pricing", type: "string" },
            { name: "duration", type: "string" },
            { name: "video", type: "file" },
            { name: "testimonials", type: "list", of: {
              type: "object",
              fields: [
                { name: "client", type: "string" },
                { name: "quote", type: "text" },
                { name: "position", type: "string" },
                { name: "company", type: "string" }
              ]
            }},
            { name: "caseStudies", type: "list", of: { type: "string" }},
            { name: "active", type: "boolean", default: true },
            { name: "featured", type: "boolean", default: false },
            { name: "metaTitle", type: "string" },
            { name: "metaDescription", type: "text" },
            { name: "seo", type: "object", fields: [
              { name: "title", type: "string" },
              { name: "description", type: "text" },
              { name: "image", type: "image" },
              { name: "keywords", type: "string" }
            ]}
          ]
        },

        // Blog Posts
        {
          name: "BlogPost",
          type: "page",
          urlPath: "/blog/{slug}",
          filePath: "content/blog/{slug}.json",
          fields: [
            { name: "title", type: "string", required: true },
            { name: "slug", type: "string", required: true },
            { name: "content", type: "markdown", required: true },
            { name: "excerpt", type: "text" },
            { name: "featuredImage", type: "image" },
            { name: "gallery", type: "list", of: { type: "image" }},
            { name: "video", type: "file" },
            { name: "author", type: "string", required: true },
            { name: "date", type: "datetime", required: true },
            { name: "lastModified", type: "datetime" },
            { name: "category", type: "string" },
            { name: "tags", type: "list", of: { type: "string" }},
            { name: "readingTime", type: "number" },
            { name: "featured", type: "boolean", default: false },
            { name: "published", type: "boolean", default: true },
            { name: "relatedPosts", type: "list", of: { type: "string" }},
            { name: "metaTitle", type: "string" },
            { name: "metaDescription", type: "text" },
            { name: "seo", type: "object", fields: [
              { name: "title", type: "string" },
              { name: "description", type: "text" },
              { name: "image", type: "image" },
              { name: "keywords", type: "string" }
            ]}
          ]
        },

        // Site Configuration
        {
          name: "SiteConfig",
          type: "data",
          singleInstance: true,
          filePath: "content/config.json",
          fields: [
            { name: "siteName", type: "string", required: true },
            { name: "siteUrl", type: "string", required: true },
            { name: "description", type: "text" },
            { name: "logo", type: "image" },
            { name: "favicon", type: "image" },
            { name: "defaultImage", type: "image" },
            { name: "contactEmail", type: "string" },
            { name: "contactPhone", type: "string" },
            { name: "address", type: "text" },
            { name: "socialMedia", type: "object", fields: [
              { name: "twitter", type: "string" },
              { name: "facebook", type: "string" },
              { name: "instagram", type: "string" },
              { name: "linkedin", type: "string" },
              { name: "youtube", type: "string" }
            ]},
            { name: "seo", type: "object", fields: [
              { name: "defaultTitle", type: "string" },
              { name: "defaultDescription", type: "text" },
              { name: "defaultImage", type: "image" },
              { name: "keywords", type: "string" }
            ]}
          ]
        },

        // Navigation Menu
        {
          name: "Navigation",
          type: "data",
          singleInstance: true,
          filePath: "content/navigation.json",
          fields: [
            { name: "mainMenu", type: "list", of: {
              type: "object",
              fields: [
                { name: "label", type: "string", required: true },
                { name: "url", type: "string", required: true },
                { name: "icon", type: "image" },
                { name: "newTab", type: "boolean", default: false },
                { name: "subMenu", type: "list", of: {
                  type: "object",
                  fields: [
                    { name: "label", type: "string" },
                    { name: "url", type: "string" },
                    { name: "icon", type: "image" }
                  ]
                }}
              ]
            }},
            { name: "footerMenu", type: "list", of: {
              type: "object",
              fields: [
                { name: "label", type: "string", required: true },
                { name: "url", type: "string", required: true },
                { name: "newTab", type: "boolean", default: false }
              ]
            }}
          ]
        },

        // Footer Configuration
        {
          name: "Footer",
          type: "data",
          singleInstance: true,
          filePath: "content/footer.json",
          fields: [
            { name: "companyInfo", type: "object", fields: [
              { name: "name", type: "string" },
              { name: "description", type: "text" },
              { name: "logo", type: "image" },
              { name: "address", type: "text" },
              { name: "phone", type: "string" },
              { name: "email", type: "string" }
            ]},
            { name: "sections", type: "list", of: {
              type: "object",
              fields: [
                { name: "title", type: "string" },
                { name: "links", type: "list", of: {
                  type: "object",
                  fields: [
                    { name: "label", type: "string" },
                    { name: "url", type: "string" }
                  ]
                }}
              ]
            }},
            { name: "socialLinks", type: "list", of: {
              type: "object",
              fields: [
                { name: "platform", type: "string" },
                { name: "url", type: "string" },
                { name: "icon", type: "image" }
              ]
            }},
            { name: "copyrightText", type: "string" },
            { name: "additionalText", type: "text" }
          ]
        },

        // Header Configuration
        {
          name: "Header",
          type: "data",
          singleInstance: true,
          filePath: "content/header.json",
          fields: [
            { name: "logo", type: "image" },
            { name: "logoAlt", type: "string" },
            { name: "siteName", type: "string" },
            { name: "tagline", type: "string" },
            { name: "showSearch", type: "boolean", default: false },
            { name: "contactButton", type: "object", fields: [
              { name: "show", type: "boolean", default: true },
              { name: "text", type: "string" },
              { name: "url", type: "string" }
            ]},
            { name: "topBar", type: "object", fields: [
              { name: "show", type: "boolean", default: false },
              { name: "phone", type: "string" },
              { name: "email", type: "string" },
              { name: "hours", type: "string" }
            ]}
          ]
        },

        // Contact Form Configuration
        {
          name: "ContactForm",
          type: "data",
          singleInstance: true,
          filePath: "content/contact-form.json",
          fields: [
            { name: "title", type: "string" },
            { name: "description", type: "text" },
            { name: "successMessage", type: "text" },
            { name: "errorMessage", type: "text" },
            { name: "fields", type: "object", fields: [
              { name: "firstName", type: "object", fields: [
                { name: "label", type: "string" },
                { name: "required", type: "boolean", default: true },
                { name: "placeholder", type: "string" }
              ]},
              { name: "lastName", type: "object", fields: [
                { name: "label", type: "string" },
                { name: "required", type: "boolean", default: true },
                { name: "placeholder", type: "string" }
              ]},
              { name: "email", type: "object", fields: [
                { name: "label", type: "string" },
                { name: "required", type: "boolean", default: true },
                { name: "placeholder", type: "string" }
              ]},
              { name: "phone", type: "object", fields: [
                { name: "label", type: "string" },
                { name: "required", type: "boolean", default: false },
                { name: "placeholder", type: "string" }
              ]},
              { name: "organization", type: "object", fields: [
                { name: "label", type: "string" },
                { name: "required", type: "boolean", default: false },
                { name: "placeholder", type: "string" }
              ]},
              { name: "productInquiry", type: "object", fields: [
                { name: "label", type: "string" },
                { name: "required", type: "boolean", default: true },
                { name: "placeholder", type: "string" }
              ]},
              { name: "message", type: "object", fields: [
                { name: "label", type: "string" },
                { name: "required", type: "boolean", default: true },
                { name: "placeholder", type: "string" }
              ]},
              { name: "fileUpload", type: "object", fields: [
                { name: "label", type: "string" },
                { name: "required", type: "boolean", default: false },
                { name: "allowedTypes", type: "string" },
                { name: "maxSize", type: "string" }
              ]}
            ]}
          ]
        }
      ],
      assetsConfig: {
        referenceType: "static",
        staticDir: ".", // Root directory since your files are in root
        uploadDir: "pics", // CDN folder where images will be uploaded
        publicPath: "https://sljtradingcompany.b-cdn.net/" // Your Bunny CDN URL
      }
    })
  ]
});
