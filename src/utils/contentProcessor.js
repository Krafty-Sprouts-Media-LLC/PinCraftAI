// Content processing utilities for PinCraft AI

// URL content extraction function
export const extractContentFromUrl = async (url) => {
  try {
    // For demo purposes, we'll simulate content extraction
    // In production, you'd use a web scraping service or API
    const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    
    // Parse the HTML content (simplified version)
    const parser = new DOMParser();
    const doc = parser.parseFromString(data.contents, 'text/html');
    
    // Extract basic content
    const title = doc.querySelector('title')?.textContent || '';
    const metaDescription = doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';
    
    // Extract main content (simplified)
    const paragraphs = Array.from(doc.querySelectorAll('p')).map(p => p.textContent).join(' ');
    const headings = Array.from(doc.querySelectorAll('h1, h2, h3')).map(h => h.textContent);
    
    return {
      title: title.trim(),
      description: metaDescription.trim(),
      content: paragraphs.substring(0, 2000), // Limit content length
      headings: headings.slice(0, 10), // Limit headings
      url: url
    };
  } catch (error) {
    console.error('Content extraction failed:', error);
    // Fallback to basic URL analysis
    return {
      title: 'Article Content',
      description: 'Content extracted from provided URL',
      content: 'Unable to extract full content. Please ensure the URL is accessible.',
      headings: [],
      url: url
    };
  }
};

// AI content generation using Claude API
export const generatePinterestContent = async (extractedContent, niche, additionalInsights) => {
  const apiKey = process.env.REACT_APP_CLAUDE_API_KEY;
  
  if (!apiKey) {
    throw new Error('Claude API key not configured');
  }

  const prompt = `You are a Pinterest marketing strategist and content optimization expert. Your role is to analyze article content and create high-performing Pinterest pin variants based on proven strategies and current market research.

ARTICLE CONTENT:
Title: ${extractedContent.title}
Description: ${extractedContent.description}
Content: ${extractedContent.content}
Headings: ${extractedContent.headings.join(', ')}
Niche: ${niche || 'General'}
Additional Insights: ${additionalInsights || 'None provided'}

ANALYSIS FRAMEWORK:

STEP 1: URL CONTENT ANALYSIS
Analyze the provided article for:
- Main topic and key subtopics covered
- Primary benefits and outcomes mentioned
- Specific tips, strategies, or actionable steps
- Target audience and demographic indicators
- Unique angles, perspectives, or contrarian views
- Statistical data, research findings, or credible results
- Expert quotes, testimonials, or authority markers
- Emotional hooks and pain points addressed

STEP 2: PINTEREST STRATEGIC OPTIMIZATION
Apply Pinterest-specific optimization by integrating:
- Proven high-performing pin formats for this content type
- Trending keyword patterns and search behavior
- Seasonal relevance and timing opportunities
- Competitor content gap analysis based on article's unique angle
- Audience pain points and solution-focused messaging
- Visual hierarchy considerations for pin text overlay
- Pinterest algorithm preferences for engagement

STEP 3: CONTENT VARIANT CREATION
Generate strategic variants using these proven Pinterest formulas:

Curiosity Formulas:
- "The [Number] [Topic] That [Outcome]"
- "[Number] [Topic] [Authority] Don't Want You to Know"
- "What Happens When You [Action] - The Results Will [Emotion]"

Benefit-Driven Formulas:
- "[Number] Ways to [Desired Outcome] in [Timeframe]"
- "How to [Achievement] Without [Common Obstacle]"
- "[Process] That Actually Works (Proven Results)"

Problem-Solution Formulas:
- "Stop [Bad Habit] - Try This [Solution] Instead"
- "Why [Common Approach] Fails (And What Works Better)"
- "[Number] Mistakes Everyone Makes With [Topic]"

Authority & Social Proof:
- "What [Number]+ [People/Experts] Learned About [Topic]"
- "[Expert/Study] Reveals [Surprising Finding]"
- "The [Topic] Method That Changed [Number] Lives"

OUTPUT REQUIREMENTS:

PIN TITLES (5-8 variants):
- Maximum 100 characters each
- High emotional impact and curiosity triggers
- Include numbers when applicable (especially for listicles)
- Optimized for both Pinterest search and visual pin overlay
- Each variant should test different psychological triggers

PINTEREST DESCRIPTIONS (5-8 variants):
- 200-500 characters each with strategic keyword integration
- Include clear call-to-action phrases
- Benefit-focused language that matches user search intent
- Natural hashtag suggestions embedded in flow
- Address specific pain points from the article

HASHTAG STRATEGY:
- Mix of high-traffic and niche-specific hashtags
- Include long-tail hashtags for better targeting
- Seasonal and trending hashtags when relevant
- Article-specific tags that match content precisely

RESEARCH INSIGHTS APPLIED:
- List specific strategic decisions made for each variant
- Explain which Pinterest optimization techniques were used
- Note trending elements or seasonal considerations included
- Highlight unique positioning against competitor content

CONTENT QUALITY STANDARDS:
- Every variant must offer genuine value and accurately represent article content
- Avoid clickbait that doesn't deliver on promises
- Ensure accessibility and inclusive language
- Optimize for Pinterest's current algorithm preferences
- Balance trending elements with evergreen appeal
- Test different emotional triggers across variants (curiosity, urgency, benefit, social proof)

TECHNICAL OUTPUT FORMAT:
Structure all generated content as JSON for easy parsing:

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

Please analyze the provided content and generate Pinterest-optimized variants following this framework.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 4000,
        messages: [{
          role: 'user',
          content: prompt
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`Claude API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.content[0].text;
    
    // Extract JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    } else {
      throw new Error('Invalid JSON response from Claude API');
    }
  } catch (error) {
    console.error('Claude API failed:', error);
    throw error;
  }
};

