# PinCraft AI - Pinterest Content Optimization Tool

🎯 **Transform your articles into Pinterest-optimized content with AI-powered strategic analysis**

PinCraft AI is a production-ready React application that generates multiple Pinterest-optimized content variants from article URLs using advanced AI analysis. Built for content creators, marketers, and Pinterest enthusiasts who want to maximize their pin performance.

## ✨ Features

### 🚀 Core Functionality
- **URL Content Analysis**: Extract and analyze article content automatically
- **AI-Powered Generation**: Create strategic Pinterest content using Claude AI
- **Multi-Variant Output**: Generate 5-8 optimized titles, descriptions, and hashtag strategies
- **Strategic Insights**: Get detailed explanations of optimization decisions
- **Fallback System**: Template-based generation when AI is unavailable

### 🎨 User Experience
- **Modern UI**: Clean, Pinterest-inspired design with smooth animations
- **Dark/Light Mode**: Automatic theme switching with user preference
- **Copy-to-Clipboard**: One-click copying for individual items or bulk content
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Accessibility**: Full keyboard navigation and screen reader support

### 🔧 Technical Features
- **Production Ready**: Optimized for Vercel deployment
- **Error Handling**: Graceful fallbacks and user-friendly error messages
- **Performance**: Lazy loading, code splitting, and optimized animations
- **SEO Optimized**: Meta tags, Open Graph, and Twitter Card support
- **PWA Ready**: Installable as a progressive web app

## 🛠️ Tech Stack

- **Frontend**: React 18 with Hooks
- **Styling**: CSS3 with CSS Variables for theming
- **Animations**: Framer Motion for smooth interactions
- **Icons**: Lucide React for consistent iconography
- **HTTP Client**: Axios for API requests
- **AI Integration**: Claude API (Anthropic)
- **Deployment**: Vercel-optimized

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Claude API key from Anthropic

### Installation

1. **Clone and install dependencies**:
   ```bash
   git clone <repository-url>
   cd PinCraftAI
   npm install
   ```

2. **Environment Setup**:
   Create a `.env.local` file in the root directory:
   ```env
   REACT_APP_CLAUDE_API_KEY=your_claude_api_key_here
   REACT_APP_CLAUDE_API_URL=https://api.anthropic.com/v1/messages
   ```

3. **Start Development Server**:
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the app.

### Production Build

```bash
npm run build
```

The build folder will contain optimized production files ready for deployment.

## 📖 Usage Guide

### Basic Workflow

1. **Enter Article URL**: Paste the URL of the article you want to optimize
2. **Select Content Niche**: Choose from predefined niches or select "Other"
3. **Add Insights** (Optional): Provide additional context for better optimization
4. **Generate Content**: Click "Generate Pinterest Content" and wait for AI analysis
5. **Copy & Use**: Copy individual items or bulk export all generated content

### Content Output

**Pin Titles** (5-8 variants):
- Maximum 100 characters
- High emotional impact
- Curiosity-driven and benefit-focused

**Pinterest Descriptions** (5-8 variants):
- 200-500 characters
- Include call-to-actions
- Benefit-focused with strategic hashtags

**Hashtag Strategy**:
- Mix of high-traffic and niche tags
- Seasonal and trending hashtags
- Strategic placement recommendations

**Strategic Insights**:
- Optimization reasoning
- Target audience analysis
- Competitive positioning

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `REACT_APP_CLAUDE_API_KEY` | Your Claude API key from Anthropic | Yes |
| `REACT_APP_CLAUDE_API_URL` | Claude API endpoint URL | Yes |

### Customization

**Themes**: Modify CSS variables in `src/App.css` to customize colors and styling.

**Content Niches**: Update the `niches` array in `src/App.js` to add or modify content categories.

**Fallback Templates**: Customize template-based generation in `src/contentProcessor.js`.

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**: Import your GitHub repository to Vercel
2. **Environment Variables**: Add your environment variables in Vercel dashboard
3. **Deploy**: Vercel will automatically build and deploy your app

### Other Platforms

The app is compatible with any static hosting service:
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

## 🔒 Security & Privacy

- **API Keys**: Never expose API keys in client-side code
- **CORS**: Proper CORS handling for external API requests
- **Content Sanitization**: All user inputs are sanitized
- **No Data Storage**: No user data is stored or tracked

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines

1. Follow the existing code style and conventions
2. Add comments for complex logic
3. Test your changes thoroughly
4. Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page for existing solutions
2. Create a new issue with detailed information
3. Include error messages, browser info, and steps to reproduce

## 🙏 Acknowledgments

- **Anthropic** for the Claude AI API
- **Pinterest** for design inspiration
- **React Community** for excellent documentation and tools
- **Framer Motion** for beautiful animations

---

**Built with ❤️ for the Pinterest community**

Made by content creators, for content creators. Happy pinning! 📌