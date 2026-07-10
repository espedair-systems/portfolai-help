import fs from 'fs';
import path from 'path';

const deskPath = process.env.PORTFOLAI_DESK_PATH || '../portfolai-desk';
const imagPath = process.env.PORTFOLAI_IMAGINARIUM_PATH || '../portfolai-imaginarium';

const srcDesk = path.resolve(deskPath, 'help');
const srcImag = path.resolve(imagPath, 'help');

const destDesk = path.resolve('./src/content/docs/desktop');
const destImag = path.resolve('./src/content/docs/imaginarium');

const addFrontmatterIfMissing = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if it already has frontmatter
  const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  
  let hasTitle = false;
  let frontmatterContent = '';
  
  if (frontmatterMatch) {
    frontmatterContent = frontmatterMatch[1];
    // Check if title is defined in frontmatter
    hasTitle = /^\s*title\s*:/m.test(frontmatterContent);
  }
  
  if (!hasTitle) {
    // Attempt to extract first H1 heading
    const h1Match = content.match(/^#\s+(.+)$/m);
    let title = '';
    if (h1Match) {
      title = h1Match[1].trim();
      // Remove the original # H1 line so it doesn't duplicate with Starlight's auto-generated title
      content = content.replace(/^#\s+.+$/m, '').trim();
    } else {
      // Fallback to capitalized file name without extension
      const basename = path.basename(filePath, path.extname(filePath));
      title = basename.charAt(0).toUpperCase() + basename.slice(1);
    }
    
    // Clean up title if it contains markdown symbols
    title = title.replace(/[`*_\\[\\]]/g, '').trim();
    
    if (frontmatterMatch) {
      // Append title to existing frontmatter
      const updatedFrontmatter = `---\n${frontmatterContent.trim()}\ntitle: "${title}"\n---`;
      content = content.replace(/^---\r?\n[\s\S]*?\r?\n---/, updatedFrontmatter);
    } else {
      // Create new frontmatter
      content = `---\ntitle: "${title}"\n---\n\n${content}`;
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
  }
};

function syncDir(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn(`⚠️ Source path does not exist: ${src}. Skipping sync.`);
    return;
  }
  // Clear destination
  if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true, force: true });
  }
  fs.mkdirSync(dest, { recursive: true });

  // Copy helper
  const copyRecursive = (s, d) => {
    const stats = fs.statSync(s);
    if (stats.isDirectory()) {
      if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
      fs.readdirSync(s).forEach(child => {
        copyRecursive(path.join(s, child), path.join(d, child));
      });
    } else {
      fs.copyFileSync(s, d);
      // Post-process copied markdown files to ensure Starlight validation passes
      if (d.endsWith('.md') || d.endsWith('.mdx')) {
        addFrontmatterIfMissing(d);
      }
    }
  };

  copyRecursive(src, dest);
  console.log(`✓ Synchronized & formatted: ${src} -> ${dest}`);
}

console.log('Synchronizing external documentation...');
syncDir(srcDesk, destDesk);
syncDir(srcImag, destImag);
