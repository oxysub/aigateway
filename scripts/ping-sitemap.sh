#!/usr/bin/env bash
# Ping search engines after sitemap is live at https://aigateway.my/sitemap.xml
set -euo pipefail

SITEMAP_URL="https://aigateway.my/sitemap.xml"

echo "Checking sitemap..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$SITEMAP_URL")

if [[ "$HTTP_CODE" != "200" ]]; then
  echo "ERROR: $SITEMAP_URL returned HTTP $HTTP_CODE"
  echo "Deploy first, restart cPanel app, then run this script again."
  exit 1
fi

echo "Sitemap OK (HTTP 200)"
echo ""
echo "Pinging Google..."
curl -s "https://www.google.com/ping?sitemap=${SITEMAP_URL}"
echo ""
echo ""
echo "Pinging Bing..."
curl -s "https://www.bing.com/ping?sitemap=${SITEMAP_URL}"
echo ""
echo ""
echo "Done. Also submit in Google Search Console:"
echo "  https://search.google.com/search-console → Sitemaps → sitemap.xml"
