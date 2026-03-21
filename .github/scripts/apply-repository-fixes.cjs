#!/usr/bin/env node
/**
 * Apply repository-specific fixes after syncing from source
 * This file is deployed and customized per repository by run_phase1_sync.py
 */

const fs = require('fs');
const path = require('path');

// Repository-specific fixes will be injected here by run_phase1_sync.py
const fixes = {
  "versioned_sidebars/version-3.0.0-sidebars.json": [
    {
      "type": "replace",
      "find": "\"label\": \"FAQs\",\n          \"id\": \"keploy-explained/integration-testing-faq\"",
      "replace": "\"label\": \"FAQs\",\n          \"key\": \"integration-faqs\",\n          \"id\": \"keploy-explained/integration-testing-faq\"",
      "comment": "Add unique key to distinguish integration FAQs from api/unit FAQs in sidebarExplanation"
    },
    {
      "type": "replace",
      "find": "\"label\": \"FAQs\",\n          \"id\": \"keploy-explained/api-testing-faq\"",
      "replace": "\"label\": \"FAQs\",\n          \"key\": \"api-faqs\",\n          \"id\": \"keploy-explained/api-testing-faq\"",
      "comment": "Add unique key to distinguish api FAQs from integration/unit FAQs in sidebarExplanation"
    },
    {
      "type": "replace",
      "find": "\"label\": \"FAQs\",\n          \"id\": \"keploy-explained/unit-testing-faq\"",
      "replace": "\"label\": \"FAQs\",\n          \"key\": \"unit-faqs\",\n          \"id\": \"keploy-explained/unit-testing-faq\"",
      "comment": "Add unique key to distinguish unit FAQs from integration/api FAQs in sidebarExplanation"
    }
  ],
  "versioned_sidebars/version-4.0.0-sidebars.json": [
    {
      "type": "replace",
      "find": "\"label\": \"FAQs\",\n          \"id\": \"keploy-explained/integration-testing-faq\"",
      "replace": "\"label\": \"FAQs\",\n          \"key\": \"integration-faqs\",\n          \"id\": \"keploy-explained/integration-testing-faq\"",
      "comment": "Add unique key to distinguish integration FAQs from api/unit FAQs in sidebarExplanation"
    },
    {
      "type": "replace",
      "find": "\"label\": \"FAQs\",\n          \"id\": \"keploy-explained/api-testing-faq\"",
      "replace": "\"label\": \"FAQs\",\n          \"key\": \"api-faqs\",\n          \"id\": \"keploy-explained/api-testing-faq\"",
      "comment": "Add unique key to distinguish api FAQs from integration/unit FAQs in sidebarExplanation"
    },
    {
      "type": "replace",
      "find": "\"label\": \"FAQs\",\n          \"id\": \"keploy-explained/unit-testing-faq\"",
      "replace": "\"label\": \"FAQs\",\n          \"key\": \"unit-faqs\",\n          \"id\": \"keploy-explained/unit-testing-faq\"",
      "comment": "Add unique key to distinguish unit FAQs from integration/api FAQs in sidebarExplanation"
    }
  ],
  "versioned_sidebars/version-1.0.0-sidebars.json": [
    {
      "type": "replace",
      "find": "\"label\": \"Installation\",\n          \"id\": \"go/installation\"",
      "replace": "\"label\": \"Installation\",\n          \"key\": \"go-installation\",\n          \"id\": \"go/installation\"",
      "comment": "Add unique key to distinguish Go installation from Java installation in sidebarInstallation"
    },
    {
      "type": "replace",
      "find": "\"label\": \"Installation\",\n          \"id\": \"java/installation\"",
      "replace": "\"label\": \"Installation\",\n          \"key\": \"java-installation\",\n          \"id\": \"java/installation\"",
      "comment": "Add unique key to distinguish Java installation from Go installation in sidebarInstallation"
    },
    {
      "type": "replace",
      "find": "\"label\": \"Integration\",\n          \"id\": \"go/integration\"",
      "replace": "\"label\": \"Integration\",\n          \"key\": \"go-integration\",\n          \"id\": \"go/integration\"",
      "comment": "Add unique key to distinguish Go integration from Java integration in sidebarInstallation"
    },
    {
      "type": "replace",
      "find": "\"label\": \"Integration\",\n          \"id\": \"java/integration\"",
      "replace": "\"label\": \"Integration\",\n          \"key\": \"java-integration\",\n          \"id\": \"java/integration\"",
      "comment": "Add unique key to distinguish Java integration from Go integration in sidebarInstallation"
    },
    {
      "type": "replace",
      "find": "\"label\": \"Record Test\",\n          \"id\": \"go/record\"",
      "replace": "\"label\": \"Record Test\",\n          \"key\": \"go-record\",\n          \"id\": \"go/record\"",
      "comment": "Add unique key to distinguish Go record test from Java record test in sidebarInstallation"
    },
    {
      "type": "replace",
      "find": "\"label\": \"Record Test\",\n          \"id\": \"java/record\"",
      "replace": "\"label\": \"Record Test\",\n          \"key\": \"java-record\",\n          \"id\": \"java/record\"",
      "comment": "Add unique key to distinguish Java record test from Go record test in sidebarInstallation"
    },
    {
      "type": "replace",
      "find": "\"label\": \"Replay Test \",\n          \"id\": \"go/replay\"",
      "replace": "\"label\": \"Replay Test \",\n          \"key\": \"go-replay\",\n          \"id\": \"go/replay\"",
      "comment": "Add unique key to distinguish Go replay test from Java replay test in sidebarInstallation"
    },
    {
      "type": "replace",
      "find": "\"label\": \"Replay Test \",\n          \"id\": \"java/replay\"",
      "replace": "\"label\": \"Replay Test \",\n          \"key\": \"java-replay\",\n          \"id\": \"java/replay\"",
      "comment": "Add unique key to distinguish Java replay test from Go replay test in sidebarInstallation"
    },
    {
      "type": "replace",
      "find": "\"label\": \"Sample Quickstarts\",\n          \"collapsible\": true,\n          \"collapsed\": true,\n          \"link\": {\n            \"type\": \"doc\",\n            \"id\": \"go/quickstart/index\"",
      "replace": "\"label\": \"Sample Quickstarts\",\n          \"key\": \"go-sample-quickstarts\",\n          \"collapsible\": true,\n          \"collapsed\": true,\n          \"link\": {\n            \"type\": \"doc\",\n            \"id\": \"go/quickstart/index\"",
      "comment": "Add unique key to distinguish Go Sample Quickstarts from Java Sample Quickstarts in sidebarInstallation"
    },
    {
      "type": "replace",
      "find": "\"label\": \"Sample Quickstarts\",\n          \"collapsible\": true,\n          \"collapsed\": true,\n          \"link\": {\n            \"type\": \"doc\",\n            \"id\": \"java/quickstart/index\"",
      "replace": "\"label\": \"Sample Quickstarts\",\n          \"key\": \"java-sample-quickstarts\",\n          \"collapsible\": true,\n          \"collapsed\": true,\n          \"link\": {\n            \"type\": \"doc\",\n            \"id\": \"java/quickstart/index\"",
      "comment": "Add unique key to distinguish Java Sample Quickstarts from Go Sample Quickstarts in sidebarInstallation"
    }
  ]
};
const newFiles = {};

