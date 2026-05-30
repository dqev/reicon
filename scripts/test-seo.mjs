#!/usr/bin/env node

/**
 * SEO Testing Script
 * Tests meta tags, OG images, and social media card compatibility
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkMetaTag(html, name, property, required = true) {
  const namePattern = new RegExp(`<meta\\s+name="${name}"[^>]*>`, 'i');
  const propertyPattern = new RegExp(`<meta\\s+property="${property}"[^>]*>`, 'i');
  
  const found = namePattern.test(html) || propertyPattern.test(html);
  
  if (found) {
    log(`  ✓ ${name || property}`, 'green');
    return true;
  } else {
    if (required) {
      log(`  ✗ ${name || property} (MISSING)`, 'red');
    } else {
      log(`  ⚠ ${name || property} (OPTIONAL)`, 'yellow');
    }
    return false;
  }
}

function extractMetaContent(html, name, property) {
  const namePattern = new RegExp(`<meta\\s+name="${name}"\\s+content="([^"]*)"`, 'i');
  const propertyPattern = new RegExp(`<meta\\s+property="${property}"\\s+content="([^"]*)"`, 'i');
  
  const nameMatch = html.match(namePattern);
  const propertyMatch = html.match(propertyPattern);
  
  return nameMatch?.[1] || propertyMatch?.[1] || null;
}

async function runTests() {
  log('\n🔍 SEO Audit Test - Reicon.dev\n', 'cyan');
  log('═'.repeat(60), 'blue');
  
  // Read index.html
  const indexPath = join(__dirname, '..', 'index.html');
  let html;
  
  try {
    html = readFileSync(indexPath, 'utf-8');
    log('\n✓ Successfully loaded index.html', 'green');
  } catch (error) {
    log('\n✗ Failed to load index.html', 'red');
    console.error(error);
    process.exit(1);
  }
  
  // Test 1: Basic Meta Tags
  log('\n📄 Test 1: Basic Meta Tags', 'magenta');
  log('─'.repeat(60), 'blue');
  checkMetaTag(html, 'description', null);
  checkMetaTag(html, 'keywords', null);
  checkMetaTag(html, 'author', null);
  checkMetaTag(html, 'robots', null);
  
  // Test 2: Open Graph Tags
  log('\n🌐 Test 2: Open Graph Tags', 'magenta');
  log('─'.repeat(60), 'blue');
  checkMetaTag(html, null, 'og:type');
  checkMetaTag(html, null, 'og:url');
  checkMetaTag(html, null, 'og:title');
  checkMetaTag(html, null, 'og:description');
  checkMetaTag(html, null, 'og:image');
  checkMetaTag(html, null, 'og:image:width');
  checkMetaTag(html, null, 'og:image:height');
  checkMetaTag(html, null, 'og:image:alt');
  checkMetaTag(html, null, 'og:image:type');
  checkMetaTag(html, null, 'og:image:secure_url', false);
  
  // Test 3: Twitter Card Tags
  log('\n🐦 Test 3: Twitter Card Tags', 'magenta');
  log('─'.repeat(60), 'blue');
  checkMetaTag(html, 'twitter:card', null);
  checkMetaTag(html, 'twitter:site', null);
  checkMetaTag(html, 'twitter:creator', null);
  checkMetaTag(html, 'twitter:domain', null);
  checkMetaTag(html, 'twitter:title', null);
  checkMetaTag(html, 'twitter:description', null);
  checkMetaTag(html, 'twitter:image', null);
  checkMetaTag(html, 'twitter:image:src', null);
  checkMetaTag(html, 'twitter:image:alt', null);
  checkMetaTag(html, 'twitter:image:width', null, false);
  checkMetaTag(html, 'twitter:image:height', null, false);
  
  // Test 4: Image URLs
  log('\n🖼️  Test 4: Image URL Validation', 'magenta');
  log('─'.repeat(60), 'blue');
  
  const ogImage = extractMetaContent(html, null, 'og:image');
  const twitterImage = extractMetaContent(html, 'twitter:image', null);
  
  if (ogImage) {
    if (ogImage.startsWith('https://')) {
      log(`  ✓ OG Image uses HTTPS: ${ogImage}`, 'green');
    } else {
      log(`  ✗ OG Image should use HTTPS: ${ogImage}`, 'red');
    }
  }
  
  if (twitterImage) {
    if (twitterImage.startsWith('https://')) {
      log(`  ✓ Twitter Image uses HTTPS: ${twitterImage}`, 'green');
    } else {
      log(`  ✗ Twitter Image should use HTTPS: ${twitterImage}`, 'red');
    }
  }
  
  if (ogImage === twitterImage) {
    log('  ✓ OG and Twitter images match', 'green');
  } else {
    log('  ⚠ OG and Twitter images differ', 'yellow');
  }
  
  // Test 5: Structured Data
  log('\n📊 Test 5: Structured Data (JSON-LD)', 'magenta');
  log('─'.repeat(60), 'blue');
  
  const jsonLdPattern = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi;
  const jsonLdMatches = [...html.matchAll(jsonLdPattern)];
  
  if (jsonLdMatches.length > 0) {
    log(`  ✓ Found ${jsonLdMatches.length} JSON-LD blocks`, 'green');
    
    jsonLdMatches.forEach((match, index) => {
      try {
        const data = JSON.parse(match[1].trim());
        log(`    ${index + 1}. ${data['@type']} schema`, 'cyan');
      } catch (error) {
        log(`    ${index + 1}. Invalid JSON-LD`, 'red');
      }
    });
  } else {
    log('  ✗ No JSON-LD structured data found', 'red');
  }
  
  // Test 6: Security Headers
  log('\n🔒 Test 6: Security Headers', 'magenta');
  log('─'.repeat(60), 'blue');
  checkMetaTag(html, null, null, false);
  
  if (html.includes('X-Content-Type-Options')) {
    log('  ✓ X-Content-Type-Options header present', 'green');
  } else {
    log('  ✗ X-Content-Type-Options header missing', 'red');
  }
  
  if (html.includes('X-Frame-Options')) {
    log('  ✓ X-Frame-Options header present', 'green');
  } else {
    log('  ✗ X-Frame-Options header missing', 'red');
  }
  
  if (html.includes('Permissions-Policy')) {
    log('  ✓ Permissions-Policy header present', 'green');
  } else {
    log('  ⚠ Permissions-Policy header missing', 'yellow');
  }
  
  // Test 7: Performance Hints
  log('\n⚡ Test 7: Performance Hints', 'magenta');
  log('─'.repeat(60), 'blue');
  
  const preconnectCount = (html.match(/rel="preconnect"/g) || []).length;
  const dnsPrefetchCount = (html.match(/rel="dns-prefetch"/g) || []).length;
  const preloadCount = (html.match(/rel="preload"/g) || []).length;
  
  log(`  ✓ Preconnect hints: ${preconnectCount}`, preconnectCount > 0 ? 'green' : 'yellow');
  log(`  ✓ DNS Prefetch hints: ${dnsPrefetchCount}`, dnsPrefetchCount > 0 ? 'green' : 'yellow');
  log(`  ✓ Preload hints: ${preloadCount}`, preloadCount > 0 ? 'green' : 'yellow');
  
  // Test 8: Canonical URL
  log('\n🔗 Test 8: Canonical URL', 'magenta');
  log('─'.repeat(60), 'blue');
  
  const canonicalPattern = /<link\s+rel="canonical"\s+href="([^"]*)"\s*\/?>/i;
  const canonicalMatch = html.match(canonicalPattern);
  
  if (canonicalMatch) {
    log(`  ✓ Canonical URL: ${canonicalMatch[1]}`, 'green');
  } else {
    log('  ✗ Canonical URL missing', 'red');
  }
  
  // Summary
  log('\n' + '═'.repeat(60), 'blue');
  log('\n📋 Summary & Next Steps\n', 'cyan');
  
  log('1. Test your Twitter Card:', 'yellow');
  log('   https://cards-dev.twitter.com/validator\n', 'blue');
  
  log('2. Test your Open Graph tags:', 'yellow');
  log('   https://developers.facebook.com/tools/debug/\n', 'blue');
  
  log('3. Test LinkedIn preview:', 'yellow');
  log('   https://www.linkedin.com/post-inspector/\n', 'blue');
  
  log('4. Test Rich Results:', 'yellow');
  log('   https://search.google.com/test/rich-results\n', 'blue');
  
  log('5. Run Lighthouse audit:', 'yellow');
  log('   Chrome DevTools > Lighthouse\n', 'blue');
  
  log('═'.repeat(60) + '\n', 'blue');
}

// Run tests
runTests().catch(console.error);
