import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PageHeader from '../components/common/PageHeader';
import Modal from '../components/common/Modal';
import { SECTIONS_CONFIG } from '@shared/sections.config';
import { Image as ImageIcon, Calendar, X } from 'lucide-react';

export default function Gallery() {
  const [albums, setAlbums] = useState([]);
  const [selectedSection, setSelectedSection] = useState('all');
  const [activeAlbum, setActiveAlbum] = useState(null);

  useEffect(() => {
    axios.get(`/api/public/gallery?section=${selectedSection}`)
      .then(res => {
        if (res.data.success) {
          setAlbums(res.data.data);
        }
      })
      .catch(err => console.error(err));
  }, [selectedSection]);

  return (
    <div className="space-y-12 pb-16">
      <PageHeader
        title="Photo Gallery & Event Highlights"
        titleMr="चित्रदालन व उपक्रम फोटो"
        subtitle="Visual memories of cultural events, sports meets, science fairs, and school celebrations."
        badgeText="Visual Showcase"
      />

      <div className="max-w-7xl mx-auto px-4 space-y-8">
        
        {/* Section Filter Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedSection('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              selectedSection === 'all'
                ? 'bg-slate-900 text-amber-400 shadow'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            All Albums
          </button>
          {SECTIONS_CONFIG.map(s => (
            <button
              key={s.id}
              onClick={() => setSelectedSection(s.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition border ${
                selectedSection === s.id
                  ? 'text-white shadow'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
              }`}
              style={{
                backgroundColor: selectedSection === s.id ? s.themeColor : undefined,
                borderColor: selectedSection === s.id ? s.themeColor : undefined
              }}
            >
              {s.shortName}
            </button>
          ))}
        </div>

        {/* Albums Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {albums.map(album => (
            <div
              key={album.id}
              onClick={() => setActiveAlbum(album)}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition cursor-pointer group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={album.cover_image}
                  alt={album.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                  <span className="text-xs text-amber-300 font-semibold flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {album.date}
                  </span>
                </div>
              </div>
              <div className="p-5 space-y-2">
                <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-amber-500 transition">
                  {album.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {album.description}
                </p>
                <div className="text-xs font-bold text-amber-600 dark:text-amber-400 pt-1 flex items-center gap-1">
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>View Photos ({album.images?.length || 1})</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <Modal
          isOpen={!!activeAlbum}
          onClose={() => setActiveAlbum(null)}
          title={activeAlbum?.title || 'Album Photos'}
          maxWidth="max-w-4xl"
        >
          <div className="space-y-4">
            <p className="text-xs text-slate-600 dark:text-slate-300">{activeAlbum?.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeAlbum?.images?.map(img => (
                <div key={img.id} className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950">
                  <img src={img.image_url} alt={img.caption} className="w-full h-56 object-cover" />
                  {img.caption && (
                    <div className="p-3 text-xs text-slate-200 bg-slate-900 font-medium">
                      {img.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Modal>

      </div>
    </div>
  );
}
