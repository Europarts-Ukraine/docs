import {readdir, readFile, stat} from 'node:fs/promises';
import path from 'node:path';

const buildDir = path.resolve('build');

const blockedPathFragments = [
  `${path.sep}internal${path.sep}`,
  `${path.sep}implementation${path.sep}`,
  `${path.sep}support${path.sep}`,
  `${path.sep}engineering${path.sep}`,
  `${path.sep}operations${path.sep}`,
  `${path.sep}decisions${path.sep}`,
];

const blockedContent = [
  'Internal Knowledge Base',
  'Open internal docs',
  'Implementation Guide',
  'Support Playbook',
  'Engineering Docs',
  'Backend Development',
  'Frontend Development',
  'Architecture Decisions',
  'Deployment Model',
  'documentation-split',
  'content/internal',
  'docusaurus.internal.config',
];

const textExtensions = new Set([
  '.html',
  '.js',
  '.json',
  '.css',
  '.txt',
  '.xml',
]);

async function walk(dir) {
  const entries = await readdir(dir, {withFileTypes: true});
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

async function main() {
  await stat(buildDir);
  const files = await walk(buildDir);

  const pathLeaks = files.filter((file) =>
    blockedPathFragments.some((fragment) => file.includes(fragment)),
  );

  if (pathLeaks.length > 0) {
    throw new Error(
      `Public build contains internal path fragments:\n${pathLeaks.join('\n')}`,
    );
  }

  const contentLeaks = [];

  for (const file of files) {
    if (!textExtensions.has(path.extname(file))) {
      continue;
    }

    const content = await readFile(file, 'utf8');
    const matches = blockedContent.filter((marker) => content.includes(marker));

    if (matches.length > 0) {
      contentLeaks.push(`${file}: ${matches.join(', ')}`);
    }
  }

  if (contentLeaks.length > 0) {
    throw new Error(
      `Public build contains internal-only markers:\n${contentLeaks.join('\n')}`,
    );
  }

  console.log('Public build privacy check passed.');
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
