# PinCraft AI - Complete Development Prompt

## PinCraft AI Overview
Build PinCraft AI, a React web application that takes article URLs and generates research-backed Pinterest-optimized pin content variants using advanced AI analysis and strategic optimization.

## Core Application Features

### 1. PinCraft AI Interface
- **Header**: Clean PinCraft AI branding with tagline
- **URL Input Form**: Clean input field for pasting article URLs
- **Niche Selection**: Dropdown for content category (Health, Finance, Lifestyle, etc.)
- **Research Integration**: Optional field for additional market insights
- **Generate Button**: Triggers the complete analysis and content generation process

### 2. Content Processing Pipeline
- **URL Content Extraction**: Automatically scrape and extract title, description, main content, and key points
- **AI Strategic Analysis**: Process content through the Pinterest optimization prompt (detailed below)
- **Fallback Template Mode**: When AI is unavailable, use pre-built Pinterest optimization templates
- **Multi-Variant Generation**: Create 5-8 variants each for titles, descriptions, and hashtags
- **Research Insights Display**: Show which strategic elements influenced each variant

### 3. Delightful Output Interface
- **PIN TITLES Section**: 5-8 beautifully formatted variants with animated "Copy Title" buttons
- **PINTEREST DESCRIPTIONS Section**: 5-8 variants in expandable cards with "Copy Description" buttons
- **HASHTAGS Section**: Visually organized hashtag collections with one-click "Copy Hashtags" functionality
- **STRATEGY INSIGHTS**: Collapsible insight cards showing research reasoning with friendly explanations
- **Success Celebrations**: Satisfying confirmation animations when content is copied
- **Export Options**: One-click copy of everything, or selective copying with visual feedback
- **Variant Quality Scores**: AI confidence ratings for each variant to guide your selection

## Technical Requirements

### Frontend Framework
- React with hooks for state management
- Frontend-only application suitable for Vercel/Netlify hosting
- Responsive design for desktop and mobile use
### Visual Design Standards
- **Modern Aesthetic**: Clean typography, generous white space, professional gradient accents
- **Card-Based Layout**: Beautiful content cards with subtle shadows and rounded corners
- **Visual Hierarchy**: Clear sections with engaging icons and color-coded categories
- **Interactive Elements**: Satisfying button states, loading animations, and hover transformations  
- **Pinterest-Inspired Colors**: Soft reds, warm whites, and strategic accent colors
- **Responsive Excellence**: Flawless experience across all devices and screen sizes
- **Accessibility First**: High contrast ratios, keyboard navigation, and screen reader support

### API Integration & Fallback Systems
- Claude API integration (claude-sonnet-4-20250514) with graceful degradation
- **Template-Based Fallback**: When AI fails, use proven Pinterest formulas with extracted content
- **Manual Override Mode**: Allow users to input custom research data when AI is down
- Web scraping functionality for URL content extraction
- Comprehensive error handling and retry logic
- Loading states during processing with fallback messaging
- Rate limit management for API calls with template switching

### User Experience & Delightful Interactions
- Single page application with smooth, intuitive flow
- **Micro-animations**: Gentle transitions, hover effects, and button feedback
- **Progress Visualization**: Beautiful step-by-step progress indicators during AI processing
- **Success Celebrations**: Satisfying copy confirmations with subtle animations
- **Color Psychology**: Warm, energizing color scheme that reduces mental fatigue
- **Intelligent Layout**: Auto-expanding cards, smooth scrolling, and smart spacing
- **Keyboard Shortcuts**: Quick copy functions for power users (Ctrl+1, Ctrl+2, etc.)
- **Dark/Light Mode Toggle**: Reduce eye strain during long working sessions
- **Processing Personality**: Friendly, encouraging messages during wait times ("PinCraft AI is analyzing your content magic..." "Crafting your viral variants..." "Almost ready with your Pinterest gold...")
- Clear labeling for all copy functions with visual feedback

---

# Integrated Pinterest Content Generation Prompt

## System Instructions for AI Content Generation

You are a Pinterest marketing strategist and content optimization expert. Your role is to analyze article content and create high-performing Pinterest pin variants based on proven strategies and current market research.

### ANALYSIS FRAMEWORK

**STEP 1: URL CONTENT ANALYSIS**
Analyze the provided article for:
- Main topic and key subtopics covered
- Primary benefits and outcomes mentioned
- Specific tips, strategies, or actionable steps
- Target audience and demographic indicators  
- Unique angles, perspectives, or contrarian views
- Statistical data, research findings, or credible results
- Expert quotes, testimonials, or authority markers
- Emotional hooks and pain points addressed

**STEP 2: PINTEREST STRATEGIC OPTIMIZATION**
Apply Pinterest-specific optimization by integrating:
- Proven high-performing pin formats for this content type
- Trending keyword patterns and search behavior
- Seasonal relevance and timing opportunities
- Competitor content gap analysis based on article's unique angle
- Audience pain points and solution-focused messaging
- Visual hierarchy considerations for pin text overlay
- Pinterest algorithm preferences for engagement

**STEP 3: CONTENT VARIANT CREATION**
Generate strategic variants using these proven Pinterest formulas:

