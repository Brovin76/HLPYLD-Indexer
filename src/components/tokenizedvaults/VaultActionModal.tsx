'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, Loader2 } from 'lucide-react';

interface VaultActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'deposit' | 'withdraw';
  maxAmount?: string;
}

export function VaultActionModal({ isOpen, onClose, type, maxAmount }: VaultActionModalProps) {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // TODO: Implement actual deposit/withdraw logic
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      onClose();
    } catch (err) {
      setError('Transaction failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative bg-gradient-to-br from-[#1A1D24] to-[#1F2229]
                     border border-white/10 rounded-xl p-6 w-full max-w-md
                     shadow-xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white
                       transition-colors"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-medium text-white mb-6">
              {type === 'deposit' ? 'Deposit to Vault' : 'Withdraw from Vault'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Amount (USDC)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-[#1A1D24] border border-white/10 rounded-lg px-4 py-3
                             text-white placeholder-gray-500 focus:outline-none focus:border-hl-green/50"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                  />
                  {maxAmount && (
                    <button
                      type="button"
                      onClick={() => setAmount(maxAmount)}
                      className="absolute right-3 top-1/2 -translate-y-1/2
                               text-sm text-hl-green hover:text-hl-green/80"
                    >
                      MAX
                    </button>
                  )}
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-400 text-sm">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-hl-green/10 hover:bg-hl-green/20 
                         text-hl-green rounded-lg transition-all duration-200
                         border border-hl-green/20 hover:border-hl-green/30
                         font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                ) : (
                  type === 'deposit' ? 'Deposit' : 'Withdraw'
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 