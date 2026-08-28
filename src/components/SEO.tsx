import React, { useEffect } from 'react';

export interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article' | 'product';
  jsonLd?: Record<string, any> | Record<string, any>[];
  keywords?: string[];
}

const DEFAULT_TITLE = 'REFERESTATES | Luxury Real Estate & Prime Off-Plan Developments in Saudi Arabia';
const DEFAULT_DESCRIPTION = 'Discover exclusive luxury properties, prestigious off-plan developments, and commercial investment opportunities across Riyadh, Jeddah, and Saudi Arabia with REFERESTATES.';
const DEFAULT_IMAGE = '/al-rehab-center.webp';
const SITE_NAME = 'REFERESTATES';

export default function SEO({
  title,
  description,
  canonical,
  image,
  type = 'website',
  jsonLd,
  keywords
}: SEOProps) {
  const fullTitle = title 
    ? (title.includes('REFERESTATES') ? title : `${title} | REFERESTATES`) 
    : DEFAULT_TITLE;
  const metaDescription = description || DEFAULT_DESCRIPTION;
  const metaImage = image || DEFAULT_IMAGE;
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const canonicalUrl = canonical || currentUrl;

  useEffect(() => {
    // 1. Update Document Title
    document.title = fullTitle;

    // Helper to update or create meta tags
    const updateMetaTag = (selector: string, attr: string, value: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        const [attrName, attrVal] = selector.replace(/[\[\]"']/g, '').split('=');
        if (attrName && attrVal) {
          element.setAttribute(attrName, attrVal);
        }
        document.head.appendChild(element);
      }
      element.setAttribute(attr, value);
    };

    // 2. Primary Meta Tags
    updateMetaTag('meta[name="title"]', 'content', fullTitle);
    updateMetaTag('meta[name="description"]', 'content', metaDescription);
    if (keywords && keywords.length > 0) {
      updateMetaTag('meta[name="keywords"]', 'content', keywords.join(', '));
    }

    // 3. Open Graph / Facebook
    updateMetaTag('meta[property="og:title"]', 'content', fullTitle);
    updateMetaTag('meta[property="og:description"]', 'content', metaDescription);
    updateMetaTag('meta[property="og:image"]', 'content', metaImage);
    updateMetaTag('meta[property="og:type"]', 'content', type);
    updateMetaTag('meta[property="og:url"]', 'content', canonicalUrl);
    updateMetaTag('meta[property="og:site_name"]', 'content', SITE_NAME);

    // 4. Twitter Card
    updateMetaTag('meta[name="twitter:card"]', 'content', 'summary_large_image');
    updateMetaTag('meta[name="twitter:title"]', 'content', fullTitle);
    updateMetaTag('meta[name="twitter:description"]', 'content', metaDescription);
    updateMetaTag('meta[name="twitter:image"]', 'content', metaImage);

    // 5. Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 6. JSON-LD Structured Data
    let scriptTag = document.getElementById('json-ld-seo') as HTMLScriptElement | null;
    if (jsonLd) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'json-ld-seo';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(Array.isArray(jsonLd) ? jsonLd : jsonLd);
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [fullTitle, metaDescription, metaImage, type, canonicalUrl, jsonLd, keywords]);

  return null;
}
