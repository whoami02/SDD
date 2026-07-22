import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Circle, BookOpen, Layout, Star, X, ZoomIn } from 'lucide-react';
import { GsddItem, GsddDesign } from '../types';
import MarkdownRenderer from './MarkdownRenderer';
import { cn, resolveAssetUrl } from '../lib/utils';


interface GsddItemViewProps {
  item: GsddItem;
  isRead: boolean;
  onToggleRead: () => void;
}

function ImageLightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative max-w-5xl max-h-[90vh] w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute -top-10 right-0 text-white/80 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
          <img
            src={src}
            alt={alt}
            className="w-full h-auto max-h-[85vh] object-contain rounded-xl bg-white p-2 shadow-2xl"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function DiagramImage({ src, alt, label }: { src: string; alt: string; label: string }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <div className="group relative">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</span>
          <button
            onClick={() => setLightboxOpen(true)}
            className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 font-medium"
          >
            <ZoomIn size={12} /> Click to zoom
          </button>
        </div>
        <button
          onClick={() => setLightboxOpen(true)}
          className="w-full block overflow-hidden rounded-xl border border-slate-200 bg-white hover:border-indigo-200 hover:shadow-md transition-all group/img"
        >
          <img
            src={src}
            alt={alt}
            className="w-full h-auto object-contain p-3 transition-transform duration-300 group-hover/img:scale-[1.02]"
          />
        </button>
      </div>
      {lightboxOpen && (
        <ImageLightbox src={src} alt={alt} onClose={() => setLightboxOpen(false)} />
      )}
    </>
  );
}

export default function GsddItemView({ item, isRead, onToggleRead }: GsddItemViewProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'detail'>('overview');

  const getBadge = () => {
    if (item.category === 'intro') return { label: 'GSDD', icon: <Star size={12} />, color: 'bg-indigo-100 text-indigo-700' };
    if (item.category === 'basics') return { label: 'Basics', icon: <BookOpen size={12} />, color: 'bg-amber-100 text-amber-700' };
    return { label: 'System Design', icon: <Layout size={12} />, color: 'bg-purple-100 text-purple-700' };
  };

  const badge = getBadge();
  const design = item.category === 'designs' ? (item as GsddDesign) : null;
  const hasDetailImage = design?.detailImage != null;
  const hasContent = (item.category === 'basics' || item.category === 'intro') ? !!item.content : !!(item as GsddDesign).content;

  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="mb-8">
        <span className={cn(
          'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider mb-3',
          badge.color
        )}>
          {badge.icon}
          {badge.label}
        </span>
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">
              {item.title}
            </h2>
          </div>
          <button
            onClick={onToggleRead}
            className="shrink-0 mt-1 flex items-center gap-2 text-sm font-medium transition-colors group"
            title={isRead ? 'Mark as unread' : 'Mark as read'}
          >
            {isRead ? (
              <>
                <CheckCircle2 size={28} className="text-green-500" strokeWidth={1.5} />
                <span className="text-green-600 text-xs font-bold hidden sm:inline">Read</span>
              </>
            ) : (
              <>
                <Circle size={28} className="text-slate-300 group-hover:text-indigo-500 transition-colors" strokeWidth={1.5} />
                <span className="text-slate-400 group-hover:text-indigo-600 text-xs font-bold hidden sm:inline transition-colors">Mark Read</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Design: Architecture Diagrams */}
      {item.category === 'designs' && design && (
        <div className={cn('mb-8', isRead && 'opacity-60 grayscale-[50%] transition-all duration-500')}>
          {hasDetailImage && (
            <div className="flex gap-1 mb-4 p-1 bg-slate-100 rounded-lg w-fit">
              {(['overview', 'detail'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    'px-4 py-1.5 rounded-md text-xs font-bold capitalize transition-all',
                    activeTab === tab
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'overview' && design.overviewImage && (
                <DiagramImage
                  src={resolveAssetUrl(design.overviewImage)}
                  alt={`${item.title} — Overview Architecture`}
                  label="Overview Architecture"
                />
              )}
              {activeTab === 'detail' && design.detailImage && (
                <DiagramImage
                  src={resolveAssetUrl(design.detailImage)}
                  alt={`${item.title} — Detailed Architecture`}
                  label="Detailed Architecture"
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Markdown Content */}
      {hasContent && (
        <div className={cn(
          'bg-white border border-slate-200 rounded-2xl p-6 md:p-8 transition-all duration-500',
          isRead && item.category !== 'intro' && 'opacity-60'
        )}>
          <MarkdownRenderer
            content={
              item.category === 'basics' || item.category === 'intro'
                ? item.content
                : (item as GsddDesign).content!
            }
          />
        </div>
      )}

      {/* No text content — only diagrams */}
      {item.category === 'designs' && !hasContent && (
        <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center shrink-0">
            <Layout size={16} className="text-purple-600" />
          </div>
          <p className="text-sm text-slate-500">
            Architecture diagrams above from <span className="font-medium text-slate-700">Grokking the System Design Interview</span>. 
            Use these as reference while practicing your own design approach.
          </p>
        </div>
      )}
    </motion.div>
  );
}
