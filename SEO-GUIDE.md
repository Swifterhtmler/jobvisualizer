# Ammattomaatti - SEO Optimization Guide

## Overview
Ammattomaatti is a Finnish-language data visualization tool for employment, unemployment, and job seeking information. This document outlines all SEO optimizations implemented.

## SEO Implementation Checklist

### ✅ Meta Tags & Headers
- **Language**: Set to Finnish (fi) in html lang attribute
- **Title Tags**: Unique, descriptive titles for main page and subpages
- **Meta Descriptions**: Comprehensive descriptions for each page (max 160 characters)
- **Meta Keywords**: Relevant keywords for Finnish job market, unemployment, and employment visualization
- **Canonical URLs**: Set to main domain (https://ammattomaatti.fi)
- **Open Graph Tags**: For social media sharing with proper Finnish descriptions
- **Twitter Card Tags**: Enhanced sharing on Twitter/X
- **Mobile Viewport**: Optimized for mobile devices

### ✅ Structured Data (Schema.org)
- **WebApplication Schema**: Identifies site as web application
- **Organization Info**: Provides structured info about Ammattomaatti
- **Pricing**: Indicated as free service

### ✅ XML Sitemaps
- **sitemap.xml**: Lists all public pages with update frequency and priority
- **robots.txt**: References sitemap and allows all crawlers

### ✅ Progressive Web App
- **manifest.json**: Web app manifest with Finnish metadata, shortcuts, and categories
- **PWA Icons**: Favicon support
- **Theme Colors**: Consistent branding (rgb(50, 120, 112))

### ✅ Page Content
- **H1 Headings**: Main page includes descriptive h1 with tagline
- **Tagline**: "Suomalainen työpaikka- ja työttömyystietojen visualisointityökalu"
- **Semantic HTML**: Proper heading hierarchy and structure

### ✅ Page Structure
- **Main Page** (`/`): Landing page with unemployment and job data visualization
- **Privacy Policy** (`/privacy-policy`): GDPR/privacy-related information
- **Data Privacy**: No user data collection; uses Titlastokeskus API

## Page-Specific SEO

### Main Page (`/`)
- **Title**: "Ammattomaatti - Työpaikat & Työttömyys Suomessa"
- **Meta Description**: "Ammattomaatti näyttää avoimet työpaikat, työttömyysasteet ja työnhakutiedot Suomessa interaktiivisen kartan avulla. Tutki työmarkkinoita maakunnittain ja kunnittain."
- **Focus Keywords**: työpaikat, työttömyys, Suomi, työnhaku, data visualisointi, työmarkkinat, työllistyminen
- **Content**: Interactive maps showing unemployment by region and municipality, job openings by employer

### Privacy Policy Page (`/privacy-policy`)
- **Title**: "Tietosuojakäytäntö - Ammattomaatti"
- **Meta Description**: "Ammattomaatin tietosuojakäytäntö. Ammattomaatti ei kerää henkilötietoja käyttäjistä vaan käyttää Titlastokeskus API:ta työpaikkatietoihin."

## International SEO
- **Language**: Finnish (fi-FI)
- **Locale**: fi_FI for Open Graph tags
- **Alternate Links**: hreflang tags for Finnish language specification
- **Regional Focus**: Finland-specific data and keywords

## Technical SEO Checklist

- ✅ Mobile responsive design
- ✅ Fast loading (SvelteKit optimizedfor performance)
- ✅ Secure HTTPS (recommended for deployment)
- ✅ Clean URL structure
- ✅ XML sitemap
- ✅ Robots.txt configuration
- ✅ Structured data markup
- ✅ Social media meta tags
- ✅ PWA manifest
- ✅ Favicon support

## Crawlability & Indexability
- All pages allowed for crawling (robots.txt)
- No noindex tags on public pages
- Sitemap includes all important pages
- Canonical URLs prevent duplicate content issues

## Future SEO Improvements
1. Add rich snippets for job data
2. Implement breadcrumb navigation
3. Add FAQs schema markup
4. Create blog/content hub for Finnish employment keywords
5. Add AMP (Accelerated Mobile Pages) support if needed
6. Implement performance monitoring with Google Search Console
7. Set up Google Analytics with proper goal tracking
8. Create targeted landing pages for specific regions

## Maintenance
- Update sitemap.xml when adding new pages
- Monitor Google Search Console for crawl errors
- Regularly check meta descriptions and titles for accuracy
- Update manifest.json with new PWA features if added
- Keep content fresh and relevant to Finnish job market trends

## Contact & Support
For SEO questions or optimizations, contact the Ammattomaatti development team.
