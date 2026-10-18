import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import PageHeader from '../components/common/PageHeader';
import Modal from '../components/common/Modal';
import { GALLERY_SECTIONS, getGallerySectionName } from '@shared/gallery.config';
import {
  Image as ImageIcon,
  Calendar,
  Layers,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Sprout,
  Sparkles,
  Trophy,
  Palette,
  History,
  Atom,
  Flag,
  Search
} from 'lucide-react';
import { getLocalizedText } from '../utils/bilingual';

const ICON_MAP = {
  'tree-plantation': Sprout,
  'annual-gathering': Sparkles,
  'sports-yoga': Trophy,
  'rangoli-competition': Palette,
  'old-memories': History,
  'science-exhibition': Atom,
  'independence-day': Flag
};

export default function Gallery() {
  const { t, i18n } = useTranslation(['gallery', 'common']);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState('all');
  const [viewMode, setViewMode] = useState('albums'); // 'albums' | 'photos'
  const [searchQuery, setSearchQuery] = useState('');
  const [activeAlbum, setActiveAlbum] = useState(null);
  const [fullscreenImageIndex, setFullscreenImageIndex] = useState(null);
  const [activePhotoList, setActivePhotoList] = useState([]);

  // Fetch all albums and photos for the active language
  useEffect(() => {
    setLoading(true);
    axios.get(`/api/public/gallery?lang=${i18n.language}`)
      .then(res => {
        if (res.data?.success) {
          setAlbums(res.data.data);
        }
      })
      .catch(err => console.error('Failed to load gallery albums:', err))
      .finally(() => setLoading(false));
  }, [i18n.language]);

  // Compute total counts per section for pill badges
  const photoCountsBySection = useMemo(() => {
    const counts = {};
    let total = 0;
    albums.forEach(alb => {
      const cnt = alb.images?.length || 0;
      counts[alb.section_id] = (counts[alb.section_id] || 0) + cnt;
      total += cnt;
    });
    counts.all = total;
    return counts;
  }, [albums]);

  // Filter albums by selected section
  const filteredAlbums = useMemo(() => {
    if (selectedSection === 'all') return albums;
    return albums.filter(a => a.section_id === selectedSection);
  }, [albums, selectedSection]);

  // Flatten all photos from filtered albums
  const allFilteredPhotos = useMemo(() => {
    const list = [];
    filteredAlbums.forEach(album => {
      const albTitle = getLocalizedText(album, 'title', i18n.language);
      (album.images || []).forEach(img => {
        list.push({
          ...img,
          albumId: album.id,
          albumTitle: albTitle,
          sectionId: album.section_id,
          date: album.date
        });
      });
    });

    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase();
    return list.filter(p =>
      (p.caption && p.caption.toLowerCase().includes(q)) ||
      (p.albumTitle && p.albumTitle.toLowerCase().includes(q))
    );
  }, [filteredAlbums, searchQuery, i18n.language]);

  // Open Fullscreen Lightbox
  const openFullscreen = (photos, index) => {
    setActivePhotoList(photos);
    setFullscreenImageIndex(index);
  };

  const closeFullscreen = () => {
    setFullscreenImageIndex(null);
  };

  const nextImage = () => {
    if (fullscreenImageIndex !== null && activePhotoList.length > 0) {
      setFullscreenImageIndex((fullscreenImageIndex + 1) % activePhotoList.length);
    }
  };

  const prevImage = () => {
    if (fullscreenImageIndex !== null && activePhotoList.length > 0) {
      setFullscreenImageIndex((fullscreenImageIndex - 1 + activePhotoList.length) % activePhotoList.length);
    }
  };

  // Keyboard navigation for fullscreen lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (fullscreenImageIndex === null) return;
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') closeFullscreen();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullscreenImageIndex, activePhotoList]);

  return (
    <div className="space-y-10 pb-20">
      <PageHeader
        title={t('gallery.pageTitle', 'School Photo Gallery & Activities')}
        subtitle={t('gallery.pageSubtitle', 'Memories of tree plantation, annual gathering, sports & yoga, rangoli competition, and school heritage.')}
        badgeText={t('gallery.badge', 'Campus Life & Activities')}
      />

      <div className="max-w-7xl mx-auto px-4 space-y-8">
        
        {/* Section Filter Pills */}
        <div className="flex items-center justify-start lg:justify-center gap-2.5 overflow-x-auto pb-3 pt-1 scrollbar-thin">
          <button
            onClick={() => setSelectedSection('all')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap shadow-sm ${
              selectedSection === 'all'
                ? 'bg-slate-900 text-amber-400 dark:bg-amber-500 dark:text-slate-950 shadow-md ring-2 ring-amber-400/30'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>
              {i18n.language === 'mr' ? 'सर्व विभाग' : i18n.language === 'hi' ? 'सभी अनुभाग' : 'All Sections'}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-slate-800 text-amber-300 dark:bg-slate-950 dark:text-amber-400">
              {photoCountsBySection.all || 0}
            </span>
          </button>

          {GALLERY_SECTIONS.map(s => {
            const Icon = ICON_MAP[s.id] || ImageIcon;
            const count = photoCountsBySection[s.id] || 0;
            const isSelected = selectedSection === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setSelectedSection(s.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap shadow-sm border ${
                  isSelected
                    ? 'text-white shadow-md ring-2 ring-offset-1 dark:ring-offset-slate-950'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
                style={{
                  backgroundColor: isSelected ? s.themeColor : undefined,
                  borderColor: isSelected ? s.themeColor : undefined,
                  ['--tw-ring-color']: s.themeColor
                }}
              >
                <Icon className="w-4 h-4" />
                <span>{getGallerySectionName(s, i18n.language)}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                    isSelected
                      ? 'bg-black/30 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* View Controls & Stats Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-3xl shadow-sm">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setViewMode('albums')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  viewMode === 'albums'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{t('gallery.albumsView', 'Albums')}</span>
              </button>
              <button
                onClick={() => setViewMode('photos')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  viewMode === 'photos'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>{t('gallery.photosView', 'All Photos')}</span>
              </button>
            </div>

            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 hidden sm:block">
              <span className="font-bold text-slate-900 dark:text-white">
                {viewMode === 'albums' ? filteredAlbums.length : allFilteredPhotos.length}
              </span>{' '}
              {viewMode === 'albums'
                ? (i18n.language === 'mr' ? 'अल्बम' : i18n.language === 'hi' ? 'एल्बम' : 'Albums')
                : (i18n.language === 'mr' ? 'छायाचित्रे' : i18n.language === 'hi' ? 'फोटो' : 'Photos')}
            </div>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('gallery.searchPlaceholder', 'Search photos...')}
              className="w-full pl-9 pr-4 py-2 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-slate-500 font-medium">Loading photos...</p>
          </div>
        )}

        {/* ALBUMS VIEW */}
        {!loading && viewMode === 'albums' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlbums.map(album => {
              const albumTitle = getLocalizedText(album, 'title', i18n.language);
              const albumDesc = getLocalizedText(album, 'description', i18n.language);
              const secConfig = GALLERY_SECTIONS.find(s => s.id === album.section_id);
              const Icon = ICON_MAP[album.section_id] || ImageIcon;
              const photoCount = album.images?.length || 0;

              return (
                <div
                  key={album.id}
                  onClick={() => setActiveAlbum(album)}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer group flex flex-col"
                >
                  <div className="relative h-56 overflow-hidden bg-slate-950">
                    <img
                      src={album.cover_image}
                      alt={albumTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = album.images?.[0]?.image_url || '/assets/school-images/annual-gathering/Attentive Crowd Beneath Festive Drapery.png';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex flex-col justify-between p-4">
                      <div className="flex items-center justify-between">
                        <span
                          className="px-3 py-1 rounded-full text-[11px] font-bold text-white shadow-sm flex items-center gap-1.5 backdrop-blur-md"
                          style={{ backgroundColor: secConfig?.themeColor || '#d97706' }}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span>{secConfig ? getGallerySectionName(secConfig, i18n.language) : 'Gallery'}</span>
                        </span>
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-slate-950/80 text-amber-400 border border-amber-400/30 backdrop-blur-md flex items-center gap-1">
                          <ImageIcon className="w-3 h-3" />
                          <span>{photoCount} {t('gallery.photoCount', 'Photos')}</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-slate-200 font-semibold">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        <span>{album.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <h3 className="font-extrabold text-slate-900 dark:text-white text-base group-hover:text-amber-500 transition line-clamp-1">
                        {albumTitle}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {albumDesc}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold text-amber-600 dark:text-amber-400">
                      <span className="flex items-center gap-1.5">
                        <ImageIcon className="w-4 h-4" />
                        <span>{t('gallery.viewAlbum', 'View All Photos')} ({photoCount})</span>
                      </span>
                      <span className="text-[11px] px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800">
                        {t('gallery.openAlbum', 'Open Album')}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ALL PHOTOS GRID VIEW */}
        {!loading && viewMode === 'photos' && (
          <div>
            {allFilteredPhotos.length === 0 ? (
              <div className="py-16 text-center text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
                <ImageIcon className="w-10 h-10 mx-auto text-slate-400 mb-2" />
                <p className="text-sm font-semibold">{t('gallery.noImagesFound', 'No photos found for this section.')}</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {allFilteredPhotos.map((photo, idx) => (
                  <div
                    key={`${photo.albumId}-${idx}`}
                    onClick={() => openFullscreen(allFilteredPhotos, idx)}
                    className="group relative bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer border border-slate-200 dark:border-slate-800 aspect-[4/3]"
                  >
                    <img
                      src={photo.image_url}
                      alt={photo.caption || photo.albumTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/assets/school-images/annual-gathering/Attentive Crowd Beneath Festive Drapery.png';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-3">
                      <p className="text-xs font-semibold text-white line-clamp-2">
                        {photo.caption || photo.albumTitle}
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-amber-300 mt-1">
                        <span className="truncate">{photo.albumTitle}</span>
                        <Maximize2 className="w-3.5 h-3.5 shrink-0" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ALBUM LIGHTBOX MODAL (Showing ALL Photos for Album) */}
        <Modal
          isOpen={!!activeAlbum}
          onClose={() => setActiveAlbum(null)}
          title={
            activeAlbum
              ? `${getLocalizedText(activeAlbum, 'title', i18n.language)} (${activeAlbum.images?.length || 0} ${t('gallery.photoCount', 'Photos')})`
              : t('gallery.viewAlbum')
          }
          maxWidth="max-w-6xl"
        >
          {activeAlbum && (
            <div className="space-y-6">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl">
                  {getLocalizedText(activeAlbum, 'description', i18n.language)}
                </p>
                <div className="flex items-center gap-2 shrink-0 text-xs font-bold text-amber-600 dark:text-amber-400">
                  <Calendar className="w-4 h-4" />
                  <span>{activeAlbum.date}</span>
                </div>
              </div>

              {/* Grid of ALL photos in this album */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[65vh] overflow-y-auto pr-1">
                {activeAlbum.images?.map((img, idx) => (
                  <div
                    key={img.id || idx}
                    onClick={() => openFullscreen(activeAlbum.images, idx)}
                    className="group relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 aspect-[4/3] cursor-pointer shadow-sm hover:shadow-lg transition"
                  >
                    <img
                      src={img.image_url}
                      alt={img.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/assets/school-images/annual-gathering/Attentive Crowd Beneath Festive Drapery.png';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition p-2.5 flex flex-col justify-end">
                      <p className="text-[11px] font-medium text-white line-clamp-2">
                        {img.caption || `Photo ${idx + 1}`}
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-amber-300 mt-1">
                        <span>#{idx + 1}</span>
                        <Maximize2 className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Modal>

        {/* FULLSCREEN IMAGE LIGHTBOX VIEWER */}
        {fullscreenImageIndex !== null && activePhotoList[fullscreenImageIndex] && (
          <div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-fadeIn"
            onClick={closeFullscreen}
          >
            {/* Top Bar */}
            <div
              className="flex items-center justify-between text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-white/10 border border-white/20 text-amber-400">
                  {fullscreenImageIndex + 1} / {activePhotoList.length}
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-300 truncate max-w-xs sm:max-w-md">
                  {activePhotoList[fullscreenImageIndex].albumTitle || activeAlbum?.title}
                </span>
              </div>
              <button
                onClick={closeFullscreen}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Image with Navigation Arrows */}
            <div
              className="relative flex-1 flex items-center justify-center py-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Prev Button */}
              {activePhotoList.length > 1 && (
                <button
                  onClick={prevImage}
                  className="absolute left-2 sm:left-6 z-10 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white transition border border-white/10 shadow-xl"
                  title={t('gallery.prevPhoto', 'Previous')}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {/* Displayed Image */}
              <img
                src={activePhotoList[fullscreenImageIndex].image_url}
                alt={activePhotoList[fullscreenImageIndex].caption}
                className="max-h-[75vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl transition duration-300"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/assets/school-images/annual-gathering/Attentive Crowd Beneath Festive Drapery.png';
                }}
              />

              {/* Next Button */}
              {activePhotoList.length > 1 && (
                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-6 z-10 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white transition border border-white/10 shadow-xl"
                  title={t('gallery.nextPhoto', 'Next')}
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Bottom Caption Bar */}
            <div
              className="text-center max-w-2xl mx-auto space-y-1 bg-black/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-sm font-bold text-amber-300">
                {activePhotoList[fullscreenImageIndex].caption || activePhotoList[fullscreenImageIndex].albumTitle}
              </p>
              {activePhotoList[fullscreenImageIndex].date && (
                <p className="text-xs text-slate-400">
                  {activePhotoList[fullscreenImageIndex].date}
                </p>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
