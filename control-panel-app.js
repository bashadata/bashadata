function ControlPanel() {
  try {
    const [currentUser, setCurrentUser] = React.useState(null);
    const [activeTab, setActiveTab] = React.useState('settings');
    const [pendingMembers, setPendingMembers] = React.useState([]);
    const [approvedMembers, setApprovedMembers] = React.useState([]);

    const [settings, setSettings] = React.useState({
      logo: '',
      phone: '01271994344',
      bannerText: 'إعلان متحرك قابل للتعديل',
      bannerTextSize: '20',
      bannerTextColor: '#ffffff',
      bannerFontWeight: 'bold',
      bannerFontStyle: 'normal',
      bannerEmojis: '🎉',
      headerText: 'هذا الموقع مخصص لصفحة Pasha Data',
      heroImage: '',
      calculatorTitle: 'حاسبة الأسعار 💰',
      backgroundColor: '#111827',
      primaryColor: '#8b5cf6',
      ownerName: 'صاحب الموقع',
      ownerImage: '',
      ownerAddress: '',
      ownerLocation: '',
      workDays: 'السبت - الخميس',
      whatsappLink: '',
      telegramLink: '',
      facebookLink: '',
      orangeCashImage: '',
      orangeCashNumber: '01271994344',
      orangeCashName: 'Orange Cash',
      socialFooterImage: '',
      promoText: 'ماذا تنتظر؟ عروض جديدة قادمة قريباً!',
      supportText: 'الدعم الفني متاح، وإمكانية تخصيص مظهر الهارد',
      hardDriveImages: [],
      prices: [
        { size: '500GB', price: '180', type: 'ألعاب' },
        { size: '1TB', price: '200', type: 'ألعاب' },
        { size: '2TB', price: '260', type: 'ألعاب' },
        { size: '3TB', price: '300', type: 'ألعاب' },
        { size: '4TB', price: '350', type: 'ألعاب' },
        { size: '5TB', price: '390', type: 'ألعاب' }
      ],
      externalPrices: [
        { size: '750GB', price: '950', note: 'للاب توب + بيانات' },
        { size: '640GB', price: '750', note: 'للاب توب + بيانات' }
      ],
      defaultMemberPhoto: ''
    });
    const [chatSettings, setChatSettings] = React.useState({
      autoReply: 'مرحباً! كيف يمكنني مساعدتك؟',
      autoReplyColor: '#8b5cf6',
      emojis: ['😊', '👍', '🎉', '💯']
    });

    React.useEffect(() => {
      const user = authGetCurrentUser();
      if (!user || !user.isAdmin) {
        window.location.href = 'login.html';
        return;
      }
      setCurrentUser(user);
      loadSettings();
      loadPendingMembers();
    }, []);

    const loadSettings = () => {
      const saved = localStorage.getItem('pashaDataSettings');
      if (saved) {
        const parsedSettings = JSON.parse(saved);
        setSettings({
          ...settings,
          ...parsedSettings,
          prices: parsedSettings.prices || settings.prices,
          externalPrices: parsedSettings.externalPrices || settings.externalPrices,
          hardDriveImages: parsedSettings.hardDriveImages || []
        });
      }
      const chatSaved = localStorage.getItem('chatSettings');
      if (chatSaved) {
        const parsedChat = JSON.parse(chatSaved);
        setChatSettings({
          ...chatSettings,
          ...parsedChat,
          emojis: parsedChat.emojis || chatSettings.emojis
        });
      }
    };

    const loadPendingMembers = () => {
      const members = JSON.parse(localStorage.getItem('pendingMembers') || '[]');
      setPendingMembers(members);
      const approved = JSON.parse(localStorage.getItem('approvedMembers') || '[]');
      setApprovedMembers(approved);
    };
    


    const handleSave = () => {
      localStorage.setItem('pashaDataSettings', JSON.stringify(settings));
      localStorage.setItem('chatSettings', JSON.stringify(chatSettings));
      alert('تم حفظ الإعدادات بنجاح!');
    };



    return (
      <div className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">لوحة التحكم</h1>
            <a href="index.html" className="bg-gray-700 px-6 py-2 rounded-lg hover:bg-gray-600">
              العودة للرئيسية
            </a>
          </div>

          <div className="flex gap-2 mb-6 flex-wrap">
            <button onClick={() => setActiveTab('settings')} className={`px-4 py-2 rounded-lg text-sm ${activeTab === 'settings' ? 'bg-purple-600' : 'bg-gray-700'}`}>
              الإعدادات
            </button>
            <button onClick={() => setActiveTab('contact')} className={`px-4 py-2 rounded-lg text-sm ${activeTab === 'contact' ? 'bg-purple-600' : 'bg-gray-700'}`}>
              التواصل
            </button>
            <button onClick={() => setActiveTab('prices')} className={`px-4 py-2 rounded-lg text-sm ${activeTab === 'prices' ? 'bg-purple-600' : 'bg-gray-700'}`}>
              الأسعار
            </button>
            <button onClick={() => setActiveTab('calculator')} className={`px-4 py-2 rounded-lg text-sm ${activeTab === 'calculator' ? 'bg-purple-600' : 'bg-gray-700'}`}>
              حاسبة الأسعار
            </button>
            <button onClick={() => setActiveTab('members')} className={`px-4 py-2 rounded-lg text-sm ${activeTab === 'members' ? 'bg-purple-600' : 'bg-gray-700'}`}>
              إدارة الأعضاء
            </button>
            <button onClick={() => setActiveTab('chat')} className={`px-4 py-2 rounded-lg text-sm ${activeTab === 'chat' ? 'bg-purple-600' : 'bg-gray-700'}`}>
              الدردشة
            </button>
            <button onClick={() => setActiveTab('appearance')} className={`px-4 py-2 rounded-lg text-sm ${activeTab === 'appearance' ? 'bg-purple-600' : 'bg-gray-700'}`}>
              المظهر
            </button>
            <button onClick={() => setActiveTab('seo')} className={`px-4 py-2 rounded-lg text-sm ${activeTab === 'seo' ? 'bg-purple-600' : 'bg-gray-700'}`}>
              SEO وجوجل
            </button>
          </div>

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="card">
                <h2 className="text-xl font-bold mb-4">تعديل الشعار والصور</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 font-semibold">صورة افتراضية للأعضاء الجدد</label>
                    <input type="file" accept="image/*" className="input-field" onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => setSettings({...settings, defaultMemberPhoto: reader.result});
                        reader.readAsDataURL(file);
                      }
                    }} />
                    <p className="text-xs text-gray-400 mt-1">سيتم استخدام هذه الصورة للأعضاء الذين لم يرفعوا صورة شخصية</p>
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">تحميل الشعار</label>
                    <input type="file" accept="image/*" className="input-field" onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => setSettings({...settings, logo: reader.result});
                        reader.readAsDataURL(file);
                      }
                    }} />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">تحميل صورة البانر الرئيسية</label>
                    <input type="file" accept="image/*" className="input-field" onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => setSettings({...settings, heroImage: reader.result});
                        reader.readAsDataURL(file);
                      }
                    }} />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">تحميل صورة صاحب الموقع</label>
                    <input type="file" accept="image/*" className="input-field" onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => setSettings({...settings, ownerImage: reader.result});
                        reader.readAsDataURL(file);
                      }
                    }} />
                  </div>
                </div>
              </div>



              <div className="card">
                <h2 className="text-xl font-bold mb-4">إعدادات الإعلان المتحرك</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 font-semibold">نص الإعلان</label>
                    <input type="text" className="input-field" value={settings.bannerText || ''} onChange={(e) => setSettings({...settings, bannerText: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 font-semibold">حجم الخط</label>
                    <input type="number" className="input-field" value={settings.bannerTextSize || '20'} onChange={(e) => setSettings({...settings, bannerTextSize: e.target.value})} />
                  </div>
                    <div>
                      <label className="block mb-2 font-semibold">عرض الخط</label>
                      <select className="input-field" value={settings.bannerFontWeight} onChange={(e) => setSettings({...settings, bannerFontWeight: e.target.value})}>
                        <option value="normal">عادي</option>
                        <option value="bold">عريض</option>
                        <option value="bolder">عريض جداً</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 font-semibold">نمط الخط</label>
                      <select className="input-field" value={settings.bannerFontStyle} onChange={(e) => setSettings({...settings, bannerFontStyle: e.target.value})}>
                        <option value="normal">عادي</option>
                        <option value="italic">مائل</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-2 font-semibold">لون النص</label>
                      <input type="color" className="w-full h-12 rounded-lg cursor-pointer" value={settings.bannerTextColor} onChange={(e) => setSettings({...settings, bannerTextColor: e.target.value})} />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">الرموز التعبيرية (يمكن إضافة عدد غير محدود)</label>
                    <input type="text" className="input-field" value={settings.bannerEmojis} onChange={(e) => setSettings({...settings, bannerEmojis: e.target.value})} placeholder="🎉 ✨ 🎁" />
                  </div>
                </div>
              </div>

              <div className="card">
                <h2 className="text-xl font-bold mb-4">إعدادات أخرى</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 font-semibold">نص الرأس</label>
                    <textarea className="input-field" rows="3" value={settings.headerText} onChange={(e) => setSettings({...settings, headerText: e.target.value})} />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">عنوان حاسبة الأسعار</label>
                    <input type="text" className="input-field" value={settings.calculatorTitle} onChange={(e) => setSettings({...settings, calculatorTitle: e.target.value})} />
                  </div>
                  <button onClick={handleSave} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-bold">حفظ الإعدادات</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div className="card">
                <h2 className="text-xl font-bold mb-4">معلومات صاحب الموقع</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 font-semibold">الاسم</label>
                    <input type="text" className="input-field" value={settings.ownerName} onChange={(e) => setSettings({...settings, ownerName: e.target.value})} />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">رقم الهاتف</label>
                    <input type="text" className="input-field" value={settings.phone} onChange={(e) => setSettings({...settings, phone: e.target.value})} />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">صورة صاحب الموقع</label>
                    <input type="file" accept="image/*" className="input-field" onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => setSettings({...settings, ownerImage: reader.result});
                        reader.readAsDataURL(file);
                      }
                    }} />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">العنوان</label>
                    <input type="text" className="input-field" value={settings.ownerAddress} onChange={(e) => setSettings({...settings, ownerAddress: e.target.value})} />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">الموقع (خريطة)</label>
                    <input type="text" className="input-field" value={settings.ownerLocation} onChange={(e) => setSettings({...settings, ownerLocation: e.target.value})} placeholder="رابط خرائط جوجل" />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">أيام العمل</label>
                    <input type="text" className="input-field" value={settings.workDays} onChange={(e) => setSettings({...settings, workDays: e.target.value})} />
                  </div>
                </div>
              </div>
              
              <div className="card">
                <h2 className="text-xl font-bold mb-4">روابط التواصل الاجتماعي</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 font-semibold">رابط واتساب</label>
                    <input type="text" className="input-field" value={settings.whatsappLink} onChange={(e) => setSettings({...settings, whatsappLink: e.target.value})} placeholder="https://wa.me/01271994344" />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">رابط تيليجرام</label>
                    <input type="text" className="input-field" value={settings.telegramLink} onChange={(e) => setSettings({...settings, telegramLink: e.target.value})} placeholder="https://t.me/username" />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">رابط فيسبوك</label>
                    <input type="text" className="input-field" value={settings.facebookLink} onChange={(e) => setSettings({...settings, facebookLink: e.target.value})} placeholder="https://facebook.com/profile" />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">صورة جذابة لأسفل الملفات الشخصية</label>
                    <input type="file" accept="image/*" className="input-field" onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => setSettings({...settings, socialFooterImage: reader.result});
                        reader.readAsDataURL(file);
                      }
                    }} />
                  </div>
                </div>
              </div>
              
              <div className="card">
                <h2 className="text-xl font-bold mb-4">إعدادات Orange Cash</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 font-semibold">اسم Orange Cash</label>
                    <input type="text" className="input-field" value={settings.orangeCashName} onChange={(e) => setSettings({...settings, orangeCashName: e.target.value})} />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">رقم Orange Cash</label>
                    <input type="text" className="input-field" value={settings.orangeCashNumber} onChange={(e) => setSettings({...settings, orangeCashNumber: e.target.value})} />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">صورة Orange Cash</label>
                    <input type="file" accept="image/*" className="input-field" onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => setSettings({...settings, orangeCashImage: reader.result});
                        reader.readAsDataURL(file);
                      }
                    }} />
                  </div>
                </div>
              </div>
              
              <button onClick={handleSave} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-bold">حفظ الإعدادات</button>
            </div>
          )}
          
          {activeTab === 'prices' && (
            <div className="space-y-6">
              <div className="card">
                <h2 className="text-xl font-bold mb-4">أسعار الهاردات الداخلية</h2>
                <div className="space-y-3">
                  {(settings.prices || []).map((item, idx) => (
                    <div key={idx} className="grid grid-cols-3 gap-4 bg-[var(--bg-dark)] p-4 rounded-lg">
                      <input type="text" className="input-field" value={item.size} onChange={(e) => {
                        const newPrices = [...settings.prices];
                        newPrices[idx].size = e.target.value;
                        setSettings({...settings, prices: newPrices});
                      }} placeholder="الحجم" />
                      <input type="text" className="input-field" value={item.price} onChange={(e) => {
                        const newPrices = [...settings.prices];
                        newPrices[idx].price = e.target.value;
                        setSettings({...settings, prices: newPrices});
                      }} placeholder="السعر" />
                      <input type="text" className="input-field" value={item.type} onChange={(e) => {
                        const newPrices = [...settings.prices];
                        newPrices[idx].type = e.target.value;
                        setSettings({...settings, prices: newPrices});
                      }} placeholder="النوع" />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="card">
                <h2 className="text-xl font-bold mb-4">أسعار الهاردات الخارجية</h2>
                <div className="space-y-3">
                  {(settings.externalPrices || []).map((item, idx) => (
                    <div key={idx} className="grid grid-cols-3 gap-4 bg-[var(--bg-dark)] p-4 rounded-lg">
                      <input type="text" className="input-field" value={item.size} onChange={(e) => {
                        const newPrices = [...settings.externalPrices];
                        newPrices[idx].size = e.target.value;
                        setSettings({...settings, externalPrices: newPrices});
                      }} placeholder="الحجم" />
                      <input type="text" className="input-field" value={item.price} onChange={(e) => {
                        const newPrices = [...settings.externalPrices];
                        newPrices[idx].price = e.target.value;
                        setSettings({...settings, externalPrices: newPrices});
                      }} placeholder="السعر" />
                      <input type="text" className="input-field" value={item.note} onChange={(e) => {
                        const newPrices = [...settings.externalPrices];
                        newPrices[idx].note = e.target.value;
                        setSettings({...settings, externalPrices: newPrices});
                      }} placeholder="ملاحظة" />
                    </div>
                  ))}
                </div>
              </div>
              
              <button onClick={handleSave} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-bold">حفظ الإعدادات</button>
            </div>
          )}

          {activeTab === 'calculator' && (
            <div className="space-y-6">
              <div className="card">
                <h2 className="text-xl font-bold mb-4">نص العروض والدعم</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 font-semibold">نص العرض الترويجي</label>
                    <input type="text" className="input-field" value={settings.promoText} onChange={(e) => setSettings({...settings, promoText: e.target.value})} />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">نص الدعم الفني</label>
                    <input type="text" className="input-field" value={settings.supportText} onChange={(e) => setSettings({...settings, supportText: e.target.value})} />
                  </div>
                </div>
              </div>
              
              <div className="card">
                <h2 className="text-xl font-bold mb-4">صور الهاردات</h2>
                <div className="space-y-4">
                  {(settings.hardDriveImages || []).map((hd, idx) => (
                    <div key={idx} className="bg-[var(--bg-dark)] p-4 rounded-lg">
                      <div className="flex gap-4 items-center mb-2">
                        {hd.image && <img src={hd.image} alt={hd.name} className="w-24 h-24 object-cover rounded" />}
                        <div className="flex-1">
                          <p className="font-bold">{hd.name}</p>
                          <p className="text-sm text-gray-400">{hd.size}</p>
                        </div>
                        <button onClick={() => {
                          const newImages = (settings.hardDriveImages || []).filter((_, i) => i !== idx);
                          setSettings({...settings, hardDriveImages: newImages});
                        }} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">حذف</button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="bg-[var(--bg-dark)] p-4 rounded-lg">
                    <h3 className="font-bold mb-3">إضافة هارد جديد</h3>
                    <div className="space-y-3">
                      <input type="text" id="hdName" className="input-field" placeholder="اسم الهارد" />
                      <input type="text" id="hdSize" className="input-field" placeholder="السعة (مثال: 500GB)" />
                      <input type="file" accept="image/*" id="hdImage" className="input-field" />
                      <button onClick={() => {
                        const name = document.getElementById('hdName').value;
                        const size = document.getElementById('hdSize').value;
                        const file = document.getElementById('hdImage').files[0];
                        if (name && size && file) {
                          const reader = new FileReader();
                          reader.onload = () => {
                            const newImages = [...(settings.hardDriveImages || []), {name, size, image: reader.result}];
                            setSettings({...settings, hardDriveImages: newImages});
                            document.getElementById('hdName').value = '';
                            document.getElementById('hdSize').value = '';
                            document.getElementById('hdImage').value = '';
                          };
                          reader.readAsDataURL(file);
                        }
                      }} className="btn-primary w-full">إضافة</button>
                    </div>
                  </div>
                </div>
              </div>
              
              <button onClick={handleSave} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-bold">حفظ الإعدادات</button>
            </div>
          )}

          {activeTab === 'members' && (
            <MembersManagement 
              approvedMembers={approvedMembers}
              setApprovedMembers={setApprovedMembers}
              pendingMembers={pendingMembers}
              setPendingMembers={setPendingMembers}
            />
          )}

          {activeTab === 'chat' && (
            <div className="card">
              <h2 className="text-xl font-bold mb-4">إعدادات الدردشة</h2>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 font-semibold">الرد التلقائي</label>
                  <textarea className="input-field" rows="4" value={chatSettings.autoReply} onChange={(e) => setChatSettings({...chatSettings, autoReply: e.target.value})} placeholder="أدخل نص الرد التلقائي" />
                </div>
                <div>
                  <label className="block mb-2 font-semibold">لون الرد التلقائي</label>
                  <input type="color" className="w-full h-12 rounded-lg cursor-pointer" value={chatSettings.autoReplyColor} onChange={(e) => setChatSettings({...chatSettings, autoReplyColor: e.target.value})} />
                </div>
                <div>
                  <label className="block mb-2 font-semibold">الرموز التعبيرية (افصل بفاصلة)</label>
                  <input type="text" className="input-field" value={chatSettings.emojis.join(',')} onChange={(e) => setChatSettings({...chatSettings, emojis: e.target.value.split(',')})} />
                </div>
                <button onClick={handleSave} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-bold">حفظ الإعدادات</button>
              </div>
            </div>
          )}
          
          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <div className="card">
                <h2 className="text-xl font-bold mb-4">إعدادات الألوان</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 font-semibold">اللون الأساسي</label>
                    <input type="color" className="w-full h-12 rounded-lg" value={settings.primaryColor || '#8b5cf6'} onChange={(e) => setSettings({...settings, primaryColor: e.target.value})} />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">لون الخلفية</label>
                    <input type="color" className="w-full h-12 rounded-lg" value={settings.backgroundColor || '#111827'} onChange={(e) => setSettings({...settings, backgroundColor: e.target.value})} />
                  </div>
                </div>
              </div>

              <div className="card">
                <h2 className="text-xl font-bold mb-4">صور الخلفية</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 font-semibold">صورة خلفية الصفحة الرئيسية</label>
                    <input type="file" accept="image/*" className="input-field" onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => setSettings({...settings, backgroundImage: reader.result});
                        reader.readAsDataURL(file);
                      }
                    }} />
                    {settings.backgroundImage && (
                      <button onClick={() => setSettings({...settings, backgroundImage: ''})} className="mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm">
                        إزالة الصورة
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="card">
                <h2 className="text-xl font-bold mb-4">القوالب المدعومة بالذكاء الاصطناعي</h2>
                <p className="text-gray-400 mb-4">اختر قالبًا جاهزًا لتطبيقه على موقعك</p>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => {
                    setSettings({
                      ...settings,
                      primaryColor: '#8b5cf6',
                      backgroundColor: '#111827',
                      bannerTextColor: '#ffffff'
                    });
                  }} className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-lg hover:opacity-90">
                    <h3 className="font-bold mb-2">البنفسجي الكلاسيكي</h3>
                    <p className="text-sm">قالب احترافي بألوان بنفسجية</p>
                  </button>
                  
                  <button onClick={() => {
                    setSettings({
                      ...settings,
                      primaryColor: '#10b981',
                      backgroundColor: '#064e3b',
                      bannerTextColor: '#ffffff'
                    });
                  }} className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 rounded-lg hover:opacity-90">
                    <h3 className="font-bold mb-2">الأخضر الحديث</h3>
                    <p className="text-sm">قالب عصري بألوان خضراء</p>
                  </button>
                  
                  <button onClick={() => {
                    setSettings({
                      ...settings,
                      primaryColor: '#f59e0b',
                      backgroundColor: '#1c1917',
                      bannerTextColor: '#ffffff'
                    });
                  }} className="bg-gradient-to-r from-orange-600 to-yellow-600 p-4 rounded-lg hover:opacity-90">
                    <h3 className="font-bold mb-2">البرتقالي الدافئ</h3>
                    <p className="text-sm">قالب دافئ بألوان برتقالية</p>
                  </button>
                  
                  <button onClick={() => {
                    setSettings({
                      ...settings,
                      primaryColor: '#3b82f6',
                      backgroundColor: '#0c4a6e',
                      bannerTextColor: '#ffffff'
                    });
                  }} className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 rounded-lg hover:opacity-90">
                    <h3 className="font-bold mb-2">الأزرق الهادئ</h3>
                    <p className="text-sm">قالب هادئ بألوان زرقاء</p>
                  </button>
                </div>
              </div>

              <button onClick={handleSave} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-bold">حفظ الإعدادات</button>
            </div>
          )}
          {activeTab === 'seo' && (
            <div className="space-y-6">
              <div className="card">
                <h2 className="text-xl font-bold mb-4">إعدادات محركات البحث (SEO)</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 font-semibold">عنوان الموقع (Title)</label>
                    <input type="text" className="input-field" value={settings.seoTitle || 'Pasha Data - إدارة البيانات'} onChange={(e) => setSettings({...settings, seoTitle: e.target.value})} placeholder="عنوان الموقع" />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">وصف الموقع (Description)</label>
                    <textarea className="input-field" rows="3" value={settings.seoDescription || ''} onChange={(e) => setSettings({...settings, seoDescription: e.target.value})} placeholder="وصف موجز للموقع" />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">الكلمات المفتاحية (Keywords)</label>
                    <input type="text" className="input-field" value={settings.seoKeywords || ''} onChange={(e) => setSettings({...settings, seoKeywords: e.target.value})} placeholder="الكلمات المفتاحية مفصولة بفاصلة" />
                  </div>
                </div>
              </div>

              <div className="card">
                <h2 className="text-xl font-bold mb-4">التكامل مع جوجل</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 font-semibold">Google Analytics ID</label>
                    <input type="text" className="input-field" value={settings.googleAnalyticsId || ''} onChange={(e) => setSettings({...settings, googleAnalyticsId: e.target.value})} placeholder="G-XXXXXXXXXX" />
                    <p className="text-xs text-gray-400 mt-1">للحصول على تحليلات الزوار</p>
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">Google AdSense ID</label>
                    <input type="text" className="input-field" value={settings.googleAdsenseId || ''} onChange={(e) => setSettings({...settings, googleAdsenseId: e.target.value})} placeholder="ca-pub-XXXXXXXXXXXXXXXX" />
                    <p className="text-xs text-gray-400 mt-1">لعرض الإعلانات وكسب المال</p>
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">Google Search Console Verification</label>
                    <input type="text" className="input-field" value={settings.googleVerification || ''} onChange={(e) => setSettings({...settings, googleVerification: e.target.value})} placeholder="رمز التحقق من Google" />
                    <p className="text-xs text-gray-400 mt-1">لإثبات ملكية الموقع في Google Search Console</p>
                  </div>
                </div>
              </div>

              <div className="card bg-blue-900 border-blue-700">
                <h3 className="text-lg font-bold mb-3">📊 نصائح لتحسين ظهورك في جوجل</h3>
                <ul className="space-y-2 text-sm">
                  <li>✓ أضف محتوى فريد ومفيد بانتظام</li>
                  <li>✓ استخدم الكلمات المفتاحية المناسبة في المحتوى</li>
                  <li>✓ تأكد من سرعة تحميل الموقع</li>
                  <li>✓ اربط موقعك بحسابات التواصل الاجتماعي</li>
                  <li>✓ أنشئ ملف sitemap.xml لمساعدة جوجل</li>
                </ul>
              </div>

              <button onClick={handleSave} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-bold">حفظ الإعدادات</button>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('ControlPanel component error:', error);
    return null;
  }
}

// Wait for DOM to be fully loaded before initializing React
function initializeControlPanel() {
  try {
    const user = authGetCurrentUser();
    if (!user || !user.isAdmin) {
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
      root.render(<ControlPanel />);
    });
  } catch (error) {
    console.error('Failed to initialize React:', error);
  }
}

// Ensure DOM is ready before running
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeControlPanel);
} else {
  initializeControlPanel();
}
