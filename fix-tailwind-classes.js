const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Define the class mappings
const classReplacements = {
  // Gradient classes
  'bg-linear-to-b': 'bg-linear-to-b',
  'bg-linear-to-r': 'bg-linear-to-r',
  'bg-linear-to-br': 'bg-linear-to-br',

  // Opacity classes with brackets
  'from-white/\\[0\\.06\\]': 'from-white/6',
  'from-white/\\[0\\.04\\]': 'from-white/4',
  'to-white/\\[0\\.02\\]': 'to-white/2',
  'border-white/\\[0\\.15\\]': 'border-white/15',
  'border-white/\\[0\\.12\\]': 'border-white/12',
  'border-white/\\[0\\.08\\]': 'border-white/8',
  'hover:bg-white/\\[0\\.04\\]': 'hover:bg-white/4',
  'hover:border-white/\\[0\\.16\\]': 'hover:border-white/16',
  'hover:border-white/\\[0\\.12\\]': 'hover:border-white/12',
  'via-blue-500/\\[0\\.02\\]': 'via-blue-500/2',
  'to-blue-500/\\[0\\.03\\]': 'to-blue-500/3',

  // Flex classes
  'shrink-0': 'shrink-0'
};

function fixFile(filePath) {
  console.log(`Fixing ${filePath}...`);

  let content = fs.readFileSync(filePath, 'utf8');
  let changesMade = false;

  // Apply all replacements
  Object.entries(classReplacements).forEach(([oldClass, newClass]) => {
    const regex = new RegExp(oldClass, 'g');
    const originalContent = content;
    content = content.replace(regex, newClass);

    if (content !== originalContent) {
      changesMade = true;
      console.log(`  Replaced ${oldClass} with ${newClass}`);
    }
  });

  if (changesMade) {
    fs.writeFileSync(filePath, content);
    console.log(`  ✅ Fixed ${filePath}`);
    return true;
  } else {
    console.log(`  ⭕ No changes needed for ${filePath}`);
    return false;
  }
}

function findFilesToFix(dir) {
  const files = [];

  function walkDir(currentDir) {
    const items = fs.readdirSync(currentDir);

    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        // Skip node_modules, .git, .next
        if (!['node_modules', '.git', '.next', '.vercel'].includes(item)) {
          walkDir(fullPath);
        }
      } else if (stat.isFile()) {
        // Include .tsx, .ts, .jsx, .js files
        if (/\.(tsx?|jsx?)$/.test(item)) {
          files.push(fullPath);
        }
      }
    }
  }

  walkDir(dir);
  return files;
}

function main() {
  console.log('🔧 Starting Tailwind class fixes...\n');

  const projectRoot = process.cwd();
  const files = findFilesToFix(projectRoot);

  console.log(`Found ${files.length} files to check\n`);

  let totalFilesFixed = 0;

  files.forEach(file => {
    if (fixFile(file)) {
      totalFilesFixed++;
    }
  });

  console.log(`\n✅ Fixed ${totalFilesFixed} files out of ${files.length} checked`);

  if (totalFilesFixed > 0) {
    console.log('\n🚀 All Tailwind class warnings should now be resolved!');
  } else {
    console.log('\n⭕ No files needed fixing');
  }
}

main();