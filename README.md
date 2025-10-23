# TheDev.ai - Enterprise Software Solutions

A Jekyll-based website for TheDev.ai, deployed on GitHub Pages with a custom domain.

## 🚀 Quick Start

### Prerequisites

- Ruby 3.2 or later
- Bundler

### Installation

1. Clone the repository:
```bash
git clone https://github.com/thedev/thedevai.git
cd thedevai
```

2. Install dependencies:
```bash
bundle install
```

### Development

Start the development server:
```bash
bundle exec jekyll serve
```

Your site will be running at `http://localhost:4000`

## 📦 Build

Build the site for production:
```bash
bundle exec jekyll build
```

The built files will be in the `_site/` directory.

## 🚢 Deploy to GitHub Pages

### Automatic Deployment (Recommended)

The site automatically deploys to GitHub Pages when you push to the `main` branch using GitHub Actions.

**Setup:**
1. Go to your repository settings on GitHub
2. Navigate to "Pages" section
3. Under "Build and deployment", set the source to "GitHub Actions"
4. Push to the `main` branch and the site will automatically deploy
5. Your site will be published at `https://thedev.ai`

The custom domain `thedev.ai` is configured via the `CNAME` file in the repository root.

## 📁 Project Structure

```
thedevai/
├── .github/
│   └── workflows/       # GitHub Actions workflows
│       ├── deploy.yml   # Auto-deploy to GitHub Pages
│       └── pr-check.yml # Build and test PRs
├── _config.yml          # Jekyll configuration
├── CNAME                # Custom domain configuration
├── index.html           # Home page
├── 404.html            # 404 error page
└── README.md           # This file
```

## 🛠️ Available Commands

- `bundle exec jekyll serve` - Start development server
- `bundle exec jekyll build` - Build for production
- `bundle exec jekyll clean` - Clean build artifacts

## 📝 Customization

### Update Site Metadata

Edit `_config.yml` to customize your site:

```yaml
title: TheDev.ai
description: Your site description
url: https://thedev.ai
```

### Add New Pages

Create new HTML or Markdown files in the root directory:
- `about.html` → `/about`
- `blog.html` → `/blog`

### Custom Domain

The custom domain is configured in the `CNAME` file. To change it:
1. Edit the `CNAME` file
2. Configure your DNS settings to point to GitHub Pages
3. Update the `url` in `_config.yml`

## 📚 Learn More

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Pages Custom Domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

## 📄 License

MIT