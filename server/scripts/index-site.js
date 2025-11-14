import { readdir, readFile, stat } from 'fs/promises'
import { join, extname } from 'path'
import { writeFileSync } from 'fs'

const ROOT = process.cwd()
const SRC = join(ROOT, 'src')
const OUTPUT = join(ROOT, 'server', 'site-content.json')

async function scan(dir, base = '') {
  const entries = await readdir(dir, { withFileTypes: true })
  const results = []

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    const relativePath = join(base, entry.name)

    if (entry.isDirectory() && !['node_modules', '.git'].includes(entry.name)) {
      results.push(...await scan(fullPath, relativePath))
    } else if (entry.isFile()) {
      const ext = extname(entry.name)
      if (['.vue', '.md', '.html'].includes(ext)) {
        const content = await readFile(fullPath, 'utf-8')
        results.push({
          path: relativePath,
          type: ext,
          content: content.substring(0, 5000) // limite taille
        })
      }
    }
  }
  return results
}

console.log('🔍 Indexation du site...')
const pages = await scan(SRC)
const index = {
  siteName: 'EVAM',
  lastUpdate: new Date().toISOString(),
  pages
}

writeFileSync(OUTPUT, JSON.stringify(index, null, 2))
console.log(`✅ Index créé : ${OUTPUT} (${pages.length} pages)`)
