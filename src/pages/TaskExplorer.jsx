import React, { useState, useEffect } from 'react';
import { 
  Folder, 
  FileText, 
  UploadCloud, 
  ChevronRight, 
  Home, 
  ArrowLeft,
  FileArchive,
  Image as ImageIcon,
  File,
  X,
  Plus,
  MoreVertical,
  Search,
  Loader2,
  Check,
  FolderPlus,
  Trash2
} from 'lucide-react';

// ==========================================
// KONFIGURASI API LARAVEL
// Ganti dengan URL domain Laravel Anda yang mengarah ke /api
// Contoh: "https://demo.smkdarulamalkotametro.sch.id/api"
// ==========================================
const API_BASE_URL = "https://demo.smkdarulamalkotametro.sch.id/Storage_Sisfo_B_25/api"; 

export default function TaskExplorer() {
  const [subjects, setSubjects] = useState([]);
  const [currentSubject, setCurrentSubject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // State Loading
  const [isLoading, setIsLoading] = useState(false);
  
  // State Modals
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  
  // State Interaksi UI
  const [copiedId, setCopiedId] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  // Mengambil data dari Laravel API
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // 1. Ambil data Mata Kuliah (Folder) dari API
      const subjectsRes = await fetch(`${API_BASE_URL}/subjects`);
      if (!subjectsRes.ok) throw new Error("Gagal mengambil data folder");
      const subjectsData = await subjectsRes.json();
      setSubjects(subjectsData);

      // 2. Ambil data Tugas dari API
      const tasksRes = await fetch(`${API_BASE_URL}/tasks`);
      if (!tasksRes.ok) throw new Error("Gagal mengambil data tugas");
      const tasksData = await tasksRes.json();
      setTasks(tasksData);

      // 3. Cek Parameter URL setelah data termuat
      const params = new URLSearchParams(window.location.search);
      const folderCode = params.get('folder');
      if (folderCode) {
        const subject = subjectsData.find(s => s.code === folderCode);
        if (subject) setCurrentSubject(subject);
      }
    } catch (err) {
      console.error("Gagal mengambil data dari Server:", err);
      alert("Gagal memuat data dari server. Pastikan API Laravel sudah berjalan.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handler Hapus Tugas
  const handleDeleteTask = async (taskId) => {
    setOpenDropdownId(null); 
    
    // Minta password dari pengguna
    const inputPwd = window.prompt("Masukkan password admin untuk menghapus file ini:");
    if (!inputPwd) return; 

    try {
      // Kirim request DELETE ke Laravel beserta password di body
      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password: inputPwd })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Gagal menghapus file");
      }

      // Hapus dari state lokal jika sukses di server
      setTasks(tasks.filter(t => t.id !== taskId));
      alert("File berhasil dihapus!");
      
    } catch (err) {
      console.error("Gagal menghapus file:", err);
      alert(err.message);
    }
  };

  // Navigasi
  const handleOpenSubject = (subject) => {
    setCurrentSubject(subject);
    setSearchQuery("");
    window.history.pushState({}, '', `?folder=${subject.code}`);
  };

  const handleGoBack = () => {
    setCurrentSubject(null);
    setSearchQuery("");
    window.history.pushState({}, '', window.location.pathname);
  };

  // Salin URL
  const handleRightClickFolder = (e, subject) => {
    e.preventDefault();
    const baseUrl = window.location.href.split('?')[0];
    const urlToCopy = `${baseUrl}?folder=${subject.code}`;

    const textArea = document.createElement("textarea");
    textArea.value = urlToCopy;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
      setCopiedId(subject.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Gagal menyalin URL', err);
    }
    document.body.removeChild(textArea);
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf': return <FileText className="text-red-400" size={32} />;
      case 'doc': return <FileText className="text-blue-400" size={32} />;
      case 'zip': return <FileArchive className="text-amber-400" size={32} />;
      case 'img': return <ImageIcon className="text-emerald-400" size={32} />;
      default: return <File className="text-slate-400" size={32} />;
    }
  };

  const filteredSubjects = subjects.filter(sub => sub.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredTasks = tasks.filter(task => 
    task.subject_id === currentSubject?.id && 
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-4 md:p-8 font-sans selection:bg-sky-500/30">
      <div className="max-w-5xl mx-auto bg-slate-900/50 border border-sky-900/50 rounded-xl overflow-hidden shadow-[0_0_40px_rgba(14,165,233,0.05)] flex flex-col h-[85vh]" onClick={() => setOpenDropdownId(null)}>
        
        {/* HEADER TOOLBAR */}
        <div className="bg-slate-900 border-b border-sky-900/50 p-4 flex flex-col md:flex-row gap-4 justify-between items-center z-10 relative">
          <div className="flex items-center gap-2 text-sm font-mono overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
            <button 
              onClick={handleGoBack}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${!currentSubject ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' : 'text-slate-400 hover:text-sky-300 hover:bg-slate-800'}`}
            >
              <Home size={16} />
              <span>Beranda</span>
            </button>
            
            {currentSubject && (
              <>
                <ChevronRight size={16} className="text-slate-500" />
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-sky-500/10 text-sky-400 border border-sky-500/20 whitespace-nowrap">
                  <Folder size={16} fill="currentColor" className="text-sky-500" />
                  <span>{currentSubject.name}</span>
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <div className="relative w-full md:w-48 group shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-sky-400 transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Cari..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-sky-500/50 rounded-lg pl-9 pr-3 py-1.5 text-sm outline-none transition-all placeholder:text-slate-600 focus:shadow-[0_0_10px_rgba(14,165,233,0.1)]"
              />
            </div>
            
            {!currentSubject && (
              <button 
                onClick={() => setIsCreateFolderModalOpen(true)}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap shrink-0"
              >
                <FolderPlus size={18} />
                <span className="hidden sm:inline">Buat Folder</span>
              </button>
            )}

            <button 
              onClick={() => setIsUploadModalOpen(true)}
              className="flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-all shadow-[0_0_15px_rgba(14,165,233,0.3)] hover:shadow-[0_0_25px_rgba(14,165,233,0.5)] whitespace-nowrap shrink-0"
            >
              <UploadCloud size={18} />
              <span className="hidden sm:inline">Unggah</span>
            </button>
          </div>
        </div>

        {/* KONTEN UTAMA */}
        <div className="flex-1 overflow-y-auto p-6 relative">
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(14,165,233,0.02)_50%)] bg-size-[100%_4px] z-0"></div>

          <div className="relative z-10">
            {isLoading ? (
               <div className="flex flex-col justify-center items-center py-20 text-sky-500">
                 <Loader2 className="animate-spin mb-4" size={32} />
                 <p className="text-slate-400 text-sm">Memuat data dari server...</p>
               </div>
            ) : !currentSubject ? (
              // TAMPILAN BERANDA (DAFTAR FOLDER)
              <>
                <h2 className="text-slate-400 text-sm font-mono mb-6 flex items-center gap-2 uppercase tracking-wider">
                  <div className="w-2 h-2 rounded-full bg-sky-500"></div>
                  Daftar Folder / Mata Kuliah
                </h2>
                
                {subjects.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-800 rounded-xl bg-slate-900/20">
                    <Folder size={48} className="text-slate-700 mb-4" />
                    <p className="text-slate-400 text-sm">Belum ada folder yang dibuat.</p>
                    <button 
                      onClick={() => setIsCreateFolderModalOpen(true)}
                      className="mt-4 text-sky-400 hover:text-sky-300 text-sm flex items-center gap-1 font-medium"
                    >
                      <Plus size={16} /> Buat folder pertama
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {filteredSubjects.map((subject) => (
                      <button 
                        key={subject.id}
                        onClick={() => handleOpenSubject(subject)}
                        onContextMenu={(e) => handleRightClickFolder(e, subject)}
                        className="group flex flex-col items-center p-4 rounded-xl hover:bg-slate-800/50 border border-transparent hover:border-sky-500/30 transition-all cursor-pointer text-center relative"
                        title="Klik Kanan untuk menyalin URL folder"
                      >
                        {copiedId === subject.id && (
                          <div className="absolute top-2 right-2 flex items-center gap-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-medium px-2 py-1 rounded-md border border-emerald-500/30 z-10">
                            <Check size={12} />
                            Tersalin!
                          </div>
                        )}
                        <div className="relative mb-3">
                          <Folder size={64} className="text-sky-500/80 group-hover:text-sky-400 transition-colors" fill="currentColor" />
                        </div>
                        <span className="font-medium text-sm text-slate-300 group-hover:text-sky-300 line-clamp-2 leading-tight">
                          {subject.name}
                        </span>
                        <span className="text-[10px] text-slate-500 mt-1 font-mono">{subject.code}</span>
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              // TAMPILAN DALAM FOLDER (DAFTAR FILE)
              <>
                <div className="flex items-center gap-3 mb-6">
                  <button onClick={handleGoBack} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors">
                    <ArrowLeft size={20} />
                  </button>
                  <h2 className="text-lg font-medium text-white flex items-center gap-2">
                    <Folder className="text-sky-500" fill="currentColor" size={24} />
                    {currentSubject.name}
                  </h2>
                </div>

                {filteredTasks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-800 rounded-xl bg-slate-900/20">
                    <File size={48} className="text-slate-700 mb-4" />
                    <p className="text-slate-400 text-sm">Folder ini masih kosong.</p>
                    <button 
                      onClick={() => setIsUploadModalOpen(true)}
                      className="mt-4 text-sky-400 hover:text-sky-300 text-sm flex items-center gap-1 font-medium"
                    >
                      <Plus size={16} /> Unggah tugas pertama
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredTasks.map((task) => (
                      <div 
                        key={task.id}
                        className="group flex items-start gap-3 p-4 bg-slate-900/80 border border-slate-800 hover:border-sky-500/40 rounded-xl transition-all hover:bg-slate-800 shadow-sm relative"
                      >
                        <div className="shrink-0 p-2 bg-slate-950 rounded-lg group-hover:bg-slate-900 transition-colors">
                          {getFileIcon(task.file_type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-slate-200 truncate group-hover:text-sky-300 transition-colors" title={task.title}>
                            {task.title}
                          </h3>
                          <p className="text-xs text-slate-500 truncate mt-0.5">{task.file_name}</p>
                          <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-400 font-mono">
                            <span>{task.created_at ? new Date(task.created_at).toLocaleDateString() : 'N/A'}</span>
                            <span>•</span>
                            <span>{task.file_size}</span>
                          </div>
                        </div>
                        
                        {/* MENU TITIK TIGA */}
                        <div className="flex flex-col items-end gap-2 relative">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDropdownId(openDropdownId === task.id ? null : task.id);
                            }}
                            className="text-slate-500 hover:text-sky-400 p-1 rounded-md hover:bg-slate-800 transition-colors"
                          >
                            <MoreVertical size={16} />
                          </button>
                          
                          {/* DROPDOWN MENU */}
                          {openDropdownId === task.id && (
                            <div className="absolute top-8 right-0 w-32 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-20 overflow-hidden py-1 animate-[fadeIn_0.1s_ease-out]">
                              {task.file_url && (
                                <a 
                                  href={task.file_url} 
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                                >
                                  Buka File
                                </a>
                              )}
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteTask(task.id);
                                }}
                                className="flex items-center gap-2 w-full text-left px-3 py-2 text-xs text-red-400 hover:bg-slate-700 hover:text-red-300 transition-colors"
                              >
                                <Trash2 size={12} /> Hapus
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* MODAL UNGGAH */}
      {isUploadModalOpen && (
        <UploadModal 
          isOpen={isUploadModalOpen} 
          onClose={() => setIsUploadModalOpen(false)}
          currentSubject={currentSubject}
          subjects={subjects}
          onUploadSuccess={(newTask) => {
            setTasks([newTask, ...tasks]);
            setIsUploadModalOpen(false);
          }}
        />
      )}

      {/* MODAL BUAT FOLDER BARU */}
      {isCreateFolderModalOpen && (
        <CreateFolderModal 
          isOpen={isCreateFolderModalOpen}
          onClose={() => setIsCreateFolderModalOpen(false)}
          onCreateSuccess={(newSubject) => {
            const updatedSubjects = [...subjects, newSubject].sort((a, b) => a.name.localeCompare(b.name));
            setSubjects(updatedSubjects);
            setIsCreateFolderModalOpen(false);
          }}
        />
      )}

    </div>
  );
}

// ==========================================
// KOMPONEN MODAL UNGGAH FILE (LARAVEL API)
// ==========================================
function UploadModal({ isOpen, onClose, currentSubject, subjects, onUploadSuccess }) {
  const [title, setTitle] = useState('');
  const [selectedSubjectId, setSelectedSubjectId] = useState(currentSubject ? currentSubject.id : '');
  const [fileName, setFileName] = useState('');
  const [fileObj, setFileObj] = useState(null);
  const [password, setPassword] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  
  const handleApiUpload = async (e) => {
    e.preventDefault();
    if (!title || !selectedSubjectId || !fileObj || !password) {
      return alert("Harap isi semua kolom, pilih file, dan masukkan password.");
    }

    setIsUploading(true);

    try {
      const fileExt = fileName.split('.').pop().toLowerCase() || 'pdf';
      let type = 'pdf';
      if(['doc', 'docx'].includes(fileExt)) type = 'doc';
      if(['zip', 'rar'].includes(fileExt)) type = 'zip';
      if(['png', 'jpg', 'jpeg'].includes(fileExt)) type = 'img';

      const fileSizeMB = (fileObj.size / (1024 * 1024)).toFixed(2);
      
      // Siapkan Form Data untuk dikirim ke Laravel
      const formData = new FormData();
      formData.append('subject_id', selectedSubjectId);
      formData.append('title', title);
      formData.append('file', fileObj);
      formData.append('file_name', fileName);
      formData.append('file_size', `${fileSizeMB} MB`);
      formData.append('file_type', type);
      formData.append('password', password); // Kirim password untuk divalidasi server

      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Gagal mengunggah file");
      }

      alert("Berhasil mengunggah file!");
      onUploadSuccess(result); // result adalah data task baru dari server
      
    } catch (error) {
      console.error("Gagal mengunggah:", error);
      alert(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#020617]/80 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]" onClick={!isUploading ? onClose : undefined}></div>
      
      <div className="relative bg-slate-900 border border-sky-500/30 rounded-xl w-full max-w-md p-6 overflow-hidden animate-[slideUp_0.3s_ease-out] shadow-[0_0_30px_rgba(14,165,233,0.15)] z-10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <UploadCloud className="text-sky-400" size={20} /> Unggah Tugas Baru
          </h3>
          {!isUploading && (
            <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors"><X size={20} /></button>
          )}
        </div>

        <form onSubmit={handleApiUpload} className="space-y-4">
          <div>
            <label className="block text-xs text-sky-500/80 uppercase font-mono mb-1.5">Pilih Folder / Mata Kuliah</label>
            <select 
              value={selectedSubjectId}
              onChange={(e) => setSelectedSubjectId(e.target.value)}
              disabled={!!currentSubject || isUploading}
              className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/50 disabled:opacity-60 appearance-none"
            >
              <option value="" disabled>-- Pilih Folder --</option>
              {subjects.map(sub => (
                <option key={sub.id} value={sub.id}>{sub.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-sky-500/80 uppercase font-mono mb-1.5">Judul File</label>
            <input 
              type="text" value={title} onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Modul 1 - Pendahuluan" disabled={isUploading}
              className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/50 disabled:opacity-60"
            />
          </div>

          <div>
            <label className="block text-xs text-sky-500/80 uppercase font-mono mb-1.5">Password Admin</label>
            <input 
              type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password untuk mengunggah" disabled={isUploading}
              className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/50 disabled:opacity-60"
            />
          </div>

          <div>
            <label className="block text-xs text-sky-500/80 uppercase font-mono mb-1.5">Pilih Dokumen</label>
            <div className={`relative border-2 border-dashed border-slate-700 rounded-lg p-6 text-center transition-colors group ${isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:border-sky-500/50 hover:bg-slate-800/30 cursor-pointer'}`}>
              <input 
                type="file" disabled={isUploading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if(file) { setFileName(file.name); setFileObj(file); }
                }}
              />
              <UploadCloud size={32} className="mx-auto text-slate-500 group-hover:text-sky-400 mb-2 transition-colors" />
              {fileName ? <p className="text-sm text-sky-300 truncate px-4">{fileName}</p> : <p className="text-sm text-slate-400">Klik atau drag file ke sini</p>}
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button type="button" onClick={onClose} disabled={isUploading} className="flex-1 px-4 py-2 border border-slate-700 text-slate-300 rounded-lg text-sm hover:bg-slate-800 transition-colors disabled:opacity-50">Batal</button>
            <button type="submit" disabled={isUploading} className="flex-1 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-medium rounded-lg text-sm shadow-[0_0_15px_rgba(14,165,233,0.3)] transition-colors disabled:opacity-50 flex justify-center items-center gap-2">
              {isUploading ? <><Loader2 className="animate-spin" size={16} /> Mengunggah...</> : "Mulai Unggah"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ==========================================
// KOMPONEN MODAL BUAT FOLDER (LARAVEL API)
// ==========================================
function CreateFolderModal({ isOpen, onClose, onCreateSuccess }) {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateFolder = async (e) => {
    e.preventDefault();
    if (!name || !code || !password) return alert("Harap isi semua kolom.");

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/subjects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // Kirim data beserta password ke server
        body: JSON.stringify({
          name: name,
          code: code.toUpperCase(),
          password: password
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Gagal membuat folder");
      }

      alert("Folder berhasil dibuat!");
      onCreateSuccess(result); // result adalah data subject baru dari server
    } catch (error) {
      console.error("Gagal membuat folder:", error);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#020617]/80 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]" onClick={!isSubmitting ? onClose : undefined}></div>
      
      <div className="relative bg-slate-900 border border-sky-500/30 rounded-xl w-full max-w-sm p-6 overflow-hidden animate-[slideUp_0.3s_ease-out] shadow-[0_0_30px_rgba(14,165,233,0.15)] z-10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <FolderPlus className="text-sky-400" size={20} /> Buat Folder Baru
          </h3>
          {!isSubmitting && <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors"><X size={20} /></button>}
        </div>

        <form onSubmit={handleCreateFolder} className="space-y-4">
          <div>
            <label className="block text-xs text-sky-500/80 uppercase font-mono mb-1.5">Nama Folder (Mata Kuliah)</label>
            <input 
              type="text" value={name} onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Sistem Operasi" disabled={isSubmitting}
              className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/50"
            />
          </div>

          <div>
            <label className="block text-xs text-sky-500/80 uppercase font-mono mb-1.5">Kode Unik / Singkatan</label>
            <input 
              type="text" value={code} onChange={(e) => setCode(e.target.value)}
              placeholder="Contoh: SO101" disabled={isSubmitting}
              className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/50 uppercase"
            />
          </div>

          <div>
            <label className="block text-xs text-sky-500/80 uppercase font-mono mb-1.5">Password Admin</label>
            <input 
              type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password admin" disabled={isSubmitting}
              className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/50"
            />
          </div>

          <div className="pt-4 flex gap-3">
            <button type="button" onClick={onClose} disabled={isSubmitting} className="flex-1 px-4 py-2 border border-slate-700 text-slate-300 rounded-lg text-sm hover:bg-slate-800 transition-colors">Batal</button>
            <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-medium rounded-lg text-sm shadow-[0_0_15px_rgba(14,165,233,0.3)] transition-colors flex justify-center items-center gap-2">
              {isSubmitting ? <><Loader2 className="animate-spin" size={16} /></> : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
