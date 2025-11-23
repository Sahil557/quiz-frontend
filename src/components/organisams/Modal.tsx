'use client';

import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { Button, Icon, Row, Typography } from '../atoms';

interface ModalProps {
  buttonText?: string;
  title?: string;
  children: ReactNode;
  showFooter?: boolean;
  showAccept?: boolean;
  showDecline?: boolean;
  acceptText?: string;
  declineText?: string;
  onAccept?: () => void;
  onDecline?: () => void;
  className?: string;
  showShadow?: boolean;
  acceptDisabled?: boolean;
  closeOnBackdropClick?: boolean;
}

export default function Modal({
  title = 'Modal Title',
  children,
  showFooter = true,
  showAccept = true,
  showDecline = true,
  acceptText = 'Accept',
  declineText = 'Cancel',
  acceptDisabled,
  onAccept = () => {},
  onDecline = () => {},
  className = '',
  showShadow = false,
  closeOnBackdropClick = false,
}: ModalProps) {
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (closeOnBackdropClick && e.currentTarget === e.target) {
      onDecline();
    }
  };

  const handleAccept = () => {
    onAccept();
  };

  const handleDecline = () => {
    onDecline();
  };

  return (
    <>
      <div
        className="fixed h-full inset-0 z-50 flex items-center justify-center bg-abyss/25 bg-opacity-50"
        aria-modal="true"
        role="dialog"
        onClick={handleBackgroundClick}
      >
        <div
          className={twMerge(
            'relative w-full max-w-lg max-h-[90vh] overflow-hidden bg-white rounded-lg shadow p-4',
            className,
            showShadow && 'p-0'
          )}
        >
          {/* Header */}
          <Row className={twMerge('sticky top-0 z-10', showShadow && 'shadow p-4')}>
            <Typography variant="base" weight="medium">
              {title}
            </Typography>
            <Icon
              size={16}
              name="Cancel01Icon"
              onClick={handleDecline}
              className="cursor-pointer text-abyss hover:text-slate"
            />
          </Row>

          {/* Body */}
          <div
            className={twMerge(
              'overflow-y-auto py-4 max-h-[calc(95vh-120px)]',
              showShadow && 'px-4'
            )}
          >
            {children}
          </div>

          {/* Footer */}
          {showFooter && (
            <Row
              className={twMerge(
                'sticky bottom-0 z-10 justify-end gap-2',
                showShadow && 'pb-4 pr-4'
              )}
            >
              {showDecline && (
                <Button
                  onClick={handleDecline}
                  className="px-8 text-stone bg-mist"
                  text={declineText}
                  variant="ghost"
                />
              )}
              {showAccept && (
                <Button
                  onClick={handleAccept}
                  className="px-8"
                  text={acceptText}
                  disabled={acceptDisabled}
                />
              )}
            </Row>
          )}
        </div>
      </div>
    </>
  );
}