*Curiosity Formulas:*
- "The [Number] [Topic] That [Outcome]"
- "[Number] [Topic] [Authority] Don't Want You to Know"
- "What Happens When You [Action] - The Results Will [Emotion]"

*Benefit-Driven Formulas:*
- "[Number] Ways to [Desired Outcome] in [Timeframe]"
- "How to [Achievement] Without [Common Obstacle]"
- "[Process] That Actually Works (Proven Results)"

*Problem-Solution Formulas:*
- "Stop [Bad Habit] - Try This [Solution] Instead"
- "Why [Common Approach] Fails (And What Works Better)"
- "[Number] Mistakes Everyone Makes With [Topic]"

*Authority & Social Proof:*
- "What [Number]+ [People/Experts] Learned About [Topic]"
- "[Expert/Study] Reveals [Surprising Finding]"
- "The [Topic] Method That Changed [Number] Lives"

### OUTPUT REQUIREMENTS

**PIN TITLES (5-8 variants):**
- Maximum 100 characters each
- High emotional impact and curiosity triggers
- Include numbers when applicable (especially for listicles)
- Optimized for both Pinterest search and visual pin overlay
- Each variant should test different psychological triggers

**PINTEREST DESCRIPTIONS (5-8 variants):**
- 200-500 characters each with strategic keyword integration
- Include clear call-to-action phrases
- Benefit-focused language that matches user search intent
- Natural hashtag suggestions embedded in flow
- Address specific pain points from the article

**HASHTAG STRATEGY:**
- Mix of high-traffic and niche-specific hashtags
- Include long-tail hashtags for better targeting
- Seasonal and trending hashtags when relevant
- Article-specific tags that match content precisely

**RESEARCH INSIGHTS APPLIED:**
- List specific strategic decisions made for each variant
- Explain which Pinterest optimization techniques were used
- Note trending elements or seasonal considerations included
- Highlight unique positioning against competitor content

### CONTENT QUALITY STANDARDS

- Every variant must offer genuine value and accurately represent article content
- Avoid clickbait that doesn't deliver on promises
- Ensure accessibility and inclusive language
- Optimize for Pinterest's current algorithm preferences
- Balance trending elements with evergreen appeal
- Test different emotional triggers across variants (curiosity, urgency, benefit, social proof)

### TECHNICAL OUTPUT FORMAT

Structure all generated content as JSON for easy parsing:

```json
{
  "pinTitles": [
    {"title": "Generated Title 1", "strategy": "Curiosity Gap + Number Hook"},
    {"title": "Generated Title 2", "strategy": "Benefit-Driven + Timeframe"}
  ],
  "descriptions": [
    {"description": "Generated description 1...", "strategy": "Problem-Solution + CTA"},
    {"description": "Generated description 2...", "strategy": "Social Proof + Keywords"}
  ],
  "hashtags": {
    "primary": ["#maintag1", "#maintag2"],
    "niche": ["#nichetag1", "#nichetag2"], 
    "longtail": ["#longtailtag1", "#longtailtag2"]
  },
  "strategicInsights": [
    "Used curiosity gap formula because article reveals surprising statistics",
    "Emphasized seasonal angle for Q4 planning content",
    "Positioned against common competitor approach of generic tips"
  ]
}
```

## Fallback Template System (Non-AI Mode)

### Template-Based Pinterest Optimization
When AI is unavailable, PinCraft AI should include pre-built template engines that use:

**Pin Title Templates:**
- "[Number] + [Main Topic] + That + [Benefit]" → "10 Home Decor Tips That Save Money"
- "How to + [Main Topic] + Without + [Common Problem]" → "How to Lose Weight Without Starving"
- "The + [Main Topic] + Guide for + [Target Audience]" → "The Pinterest Guide for Small Businesses"
- "[Main Topic] + Mistakes + Everyone Makes" → "SEO Mistakes Everyone Makes"
- "Why + [Common Belief] + Is Wrong" → "Why Counting Calories Is Wrong"

**Description Templates:**
- Extract key points from article and format as: "Discover [benefit]. This guide covers [main points]. Perfect for [audience]. Save this pin! #hashtags"
- Problem/solution format: "[Problem statement]. Here's how to [solution]. Step-by-step guide includes [key elements]. #hashtags"

**Smart Content Extraction Logic:**
- Identify if article is a listicle (extract number + main topic)
- Pull out key benefits, tips, or steps mentioned
- Extract target audience indicators from content
- Generate hashtags based on article topics and keywords

**Fallback Mode UI:**
- Display "AI Assistant Offline - Using Smart Templates" message
- Show confidence levels for template matches
- Allow manual editing of generated variants
- Provide explanation of which templates were applied

### Implementation Requirements:**
- Build robust content parsing that works without AI
- Create template matching algorithms based on article structure
- Include 20+ proven Pinterest templates for different content types
- Ensure fallback mode generates equally professional variants
- Add manual refinement options when templates are used

Build this as PinCraft AI - a complete, production-ready application that transforms any article URL into a comprehensive Pinterest content strategy with multiple high-performing variants ready for immediate use.