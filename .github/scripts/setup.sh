#!/bin/bash
# Generated setup script for: https://github.com/keploy/docs
# Docusaurus 3.7.0, npm, Node 20

set -e

REPO_URL="https://github.com/keploy/docs"
BRANCH="main"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

log_info() { echo "[INFO] $1"; }
log_error() { echo "[ERROR] $1"; }

apply_fixes() {
    local fixes_file="$SCRIPT_DIR/fixes.json"
    if [ ! -f "$fixes_file" ]; then
        log_info "No fixes.json found, skipping content patches."
        return
    fi
    log_info "Applying content fixes from fixes.json..."
    python3 - "$fixes_file" <<'PYEOF'
import sys
import json

fixes_file = sys.argv[1]
with open(fixes_file, 'r') as f:
    config = json.load(f)

fixes = config.get('fixes', {})
applied = 0
failed = 0

for file_path, file_fixes in fixes.items():
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except FileNotFoundError:
        print(f"[WARN] File not found, skipping: {file_path}")
        continue

    for fix in file_fixes:
        fix_type = fix.get('type', 'replace')
        if fix_type == 'replace':
            find_str = fix['find'].replace('\\n', '\n')
            replace_str = fix['replace'].replace('\\n', '\n')
            if find_str in content:
                content = content.replace(find_str, replace_str, 1)
                applied += 1
            else:
                print(f"[WARN] Could not find string in {file_path}: {fix.get('comment', 'no comment')}")
                failed += 1

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

print(f"[INFO] Fixes applied: {applied}, failed: {failed}")
PYEOF
}

main() {
    log_info "Setting up: $REPO_URL"

    if [ -d "source-repo" ]; then
        rm -rf source-repo
    fi

    log_info "Cloning repository..."
    git clone --depth 1 --branch "$BRANCH" "$REPO_URL" source-repo
    cd source-repo

    log_info "Node version: $(node -v)"
    log_info "npm version: $(npm -v)"

    log_info "Installing dependencies..."
    # Use --ignore-scripts to skip husky prepare hook
    npm install --ignore-scripts

    # Apply content fixes before running write-translations
    apply_fixes

    log_info "Running write-translations..."
    npx docusaurus write-translations

    if [ -d "i18n" ]; then
        FILE_COUNT=$(find i18n -type f -name "*.json" | wc -l)
        log_info "Success! Generated $FILE_COUNT i18n JSON files."
        find i18n -type f -name "*.json" | head -20
    else
        log_error "i18n directory not found"
        exit 1
    fi

    log_info "Running build..."
    npm run build

    if [ -d "build" ] && [ "$(find build -type f | wc -l)" -gt 0 ]; then
        BUILD_COUNT=$(find build -type f | wc -l)
        log_info "Build successful! $BUILD_COUNT files in build/ directory."
    else
        log_error "Build directory not found or empty"
        exit 1
    fi
}

main "$@"
