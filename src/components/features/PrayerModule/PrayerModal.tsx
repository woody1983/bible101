import React from 'react';

interface PrayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const PrayerModal: React.FC<PrayerModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="prayer-modal-overlay"
      onClick={handleOverlayClick}
      data-testid="modal-overlay"
    >
      <div className="prayer-modal-content">
        <button
          className="prayer-modal-close"
          onClick={onClose}
          aria-label="关闭"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};