function applyFixes() {
  console.log('Applying repository-specific fixes...');

  // Apply file modifications
  for (const [filePath, operations] of Object.entries(fixes)) {
    if (!fs.existsSync(filePath)) {
      console.log(`  ⚠️ File not found: ${filePath}`);
      continue;
    }

    console.log(`  Fixing ${filePath}...`);
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    for (const op of operations) {
      switch (op.type) {
        case 'replace':
          if (content.includes(op.find)) {
            // Handle special case of replacing with empty string (deletion)
            const replacement = op.replace || '';
            // Use split/join for literal string replacement
            content = content.split(op.find).join(replacement);
            modified = true;
            console.log(`    ✓ Replaced pattern${op.comment ? ': ' + op.comment : ''}`);
          }
          break;

        case 'delete_lines':
          const lines = content.split('\n');
          lines.splice(op.startLine - 1, op.endLine - op.startLine + 1);
          content = lines.join('\n');
          modified = true;
          console.log(`    ✓ Deleted lines ${op.startLine}-${op.endLine}${op.comment ? ': ' + op.comment : ''}`);
          break;

        case 'insert_after_line':
          const insertLines = content.split('\n');
          insertLines.splice(op.line, 0, op.content);
          content = insertLines.join('\n');
          modified = true;
          console.log(`    ✓ Inserted content after line ${op.line}${op.comment ? ': ' + op.comment : ''}`);
          break;

        case 'delete_file':
          fs.unlinkSync(filePath);
          console.log(`    ✓ Deleted file${op.comment ? ': ' + op.comment : ''}`);
          modified = false; // Mark as not modified to skip write
          break; // Continue to next file instead of returning
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`    ✓ File updated`);
    }
  }

  // Create new files
  for (const [filePath, fileConfig] of Object.entries(newFiles)) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const fileContent = typeof fileConfig === 'string' ? fileConfig : fileConfig.content;
    fs.writeFileSync(filePath, fileContent, 'utf8');
    console.log(`  ✓ Created ${filePath}${fileConfig.comment ? ': ' + fileConfig.comment : ''}`);
  }

  console.log('Repository-specific fixes applied successfully.');
}

// Main execution
try {
  if (Object.keys(fixes).length === 0 && Object.keys(newFiles).length === 0) {
    console.log('No repository-specific fixes to apply.');
    process.exit(0);
  }

  applyFixes();
  process.exit(0);
} catch (error) {
  console.error('Error applying fixes:', error);
  console.error(error.stack);
  process.exit(1);
}
