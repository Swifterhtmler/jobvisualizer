# Ammattomaatti

**Suomalainen työpaikka- ja työttömyystietojen visualisointityökalu**

Ammattomaatti is a Finnish data visualization platform that provides interactive insights into employment, unemployment, and job market trends across Finland. Visualize open job positions, unemployment rates, and employment data by region and municipality using real-time data from Titlastokeskus APIs.

🌐 **Live Demo**: [https://jobvisualizer.vercel.app](https://jobvisualizer.vercel.app)

## Features

✨ **Interactive Maps**: Visualize employment data across Finnish regions and municipalities  
📊 **Real-Time Data**: Powered by Titlastokeskus APIs for current job market information  
🔍 **Advanced Filtering**: Filter by employer type, job category, employment duration, and more  
📱 **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices  
🌍 **Finnish Language**: Complete interface in Finnish for local users  
🔒 **Privacy First**: No user data collection; transparent about data sources  
⚡ **Fast Performance**: Built with SvelteKit for optimal speed and user experience  

## Use Cases

- **Job Seekers**: Find employment opportunities in your region
- **Policy Makers**: Understand regional employment patterns and trends
- **Researchers**: Access comprehensive employment and unemployment data
- **Career Advisors**: Guide clients with market insights
- **Businesses**: Analyze labor market conditions for strategic planning

## Data Sources

Ammattomaatti uses official data from:
- **Titlastokeskus** (Finnish Center for Pensions) - Employment and unemployment statistics

No personal data is collected from users. All data visualizations are derived from public APIs.

## Technology Stack

- **Frontend Framework**: [SvelteKit](https://kit.svelte.dev/) - Modern, fast web framework
- **Mapping**: [Maplibre GL JS](https://maplibre.org/) - Interactive map visualization
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Build Tool**: [Vite](https://vitejs.dev/) - Next-generation frontend tooling
- **Deployment**: [Vercel](https://vercel.com/) - Edge-optimized hosting
- **Language**: JavaScript/TypeScript + Svelte

## Getting Started

### Prerequisites

- Node.js 16+ (recommend 18+)
- npm, pnpm, or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Swifterhtmler/jobvisualizer.git
cd jobvisualizer
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Start development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Development

View the development server with auto-reload:
```bash
npm run dev -- --open
```

Build for production:
```bash
npm run build
```

Preview production build locally:
```bash
npm run preview
```

## Project Structure

```
jobvisualizer/
├── src/
│   ├── routes/              # Page components & routing
│   │   ├── +page.svelte    # Main landing page
│   │   ├── +layout.svelte  # App layout wrapper
│   │   ├── privacy-policy/ # Privacy policy page
│   │   └── [other pages]   # Additional visualization views
│   ├── lib/
│   │   ├── stores/         # Svelte stores for state management
│   │   ├── utils/          # Utility functions
│   │   └── assets/         # Images, icons, etc.
│   └── app.html            # HTML template
├── static/
│   ├── data/               # GeoJSON map data (regions, municipalities)
│   ├── sitemap.xml         # SEO sitemap
│   ├── robots.txt          # Search engine crawling rules
│   └── manifest.json       # PWA manifest
├── vite.config.js          # Vite configuration
├── svelte.config.js        # SvelteKit configuration
└── tailwind.config.js      # Tailwind CSS configuration
```

## Frequently Asked Questions (FAQ)

### ❓ What is Ammattomaatti?
Ammattomaatti is a data visualization platform specifically designed for the Finnish job market. It displays open job positions, unemployment rates, and employment data interactively across different regions and municipalities, helping users understand labor market trends.

### ❓ Is my data safe? Do you collect personal information?
**Yes, your data is completely safe.** Ammattomaatti does NOT collect any personal data from users. We do not use tracking cookies, analytics, or store any user information. The platform only displays publicly available data from Titlastokeskus APIs.

### ❓ Which data sources does Ammattomaatti use?
Ammattomaatti primarily uses data from **Titlastokeskus** (Finnish Center for Pensions), which provides official employment and unemployment statistics for Finland. See our [Privacy Policy](/privacy-policy) for more details.

### ❓ Can I use this data for research or commercial purposes?
Please review the terms and conditions of Titlastokeskus APIs and our [Privacy Policy](/privacy-policy) for specific usage rights. For commercial use inquiries, contact the development team.

### ❓ How often is the data updated?
Data refresh frequency depends on Titlastokeskus API updates. Check the endpoint documentation for specific update schedules.

### ❓ What browsers are supported?
Ammattomaatti works on all modern browsers including:
- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### ❓ Is there a mobile app?
Currently, Ammattomaatti is a web-based platform optimized for mobile browsers. It works seamlessly on smartphones and tablets through any modern browser.

### ❓ How can I contribute or report issues?
We welcome contributions! Please visit our [GitHub repository](https://github.com/Swifterhtmler/jobvisualizer) to:
- Report bugs
- Suggest features
- Submit pull requests

### ❓ Can I embed Ammattomaatti on my website?
Currently, Ammattomaatti is designed as a standalone platform. For embedding or API access inquiries, please contact the development team.

### ❓ Is Ammattomaatti available in other languages?
Currently, Ammattomaatti is available in Finnish. Additional language support may be added in future versions.

### ❓ How is Ammattomaatti maintained and funded?
Ammattomaatti is an open-source project. It is maintained by volunteer developers and made freely available to the public.

## Privacy & Legal

- **Privacy Policy**: See [Privacy Policy](/privacy-policy) for complete information about data handling
- **No Data Collection**: Ammattomaatti does not collect, store, or process personal user data
- **Open Source**: Check LICENSE file for terms of use
- **Third-Party APIs**: Data sourced from Titlastokeskus APIs (subject to their terms)

## Deployment

Ammattomaatti is deployed on Vercel with automatic deployments from the main branch.

### Deploy Your Own

1. Fork this repository
2. Connect to [Vercel](https://vercel.com)
3. Deploy with one click
4. Update environment variables if needed

For development deployment locally:
```bash
npm run build
npm run preview
```

## Performance & SEO

- ✅ Mobile responsive design
- ✅ Optimized for search engines (SEO)
- ✅ Google Site Verification enabled
- ✅ XML sitemap for crawlers
- ✅ Progressive Web App (PWA) ready
- ✅ Schema.org structured data
- ✅ Open Graph tags for social sharing

See [SEO-GUIDE.md](./SEO-GUIDE.md) for detailed SEO information.

## Contributing

We welcome contributions from the community! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

- 📧 For inquiries, contact the development team
- 🐛 Report bugs on GitHub Issues
- 💬 Check FAQ section above for common questions
- 📚 See [SEO-GUIDE.md](./SEO-GUIDE.md) for technical documentation

## License

This project is open source. See LICENSE file for details.

## Roadmap

Future improvements planned for Ammattomaatti:

- [ ] Additional data sources and APIs
- [ ] Export data functionality (CSV, PDF)
- [ ] Multi-language support
- [ ] Mobile app version
- [ ] Advanced analytics dashboard
- [ ] Historical data trends
- [ ] Notifications for market changes

## Related Resources

- [Titlastokeskus](https://www.tilastokeskus.fi/) - Finnish statistics
- [SvelteKit Documentation](https://kit.svelte.dev/docs/introduction)
- [Maplibre GL Documentation](https://maplibre.org/maplibre-gl-js/docs/)

---

**Made with ❤️ for the Finnish job market community**

Questions? Visit our [GitHub repository](https://github.com/Swifterhtmler/jobvisualizer) or check the [Privacy Policy](/privacy-policy).
