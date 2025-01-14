import rss from './rss.mjs'
import { rmSync } from 'fs';

// Check if running in a CI environment (e.g., during deployment)
const isCI = process.env.CI === 'true';

async function postbuild() {
  await rss();

  if (isCI) {
    // Delete the .next/cache directory only during deployment
    try {
      rmSync('.next/cache', { recursive: true, force: true });
      console.log('✅ Deleted .next/cache directory (CI environment detected)');
    } catch (error) {
      console.error('❌ Failed to delete .next/cache directory:', error);
    }
  } else {
    console.log('ℹ️ Skipping .next/cache deletion (not in CI environment)');
  }
}

postbuild()
