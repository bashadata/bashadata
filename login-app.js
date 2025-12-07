function LoginPage() {
  const [view, setView] = React.useState('login');
  const [formData, setFormData] = React.useState({
    username: '', password: '', rememberMe: false
  });
  const [memberData, setMemberData] = React.useState({
    name: '', phone: '', email: '', screenshot: ''
  });
  const [forgotEmail, setForgotEmail] = React.useState('');

  React.useEffect(() => {
    const remembered = localStorage.getItem('rememberMe');
    if (remembered === 'true') {
      const user = authGetCurrentUser();
      if (user) {
        window.location.href = 'home.html';
      }
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await authLogin(formData.username, formData.password);
    
    if (result.success) {
      if (formData.rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }
      window.location.href = 'home.html';
    } else {
      alert('اسم المستخدم أو كلمة المرور غير صحيحة');
    }
  };

  const handleMemberRequest = (e) => {
    e.preventDefault();
    if (!memberData.name || !memberData.phone || !memberData.email) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }
    authRegisterMember(memberData);
    alert('تم إرسال طلبك بنجاح! سيتم مراجعته من قبل المشرف.');
    setView('login');
    setMemberData({ name: '', phone: '', email: '', screenshot: '' });
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      alert('يرجى إدخال البريد الإلكتروني');
      return;
    }
    alert('تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني');
    setView('login');
    setForgotEmail('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <div className="icon-database text-4xl text-white"></div>
          </div>
          <h1 className="text-3xl font-bold text-purple-500">Pasha Data</h1>
          <p className="text-gray-400 mt-2">إدارة البيانات والمحتوى</p>
        </div>

        {view === 'login' && (
          <div className="card">
            <h2 className="text-2xl font-bold mb-6 text-center">تسجيل الدخول</h2>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-semibold">اسم المستخدم</label>
                <input
                  type="text"
                  className="input-field"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-semibold">كلمة المرور</label>
                <input
                  type="password"
                  className="input-field"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData({...formData, rememberMe: e.target.checked})}
                  className="w-4 h-4 text-purple-600 rounded"
                />
                <label htmlFor="rememberMe" className="mr-2 text-sm">تذكرني</label>
              </div>

              <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-bold">
                دخول
              </button>
            </form>

            <div className="mt-6 space-y-3">
              <button
                onClick={() => setView('member')}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2"
              >
                <div className="icon-user-plus text-xl"></div>
                إضافة عضو
              </button>
              
              <button
                onClick={() => setView('forgot')}
                className="w-full text-sm text-gray-400 hover:text-white"
              >
                نسيت كلمة المرور؟
              </button>
            </div>
          </div>
        )}

        {view === 'member' && (
          <div className="card">
            <h2 className="text-2xl font-bold mb-6 text-center">طلب إضافة عضو</h2>
            
            <form onSubmit={handleMemberRequest} className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-semibold">الاسم الكامل</label>
                <input
                  type="text"
                  className="input-field"
                  value={memberData.name}
                  onChange={(e) => setMemberData({...memberData, name: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-semibold">رقم الهاتف</label>
                <input
                  type="tel"
                  className="input-field"
                  value={memberData.phone}
                  onChange={(e) => setMemberData({...memberData, phone: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-semibold">البريد الإلكتروني</label>
                <input
                  type="email"
                  className="input-field"
                  value={memberData.email}
                  onChange={(e) => setMemberData({...memberData, email: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-semibold">صورة شاشة (اختياري)</label>
                <input
                  type="file"
                  accept="image/*"
                  className="input-field"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => setMemberData({...memberData, screenshot: reader.result});
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>

              <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold">
                إرسال الطلب
              </button>
              
              <button
                type="button"
                onClick={() => setView('login')}
                className="w-full text-sm text-gray-400 hover:text-white"
              >
                العودة لتسجيل الدخول
              </button>
            </form>
          </div>
        )}

        {view === 'forgot' && (
          <div className="card">
            <h2 className="text-2xl font-bold mb-6 text-center">نسيت كلمة المرور</h2>
            
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-semibold">البريد الإلكتروني</label>
                <input
                  type="email"
                  className="input-field"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="أدخل بريدك الإلكتروني"
                  required
                />
              </div>

              <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-bold">
                إرسال رابط الاستعادة
              </button>
              
              <button
                type="button"
                onClick={() => setView('login')}
                className="w-full text-sm text-gray-400 hover:text-white"
              >
                العودة لتسجيل الدخول
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

function initializeLogin() {
  try {
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
      root.render(<LoginPage />);
    });
  } catch (error) {
    console.error('Failed to initialize React:', error);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeLogin);
} else {
  initializeLogin();
}
