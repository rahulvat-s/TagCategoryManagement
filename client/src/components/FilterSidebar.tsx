import { useState } from 'react';
import { Search } from 'lucide-react';
import { FilterState } from '../interfaces';
import styles from '../styles/FilterSidebar.module.scss';

interface FilterSidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  categoryCount: number;
}

export default function FilterSidebar({ filters, onFiltersChange, categoryCount }: FilterSidebarProps) {
  const handleFilterChange = (key: keyof FilterState, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarCard}>
        <h3 className={styles.title}>Filters</h3>
        
        <div className={styles.filterGroup}>
          <label className={styles.label}>Status</label>
          <select 
            data-testid="filter-status"
            className={styles.select}
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.label}>Group</label>
          <select 
            data-testid="filter-group"
            className={styles.select}
            value={filters.group}
            onChange={(e) => handleFilterChange('group', e.target.value)}
          >
            <option value="">All Groups</option>
            <option value="ball">Ball</option>
            <option value="player">Player</option>
            <option value="game">Game</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.label}>Precision Type</label>
          <select 
            data-testid="filter-precision-type"
            className={styles.select}
            value={filters.precisionType}
            onChange={(e) => handleFilterChange('precisionType', e.target.value)}
          >
            <option value="">All Types</option>
            <option value="LONG">Long</option>
            <option value="SHORT">Short</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.label}>Search</label>
          <div className={styles.searchContainer}>
            <input 
              data-testid="filter-search"
              type="text" 
              placeholder="Search categories..."
              className={styles.searchInput}
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
            <Search className={styles.searchIcon} size={16} />
          </div>
        </div>
      </div>
    </aside>
  );
}
