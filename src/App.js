import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Link, 
  Zap, 
  Copy, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Sun, 
  Moon,
  AlertCircle,
  Loader,
  Star,
  TrendingUp,
  Target,
  Hash
} from 'lucide-react';
import './App.css';
import { extractContentFromUrl, generatePinterestContent, generateFallbackContent } from './utils/contentProcessor';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [url, setUrl] = useState('');
  const [niche, setNiche] = useState('');
  const [additionalInsights, setAdditionalInsights] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const [results, setResults] = useState(null);
  const [copiedItems, setCopiedItems] = useState(new Set());
  const [expandedInsights, setExpandedInsights] = useState(false);
  const [error, setError] = useState('');
  const [isAiMode, setIsAiMode] = useState(true);

  const niches = [
    'Health & Wellness',
    'Finance & Money',
    'Lifestyle & Home',
    'Food & Recipes',
    'Fashion & Beauty',
    'Travel & Adventure',
    'Business & Productivity',
    'Parenting & Family',
    'DIY & Crafts',
    'Technology',
    'Education & Learning',
    'Fitness & Exercise',
    'Animals & Pets'
  ];

  const processingMessages = [
    "PinCraft AI is analyzing your content magic...",
    "Extracting key insights and opportunities...",
    "Crafting your viral variants...",
    "Applying Pinterest optimization strategies...",
    "Almost ready with your Pinterest gold..."
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem('pincraft-theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('pincraft-theme', darkMode ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const handleGenerate = useCallback(async () => {
    if (!url.trim()) {
      setError('Please enter a valid URL');
      return;
    }

    setIsProcessing(true);
    setError('');
    setResults(null);
    setCopiedItems(new Set());
    
    try {
      // Step 1: Extract content
      setProcessingStep(processingMessages[0]);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const extractedContent = await extractContentFromUrl(url);
      
      // Step 2: Generate content
      setProcessingStep(processingMessages[1]);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProcessingStep(processingMessages[2]);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      let generatedContent;
      try {
        // Try AI generation first
        generatedContent = await generatePinterestContent(extractedContent, niche, additionalInsights);
        setIsAiMode(true);
      } catch (aiError) {
        // Fallback to template mode
        console.log('AI failed, using fallback templates:', aiError);
        generatedContent = generateFallbackContent(extractedContent, niche);
        setIsAiMode(false);
      }
      
      setProcessingStep(processingMessages[4]);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setResults(generatedContent);
    } catch (error) {
      console.error('Generation failed:', error);
      setError('Failed to process the URL. Please check the URL and try again.');
    } finally {
      setIsProcessing(false);
      setProcessingStep('');
    }
  }, [url, niche, additionalInsights]);

  const copyToClipboard = async (text, itemId) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItems(prev => new Set([...prev, itemId]));
      setTimeout(() => {
        setCopiedItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(itemId);
          return newSet;
        });
      }, 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const copyAllContent = () => {
    if (!results) return;
    
    const allContent = `PIN TITLES:\n${results.pinTitles.map((item, i) => `${i + 1}. ${item.title}`).join('\n')}\n\nDESCRIPTIONS:\n${results.descriptions.map((item, i) => `${i + 1}. ${item.description}`).join('\n')}\n\nHASHTAGS:\n${[...results.hashtags.primary, ...results.hashtags.niche, ...results.hashtags.longtail].join(' ')}`;
    
    copyToClipboard(allContent, 'all-content');
  };

  const handleKeyboardShortcut = useCallback(() => {
    if (url && !isProcessing) {
      handleGenerate();
    }
  }, [url, isProcessing, handleGenerate]);

  const handleKeydown = useCallback((e) => {
    if (e.ctrlKey && results) {
      const num = parseInt(e.key);
      if (num >= 1 && num <= results.pinTitles.length) {
        e.preventDefault();
        copyToClipboard(results.pinTitles[num - 1].title, `title-${num - 1}`);
      }
    }
  }, [results]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleKeyboardShortcut();
      } else {
        handleKeydown(e);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyboardShortcut, handleKeydown]);

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <div className="container">
        {/* Header */}
        <motion.header 
          className="header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="header-content">
            <div className="logo">
              <Sparkles className="logo-icon" />
              <h1>PinCraft AI</h1>
            </div>
            <p className="tagline">Transform any article into Pinterest gold with AI-powered optimization</p>
            <button 
              className="theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </motion.header>

        {/* Main Form */}
        <motion.section 
          className="input-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="input-card">
            <div className="form-container">
              <div className="input-group url-group">
                <label htmlFor="url-input" className="input-label">
                  <Link size={18} />
                  Article URL
                </label>
                <input
                  id="url-input"
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste your article URL here..."
                  className="url-input"
                  disabled={isProcessing}
                />
              </div>

              <div className="input-group niche-group">
                <label htmlFor="niche-select" className="input-label">
                  <Target size={18} />
                  Content Niche
                </label>
                <select
                  id="niche-select"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="niche-select"
                  disabled={isProcessing}
                  size="1"
                >
                  <option value="">Select your niche...</option>
                  {niches.map(n => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>

              <div className="input-group insights-group">
                <label htmlFor="insights-input" className="input-label">
                  <TrendingUp size={18} />
                  Additional Market Insights (Optional)
                </label>
                <textarea
                  id="insights-input"
                  value={additionalInsights}
                  onChange={(e) => setAdditionalInsights(e.target.value)}
                  placeholder="Any specific trends, audience insights, or strategic notes..."
                  className="insights-input"
                  rows={3}
                  disabled={isProcessing}
                />
              </div>

              <div className="generate-group">
                <motion.button
                  className="generate-button"
                  onClick={handleGenerate}
                  disabled={isProcessing || !url.trim()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isProcessing ? (
                    <>
                      <Loader className="spinning" size={20} />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Zap size={20} />
                      Generate
                    </>
                  )}
                </motion.button>
              </div>
            </div>

            {error && (
              <motion.div 
                className="error-message"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <AlertCircle size={18} />
                {error}
              </motion.div>
            )}
          </div>
        </motion.section>

        {/* Processing Animation */}
        <AnimatePresence>
          {isProcessing && (
            <motion.section 
              className="processing-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="processing-card">
                <div className="processing-animation">
                  <div className="pulse-circle"></div>
                  <Sparkles className="processing-icon" />
                </div>
                <p className="processing-message">{processingStep}</p>
                <div className="progress-bar">
                  <div className="progress-fill"></div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {results && (
            <motion.section 
              className="results-section"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* AI Mode Indicator */}
              {!isAiMode && (
                <motion.div 
                  className="fallback-notice"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <AlertCircle size={18} />
                  AI Assistant Offline - Using Smart Templates
                </motion.div>
              )}

              {/* Export Options */}
              <div className="export-header">
                <h2>Your Pinterest Content Strategy</h2>
                <motion.button
                  className="copy-all-button"
                  onClick={copyAllContent}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {copiedItems.has('all-content') ? (
                    <><Check size={18} /> Copied All!</>
                  ) : (
                    <><Copy size={18} /> Copy Everything</>
                  )}
                </motion.button>
              </div>

              {/* Pin Titles */}
              <div className="content-section">
                <h3 className="section-title">
                  <Hash size={20} />
                  Pin Titles
                  <span className="keyboard-hint">Ctrl+1-{results.pinTitles.length}</span>
                </h3>
                <div className="content-grid">
                  {results.pinTitles.map((item, index) => (
                    <motion.div
                      key={index}
                      className="content-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -2 }}
                    >
                      <div className="content-text">{item.title}</div>
                      <div className="content-meta">
                        <span className="strategy-tag">{item.strategy}</span>
                        <motion.button
                          className="copy-button"
                          onClick={() => copyToClipboard(item.title, `title-${index}`)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {copiedItems.has(`title-${index}`) ? (
                            <Check size={16} className="success" />
                          ) : (
                            <Copy size={16} />
                          )}
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Descriptions */}
              <div className="content-section">
                <h3 className="section-title">
                  <Star size={20} />
                  Pinterest Descriptions
                </h3>
                <div className="content-grid">
                  {results.descriptions.map((item, index) => (
                    <motion.div
                      key={index}
                      className="content-card description-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -2 }}
                    >
                      <div className="content-text">{item.description}</div>
                      <div className="content-meta">
                        <span className="strategy-tag">{item.strategy}</span>
                        <motion.button
                          className="copy-button"
                          onClick={() => copyToClipboard(item.description, `desc-${index}`)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {copiedItems.has(`desc-${index}`) ? (
                            <Check size={16} className="success" />
                          ) : (
                            <Copy size={16} />
                          )}
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Hashtags */}
              <div className="content-section">
                <h3 className="section-title">
                  <Hash size={20} />
                  Strategic Hashtags
                </h3>
                <div className="hashtag-groups">
                  <div className="hashtag-group">
                    <h4>Primary Tags</h4>
                    <div className="hashtag-container">
                      {results.hashtags.primary.map((tag, index) => (
                        <span key={index} className="hashtag primary">{tag}</span>
                      ))}
                    </div>
                    <motion.button
                      className="copy-button small"
                      onClick={() => copyToClipboard(results.hashtags.primary.join(' '), 'primary-tags')}
                      whileHover={{ scale: 1.05 }}
                    >
                      {copiedItems.has('primary-tags') ? <Check size={14} /> : <Copy size={14} />}
                    </motion.button>
                  </div>
                  
                  <div className="hashtag-group">
                    <h4>Niche Tags</h4>
                    <div className="hashtag-container">
                      {results.hashtags.niche.map((tag, index) => (
                        <span key={index} className="hashtag niche">{tag}</span>
                      ))}
                    </div>
                    <motion.button
                      className="copy-button small"
                      onClick={() => copyToClipboard(results.hashtags.niche.join(' '), 'niche-tags')}
                      whileHover={{ scale: 1.05 }}
                    >
                      {copiedItems.has('niche-tags') ? <Check size={14} /> : <Copy size={14} />}
                    </motion.button>
                  </div>
                  
                  <div className="hashtag-group">
                    <h4>Long-tail Tags</h4>
                    <div className="hashtag-container">
                      {results.hashtags.longtail.map((tag, index) => (
                        <span key={index} className="hashtag longtail">{tag}</span>
                      ))}
                    </div>
                    <motion.button
                      className="copy-button small"
                      onClick={() => copyToClipboard(results.hashtags.longtail.join(' '), 'longtail-tags')}
                      whileHover={{ scale: 1.05 }}
                    >
                      {copiedItems.has('longtail-tags') ? <Check size={14} /> : <Copy size={14} />}
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Strategic Insights */}
              {results.strategicInsights && results.strategicInsights.length > 0 && (
                <div className="content-section">
                  <motion.button
                    className="insights-toggle"
                    onClick={() => setExpandedInsights(!expandedInsights)}
                    whileHover={{ scale: 1.02 }}
                  >
                    <TrendingUp size={20} />
                    Strategic Insights & Reasoning
                    {expandedInsights ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </motion.button>
                  
                  <AnimatePresence>
                    {expandedInsights && (
                      <motion.div
                        className="insights-content"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        {results.strategicInsights.map((insight, index) => (
                          <motion.div
                            key={index}
                            className="insight-card"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div className="insight-icon">💡</div>
                            <p>{insight}</p>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </motion.section>
          )}
        </AnimatePresence>

        {/* Footer */}
        <footer className="footer">
          <p>Built with ❤️ for Pinterest creators • PinCraft AI v1.0</p>
        </footer>
      </div>
    </div>
  );
}

export default App;