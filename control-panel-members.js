function MembersManagement({ approvedMembers, setApprovedMembers, pendingMembers, setPendingMembers }) {
  const [showAddMember, setShowAddMember] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [editingMember, setEditingMember] = React.useState(null);
  const [newMember, setNewMember] = React.useState({
    name: '', phone: '', email: '', photo: '', notes: ''
  });

  const defaultPhoto = JSON.parse(localStorage.getItem('pashaDataSettings') || '{}').defaultMemberPhoto || '';

  const handleAddMember = () => {
    if (!newMember.name || !newMember.phone || !newMember.email) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }
    const memberToAdd = {
      ...newMember,
      id: Date.now().toString(),
      photo: newMember.photo || defaultPhoto
    };
    const members = [...approvedMembers, memberToAdd];
    localStorage.setItem('approvedMembers', JSON.stringify(members));
    setApprovedMembers(members);
    setShowAddMember(false);
    setNewMember({ name: '', phone: '', email: '', photo: '', notes: '' });
    alert('تم إضافة العضو بنجاح');
  };

  const handleEditMember = (member) => {
    setEditingMember({...member});
  };

  const handleSaveEdit = () => {
    const members = approvedMembers.map(m => m.id === editingMember.id ? editingMember : m);
    localStorage.setItem('approvedMembers', JSON.stringify(members));
    setApprovedMembers(members);
    setEditingMember(null);
    alert('تم تحديث بيانات العضو بنجاح');
  };

  const handleDeleteMember = (id) => {
    if (confirm('هل أنت متأكد من حذف هذا العضو؟')) {
      const members = approvedMembers.filter(m => m.id !== id);
      localStorage.setItem('approvedMembers', JSON.stringify(members));
      setApprovedMembers(members);
    }
  };

  const approveMember = (id, isAdmin) => {
    const member = pendingMembers.find(m => m.id === id);
    if (member) {
      const users = JSON.parse(localStorage.getItem('pashaUsers') || '[]');
      users.push({
        username: member.email,
        password: 'temp123',
        name: member.name,
        phone: member.phone,
        photo: member.screenshot || defaultPhoto,
        isAdmin: isAdmin
      });
      localStorage.setItem('pashaUsers', JSON.stringify(users));
      
      const memberToAdd = {...member, photo: member.screenshot || defaultPhoto};
      const approved = [...approvedMembers, memberToAdd];
      localStorage.setItem('approvedMembers', JSON.stringify(approved));
      setApprovedMembers(approved);
      
      const updated = pendingMembers.filter(m => m.id !== id);
      localStorage.setItem('pendingMembers', JSON.stringify(updated));
      setPendingMembers(updated);
      alert('تم الموافقة على العضو');
    }
  };

  const filteredMembers = approvedMembers.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">إدارة الأعضاء</h2>
          <button onClick={() => setShowAddMember(!showAddMember)} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg">
            إضافة عضو
          </button>
        </div>
        
        {showAddMember && (
          <div className="bg-[var(--bg-dark)] p-4 rounded-lg mb-4">
            <h3 className="font-bold mb-3">إضافة عضو جديد</h3>
            <div className="space-y-3">
              <input type="text" placeholder="الاسم" className="input-field" value={newMember.name} onChange={(e) => setNewMember({...newMember, name: e.target.value})} />
              <input type="tel" placeholder="رقم الهاتف" className="input-field" value={newMember.phone} onChange={(e) => setNewMember({...newMember, phone: e.target.value})} />
              <input type="email" placeholder="البريد الإلكتروني" className="input-field" value={newMember.email} onChange={(e) => setNewMember({...newMember, email: e.target.value})} />
              <input type="file" accept="image/*" className="input-field" onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => setNewMember({...newMember, photo: reader.result});
                  reader.readAsDataURL(file);
                }
              }} />
              <textarea placeholder="ملاحظات" className="input-field" rows="3" value={newMember.notes} onChange={(e) => setNewMember({...newMember, notes: e.target.value})} />
              <button onClick={handleAddMember} className="btn-primary w-full">إضافة العضو</button>
            </div>
          </div>
        )}
        
        <div className="mb-4">
          <input
            type="text"
            placeholder="🔍 البحث عن عضو (الاسم، البريد، الهاتف)"
            className="input-field"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="space-y-3">
          {filteredMembers.map(member => (
            <div key={member.id} className="bg-[var(--bg-dark)] p-4 rounded-lg">
              {editingMember && editingMember.id === member.id ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-4 mb-3">
                    {editingMember.photo && <img src={editingMember.photo} alt={editingMember.name} className="w-16 h-16 rounded-full object-cover" />}
                    <input type="file" accept="image/*" className="input-field flex-1" onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => setEditingMember({...editingMember, photo: reader.result});
                        reader.readAsDataURL(file);
                      }
                    }} />
                  </div>
                  <input type="text" className="input-field" value={editingMember.name} onChange={(e) => setEditingMember({...editingMember, name: e.target.value})} />
                  <input type="email" className="input-field" value={editingMember.email} onChange={(e) => setEditingMember({...editingMember, email: e.target.value})} />
                  <input type="tel" className="input-field" value={editingMember.phone} onChange={(e) => setEditingMember({...editingMember, phone: e.target.value})} />
                  <textarea className="input-field" rows="2" value={editingMember.notes || ''} onChange={(e) => setEditingMember({...editingMember, notes: e.target.value})} />
                  <div className="flex gap-2">
                    <button onClick={handleSaveEdit} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg">حفظ</button>
                    <button onClick={() => setEditingMember(null)} className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg">إلغاء</button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  {member.photo ? (
                    <img src={member.photo} alt={member.name} className="w-16 h-16 rounded-full object-cover" />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center">
                      <div className="icon-user text-2xl text-white"></div>
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-bold">{member.name}</h3>
                    <p className="text-sm text-gray-400">{member.email}</p>
                    <a href={`https://wa.me/${member.phone}`} target="_blank" rel="noopener noreferrer" className="text-sm text-green-400 hover:underline">
                      واتساب: {member.phone}
                    </a>
                    {member.notes && <p className="text-xs text-gray-500 mt-1">{member.notes}</p>}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEditMember(member)} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm">
                      <div className="icon-edit text-lg"></div>
                    </button>
                    <button onClick={() => handleDeleteMember(member.id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm">
                      <div className="icon-trash-2 text-lg"></div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="card">
        <h2 className="text-xl font-bold mb-4">طلبات الأعضاء المعلقة</h2>
        {pendingMembers.length === 0 ? (
          <p className="text-gray-400">لا توجد طلبات معلقة</p>
        ) : (
          <div className="space-y-4">
            {pendingMembers.map(member => (
              <div key={member.id} className="bg-[var(--bg-dark)] p-4 rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold">{member.name}</h3>
                    <p className="text-sm text-gray-400">{member.email}</p>
                    <p className="text-sm text-gray-400">{member.phone}</p>
                  </div>
                  {member.screenshot && (
                    <img src={member.screenshot} alt="Screenshot" className="w-20 h-20 object-cover rounded" />
                  )}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => approveMember(member.id, false)} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg">
                    موافقة كعضو
                  </button>
                  <button onClick={() => approveMember(member.id, true)} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg">
                    موافقة كمشرف
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}