import { useState, useMemo } from 'react';
import { Plus, FolderOpen } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TagCategory } from '@shared/schema';
import TagCategoryCard from '../components/tag-category-card';
import TagCategoryForm from '../components/tag-category-form';
import DeleteConfirmationDialog from '../components/delete-confirmation-dialog';
import FilterSidebar from '../components/filter-sidebar';
import styles from '../styles/TagCategories.module.scss';
import { useToast } from '../hooks/use-toast';
import { apiRequest } from '../lib/queryClient';

interface FilterState {
  status: string;
  group: string;
  precisionType: string;
  search: string;
}

export default function TagCategories() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<TagCategory | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    status: '',
    group: '',
    precisionType: '',
    search: ''
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: tagCategories = [], isLoading } = useQuery({
    queryKey: ['/api/tag-categories'],
    queryFn: () => fetch('/api/tag-categories').then(res => res.json()) as Promise<TagCategory[]>
  });

  const createCategoryMutation = useMutation({
    mutationFn: (categoryData: Omit<TagCategory, 'id' | 'createdAt' | 'lastUpdatedAt'>) =>
      apiRequest('POST', '/api/tag-categories', categoryData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/tag-categories'] });
      toast({
        title: "Category Created",
        description: "Tag category has been created successfully.",
      });
      setIsFormOpen(false);
      setSelectedCategory(null);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const updateCategoryMutation = useMutation({
    mutationFn: ({ id, ...data }: { id: string } & Partial<TagCategory>) =>
      apiRequest('PUT', `/api/tag-categories/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/tag-categories'] });
      toast({
        title: "Category Updated",
        description: "Tag category has been updated successfully.",
      });
      setIsFormOpen(false);
      setSelectedCategory(null);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: (id: string) => apiRequest('DELETE', `/api/tag-categories/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/tag-categories'] });
      toast({
        title: "Category Deleted",
        description: "Tag category has been deleted successfully.",
        variant: "destructive",
      });
      setIsDeleteModalOpen(false);
      setSelectedCategory(null);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const filteredCategories = useMemo(() => {
    return tagCategories.filter(category => {
      if (filters.status && category.status !== filters.status) return false;
      if (filters.group && category.group.value !== filters.group) return false;
      if (filters.precisionType && category.precisionType !== filters.precisionType) return false;
      if (filters.search && !category.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
      
      return true;
    });
  }, [tagCategories, filters]);

  const handleCreateCategory = () => {
    setSelectedCategory(null);
    setIsFormOpen(true);
  };

  const handleEditCategory = (category: TagCategory) => {
    setSelectedCategory(category);
    setIsFormOpen(true);
  };

  const handleDeleteCategory = (category: TagCategory) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  const handleFormSubmit = (categoryData: Omit<TagCategory, 'id' | 'createdAt' | 'lastUpdatedAt'>) => {
    if (selectedCategory) {
      // Update existing category
      updateCategoryMutation.mutate({ id: selectedCategory.id, ...categoryData });
    } else {
      // Create new category
      createCategoryMutation.mutate(categoryData);
    }
  };

  const handleDeleteConfirm = () => {
    if (selectedCategory) {
      deleteCategoryMutation.mutate(selectedCategory.id);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedCategory(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedCategory(null);
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerInner}>
            <div className={styles.titleSection}>
              <h1 className={styles.title} data-testid="text-page-title">Tag Category Management</h1>
              <span className={styles.badge} data-testid="text-category-count">
                {filteredCategories.length} Categories
              </span>
            </div>
            <button 
              data-testid="button-add-category"
              className={styles.addButton}
              onClick={handleCreateCategory}
            >
              <Plus size={16} />
              Add Tag Category
            </button>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.content}>
          <FilterSidebar
            filters={filters}
            onFiltersChange={setFilters}
            categoryCount={filteredCategories.length}
          />
          
          <div className={styles.cardsContainer}>
            {filteredCategories.length === 0 ? (
              <div className={styles.emptyState}>
                <FolderOpen className={styles.emptyIcon} />
                <h3 className={styles.emptyTitle} data-testid="text-empty-title">No tag categories found</h3>
                <p className={styles.emptyText} data-testid="text-empty-description">
                  {filters.search || filters.status || filters.group || filters.precisionType
                    ? 'Try adjusting your filters to see more categories.'
                    : 'Get started by creating your first tag category.'}
                </p>
                {!filters.search && !filters.status && !filters.group && !filters.precisionType && (
                  <button 
                    data-testid="button-create-first"
                    className={styles.addButton}
                    onClick={handleCreateCategory}
                  >
                    <Plus size={16} />
                    Create Tag Category
                  </button>
                )}
              </div>
            ) : (
              filteredCategories.map(category => (
                <TagCategoryCard
                  key={category.id}
                  category={category}
                  onEdit={handleEditCategory}
                  onDelete={handleDeleteCategory}
                />
              ))
            )}
          </div>
        </div>
      </main>

      <TagCategoryForm
        isOpen={isFormOpen}
        category={selectedCategory}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
        isSubmitting={createCategoryMutation.isPending || updateCategoryMutation.isPending}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteModalOpen}
        category={selectedCategory}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteConfirm}
        isDeleting={deleteCategoryMutation.isPending}
      />
    </div>
  );
}
