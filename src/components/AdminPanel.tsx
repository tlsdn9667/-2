/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit, Trash2, LogIn, LogOut, Check, ArrowLeft, RefreshCw, Eye, AlertCircle, Upload, X, Image
} from 'lucide-react';
import { 
  loginAsGuestAdmin, 
  loginWithGoogle, 
  logoutAdmin, 
  getActiveUser, 
  subscribeToAuth,
  getDatabaseStatus,
  AdminUser,
  getTheatreWorks, saveTheatreWork, deleteTheatreWork,
  getExhibitionWorks, saveExhibitionWork, deleteExhibitionWork,
  getEssayWorks, saveEssayWork, deleteEssayWork,
  getNovelWorks, saveNovelWork, deleteNovelWork,
  getResidencies, saveResidency, deleteResidency,
  getAwards, saveAward, deleteAward,
  getCV, saveCV,
  getAbout, saveAbout,
  getContact, saveContact
} from '../lib/db';
import { 
  TheatreWork, ExhibitionWork, EssayWork, NovelWork, ResidencyItem, AwardItem, CVSection, AboutData 
} from '../types';

const resizeAndConvertImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1000;
        const MAX_HEIGHT = 1000;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85); // High quality JPEG
          resolve(dataUrl);
        } else {
          resolve(event.target?.result as string);
        }
      };
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    reader.readAsDataURL(file);
  });
};

interface AdminPanelProps {
  onDataChange: () => void;
  onClose: () => void;
}

