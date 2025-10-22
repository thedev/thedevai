# TheDev AI - Gatsby Starter Project

A Gatsby starter project configured for GitHub Pages deployment.

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/thedev/thedevai.git
cd thedevai
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run develop
```

Your site will be running at `http://localhost:8000`

## 📦 Build

Build the site for production:
```bash
npm run build
```

The built files will be in the `public/` directory.

## 🚢 Deploy to GitHub Pages

### Automatic Deployment (Recommended)

The site automatically deploys to GitHub Pages when you push to the `main` branch using GitHub Actions.

**First-time setup:**
1. Go to your repository settings on GitHub
2. Navigate to "Pages" section
3. Under "Build and deployment", set the source to "GitHub Actions"
4. Push to the `main` branch and the site will automatically deploy
5. Your site will be published at `https://thedev.github.io/thedevai/`

### Manual Deployment

You can also deploy manually using:
```bash
npm run deploy
```

This command will:
1. Build the site with the correct path prefix
2. Deploy to the `gh-pages` branch
3. Make your site available at `https://thedev.github.io/thedevai/`

**Note:** If using manual deployment, set GitHub Pages source to deploy from the `gh-pages` branch instead of GitHub Actions.

## 📁 Project Structure

```
thedevai/
├── .github/
│   └── workflows/      # GitHub Actions workflows
│       ├── deploy.yml  # Auto-deploy to GitHub Pages
│       └── pr-check.yml # Build and test PRs
├── src/
│   ├── pages/          # Page components
│   │   ├── index.js    # Home page
│   │   └── 404.js      # 404 page
│   └── components/     # Reusable components
├── gatsby-config.js    # Gatsby configuration
├── package.json        # Dependencies and scripts
└── README.md          # This file
```

## 🛠️ Available Scripts

- `npm run develop` - Start development server
- `npm run build` - Build for production
- `npm run serve` - Serve production build locally
- `npm run clean` - Clean cache and public directories
- `npm run deploy` - Deploy to GitHub Pages

## 📝 Customization

### Update Site Metadata

Edit `gatsby-config.js` to customize your site:

```javascript
module.exports = {
  pathPrefix: "/thedevai",  // Change to your repo name
  siteMetadata: {
    title: `Your Site Title`,
    description: `Your site description`,
    author: `@yourhandle`,
  },
  plugins: [],
}
```

### Add New Pages

Create new pages by adding files to `src/pages/`:
- `src/pages/about.js` → `/about`
- `src/pages/blog/index.js` → `/blog`

## 📚 Learn More

- [Gatsby Documentation](https://www.gatsbyjs.com/docs/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

## 📄 License

MIT