// Fallback template-based content generation
export const generateFallbackContent = (extractedContent, niche) => {
  const { title, description, content, headings } = extractedContent;
  
  // Extract key information
  const isListicle = /\d+/.test(title);
  const numberMatch = title.match(/\d+/);
  const mainTopic = extractMainTopic(title, content);
  const benefits = extractBenefits(content);
  const audience = extractAudience(content, niche);
  
  // Generate pin titles using templates
  const pinTitles = generateTitleVariants(mainTopic, benefits, audience, numberMatch?.[0]);
  
  // Generate descriptions using templates
  const descriptions = generateDescriptionVariants(mainTopic, benefits, audience, content);
  
  // Generate hashtags
  const hashtags = generateHashtags(mainTopic, niche, benefits);
  
  // Generate insights
  const strategicInsights = [
    `Used template-based optimization for ${mainTopic} content`,
    `Applied ${niche || 'general'} niche targeting strategies`,
    `Incorporated ${isListicle ? 'listicle' : 'article'} format optimization`,
    `Generated variants testing different emotional triggers`,
    `Focused on benefit-driven messaging for better engagement`
  ];

  return {
    pinTitles,
    descriptions,
    hashtags,
    strategicInsights
  };
};

// Helper functions for template generation
const extractMainTopic = (title, content) => {
  // Simple topic extraction logic
  const words = title.toLowerCase().split(' ');
  const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'how', 'what', 'why', 'when', 'where'];
  const meaningfulWords = words.filter(word => !stopWords.includes(word) && word.length > 3);
  return meaningfulWords.slice(0, 2).join(' ') || 'content';
};

const extractBenefits = (content) => {
  const benefitKeywords = ['save', 'improve', 'increase', 'reduce', 'boost', 'enhance', 'optimize', 'maximize', 'minimize', 'achieve', 'gain', 'earn', 'learn', 'discover', 'master'];
  const sentences = content.split('.').slice(0, 10);
  const benefits = [];
  
  sentences.forEach(sentence => {
    benefitKeywords.forEach(keyword => {
      if (sentence.toLowerCase().includes(keyword)) {
        benefits.push(keyword);
      }
    });
  });
  
  return [...new Set(benefits)].slice(0, 3);
};

const extractAudience = (content, niche) => {
  const audienceMap = {
    'Health & Wellness': 'health enthusiasts',
    'Finance & Money': 'money-conscious individuals',
    'Lifestyle & Home': 'homeowners',
    'Food & Recipes': 'home cooks',
    'Fashion & Beauty': 'style lovers',
    'Travel & Adventure': 'travelers',
    'Business & Productivity': 'entrepreneurs',
    'Parenting & Family': 'parents',
    'DIY & Crafts': 'DIY enthusiasts',
    'Technology': 'tech users',
    'Education & Learning': 'learners',
    'Fitness & Exercise': 'fitness enthusiasts'
  };
  
  return audienceMap[niche] || 'everyone';
};