export default function AdminPanel({ onDataChange, onClose }: AdminPanelProps) {
  const [user, setUser] = useState<AdminUser | null>(getActiveUser());
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [dbStatus, setDbStatus] = useState(getDatabaseStatus());
  
  // Data lists
  const [theatreList, setTheatreList] = useState<TheatreWork[]>([]);
  const [exhibitionList, setExhibitionList] = useState<ExhibitionWork[]>([]);
  const [essayList, setEssayList] = useState<EssayWork[]>([]);
  const [novelList, setNovelList] = useState<NovelWork[]>([]);
  const [residencyList, setResidencyList] = useState<ResidencyItem[]>([]);
  const [awardList, setAwardList] = useState<AwardItem[]>([]);
  
  // Section states
  const [activeTab, setActiveTab] = useState<'theatre' | 'exhibition' | 'essay' | 'novel' | 'residency' | 'award'>('theatre');
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState('');

  // Editing forms state
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // Image Upload specific states
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    setUploadError('');
    
    const processedImages: string[] = [];
    const errors: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith('image/')) {
        errors.push(`${file.name} is not an image file.`);
        continue;
      }
      
      try {
        const base64Str = await resizeAndConvertImage(file);
        processedImages.push(base64Str);
      } catch (err) {
        console.error(err);
        errors.push(`Failed to process ${file.name}`);
      }
    }

    if (errors.length > 0) {
      setUploadError(errors.join(', '));
    }

    if (processedImages.length > 0) {
      const currentImages = editingItem.images || [];
      setEditingItem({
        ...editingItem,
        images: [...currentImages, ...processedImages]
      });
    }
    setUploading(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files) {
      await handleImageUpload(e.dataTransfer.files);
    }
  };

  useEffect(() => {
    const unsub = subscribeToAuth((u) => {
      setUser(u);
      setDbStatus(getDatabaseStatus());
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (user) {
      loadAllData();
    }
  }, [user]);

  const loadAllData = async () => {
    setIsLoading(true);
    try {
      const [t, ex, es, nv, r, aw] = await Promise.all([
        getTheatreWorks(),
        getExhibitionWorks(),
        getEssayWorks(),
        getNovelWorks(),
        getResidencies(),
        getAwards()
      ]);
      setTheatreList(t);
      setExhibitionList(ex);
      setEssayList(es);
      setNovelList(nv);
      setResidencyList(r);
      setAwardList(aw);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      const u = loginAsGuestAdmin(password);
      setUser(u);
      showNotification('Logged in as Administrator');
    } catch (err: any) {
      setAuthError(err.message || 'Login failed');
    }
  };

  const handleGoogleLogin = async () => {
    setAuthError('');
    try {
      const u = await loginWithGoogle();
      setUser(u);
      showNotification('Logged in with Google');
    } catch (err: any) {
      setAuthError(err.message || 'Google Auth is offline. Please enter "admin123" in the password field instead.');
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    setUser(null);
    setEditingItem(null);
    setIsCreatingNew(false);
    showNotification('Logged out successfully');
  };

  // Generic Save Handler
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    try {
      setIsLoading(true);
      if (activeTab === 'theatre') {
        const item = editingItem as TheatreWork;
        await saveTheatreWork(item);
      } else if (activeTab === 'exhibition') {
        const item = editingItem as ExhibitionWork;
        await saveExhibitionWork(item);
      } else if (activeTab === 'essay') {
        const item = editingItem as EssayWork;
        await saveEssayWork(item);
      } else if (activeTab === 'novel') {
        const item = editingItem as NovelWork;
        await saveNovelWork(item);
      } else if (activeTab === 'residency') {
        const item = editingItem as ResidencyItem;
        await saveResidency(item);
      } else if (activeTab === 'award') {
        const item = editingItem as AwardItem;
        await saveAward(item);
      }

      await loadAllData();
      onDataChange();
      setEditingItem(null);
      setIsCreatingNew(false);
      showNotification('Changes saved successfully.');
    } catch (err: any) {
      console.error(err);
      showNotification('Failed to save changes. Saving locally.');
    } finally {
      setIsLoading(false);
    }
  };

  // Delete Handler
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this item? This action is permanent.')) return;
    try {
      setIsLoading(true);
      if (activeTab === 'theatre') {
        await deleteTheatreWork(id);
      } else if (activeTab === 'exhibition') {
        await deleteExhibitionWork(id);
      } else if (activeTab === 'essay') {
        await deleteEssayWork(id);
      } else if (activeTab === 'novel') {
        await deleteNovelWork(id);
      } else if (activeTab === 'residency') {
        await deleteResidency(id);
      } else if (activeTab === 'award') {
        await deleteAward(id);
      }

      await loadAllData();
      onDataChange();
      showNotification('Item deleted successfully.');
    } catch (e) {
      console.error(e);
      showNotification('Error deleting item.');
    } finally {
      setIsLoading(false);
    }
  };

  const startCreateNew = () => {
    setIsCreatingNew(true);
    const id = `${activeTab}-${Date.now()}`;
    if (activeTab === 'theatre') {
      setEditingItem({ id, year: '2026', title: '', synopsis: '', images: [], scriptExcerpt: '', programBook: '', review: '', credits: '' });
    } else if (activeTab === 'exhibition') {
      setEditingItem({ id, year: '2026', title: '', medium: '', images: [], description: '' });
    } else if (activeTab === 'essay') {
      setEditingItem({ id, year: '2026', title: '', publishedIn: '', description: '', excerpt: '' });
    } else if (activeTab === 'novel') {
      setEditingItem({ id, year: '2026', title: '', publishedIn: '', description: '', excerpt: '' });
    } else if (activeTab === 'residency') {
      setEditingItem({ id, year: '2026', name: '', period: '', location: '', outcome: '' });
    } else if (activeTab === 'award') {
      setEditingItem({ id, year: '2026', title: '', category: 'Grants' });
    }
  };

  if (!user) {
    return (
      <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-6 fade-in">
        <div className="bg-neutral-dark border border-white/20 w-full max-w-md p-8 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
          >
            ✕
          </button>
          
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl tracking-widest text-white uppercase mb-2">ARCHIVE ADMIN</h2>
            <p className="text-xs text-white/40 font-mono tracking-widest uppercase">KIM WOO YOUNG ARCHIVE SYSTEM</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] tracking-widest font-mono text-white/60 uppercase mb-2">
                Administrator Passcode (Try: admin123)
              </label>
              <input 
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black border border-white/20 px-4 py-3 text-sm focus:outline-none focus:border-white transition-colors text-center tracking-widest"
              />
            </div>

            {authError && (
              <div className="text-xs text-red-400 bg-red-950/20 border border-red-900/50 p-3 flex items-center gap-2">
                <AlertCircle size={14} />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-white text-black hover:bg-neutral-200 transition-colors py-3 text-xs tracking-widest uppercase font-semibold cursor-pointer"
            >
              Sign In with Passcode
            </button>
          </form>

          <div className="relative flex py-4 items-center">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink mx-4 text-[10px] font-mono text-white/40 tracking-widest">OR</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full bg-transparent border border-white/20 text-white hover:bg-white hover:text-black transition-all py-3 text-xs tracking-widest uppercase cursor-pointer flex items-center justify-center gap-2"
          >
            <LogIn size={14} />
            Sign In with Google
          </button>
          
          <p className="mt-8 text-[10px] text-white/40 text-center font-mono leading-relaxed">
            Admin console provides direct CRUD interface for Theatre, Exhibitions, Essays, Novels, Residencies, and Honors.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black text-white z-50 flex flex-col md:flex-row fade-in">
      {/* Admin Sidebar */}
      <div className="w-full md:w-64 bg-neutral-dark border-r border-white/10 p-6 flex flex-col justify-between">
        <div>
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg tracking-widest text-white uppercase">KIM WOO YOUNG</h3>
              <p className="text-[10px] text-white/40 font-mono tracking-widest uppercase">Admin System</p>
            </div>
            <button 
              onClick={onClose}
              className="md:hidden text-white/50 hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="bg-black/40 border border-white/10 p-3 mb-6 rounded-sm">
            <p className="text-[10px] font-mono text-white/40 tracking-wider uppercase mb-1">Database Sync</p>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${dbStatus.isCloud ? 'bg-green-400' : 'bg-amber-400 animate-pulse'}`}></span>
              <span className="text-xs font-mono tracking-wide">{dbStatus.message}</span>
            </div>
          </div>

          <nav className="space-y-1">
            {[
              { id: 'theatre', label: 'THEATRE WORKS' },
              { id: 'exhibition', label: 'EXHIBITIONS' },
              { id: 'essay', label: 'ESSAYS' },
              { id: 'novel', label: 'NOVELS' },
              { id: 'residency', label: 'RESIDENCIES' },
              { id: 'award', label: 'AWARDS & GRANTS' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setEditingItem(null);
                  setIsCreatingNew(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-xs tracking-widest uppercase font-mono transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-white text-black font-semibold' 
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
          <div className="text-xs font-mono text-white/40">
            <p className="truncate">{user.email}</p>
            <p className="text-[9px] mt-1 tracking-widest uppercase">{user.isGuestAdmin ? 'GUEST ADMINISTRATOR' : 'SECURE SIGN-IN'}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full bg-neutral-800 text-white/80 hover:bg-red-950 hover:text-white border border-white/10 transition-colors py-2 text-[10px] tracking-widest uppercase font-mono cursor-pointer flex items-center justify-center gap-1.5"
          >
            <LogOut size={12} />
            Sign Out
          </button>
          
          <button
            onClick={onClose}
            className="w-full bg-white text-black hover:bg-neutral-200 transition-colors py-2.5 text-[10px] tracking-widest uppercase font-mono cursor-pointer flex items-center justify-center gap-1.5"
          >
            <ArrowLeft size={12} />
            Back to Archive
          </button>
        </div>
      </div>

      {/* Admin Content Area */}
      <div className="flex-1 bg-black p-6 md:p-10 overflow-y-auto">
        {notification && (
          <div className="fixed top-6 right-6 z-50 bg-white text-black text-xs font-mono tracking-widest uppercase px-6 py-4 border border-black shadow-2xl flex items-center gap-2">
            <Check size={14} />
            <span>{notification}</span>
          </div>
        )}

        {editingItem ? (
          /* Editor Mode */
          <div className="max-w-2xl mx-auto fade-in">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <h2 className="font-serif text-xl tracking-widest uppercase">
                {isCreatingNew ? `CREATE NEW ${activeTab}` : `EDIT ${activeTab}`}
              </h2>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setIsCreatingNew(false);
                }}
                className="text-xs font-mono tracking-widest uppercase text-white/60 hover:text-white flex items-center gap-1"
              >
                ✕ Cancel
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono tracking-widest text-white/50 uppercase mb-2">Year / Date</label>
                  <input
                    type="text"
                    required
                    value={editingItem.year}
                    onChange={(e) => setEditingItem({ ...editingItem, year: e.target.value })}
                    className="w-full bg-neutral-dark border border-white/20 px-4 py-2.5 text-sm focus:outline-none focus:border-white text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono tracking-widest text-white/50 uppercase mb-2">Document ID (Unique / Sluggish)</label>
                  <input
                    type="text"
                    required
                    disabled={!isCreatingNew}
                    value={editingItem.id}
                    onChange={(e) => setEditingItem({ ...editingItem, id: e.target.value })}
                    className="w-full bg-neutral-dark border border-white/20 px-4 py-2.5 text-sm focus:outline-none focus:border-white text-white disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Title / Name */}
              <div>
                <label className="block text-[10px] font-mono tracking-widest text-white/50 uppercase mb-2">
                  {activeTab === 'residency' ? 'Institution / Residency Name' : 'Title'}
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.title || editingItem.name || ''}
                  onChange={(e) => setEditingItem({ 
                    ...editingItem, 
                    title: activeTab === 'residency' ? undefined : e.target.value,
                    name: activeTab === 'residency' ? e.target.value : undefined
                  })}
                  className="w-full bg-neutral-dark border border-white/20 px-4 py-2.5 text-sm focus:outline-none focus:border-white text-white"
                />
              </div>

              {/* Theatre-Specific Fields */}
              {activeTab === 'theatre' && (
                <>
                  <div>
                    <label className="block text-[10px] font-mono tracking-widest text-white/50 uppercase mb-2">Synopsis</label>
                    <textarea
                      required
                      rows={4}
                      value={editingItem.synopsis || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, synopsis: e.target.value })}
                      className="w-full bg-neutral-dark border border-white/20 px-4 py-2.5 text-sm focus:outline-none focus:border-white text-white leading-relaxed"
                    />
                  </div>
                </>
              )}

              {/* Exhibition-Specific Fields */}
              {activeTab === 'exhibition' && (
                <>
                  <div>
                    <label className="block text-[10px] font-mono tracking-widest text-white/50 uppercase mb-2">Medium & Installation Details / 작품 설명</label>
                    <input
                      type="text"
                      required
                      value={editingItem.medium || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, medium: e.target.value })}
                      placeholder="vinyl lettering_variable installation"
                      className="w-full bg-neutral-dark border border-white/20 px-4 py-2.5 text-sm focus:outline-none focus:border-white text-white"
                    />
                  </div>
                </>
              )}

              {/* Essay / Novel Specific Fields */}
              {(activeTab === 'essay' || activeTab === 'novel') && (
                <>
                  <div>
                    <label className="block text-[10px] font-mono tracking-widest text-white/50 uppercase mb-2">Published In / Media</label>
                    <input
                      type="text"
                      required
                      value={editingItem.publishedIn || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, publishedIn: e.target.value })}
                      className="w-full bg-neutral-dark border border-white/20 px-4 py-2.5 text-sm focus:outline-none focus:border-white text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono tracking-widest text-white/50 uppercase mb-2">Description / Logline</label>
                    <textarea
                      rows={3}
                      value={editingItem.description || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                      className="w-full bg-neutral-dark border border-white/20 px-4 py-2.5 text-sm focus:outline-none focus:border-white text-white leading-relaxed"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono tracking-widest text-white/50 uppercase mb-2">Poetic Excerpt / Full-Text Excerpt</label>
                    <textarea
                      rows={8}
                      required
                      value={editingItem.excerpt || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, excerpt: e.target.value })}
                      className="w-full bg-neutral-dark border border-white/20 p-4 text-xs font-mono focus:outline-none focus:border-white text-white leading-relaxed"
                    />
                  </div>
                </>
              )}

              {/* Residency Fields */}
              {activeTab === 'residency' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono tracking-widest text-white/50 uppercase mb-2">Period / Dates</label>
                      <input
                        type="text"
                        required
                        value={editingItem.period || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, period: e.target.value })}
                        placeholder="2025.03.10-12.19"
                        className="w-full bg-neutral-dark border border-white/20 px-4 py-2.5 text-sm focus:outline-none focus:border-white text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono tracking-widest text-white/50 uppercase mb-2">Location</label>
                      <input
                        type="text"
                        required
                        value={editingItem.location || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                        placeholder="Gimhae, South Korea"
                        className="w-full bg-neutral-dark border border-white/20 px-4 py-2.5 text-sm focus:outline-none focus:border-white text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono tracking-widest text-white/50 uppercase mb-2">Outcome Description</label>
                    <textarea
                      rows={5}
                      value={editingItem.outcome || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, outcome: e.target.value })}
                      className="w-full bg-neutral-dark border border-white/20 p-4 text-sm focus:outline-none focus:border-white text-white leading-relaxed"
                    />
                  </div>
                </>
              )}

              {/* Award Fields */}
              {activeTab === 'award' && (
                <>
                  <div>
                    <label className="block text-[10px] font-mono tracking-widest text-white/50 uppercase mb-2">Category Selection</label>
                    <select
                      value={editingItem.category || 'Grants'}
                      onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                      className="w-full bg-neutral-dark border border-white/20 px-4 py-2.5 text-sm focus:outline-none focus:border-white text-white font-mono"
                    >
                      <option value="Grants">Grants (창작 기금)</option>
                      <option value="Awards">Awards (수상)</option>
                      <option value="Selections">Selections (선정)</option>
                    </select>
                  </div>
                </>
              )}

              {/* Images Array Handler (for Theatre & Exhibitions) with computer file upload and preview management */}
              {(activeTab === 'theatre' || activeTab === 'exhibition') && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono tracking-widest text-white/50 uppercase mb-2">
                      Portfolio Images / 작품 이미지 관리
                    </label>

                    {/* Drag and drop zone */}
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => document.getElementById('image-upload-input')?.click()}
                      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
                        dragOver 
                          ? 'border-white bg-white/10 text-white' 
                          : 'border-white/20 hover:border-white/50 hover:bg-white/5 text-white/60'
                      }`}
                    >
                      <input
                        id="image-upload-input"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e.target.files)}
                        className="hidden"
                      />
                      <div className="flex flex-col items-center justify-center gap-2">
                        {uploading ? (
                          <RefreshCw className="animate-spin text-white" size={24} />
                        ) : (
                          <Upload size={24} />
                        )}
                        <span className="text-xs font-mono tracking-widest uppercase">
                          {uploading ? 'Processing Image(s)...' : 'Upload Images / 이미지 업로드'}
                        </span>
                        <span className="text-[10px] text-white/40 font-sans">
                          Click to select from computer, or drag and drop image files here (PNG, JPG, WEBP)
                        </span>
                      </div>
                    </div>

                    {uploadError && (
                      <p className="text-red-400 text-xs mt-2 font-mono">{uploadError}</p>
                    )}
                  </div>

                  {/* Thumbnail Previews */}
                  {editingItem.images && editingItem.images.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-[9px] font-mono tracking-widest text-white/40 uppercase">
                        Current Uploaded Images ({editingItem.images.length}) · Hover to remove
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {editingItem.images.map((img: string, idx: number) => (
                          <div 
                            key={idx} 
                            className="group relative aspect-[3/2] bg-black border border-white/10 overflow-hidden rounded-md"
                          >
                            <img 
                              src={img} 
                              alt={`Preview ${idx + 1}`} 
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {/* Overlay remove button */}
                            <button
                              type="button"
                              onClick={() => {
                                const newImages = [...editingItem.images];
                                newImages.splice(idx, 1);
                                setEditingItem({ ...editingItem, images: newImages });
                              }}
                              className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                              title="Remove image"
                            >
                              <div className="bg-red-600 hover:bg-red-700 text-white rounded-full p-1.5 transition-colors">
                                <X size={14} />
                              </div>
                            </button>
                            <div className="absolute bottom-1 left-1 bg-black/70 px-1 py-0.5 rounded text-[8px] font-mono text-white/60">
                              #{idx + 1}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Manual URL entry field for flexibility */}
                  <div>
                    <label className="block text-[10px] font-mono tracking-widest text-white/30 uppercase mb-1.5">
                      Or manual image URL entry (comma separated)
                    </label>
                    <input
                      type="text"
                      value={editingItem.images ? editingItem.images.filter((img: string) => !img.startsWith('data:')).join(', ') : ''}
                      onChange={(e) => {
                        const urls = e.target.value.split(',').map(url => url.trim()).filter(Boolean);
                        // keep base64 images, append/replace custom urls
                        const base64s = editingItem.images ? editingItem.images.filter((img: string) => img.startsWith('data:')) : [];
                        setEditingItem({ ...editingItem, images: [...base64s, ...urls] });
                      }}
                      placeholder="e.g. https://example.com/image.jpg"
                      className="w-full bg-neutral-dark border border-white/20 px-4 py-2.5 text-xs focus:outline-none focus:border-white text-white font-mono"
                    />
                  </div>
                </div>
              )}

              <div className="pt-6 border-t border-white/10 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setEditingItem(null);
                    setIsCreatingNew(false);
                  }}
                  className="bg-transparent border border-white/20 hover:border-white transition-colors text-white/80 px-6 py-3 text-xs tracking-widest uppercase font-mono cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-white text-black hover:bg-neutral-200 transition-colors px-8 py-3 text-xs tracking-widest uppercase font-mono font-semibold cursor-pointer"
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* List Mode */
          <div className="fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-4 border-b border-white/10 gap-4">
              <div>
                <h2 className="font-serif text-2xl tracking-widest uppercase">{activeTab} Works</h2>
                <p className="text-[10px] font-mono tracking-widest uppercase text-white/40">
                  Showing {
                    activeTab === 'theatre' ? theatreList.length :
                    activeTab === 'exhibition' ? exhibitionList.length :
                    activeTab === 'essay' ? essayList.length :
                    activeTab === 'novel' ? novelList.length :
                    activeTab === 'residency' ? residencyList.length :
                    awardList.length
                  } entries in the official archive catalog
                </p>
              </div>

              <button
                onClick={startCreateNew}
                className="bg-white text-black hover:bg-neutral-200 transition-colors px-5 py-2.5 text-xs tracking-widest uppercase font-mono font-semibold cursor-pointer flex items-center gap-1.5 self-start"
              >
                <Plus size={14} />
                Create Entry
              </button>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <RefreshCw className="animate-spin text-white/40" size={32} />
              </div>
            ) : (
              <div className="space-y-3">
                {/* Render current list */}
                {activeTab === 'theatre' && theatreList.map((item) => (
                  <div key={item.id} className="bg-neutral-dark border border-white/10 p-5 flex items-start justify-between gap-6 hover:border-white/30 transition-all">
                    <div>
                      <div className="flex items-center gap-3 mb-1.5">
                        <span className="text-xs font-mono text-white/40">{item.year}</span>
                        <h4 className="font-serif text-base tracking-widest uppercase">{item.title}</h4>
                      </div>
                      <p className="text-xs text-white/60 line-clamp-2 max-w-xl font-sans leading-relaxed">{item.synopsis}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setEditingItem(item)}
                        className="p-2 text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                        title="Edit Play"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-white/60 hover:text-red-400 hover:bg-red-950/20 transition-colors"
                        title="Delete Play"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}

                {activeTab === 'exhibition' && exhibitionList.map((item) => (
                  <div key={item.id} className="bg-neutral-dark border border-white/10 p-5 flex items-start justify-between gap-6 hover:border-white/30 transition-all">
                    <div>
                      <div className="flex items-center gap-3 mb-1.5">
                        <span className="text-xs font-mono text-white/40">{item.year}</span>
                        <h4 className="font-serif text-base tracking-widest uppercase">{item.title}</h4>
                      </div>
                      <p className="text-xs text-white/40 font-mono italic mb-1">{item.medium}</p>
                      {item.description && <p className="text-xs text-white/60 line-clamp-1 max-w-xl font-sans">{item.description}</p>}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setEditingItem(item)}
                        className="p-2 text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-white/60 hover:text-red-400 hover:bg-red-950/20 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}

                {(activeTab === 'essay' || activeTab === 'novel') && (activeTab === 'essay' ? essayList : novelList).map((item) => (
                  <div key={item.id} className="bg-neutral-dark border border-white/10 p-5 flex items-start justify-between gap-6 hover:border-white/30 transition-all">
                    <div>
                      <div className="flex items-center gap-3 mb-1.5">
                        <span className="text-xs font-mono text-white/40">{item.year}</span>
                        <h4 className="font-serif text-base tracking-widest uppercase">{item.title}</h4>
                      </div>
                      <p className="text-xs text-white/40 font-mono mb-1">Published: {item.publishedIn}</p>
                      <p className="text-xs text-white/60 line-clamp-2 max-w-xl font-sans leading-relaxed">{item.description}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setEditingItem(item)}
                        className="p-2 text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-white/60 hover:text-red-400 hover:bg-red-950/20 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}

                {activeTab === 'residency' && residencyList.map((item) => (
                  <div key={item.id} className="bg-neutral-dark border border-white/10 p-5 flex items-start justify-between gap-6 hover:border-white/30 transition-all">
                    <div>
                      <div className="flex items-center gap-3 mb-1.5">
                        <span className="text-xs font-mono text-white/40">{item.year}</span>
                        <h4 className="font-serif text-base tracking-widest uppercase">{item.name}</h4>
                      </div>
                      <p className="text-xs text-white/50 font-mono mb-1">{item.period} | {item.location}</p>
                      {item.outcome && <p className="text-xs text-white/60 line-clamp-2 max-w-xl leading-relaxed">{item.outcome}</p>}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setEditingItem(item)}
                        className="p-2 text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-white/60 hover:text-red-400 hover:bg-red-950/20 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}

                {activeTab === 'award' && awardList.map((item) => (
                  <div key={item.id} className="bg-neutral-dark border border-white/10 p-4 flex items-start justify-between gap-6 hover:border-white/30 transition-all">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-white/40">{item.year}</span>
                        <span className="text-[9px] font-mono tracking-widest px-2 py-0.5 bg-white/10 text-white uppercase">{item.category}</span>
                        <h4 className="font-sans text-xs tracking-wider font-medium">{item.title}</h4>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setEditingItem(item)}
                        className="p-2 text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-white/60 hover:text-red-400 hover:bg-red-950/20 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Empty check */}
                {((activeTab === 'theatre' && theatreList.length === 0) ||
                  (activeTab === 'exhibition' && exhibitionList.length === 0) ||
                  (activeTab === 'essay' && essayList.length === 0) ||
                  (activeTab === 'novel' && novelList.length === 0) ||
                  (activeTab === 'residency' && residencyList.length === 0) ||
                  (activeTab === 'award' && awardList.length === 0)) && (
                  <div className="text-center py-20 border border-white/10 bg-neutral-dark/20">
                    <p className="text-xs font-mono text-white/40 uppercase tracking-widest">No entries found. Click "Create Entry" to add one.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
