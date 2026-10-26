import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PromptWorkbench } from './components/PromptWorkbench';
import { TemplatesGallery } from './components/TemplatesGallery';
import { DigitalShop } from './components/DigitalShop';
import { PromptLibrary } from './components/PromptLibrary';
import { ContentFactoryStudio } from './components/ContentFactoryStudio';
import { SpeakingInquiry } from './components/SpeakingInquiry';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ProductPreviewModal } from './components/ProductPreviewModal';
import { Footer } from './components/Footer';
import { CheckCircle2, AlertCircle, Info, MessageCircle, HelpCircle } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState('optimizer');
  const [theme, setTheme] = useState(() => localStorage.getItem('po_theme') || 'dark');
  const [currency, setCurrency] = useState('NGN');
  
  // Cart State with LocalStorage persistence
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('po_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Saved Prompts Library with LocalStorage
  const [savedPrompts, setSavedPrompts] = useState(() => {
    try {
      const saved = localStorage.getItem('po_saved_prompts');
      return saved ? JSON.parse(saved) : [
        {
          id: "seed-1",
          title: "Full-Stack React & Node Clean Architecture Refactor",
          model: "claude",
          framework: "rtf",
          date: "10/25/2026",
          optimized: `You are a Principal Software Architect.
Task: Refactor the provided React component and Express API endpoints.
1. Eliminate redundant re-renders using useMemo/useCallback.
2. Structure handlers into clean custom hooks.
3. Add strict TypeScript types and comprehensive error boundaries.
Output format: Production-ready clean code with inline comments explaining architectural decisions.`
        },
        {
          id: "seed-2",
          title: "High-Converting B2B Cold Outreach Script",
          model: "chatgpt",
          framework: "star",
          date: "10/24/2026",
          optimized: `You are a Direct-Response Sales Strategist.
Task: Generate a 3-touch cold email sequence targeting CTOs.
Framework: Situation (Busy tech lead with tight sprint timelines) -> Task (Introduce automated testing tool) -> Action (Observation hook + 1 sentence competitor metric) -> Result (Frictionless 2-min demo link).
Output: Under 90 words per email, no pleasantry fluff.`
        }
      ];
    } catch {
      return [];
    }
  });

  // Unlocked Digital Products state with LocalStorage persistence
  const [unlockedProducts, setUnlockedProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('po_unlocked_products');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [previewProduct, setPreviewProduct] = useState(null);

  // Notifications / Toasts
  const [toasts, setToasts] = useState([]);

  // Sync theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('po_theme', theme);
  }, [theme]);

  // Sync cart
  useEffect(() => {
    localStorage.setItem('po_cart', JSON.stringify(cart));
  }, [cart]);

  // Sync saved prompts
  useEffect(() => {
    localStorage.setItem('po_saved_prompts', JSON.stringify(savedPrompts));
  }, [savedPrompts]);

  // Sync unlocked products
  useEffect(() => {
    localStorage.setItem('po_unlocked_products', JSON.stringify(unlockedProducts));
  }, [unlockedProducts]);

  // Active section tracking on scroll
  useEffect(() => {
    const sectionMap = [
      { id: 'optimizer-workbench', tab: 'optimizer' },
      { id: 'content-factory-studio', tab: 'factory' },
      { id: 'templates-gallery', tab: 'templates' },
      { id: 'digital-shop', tab: 'shop' },
      { id: 'speaking-inquiry', tab: 'speaking' },
      { id: 'prompt-library', tab: 'library' }
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const match = sectionMap.find(s => s.id === entry.target.id);
            if (match) {
              setActiveTab(match.tab);
            }
          }
        });
      },
      {
        rootMargin: '-10% 0px -60% 0px',
        threshold: 0.1
      }
    );

    sectionMap.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const notify = (message, type = 'blue') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  // Cart operations
  const handleAddToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(productId);
    } else {
      setCart(prev => prev.map(item => item.id === productId ? { ...item, quantity: newQty } : item));
    }
  };

  const handleRemoveItem = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
    notify("Item removed from cart", "red");
  };

  const handleClearCart = () => {
    setCart([]);
    notify("Cart cleared", "red");
  };

  const handleProceedCartCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutItems(cart);
    setIsCheckoutOpen(true);
  };

  const handleDirectBuy = (product) => {
    setCheckoutItems([{ ...product, quantity: 1 }]);
    setIsCheckoutOpen(true);
  };

  // Unlock products after successful code confirmation
  const handleUnlockOrder = (purchasedItems) => {
    setUnlockedProducts(prev => {
      const existingIds = new Set(prev.map(p => p.id));
      const newItems = purchasedItems
        .filter(item => !existingIds.has(item.id))
        .map(item => ({ ...item, unlockedAt: new Date().toLocaleDateString() }));
      return [...newItems, ...prev];
    });
    // Switch to library so user sees their new purchases
    setActiveTab('library');
    notify("Purchased products added to your permanent library!", "success");
  };

  // Library operations
  const handleSavePrompt = (promptItem) => {
    setSavedPrompts(prev => [promptItem, ...prev]);
  };

  const handleMergePrompts = (cloudPrompts) => {
    setSavedPrompts(prev => {
      const existingIds = new Set(prev.map(p => p.id));
      const newItems = cloudPrompts.filter(p => !existingIds.has(p.id));
      return [...newItems, ...prev];
    });
  };

  const handleDeletePrompt = (id) => {
    setSavedPrompts(prev => prev.filter(p => p.id !== id));
    notify("Prompt removed from library", "red");
  };

  // Smooth scroll helper
  const scrollToSection = (sectionId, tabName) => {
    if (tabName) setActiveTab(tabName);
    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 88;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = Math.max(0, elementPosition - navOffset);

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Select template to load into workbench
  const handleSelectTemplate = (template) => {
    setActiveTab('optimizer');
    notify(`Loaded template: "${template.title}" into Optimizer!`, "success");
    scrollToSection('optimizer-workbench', 'optimizer');
  };

  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Cyber Mesh Background with Dual Red & Blue Glowing Highlights */}
      <div className="cyber-bg-overlay">
        <div className="glow-spot-red"></div>
        <div className="glow-spot-blue"></div>
        <div className="glow-spot-center"></div>
        <div className="cyber-grid"></div>
      </div>

      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartCount}
        openCart={() => setIsCartOpen(true)}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main className="app-container" style={{ flex: 1 }}>
        {/* Hero Section */}
        <Hero
          onStartOptimizing={() => scrollToSection('optimizer-workbench', 'optimizer')}
          onExploreShop={() => scrollToSection('digital-shop', 'shop')}
          onOpenFactory={() => scrollToSection('content-factory-studio', 'factory')}
          onOpenSpeaking={() => scrollToSection('speaking-inquiry', 'speaking')}
        />

        {/* 1. AI Prompt Engineering Workbench */}
        <PromptWorkbench
          onSavePrompt={handleSavePrompt}
          onNotify={notify}
        />

        {/* 2. Autonomous 30-Mode Digital Content Factory */}
        <ContentFactoryStudio
          onNotify={notify}
        />

        {/* 3. Prompt Templates Gallery */}
        <TemplatesGallery
          onSelectTemplate={handleSelectTemplate}
          onNotify={notify}
        />

        {/* 4. Digital Creator Shop & Marketplace */}
        <DigitalShop
          onAddToCart={handleAddToCart}
          onOpenPreview={(product) => setPreviewProduct(product)}
          onDirectBuy={handleDirectBuy}
          currency={currency}
          setCurrency={setCurrency}
          onNotify={notify}
        />

        {/* 5. Keynote Speaking & Executive Workshop Inquiry */}
        <SpeakingInquiry
          onNotify={notify}
        />

        {/* 6. Saved Prompts & Unlocked Digital Library */}
        <PromptLibrary
          savedPrompts={savedPrompts}
          unlockedProducts={unlockedProducts}
          onDeletePrompt={handleDeletePrompt}
          onMergePrompts={handleMergePrompts}
          onNotify={notify}
        />
      </main>

      {/* Floating 24/7 WhatsApp Quick Help & Feedback Widget (Bottom Left) */}
      <aside 
        aria-label="Direct Support and Feedback"
        className="floating-feedback-widget"
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          zIndex: 99
        }}
      >
        <a
          href="https://wa.me/2348034710699?text=Hello%20Samuel%20Omotoso!%20I'm%20using%20Master%20Prompt%20Studio%20and%20would%20like%20to%20send%20feedback%20or%20inquire%20about%20a%20feature."
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
          style={{
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: '#ffffff',
            padding: '10px 16px',
            borderRadius: 'var(--radius-full)',
            boxShadow: '0 8px 24px rgba(16, 185, 129, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: 700,
            fontSize: '0.85rem',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}
          title="Send instant feedback to Samuel Omotoso via WhatsApp"
        >
          <MessageCircle size={18} />
          <span>Quick Feedback / Help</span>
        </a>
      </aside>

      {/* Modals & Slide-out Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onProceedCheckout={handleProceedCartCheckout}
        currency={currency}
        setCurrency={setCurrency}
      />

      {isCheckoutOpen && (
        <CheckoutModal
          items={checkoutItems}
          currency={currency}
          onClose={() => setIsCheckoutOpen(false)}
          onClearCart={() => {
            setCart([]);
            setIsCheckoutOpen(false);
          }}
          onUnlockSuccess={handleUnlockOrder}
          onNotify={notify}
        />
      )}

      {previewProduct && (
        <ProductPreviewModal
          product={previewProduct}
          currency={currency}
          onClose={() => setPreviewProduct(null)}
          onAddToCart={handleAddToCart}
          onBuyWhatsApp={handleDirectBuy}
          onNotify={notify}
        />
      )}

      {/* Toast Notification Container */}
      <div className="toast-container">
        {toasts.map(t => (
          <div 
            key={t.id} 
            className={`toast ${t.type === 'success' ? 'toast-success' : t.type === 'red' ? 'toast-red' : ''}`}
          >
            {t.type === 'success' && <CheckCircle2 size={18} color="#10b981" />}
            {t.type === 'red' && <AlertCircle size={18} color="#ef4444" />}
            {t.type === 'blue' && <Info size={18} color="#3b82f6" />}
            <span>{t.message}</span>
          </div>
        ))}
      </div>

      {/* Global Footer */}
      <Footer setActiveTab={setActiveTab} scrollToSection={scrollToSection} />
    </div>
  );
}

export default App;
