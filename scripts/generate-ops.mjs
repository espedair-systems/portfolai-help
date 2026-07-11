// scripts/generate-ops.mjs
import fs from 'fs';
import path from 'path';

// Directory containing source markdown operation docs (the source of truth)
const srcDir = path.resolve('./src/content/docs/imaginarium/operations');
// Destination directory for generated MDX files (same location, but with .mdx extension)
const destDir = srcDir; // generate in‑place; we keep .md files as sources and .mdx as output

// Front‑matter template – replace placeholders per file
function buildFrontmatter({ title, description, category, slug }) {
  const date = new Date().toISOString().split('T')[0];
  return `---\n` +
    `title: "${title}"\n` +
    `description: "${description}"\n` +
    `category: "${category}"\n` +
    `slug: "${slug}"\n` +
    `date: "${date}"\n` +
    `tags: []\n` +
    `image: "/assets/operations/${slug}.png"\n` +
    `---\n\n`;
}

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^[-_]+|[-_]+$/g, '');
}

function titleFromFile(name) {
  // Strip extension and replace dashes/underscores with spaces, then capitalize words
  const base = name.replace(/\.[^.]+$/, '');
  return base
    .split(/[-_]/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function descriptionFromContent(content) {
  // Use first non‑empty line after possible front‑matter as description
  const lines = content.split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) return trimmed.replace(/"/g, '\\"');
  }
  return '';
}

if (!fs.existsSync(srcDir)) {
  console.error(`Source directory does not exist: ${srcDir}`);
  process.exit(1);
}

fs.readdirSync(srcDir).forEach(file => {
  const ext = path.extname(file).toLowerCase();
  if (ext !== '.md') return; // only process markdown sources

  const srcPath = path.join(srcDir, file);
  const content = fs.readFileSync(srcPath, 'utf8');

  const title = titleFromFile(file);
  const slug = slugify(title);
  const category = path.basename(srcDir); // e.g., "operations"
  const description = descriptionFromContent(content);

  const frontmatter = buildFrontmatter({ title, description, category, slug });
  const mdxPath = path.join(destDir, `${slug}.mdx`);

  // Write MDX file – if it already exists we overwrite to keep it in sync
  fs.writeFileSync(mdxPath, frontmatter + content, 'utf8');
  console.log(`✅ Generated ${mdxPath}`);
});
