function AccountPage() {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [activeTab, setActiveTab] = React.useState('profile');
  const [formData, setFormData] = React.useState({
    name: '', email: '', phone: '', photo: '', password: '', newPassword: ''
  });

  React.useEffect(() => {
    const user = authGetCurrentUser();
    if (user) {
      setCurrentUser(user);
      setFormData({
        name: user.name || '',
        email: user.username || '',
        phone: user.phone || '',
        photo: user.photo || '',
        password: '',
        newPassword: ''
      });
    }
  }, []);

  const handleSaveProfile = () => {
    const users = JSON.parse(localStorage.getItem('pashaUsers') || '[]');
    const userIndex = users.findIndex(u => u.username === currentUser.username);
    
    if (userIndex !== -1) {
      users[userIndex] = {
        ...users[userIndex],
        name: formData.name,
        phone: formData.phone,
        photo: formData.photo
      };
      localStorage.setItem('pashaUsers', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
      setCurrentUser(users[userIndex]);
      alert('تم حفظ البيانات بنجاح!');
    }
  };

  const handleChangePassword = () => {
    if (!formData.password || !formData.newPassword) {
      alert('يرجى ملء جميع حقول كلمة المرور');
      return;
    }

    const users = JSON.parse(localStorage.getItem('pashaUsers') || '[]');
    const userIndex = users.findIndex(u => u.username === currentUser.username && u.password === formData.password);
    
    if (userIndex !== -1) {
      users[userIndex].password = formData.newPassword;
      localStorage.setItem('pashaUsers', JSON.stringify(users));
      alert('تم تغيير كلمة المرور بنجاح!');
      setFormData({...formData, password: '', newPassword: ''});
    } else {
      alert('كلمة المرور الحالية غير صحيحة');
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">إعدادات الحساب</h1>
          <a href="home.html" className="bg-gray-700 px-6 py-2 rounded-lg hover:bg-gray-600">
            العودة للرئيسية
          </a>
        </div>

        {currentUser && (
          <div className="flex gap-2 mb-6">
            <button onClick={() => setActiveTab('profile')} className={`px-4 py-2 rounded-lg ${activeTab === 'profile' ? 'bg-purple-600' : 'bg-gray-700'}`}>
              الملف الشخصي
            </button>
            <button onClick={() => setActiveTab('security')} className={`px-4 py-2 rounded-lg ${activeTab === 'security' ? 'bg-purple-600' : 'bg-gray-700'}`}>
              الأمان
            </button>
          </div>
        )}

        {!currentUser && (
          <div className="card text-center">
            <div className="icon-alert-circle text-5xl text-yellow-500 mb-4"></div>
            <h2 className="text-xl font-bold mb-2">لا يوجد حساب نشط</h2>
            <p className="text-gray-400 mb-4">يرجى إنشاء حساب أولاً</p>
          </div>
        )}

        {currentUser && activeTab === 'profile' && (
          <div className="card">
            <h2 className="text-xl font-bold mb-4">معلومات الملف الشخصي</h2>
            
            <div className="flex items-center gap-6 mb-6">
              {formData.photo ? (
                <img src={formData.photo} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
              ) : (
                <div className="w-24 h-24 rounded-full bg-purple-600 flex items-center justify-center">
                  <div className="icon-user text-4xl text-white"></div>
                </div>
              )}
              <div>
                <h3 className="text-xl font-bold">{currentUser.name}</h3>
                <p className="text-gray-400">{currentUser.isAdmin ? 'مشرف' : 'عضو'}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block mb-2 font-semibold">الاسم</label>
                <input type="text" className="input-field" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              
              <div>
                <label className="block mb-2 font-semibold">البريد الإلكتروني / اسم المستخدم</label>
                <input type="text" className="input-field" value={formData.email} disabled />
              </div>
              
              <div>
                <label className="block mb-2 font-semibold">رقم الهاتف</label>
                <input type="tel" className="input-field" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              </div>
              
              <div>
                <label className="block mb-2 font-semibold">الصورة الشخصية</label>
                <input type="file" accept="image/*" className="input-field" onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => setFormData({...formData, photo: reader.result});
                    reader.readAsDataURL(file);
                  }
                }} />
              </div>

              <button onClick={handleSaveProfile} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-bold">
                حفظ التغييرات
              </button>
            </div>
          </div>
        )}

        {currentUser && activeTab === 'security' && (
          <div className="card">
            <h2 className="text-xl font-bold mb-4">تغيير كلمة المرور</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block mb-2 font-semibold">كلمة المرور الحالية</label>
                <input type="password" className="input-field" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
              </div>
              
              <div>
                <label className="block mb-2 font-semibold">كلمة المرور الجديدة</label>
                <input type="password" className="input-field" value={formData.newPassword} onChange={(e) => setFormData({...formData, newPassword: e.target.value})} />
              </div>

              <button onClick={handleChangePassword} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-bold">
                تغيير كلمة المرور
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function initializeAccount() {
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
      root.render(<AccountPage />);
    });
  } catch (error) {
    console.error('Failed to initialize React:', error);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeAccount);
} else {
  initializeAccount();
}
