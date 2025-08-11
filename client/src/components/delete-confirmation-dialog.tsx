import { AlertTriangle } from 'lucide-react';
import { TagCategory } from '@shared/schema';
import styles from '../styles/TagCategoryForm.module.scss';

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  category?: TagCategory | null;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting?: boolean;
}

export default function DeleteConfirmationDialog({ isOpen, category, onClose, onConfirm, isDeleting = false }: DeleteConfirmationDialogProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.deleteModal}>
      <div className={styles.deleteModalContainer}>
        <div className={styles.deleteModalContent}>
          <div className={styles.deleteIcon}>
            <AlertTriangle size={20} />
          </div>
          <h3 className={styles.deleteTitle}>Delete Tag Category</h3>
          <p className={styles.deleteText}>
            Are you sure you want to delete "<span className={styles.deleteName}>{category?.name}</span>"? This action cannot be undone.
          </p>
          <div className={styles.deleteActions}>
            <button 
              data-testid="button-cancel-delete"
              className={styles.deleteCancelButton}
              onClick={onClose}
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button 
              data-testid="button-confirm-delete"
              className={styles.deleteConfirmButton}
              onClick={onConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
