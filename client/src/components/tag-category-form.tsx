import { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { TagCategory } from '@shared/schema';
import styles from '../styles/TagCategoryForm.module.scss';

interface TagCategoryFormProps {
  isOpen: boolean;
  category?: TagCategory | null;
  onClose: () => void;
  onSubmit: (category: Omit<TagCategory, 'id' | 'createdAt' | 'lastUpdatedAt'>) => void;
  isSubmitting?: boolean;
}

interface MetadataConfig {
  component: string;
  key: string;
  label: string;
  required?: boolean;
  readOnly?: boolean;
  type?: string;
  mode?: string;
  multiple?: boolean;
  options?: Array<{ label: string; value: string | number }>;
  query?: string;
}

const emptyMetadataConfig: MetadataConfig = {
  component: 'input',
  key: '',
  label: '',
  required: false,
  readOnly: false,
  type: 'text'
};

const defaultFormData = {
  name: '',
  gameId: '',
  group: { label: '', value: '' },
  status: 'ACTIVE' as const,
  precisionType: 'LONG' as const,
  isParentTag: false,
  isReplay: false,
  nameStructure: [] as string[],
  metadataConfig: [] as MetadataConfig[],
  subCategories: {} as Record<string, { label: string; config: MetadataConfig[] }>
};

export default function TagCategoryForm({ isOpen, category, onClose, onSubmit, isSubmitting = false }: TagCategoryFormProps) {
  const [formData, setFormData] = useState(defaultFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEditing = !!category;

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        gameId: category.gameId,
        group: category.group,
        status: category.status,
        precisionType: category.precisionType,
        isParentTag: category.isParentTag,
        isReplay: category.isReplay,
        nameStructure: category.nameStructure,
        metadataConfig: category.metadataConfig,
        subCategories: category.subCategories
      });
    } else {
      setFormData(defaultFormData);
    }
    setErrors({});
  }, [category]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) {
      newErrors.name = 'Category name is required';
    }

    if (!formData.gameId?.trim()) {
      newErrors.gameId = 'Game ID is required';
    }

    if (!formData.group?.value) {
      newErrors.group = 'Group is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || isSubmitting) {
      return;
    }

    onSubmit(formData);
  };

  const handleInputChange = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleGroupChange = (value: string) => {
    const groupOptions = [
      { label: 'Ball', value: 'ball' },
      { label: 'Player', value: 'player' },
      { label: 'Game', value: 'game' }
    ];
    
    const selectedGroup = groupOptions.find(g => g.value === value);
    if (selectedGroup) {
      handleInputChange('group', selectedGroup);
    }
  };

  const addNameField = () => {
    const newNameStructure = [...formData.nameStructure, ''];
    handleInputChange('nameStructure', newNameStructure);
  };

  const updateNameField = (index: number, value: string) => {
    const newNameStructure = [...formData.nameStructure];
    newNameStructure[index] = value;
    handleInputChange('nameStructure', newNameStructure);
  };

  const removeNameField = (index: number) => {
    const newNameStructure = formData.nameStructure.filter((_, i) => i !== index);
    handleInputChange('nameStructure', newNameStructure);
  };

  const addMetadataConfig = () => {
    const newConfig = [...formData.metadataConfig, { ...emptyMetadataConfig }];
    handleInputChange('metadataConfig', newConfig);
  };

  const updateMetadataConfig = (index: number, field: keyof MetadataConfig, value: any) => {
    const newConfig = [...formData.metadataConfig];
    newConfig[index] = { ...newConfig[index], [field]: value };
    handleInputChange('metadataConfig', newConfig);
  };

  const removeMetadataConfig = (index: number) => {
    const newConfig = formData.metadataConfig.filter((_, i) => i !== index);
    handleInputChange('metadataConfig', newConfig);
  };

  const addSubcategory = () => {
    const key = `subcategory-${Date.now()}`;
    const newSubCategories = {
      ...formData.subCategories,
      [key]: { label: '', config: [] }
    };
    handleInputChange('subCategories', newSubCategories);
  };

  const updateSubcategoryKey = (oldKey: string, newKey: string) => {
    const newSubCategories = { ...formData.subCategories };
    if (oldKey !== newKey) {
      newSubCategories[newKey] = newSubCategories[oldKey];
      delete newSubCategories[oldKey];
      handleInputChange('subCategories', newSubCategories);
    }
  };

  const updateSubcategoryLabel = (key: string, label: string) => {
    const newSubCategories = {
      ...formData.subCategories,
      [key]: { ...formData.subCategories[key], label }
    };
    handleInputChange('subCategories', newSubCategories);
  };

  const removeSubcategory = (key: string) => {
    const newSubCategories = { ...formData.subCategories };
    delete newSubCategories[key];
    handleInputChange('subCategories', newSubCategories);
  };

  const addSubcategoryConfig = (subcategoryKey: string) => {
    const newSubCategories = { ...formData.subCategories };
    newSubCategories[subcategoryKey] = {
      ...newSubCategories[subcategoryKey],
      config: [...newSubCategories[subcategoryKey].config, { ...emptyMetadataConfig }]
    };
    handleInputChange('subCategories', newSubCategories);
  };

  const updateSubcategoryConfig = (subcategoryKey: string, configIndex: number, field: keyof MetadataConfig, value: any) => {
    const newSubCategories = { ...formData.subCategories };
    const newConfig = [...newSubCategories[subcategoryKey].config];
    newConfig[configIndex] = { ...newConfig[configIndex], [field]: value };
    newSubCategories[subcategoryKey] = {
      ...newSubCategories[subcategoryKey],
      config: newConfig
    };
    handleInputChange('subCategories', newSubCategories);
  };

  const removeSubcategoryConfig = (subcategoryKey: string, configIndex: number) => {
    const newSubCategories = { ...formData.subCategories };
    newSubCategories[subcategoryKey] = {
      ...newSubCategories[subcategoryKey],
      config: newSubCategories[subcategoryKey].config.filter((_, i) => i !== configIndex)
    };
    handleInputChange('subCategories', newSubCategories);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContainer}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h3 className={styles.modalTitle}>
              {isEditing ? 'Edit Tag Category' : 'Create Tag Category'}
            </h3>
            <button 
              data-testid="button-close-modal"
              className={styles.closeButton}
              onClick={onClose}
              disabled={isSubmitting}
            >
              <X size={20} />
            </button>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            {/* Basic Information Section */}
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Basic Information</h4>
              <div className={styles.fieldGrid}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>
                    Category Name <span className={styles.required}>*</span>
                  </label>
                  <input 
                    data-testid="input-name"
                    type="text" 
                    className={styles.input}
                    placeholder="Enter category name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    disabled={isSubmitting}
                  />
                  {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>
                    Game ID <span className={styles.required}>*</span>
                  </label>
                  <input 
                    data-testid="input-game-id"
                    type="text" 
                    className={styles.input}
                    placeholder="Enter game ID"
                    value={formData.gameId}
                    onChange={(e) => handleInputChange('gameId', e.target.value)}
                    disabled={isSubmitting}
                  />
                  {errors.gameId && <div className="text-red-500 text-sm mt-1">{errors.gameId}</div>}
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>
                    Group <span className={styles.required}>*</span>
                  </label>
                  <select 
                    data-testid="select-group"
                    className={styles.select}
                    value={formData.group.value}
                    onChange={(e) => handleGroupChange(e.target.value)}
                    disabled={isSubmitting}
                  >
                    <option value="">Select a group</option>
                    <option value="ball">Ball</option>
                    <option value="player">Player</option>
                    <option value="game">Game</option>
                  </select>
                  {errors.group && <div className="text-red-500 text-sm mt-1">{errors.group}</div>}
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>
                    Status <span className={styles.required}>*</span>
                  </label>
                  <select 
                    data-testid="select-status"
                    className={styles.select}
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    disabled={isSubmitting}
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                  </select>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>
                    Precision Type <span className={styles.required}>*</span>
                  </label>
                  <select 
                    data-testid="select-precision-type"
                    className={styles.select}
                    value={formData.precisionType}
                    onChange={(e) => handleInputChange('precisionType', e.target.value)}
                    disabled={isSubmitting}
                  >
                    <option value="LONG">Long</option>
                    <option value="SHORT">Short</option>
                  </select>
                </div>

                <div className={styles.fieldGroup}>
                  <div className={styles.checkboxGroup}>
                    <div className={styles.checkboxItem}>
                      <input 
                        data-testid="checkbox-parent-tag"
                        type="checkbox" 
                        className={styles.checkbox}
                        checked={formData.isParentTag}
                        onChange={(e) => handleInputChange('isParentTag', e.target.checked)}
                        disabled={isSubmitting}
                      />
                      <span className={styles.checkboxLabel}>Is Parent Tag</span>
                    </div>

                    <div className={styles.checkboxItem}>
                      <input 
                        data-testid="checkbox-replay"
                        type="checkbox" 
                        className={styles.checkbox}
                        checked={formData.isReplay}
                        onChange={(e) => handleInputChange('isReplay', e.target.checked)}
                        disabled={isSubmitting}
                      />
                      <span className={styles.checkboxLabel}>Is Replay</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Name Structure Section */}
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Name Structure</h4>
              <p className={styles.description}>
                Define the fields that will be used to construct the name for this category.
              </p>
              <div className={styles.tagList}>
                {formData.nameStructure.map((field, index) => (
                  <div key={index} className={styles.tag}>
                    <input 
                      data-testid={`input-name-field-${index}`}
                      type="text" 
                      className={styles.tagInput}
                      placeholder="Field name"
                      value={field}
                      onChange={(e) => updateNameField(index, e.target.value)}
                      disabled={isSubmitting}
                    />
                    <button 
                      data-testid={`button-remove-name-field-${index}`}
                      type="button"
                      className={styles.removeButton}
                      onClick={() => removeNameField(index)}
                      disabled={isSubmitting}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <button 
                data-testid="button-add-name-field"
                type="button"
                className={styles.addButton}
                onClick={addNameField}
                disabled={isSubmitting}
              >
                <Plus size={14} />
                Add Field
              </button>
            </div>

            {/* Metadata Configuration Section */}
            <div className={`${styles.section} ${styles.configSection}`}>
              <div className={styles.configHeader}>
                <h4 className={styles.sectionTitle}>Metadata Configuration</h4>
                <button 
                  data-testid="button-add-metadata-config"
                  type="button"
                  className={styles.primaryAddButton}
                  onClick={addMetadataConfig}
                  disabled={isSubmitting}
                >
                  <Plus size={14} />
                  Add Configuration
                </button>
              </div>
              
              <div className={styles.configList}>
                {formData.metadataConfig.map((config, index) => (
                  <div key={index} className={styles.configItem}>
                    <div className={styles.configItemHeader}>
                      <h5 className={styles.configItemTitle}>Configuration #{index + 1}</h5>
                      <button 
                        data-testid={`button-remove-metadata-config-${index}`}
                        type="button"
                        className={styles.removeConfigButton}
                        onClick={() => removeMetadataConfig(index)}
                        disabled={isSubmitting}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    
                    <div className={styles.configItemGrid}>
                      <div className={styles.configField}>
                        <label className={styles.configFieldLabel}>Component Type</label>
                        <select 
                          data-testid={`select-metadata-component-${index}`}
                          className={styles.configFieldSelect}
                          value={config.component}
                          onChange={(e) => updateMetadataConfig(index, 'component', e.target.value)}
                          disabled={isSubmitting}
                        >
                          <option value="input">Input</option>
                          <option value="select">Select</option>
                        </select>
                      </div>
                      
                      <div className={styles.configField}>
                        <label className={styles.configFieldLabel}>Key</label>
                        <input 
                          data-testid={`input-metadata-key-${index}`}
                          type="text" 
                          className={styles.configFieldInput}
                          placeholder="field_key"
                          value={config.key}
                          onChange={(e) => updateMetadataConfig(index, 'key', e.target.value)}
                          disabled={isSubmitting}
                        />
                      </div>
                      
                      <div className={styles.configField}>
                        <label className={styles.configFieldLabel}>Label</label>
                        <input 
                          data-testid={`input-metadata-label-${index}`}
                          type="text" 
                          className={styles.configFieldInput}
                          placeholder="Field Label"
                          value={config.label}
                          onChange={(e) => updateMetadataConfig(index, 'label', e.target.value)}
                          disabled={isSubmitting}
                        />
                      </div>
                      
                      {config.component === 'input' && (
                        <div className={styles.configField}>
                          <label className={styles.configFieldLabel}>Input Type</label>
                          <select 
                            data-testid={`select-metadata-type-${index}`}
                            className={styles.configFieldSelect}
                            value={config.type || 'text'}
                            onChange={(e) => updateMetadataConfig(index, 'type', e.target.value)}
                            disabled={isSubmitting}
                          >
                            <option value="text">Text</option>
                            <option value="number">Number</option>
                          </select>
                        </div>
                      )}

                      {config.component === 'select' && (
                        <div className={styles.configField}>
                          <label className={styles.configFieldLabel}>Select Mode</label>
                          <select 
                            data-testid={`select-metadata-mode-${index}`}
                            className={styles.configFieldSelect}
                            value={config.mode || 'options'}
                            onChange={(e) => updateMetadataConfig(index, 'mode', e.target.value)}
                            disabled={isSubmitting}
                          >
                            <option value="options">Options</option>
                            <option value="query">Query</option>
                          </select>
                        </div>
                      )}
                      
                      <div className={styles.configField}>
                        <div className={styles.configFieldCheckbox}>
                          <div className={styles.checkboxWrapper}>
                            <input 
                              data-testid={`checkbox-metadata-required-${index}`}
                              type="checkbox" 
                              className={styles.configCheckbox}
                              checked={config.required || false}
                              onChange={(e) => updateMetadataConfig(index, 'required', e.target.checked)}
                              disabled={isSubmitting}
                            />
                            <span className={styles.configCheckboxLabel}>Required</span>
                          </div>
                          
                          <div className={styles.checkboxWrapper}>
                            <input 
                              data-testid={`checkbox-metadata-readonly-${index}`}
                              type="checkbox" 
                              className={styles.configCheckbox}
                              checked={config.readOnly || false}
                              onChange={(e) => updateMetadataConfig(index, 'readOnly', e.target.checked)}
                              disabled={isSubmitting}
                            />
                            <span className={styles.configCheckboxLabel}>Read Only</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subcategories Section */}
            <div className={`${styles.section} ${styles.configSection}`}>
              <div className={styles.configHeader}>
                <h4 className={styles.sectionTitle}>Subcategories</h4>
                <button 
                  data-testid="button-add-subcategory"
                  type="button"
                  className={styles.primaryAddButton}
                  onClick={addSubcategory}
                  disabled={isSubmitting}
                >
                  <Plus size={14} />
                  Add Subcategory
                </button>
              </div>
              
              <div className={styles.configList}>
                {Object.entries(formData.subCategories).map(([key, subcat], subcatIndex) => (
                  <div key={key} className={styles.configItem}>
                    <div className={styles.configItemHeader}>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div>
                          <label className={styles.configFieldLabel}>Subcategory Key</label>
                          <input 
                            data-testid={`input-subcategory-key-${subcatIndex}`}
                            type="text" 
                            className={styles.configFieldInput}
                            placeholder="subcategory-key"
                            value={key}
                            onChange={(e) => updateSubcategoryKey(key, e.target.value)}
                            disabled={isSubmitting}
                          />
                        </div>
                        <div>
                          <label className={styles.configFieldLabel}>Label</label>
                          <input 
                            data-testid={`input-subcategory-label-${subcatIndex}`}
                            type="text" 
                            className={styles.configFieldInput}
                            placeholder="Subcategory Label"
                            value={subcat.label}
                            onChange={(e) => updateSubcategoryLabel(key, e.target.value)}
                            disabled={isSubmitting}
                          />
                        </div>
                      </div>
                      <button 
                        data-testid={`button-remove-subcategory-${subcatIndex}`}
                        type="button"
                        className={styles.removeConfigButton}
                        onClick={() => removeSubcategory(key)}
                        disabled={isSubmitting}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    
                    <div style={{ marginLeft: '1rem', borderLeft: '2px solid hsl(214.3, 13.9%, 88.6275%)', paddingLeft: '1rem' }}>
                      <h6 style={{ fontSize: '0.875rem', fontWeight: 500, color: 'hsl(215.3, 25%, 26.7%)', marginBottom: '0.5rem' }}>
                        Subcategory Configuration
                      </h6>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {subcat.config.map((config, configIndex) => (
                          <div key={configIndex} style={{ backgroundColor: 'hsl(210, 40%, 98%)', border: '1px solid hsl(214.3, 13.9%, 88.6275%)', borderRadius: '0.25rem', padding: '0.75rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.75rem' }}>
                              <input 
                                data-testid={`input-subcategory-config-key-${subcatIndex}-${configIndex}`}
                                type="text" 
                                className={styles.configFieldInput}
                                placeholder="Key"
                                value={config.key}
                                onChange={(e) => updateSubcategoryConfig(key, configIndex, 'key', e.target.value)}
                                disabled={isSubmitting}
                              />
                              <input 
                                data-testid={`input-subcategory-config-label-${subcatIndex}-${configIndex}`}
                                type="text" 
                                className={styles.configFieldInput}
                                placeholder="Label"
                                value={config.label}
                                onChange={(e) => updateSubcategoryConfig(key, configIndex, 'label', e.target.value)}
                                disabled={isSubmitting}
                              />
                              <select 
                                data-testid={`select-subcategory-config-component-${subcatIndex}-${configIndex}`}
                                className={styles.configFieldSelect}
                                value={config.component}
                                onChange={(e) => updateSubcategoryConfig(key, configIndex, 'component', e.target.value)}
                                disabled={isSubmitting}
                              >
                                <option value="input">Input</option>
                                <option value="select">Select</option>
                              </select>
                              <button 
                                data-testid={`button-remove-subcategory-config-${subcatIndex}-${configIndex}`}
                                type="button"
                                onClick={() => removeSubcategoryConfig(key, configIndex)}
                                disabled={isSubmitting}
                                style={{ padding: '0.25rem', backgroundColor: 'hsl(0, 72.2%, 50.6%)', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button 
                        data-testid={`button-add-subcategory-config-${subcatIndex}`}
                        type="button"
                        className={styles.addButton}
                        onClick={() => addSubcategoryConfig(key)}
                        disabled={isSubmitting}
                        style={{ marginTop: '0.5rem' }}
                      >
                        <Plus size={14} />
                        Add Config
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Actions */}
            <div className={styles.actions}>
              <button 
                data-testid="button-cancel"
                type="button"
                className={styles.cancelButton}
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button 
                data-testid="button-submit"
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : (isEditing ? 'Update Category' : 'Create Category')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
