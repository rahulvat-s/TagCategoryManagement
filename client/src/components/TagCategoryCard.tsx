import { Edit, Trash2, Tag, Clock } from 'lucide-react';
import { ITagCategory, ETagCategoryStatus, EMetadataComponent } from '../interfaces';
import styles from '../styles/TagCategoryCard.module.scss';

interface TagCategoryCardProps {
  category: ITagCategory;
  onEdit: (category: ITagCategory) => void;
  onDelete: (category: ITagCategory) => void;
}

export default function TagCategoryCard({ category, onEdit, onDelete }: TagCategoryCardProps) {
  const formatDate = (timestamp: number) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(new Date(timestamp));
  };

  const getStatusClass = (status: ETagCategoryStatus) => {
    return status === ETagCategoryStatus.ACTIVE ? styles.active : styles.inactive;
  };

  const getComponentBadgeClass = (component: EMetadataComponent) => {
    return component === EMetadataComponent.INPUT ? styles.input : styles.select;
  };

  return (
    <div className={styles.card} data-testid={`card-category-${category.id}`}>
      <div className={styles.cardContent}>
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <div className={styles.titleRow}>
              <h3 className={styles.title} data-testid={`text-category-name-${category.id}`}>
                {category.name}
              </h3>
              <span className={`${styles.statusBadge} ${getStatusClass(category.status)}`} data-testid={`text-status-${category.id}`}>
                {category.status}
              </span>
              <span className={styles.precisionBadge} data-testid={`text-precision-${category.id}`}>
                {category.precisionType}
              </span>
            </div>
            <div className={styles.metaRow}>
              <span className={styles.metaItem}>
                <Tag size={14} />
                Group: <span className={styles.metaValue}>{category.group.label}</span>
              </span>
              <span className={styles.metaItem}>
                <Clock size={14} />
                Created: <span className={styles.metaValue}>{formatDate(category.createdAt)}</span>
              </span>
            </div>
          </div>
          <div className={styles.actions}>
            <button 
              data-testid={`button-edit-${category.id}`}
              className={`${styles.actionButton} ${styles.edit}`}
              onClick={() => onEdit(category)}
            >
              <Edit size={14} />
              Edit
            </button>
            <button 
              data-testid={`button-delete-${category.id}`}
              className={`${styles.actionButton} ${styles.delete}`}
              onClick={() => onDelete(category)}
            >
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.infoSection}>
            <h4 className={styles.sectionTitle}>Basic Information</h4>
            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Parent Tag:</span>
                <span className={styles.infoValue}>{category.isParentTag ? 'Yes' : 'No'}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Replay:</span>
                <span className={styles.infoValue}>{category.isReplay ? 'Yes' : 'No'}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Game ID:</span>
                <span className={`${styles.infoValue} ${styles.code}`}>{category.gameId}</span>
              </div>
            </div>
          </div>

          <div className={styles.nameStructureSection}>
            <h4 className={styles.sectionTitle}>Name Structure</h4>
            <div className={styles.nameStructureList}>
              {category.nameStructure.map((field, index) => (
                <span key={index} className={styles.nameStructureItem}>
                  {field}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.metadataSection}>
          <h4 className={styles.sectionTitle}>Metadata Configuration</h4>
          <div className={styles.metadataGrid}>
            {category.metadataConfig.map((config, index) => (
              <div key={index} className={styles.metadataItem}>
                <div className={styles.metadataHeader}>
                  <span className={styles.metadataLabel}>{config.label}</span>
                  <span className={`${styles.componentBadge} ${getComponentBadgeClass(config.component)}`}>
                    {config.component}
                  </span>
                </div>
                <div className={styles.metadataDetails}>
                  <div className={styles.detailRow}>
                    Key: <span className={styles.code}>{config.key}</span>
                  </div>
                  {config.type && (
                    <div className={styles.detailRow}>
                      Type: <span>{config.type}</span>
                    </div>
                  )}
                  {config.mode && (
                    <div className={styles.detailRow}>
                      Mode: <span>{config.mode}</span>
                    </div>
                  )}
                  {config.options && (
                    <div className={styles.detailRow}>
                      Options: <span>{config.options.length}</span>
                    </div>
                  )}
                  <div className={styles.flags}>
                    {config.required && <span className={styles.flag + ' ' + styles.required}>Required</span>}
                    {config.readOnly && <span className={styles.flag + ' ' + styles.readonly}>Read-only</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {Object.keys(category.subCategories).length > 0 && (
          <div className={styles.subcategoriesSection}>
            <h4 className={styles.sectionTitle}>Subcategories</h4>
            {Object.entries(category.subCategories).map(([key, subcat]) => (
              <div key={key} className={styles.subcategoryCard}>
                <div className={styles.subcategoryHeader}>
                  <h5 className={styles.subcategoryTitle}>{subcat.label}</h5>
                  <span className={styles.subcategoryKey}>{key}</span>
                </div>
                <div className={styles.subcategoryConfigGrid}>
                  {subcat.config.map((config, configIndex) => (
                    <div key={configIndex} className={styles.subcategoryConfigItem}>
                      <div className={styles.configHeader}>
                        <span className={styles.configLabel}>{config.label}</span>
                        <span className={`${styles.componentBadge} ${getComponentBadgeClass(config.component)}`}>
                          {config.component}
                        </span>
                      </div>
                      <div className={styles.configDetails}>
                        Key: <span className={styles.code}>{config.key}</span>
                        {config.type && ` | Type: ${config.type}`}
                        {config.options && ` | Options: ${config.options.length}`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