const generateTitleVariants = (mainTopic, benefits, audience, number) => {
  const templates = [
    `${number || '10'} ${mainTopic} Tips That Actually Work`,
    `How to Master ${mainTopic} Without the Stress`,
    `The ${mainTopic} Guide for ${audience}`,
    `${mainTopic} Mistakes Everyone Makes`,
    `Why Your ${mainTopic} Strategy Is Wrong`,
    `${number || '5'} Ways to ${benefits[0] || 'improve'} Your ${mainTopic}`,
    `The Secret to ${mainTopic} Success`,
    `${mainTopic} Hacks That Changed Everything`
  ];
  
  return templates.slice(0, 6).map((title, index) => ({
    title: title.substring(0, 100),
    strategy: getStrategyForTemplate(index)
  }));
};

const generateDescriptionVariants = (mainTopic, benefits, audience, content) => {
  const templates = [
    `Discover the best ${mainTopic} strategies that actually work. This comprehensive guide covers everything ${audience} need to know. Save this pin for later! 📌`,
    `Struggling with ${mainTopic}? Here's how to ${benefits[0] || 'improve'} your results fast. Step-by-step guide with proven techniques. Perfect for ${audience}! ✨`,
    `${mainTopic} doesn't have to be complicated. Learn the simple strategies that deliver real results. Bookmark this for easy reference! 💡`,
    `Ready to transform your ${mainTopic} game? These expert tips will help you ${benefits[1] || 'achieve'} better results. Click to read more! 🚀`,
    `The ultimate ${mainTopic} resource for ${audience}. Everything you need to know in one place. Save time and get better results! ⭐`,
    `Stop making these ${mainTopic} mistakes! Learn what actually works and start seeing real progress. Perfect guide for beginners and pros! 🎯`
  ];
  
  return templates.map((description, index) => ({
    description: description.substring(0, 500),
    strategy: getDescriptionStrategy(index)
  }));
};

const generateHashtags = (mainTopic, niche, benefits) => {
  const topicWords = mainTopic.split(' ');
  const nicheHashtags = {
    'Health & Wellness': ['#health', '#wellness', '#healthy', '#selfcare'],
    'Finance & Money': ['#money', '#finance', '#investing', '#savings'],
    'Lifestyle & Home': ['#lifestyle', '#home', '#homedecor', '#living'],
    'Food & Recipes': ['#food', '#recipes', '#cooking', '#foodie'],
    'Fashion & Beauty': ['#fashion', '#beauty', '#style', '#outfit'],
    'Travel & Adventure': ['#travel', '#adventure', '#wanderlust', '#explore'],
    'Business & Productivity': ['#business', '#productivity', '#entrepreneur', '#success'],
    'Parenting & Family': ['#parenting', '#family', '#kids', '#mom'],
    'DIY & Crafts': ['#diy', '#crafts', '#handmade', '#creative'],
    'Technology': ['#tech', '#technology', '#digital', '#innovation'],
    'Education & Learning': ['#education', '#learning', '#study', '#knowledge'],
    'Fitness & Exercise': ['#fitness', '#exercise', '#workout', '#health']
  };
  
  const primary = [
    `#${topicWords[0] || 'tips'}`,
    `#${topicWords[1] || 'guide'}`,
    '#pinterest',
    '#viral'
  ];
  
  const niche_tags = nicheHashtags[niche] || ['#tips', '#guide', '#howto', '#advice'];
  
  const longtail = [
    `#${mainTopic.replace(' ', '')}tips`,
    `#${mainTopic.replace(' ', '')}guide`,
    `#${benefits[0] || 'improve'}${topicWords[0] || ''}`,
    `#${topicWords[0] || 'content'}hacks`
  ];
  
  return {
    primary,
    niche: niche_tags,
    longtail
  };
};

const getStrategyForTemplate = (index) => {
  const strategies = [
    'Number Hook + Authority',
    'Benefit-Driven + Problem Solution',
    'Audience Targeting + Authority',
    'Problem Identification',
    'Contrarian Approach',
    'Benefit-Driven + Number Hook',
    'Curiosity Gap + Authority',
    'Social Proof + Transformation'
  ];
  return strategies[index] || 'Template-Based Optimization';
};

const getDescriptionStrategy = (index) => {
  const strategies = [
    'Benefit-Focused + CTA',
    'Problem-Solution + Urgency',
    'Simplification + Authority',
    'Transformation + Engagement',
    'Comprehensive + Value',
    'Mistake Avoidance + Expertise'
  ];
  return strategies[index] || 'Template-Based Description';
};