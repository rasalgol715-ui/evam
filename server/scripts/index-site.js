// server/scripts/index-site.js - Indexation intelligente du site EvaM
import { readdir, readFile, stat } from 'fs/promises'
import { join, extname } from 'path'
import { writeFileSync, mkdirSync } from 'fs'

const ROOT = process.cwd()
const SRC = join(ROOT, 'src')
const OUTPUT_DIR = join(ROOT, 'server')
const OUTPUT_FILE = join(OUTPUT_DIR, 'site-content.json')

// =============================================================================
// CONFIGURATION D'INDEXATION - ADAPTEZ À VOTRE SITE
// =============================================================================
const CONFIG = {
  // Chemins à ignorer
  ignore: [
    'node_modules',
    '.git',
    'dist',
    'server',
    '__pycache__',
    '.vscode'
  ],
  // Extensions à indexer pour l'IA
  extensions: ['.vue', '.md', '.html', '.json', '.js'],
  // Limite de caractères par fichier (évite fichiers trop gros)
  maxSize: 15000,
  // Inclure les métadonnées des fichiers
  includeMetadata: true
}

// =============================================================================
// SCANNE RÉCURSIVEMENT LE PROJET
// =============================================================================
async function scan(dir, base = '') {
  const entries = await readdir(dir, { withFileTypes: true })
  const results = []

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    const relativePath = join(base, entry.name)

    // Ignore les dossiers interdits
    if (entry.isDirectory()) {
      if (CONFIG.ignore.includes(entry.name)) continue
      try {
        results.push(...await scan(fullPath, relativePath))
      } catch (error) {
        console.warn(`⚠️ Ignoré (erreur): ${relativePath}`)
      }
    }
    // Indexe les fichiers valides
    else if (entry.isFile()) {
      const ext = extname(entry.name)
      if (!CONFIG.extensions.includes(ext)) continue

      try {
        const fileStat = await stat(fullPath)
        const content = await readFile(fullPath, 'utf-8')

        // Extraction intelligente du contenu
        const pageData = {
          path: relativePath.replace(/\\/g, '/'), // Normalise les chemins
          type: ext,
          size: fileStat.size,
          modified: fileStat.mtime.toISOString(),
          // Extrait le contenu pertinent
          content: extractRelevantContent(content, ext),
          excerpt: content.substring(0, 300) // Pour l'aperçu
        }

        results.push(pageData)
        console.log(`✅ Indexé: ${relativePath}`)
      } catch (error) {
        console.warn(`⚠️ Impossible de lire: ${relativePath}`)
      }
    }
  }
  return results
}

// =============================================================================
// EXTRACTION INTELLIGENTE DU CONTENU
// =============================================================================
function extractRelevantContent(content, extension) {
  const maxSize = CONFIG.maxSize

  switch (extension) {
    case '.vue':
      // Supprime les balises <script> et <style>, garde le <template>
      const templateMatch = content.match(/<template>([\s\S]*?)<\/template>/i)
      return templateMatch ? templateMatch[1].substring(0, maxSize) : content.substring(0, maxSize)

    case '.md':
      // Garde les en-têtes et paragraphes importants
      return content
        .split('\n')
        .filter(line => line.startsWith('#') || line.length > 50)
        .join('\n')
        .substring(0, maxSize)

    case '.json':
      // Analyse les fichiers JSON pour résumé
      try {
        const data = JSON.parse(content)
        return `JSON: ${Object.keys(data).length} clés, type: ${Array.isArray(data) ? 'array' : 'object'}`
      } catch {
        return 'JSON invalide'
      }

    default:
      return content.substring(0, maxSize)
  }
}

// =============================================================================
// GÉNÉRATION DE L'INDEX POUR L'IA
// =============================================================================
async function generateIndex() {
  console.log('🔍 Indexation du site EvaM...')

  // Crée le dossier server s'il n'existe pas
  mkdirSync(OUTPUT_DIR, { recursive: true })

  const pages = await scan(SRC)

  // Génère un résumé pour l'IA
  const summary = {
    siteName: 'EvaM Group',
    lastUpdate: new Date().toISOString(),
    totalPages: pages.length,
    subjects: ['Mathématiques', 'Physique-Chimie', 'Informatique'],
    levels: ['Terminale', 'Première', 'Seconde'],
    pages: pages
  }

  // Écrit le fichier JSON
  writeFileSync(OUTPUT_FILE, JSON.stringify(summary, null, 2))

  console.log(`✅ Index créé: ${OUTPUT_FILE}`)
  console.log(`📊 ${pages.length} pages indexées`)
  console.log(`📁 Taille: ${Math.round(writeFileSync.bytesWritten / 1024)}KB`)
}

// =============================================================================
// LANCEMENT
// =============================================================================
generateIndex().catch(error => {
  console.error('💥 Erreur fatale:', error)
  process.exit(1)
})
