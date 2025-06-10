const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const MarkdownIt = require('markdown-it');

// Initialize markdown parser
const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true
});

console.log('🚀 Starting build process...');

// Read the template file
let template;
try {
  template = fs.readFileSync('template.html', 'utf8');
  console.log('✅ Template loaded');
} catch (error) {
  console.error('❌ Could not read template.html:', error.message);
  process.exit(1);
}

// Function to process a single markdown file
function processMarkdownFile(filePath, outputPath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content: markdownContent } = matter(content);
    
    // Convert markdown to HTML
    const htmlContent = md.render(markdownContent);
    
    // Replace placeholders in template
    let finalHtml = template
      .replace(/\{\{title\}\}/g, frontmatter.title || 'SLJ Trading')
      .replace(/\{\{description\}\}/g, frontmatter.description || 'Global trading solutions')
      .replace(/\{\{content\}\}/g, htmlContent);
    
    // Write the output file
    fs.writeFileSync(outputPath, finalHtml);
    console.log(`✅ Generated: ${outputPath}`);
    
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
}

// Function to process all files in a directory
function processDirectory(contentDir, outputDir = './') {
  if (!fs.existsSync(contentDir)) {
    console.log(`⚠️  Directory ${contentDir} doesn't exist, skipping...`);
    return;
  }
  
  const files = fs.readdirSync(contentDir);
  
  files.forEach(file => {
    if (file.endsWith('.md')) {
      const inputPath = path.join(contentDir, file);
      const outputFileName = file.replace('.md', '.html');
      const outputPath = path.join(outputDir, outputFileName);
      
      processMarkdownFile(inputPath, outputPath);
    }
  });
}

// Process different content directories
console.log('📝 Processing markdown files...');

// Process pages (output to root)
processDirectory('./content/pages', './');

// Process products (output to root with product- prefix or products folder)
if (fs.existsSync('./content/products')) {
  // Create products directory if it doesn't exist
  if (!fs.existsSync('./products')) {
    fs.mkdirSync('./products');
  }
  processDirectory('./content/products', './products/');
}

// Process services
if (fs.existsSync('./content/services')) {
  if (!fs.existsSync('./services')) {
    fs.mkdirSync('./services');
  }
  processDirectory('./content/services', './services/');
}

// Process blog posts
if (fs.existsSync('./content/blog')) {
  if (!fs.existsSync('./blog')) {
    fs.mkdirSync('./blog');
  }
  processDirectory('./content/blog', './blog/');
}

console.log('🎉 Build complete!');
console.log('');
console.log('Next steps:');
console.log('1. Review the generated HTML files');
console.log('2. Test your site locally');
console.log('3. Commit changes to Git');
console.log('4. Deploy to Netlify');
