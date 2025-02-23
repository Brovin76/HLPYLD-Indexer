'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type ContactFormData = {
  name: string;
  xHandle: string;
  telegram: string;
  discord: string;
  reason: string;
  message: string;
};

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactFormModal({ isOpen, onClose }: ContactFormModalProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    xHandle: '',
    telegram: '',
    discord: '',
    reason: 'partnership',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to submit');

      setStatus('success');
      setTimeout(() => {
        onClose();
        setStatus('idle');
        setFormData({
          name: '',
          xHandle: '',
          telegram: '',
          discord: '',
          reason: 'partnership',
          message: '',
        });
      }, 2000);

    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-lg p-6 bg-gray-900 rounded-xl border border-hl-green/20"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
            
            <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Name <span className="text-hl-green">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 text-white focus:border-hl-green focus:ring-1 focus:ring-hl-green outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  X Handle <span className="text-hl-green">*</span>
                </label>
                <input
                  type="text"
                  value={formData.xHandle}
                  onChange={(e) => setFormData({ ...formData, xHandle: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 text-white focus:border-hl-green focus:ring-1 focus:ring-hl-green outline-none"
                  placeholder="@username"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Telegram (optional)</label>
                  <input
                    type="text"
                    value={formData.telegram}
                    onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 text-white focus:border-hl-green focus:ring-1 focus:ring-hl-green outline-none"
                    placeholder="@username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Discord (optional)</label>
                  <input
                    type="text"
                    value={formData.discord}
                    onChange={(e) => setFormData({ ...formData, discord: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 text-white focus:border-hl-green focus:ring-1 focus:ring-hl-green outline-none"
                    placeholder="username#0000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Reason for Contact <span className="text-hl-green">*</span>
                </label>
                <select
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 text-white focus:border-hl-green focus:ring-1 focus:ring-hl-green outline-none"
                  required
                >
                  <option value="partnership">Partnership/Collaboration</option>
                  <option value="integration">Integration</option>
                  <option value="funding">Funding/Investment</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Message <span className="text-hl-green">*</span>
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 text-white focus:border-hl-green focus:ring-1 focus:ring-hl-green outline-none"
                  rows={4}
                  placeholder="Tell us about your project or inquiry..."
                  required
                />
              </div>

              <div className="mt-8">
                <motion.button
                  type="submit"
                  disabled={status === 'submitting'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full px-8 py-4 bg-gradient-to-r from-hl-green/20 via-hl-green/30 to-hl-green/20 
                           text-hl-green rounded-xl 
                           hover:bg-hl-green/30 transition-all duration-300 
                           font-medium border border-hl-green/30
                           hover:border-hl-green/50 hover:shadow-[0_0_15px_rgba(0,255,176,0.15)]
                           flex items-center justify-center gap-2
                           disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {status === 'submitting' ? (
                    <span className="flex items-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        ⚡
                      </motion.span>
                      Submitting...
                    </span>
                  ) : status === 'success' ? (
                    <span className="flex items-center gap-2">
                      ✓ Submitted Successfully
                    </span>
                  ) : status === 'error' ? (
                    <span className="flex items-center gap-2 text-red-400">
                      ⚠ Failed to Submit - Try Again
                    </span>
                  ) : (
                    <span>Submit Request</span>
                  )}
                </motion.button>
              </div>

            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 