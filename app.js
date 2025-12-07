class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">حدث خطأ ما</h1>
            <button onClick={() => window.location.reload()} className="btn-primary">
              إعادة تحميل الصفحة
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  try {
    const [items, setItems] = React.useState([]);
    const [images, setImages] = React.useState([]);
    const [view, setView] = React.useState('home');
    const [selectedCategory, setSelectedCategory] = React.useState(null);
    const [currentUser, setCurrentUser] = React.useState(null);
    const [settings, setSettings] = React.useState({
      logo: '',
      phone: '01271994344',
      bannerText: 'إعلان متحرك قابل للتعديل',
      heroImage: '',
      ownerImage: '',
      facebookLink: ''
    });

    React.useEffect(() => {
      const user = authGetCurrentUser();
      setCurrentUser(user);
      loadItems();
      loadImages();
      loadSettings();
    }, []);

    const loadSettings = () => {
      const saved = localStorage.getItem('pashaDataSettings');
      if (saved) {
        setSettings(JSON.parse(saved));
      }
    };

    const loadItems = async () => {
      const data = await dbGetAllItems();
      setItems(data);
    };

    const loadImages = () => {
      const saved = localStorage.getItem('pashaImages') || '[]';
      setImages(JSON.parse(saved));
    };

    const addItem = async (item) => {
      const newItem = await dbAddItem(item);
      setItems([...items, newItem]);
    };

    const deleteItem = async (id) => {
      await dbDeleteItem(id);
      setItems(items.filter(item => item.id !== id));
    };

    const addImage = (image) => {
      const newImages = [...images, { ...image, id: Date.now().toString() }];
      setImages(newImages);
      localStorage.setItem('pashaImages', JSON.stringify(newImages));
    };

    const deleteImage = (id) => {
      const newImages = images.filter(img => img.id !== id);
      setImages(newImages);
      localStorage.setItem('pashaImages', JSON.stringify(newImages));
    };

    const filteredItems = selectedCategory 
      ? items.filter(item => item.category === selectedCategory)
      : items;

    return (
      <div className="min-h-screen" data-name="app" data-file="app.js">
        <Header settings={settings} onViewChange={setView} currentUser={currentUser} />
        
        <main className="container mx-auto px-4 py-8 max-w-7xl">
          <Banner text={settings.bannerText} settings={settings} />
          <ImageAd settings={settings} isAdmin={currentUser?.isAdmin} onEditClick={() => {
            setSettings({...settings, imageAd: ''});
            localStorage.setItem('pashaDataSettings', JSON.stringify({...settings, imageAd: ''}));
          }} />
          
          {settings.heroImage && (
            <div className="my-6">
              <img src={settings.heroImage} alt="Hero" className="w-full h-64 object-cover rounded-lg" />
            </div>
          )}
          
          {view === 'home' && (
            <>
              {currentUser && currentUser.isAdmin && (
                <CategoryButtons onAddItem={addItem} onCategoryClick={setSelectedCategory} />
              )}
              
              {selectedCategory && (
                <div className="mb-4">
                  <button onClick={() => setSelectedCategory(null)} className="btn-secondary">
                    عرض الكل
                  </button>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
                {filteredItems.map(item => (
                  <ItemCard key={item.id} item={item} onDelete={deleteItem} isAdmin={currentUser?.isAdmin} />
                ))}
              </div>
            </>
          )}
          
          {view === 'images' && (
            <ImageGallery 
              images={images} 
              onAddImage={addImage} 
              onDeleteImage={deleteImage}
              isAdmin={currentUser?.isAdmin}
            />
          )}
          
          <ContactSection 
            settings={settings} 
            isAdmin={currentUser?.isAdmin}
            onEditClick={() => window.location.href = 'control-panel.html'}
          />
          <PriceCalculator 
            settings={settings}
            isAdmin={currentUser?.isAdmin}
            onEditClick={() => window.location.href = 'control-panel.html'}
          />
        </main>
        
        <SupportChat />
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

// Wait for DOM to be fully loaded before initializing React
function initializeApp() {
  try {
    // Check authentication first
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!currentUser) {
      window.location.href = 'login.html';
      return;
    }
    
    // Wait for next tick to ensure DOM is fully parsed
    requestAnimationFrame(() => {
      const rootElement = document.getElementById('root');
      if (!rootElement) {
        console.error('Root element not found');
        return;
      }
      
      // Verify rootElement is a valid DOM element and attached to document
      if (!(rootElement instanceof HTMLElement) || !document.body.contains(rootElement)) {
        console.error('Root element is not a valid HTML element or not attached to DOM');
        return;
      }
      
      const root = ReactDOM.createRoot(rootElement);
      root.render(
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      );
    });
  } catch (error) {
    console.error('Failed to initialize React:', error);
  }
}

// Ensure DOM is ready before running
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
