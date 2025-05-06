
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { productService } from '@/services/productService';
import { categoryService } from '@/services/categoryService';
import { Product, Category } from '@/schema/database';

export const useAdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const { toast } = useToast();

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [productsData, categoriesData] = await Promise.all([
        productService.getAll(),
        categoryService.getAll()
      ]);
      
      setProducts(productsData);
      setCategories(categoriesData);
      setError(null);
    } catch (err: any) {
      console.error("Failed to fetch data:", err);
      setError(err);
      toast({
        title: "Error",
        description: "Failed to load products and categories. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setProductDialogOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductDialogOpen(true);
  };

  const handleAddCategory = () => {
    setEditingCategory(null);
    setCategoryDialogOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setCategoryDialogOpen(true);
  };

  const saveProduct = async (productData: any) => {
    try {
      // Update productData to handle the "none" value for categoryId
      const dataToSave = {
        ...productData,
        categoryId: productData.categoryId === "none" ? null : productData.categoryId
      };

      if (editingProduct) {
        // Update existing product
        const updated = await productService.update(editingProduct.id, dataToSave);
        setProducts(products.map(p => p.id === updated.id ? updated : p));
        toast({ 
          title: "Success", 
          description: "Product updated successfully" 
        });
      } else {
        // Create new product
        const created = await productService.create(dataToSave);
        setProducts([...products, created]);
        toast({ 
          title: "Success", 
          description: "Product created successfully" 
        });
      }
      setProductDialogOpen(false);
    } catch (err) {
      console.error("Failed to save product:", err);
      toast({ 
        title: "Error", 
        description: "Failed to save product. Please try again.", 
        variant: "destructive" 
      });
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      await productService.delete(productId);
      setProducts(products.filter(p => p.id !== productId));
      toast({ 
        title: "Success", 
        description: "Product deleted successfully" 
      });
    } catch (err) {
      console.error("Failed to delete product:", err);
      toast({ 
        title: "Error", 
        description: "Failed to delete product. Please try again.", 
        variant: "destructive" 
      });
    }
  };

  const saveCategory = async (categoryData: any) => {
    try {
      if (editingCategory) {
        // Update existing category
        const updated = await categoryService.update(editingCategory.id, categoryData);
        setCategories(categories.map(c => c.id === updated.id ? updated : c));
        toast({ 
          title: "Success", 
          description: "Category updated successfully" 
        });
      } else {
        // Create new category
        const created = await categoryService.create(categoryData);
        setCategories([...categories, created]);
        toast({ 
          title: "Success", 
          description: "Category created successfully" 
        });
      }
      setCategoryDialogOpen(false);
    } catch (err) {
      console.error("Failed to save category:", err);
      toast({ 
        title: "Error", 
        description: "Failed to save category. Please try again.", 
        variant: "destructive" 
      });
    }
  };

  const deleteCategory = async (categoryId: string) => {
    try {
      await categoryService.delete(categoryId);
      setCategories(categories.filter(c => c.id !== categoryId));
      toast({ 
        title: "Success", 
        description: "Category deleted successfully" 
      });
    } catch (err) {
      console.error("Failed to delete category:", err);
      toast({ 
        title: "Error", 
        description: "Failed to delete category. Please try again.", 
        variant: "destructive" 
      });
    }
  };

  // Filter products based on search term and active category
  const filteredProducts = products.filter(product => {
    const productName = product.name?.toLowerCase() || '';
    const matchesSearch = productName.includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || 
                           (product.categoryId && product.categoryId.toString().toLowerCase() === activeCategory);
    
    return matchesSearch && matchesCategory;
  });

  return {
    products: filteredProducts,
    categories,
    isLoading,
    error,
    productDialogOpen,
    categoryDialogOpen,
    setProductDialogOpen,
    setCategoryDialogOpen,
    editingProduct,
    editingCategory,
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
    handleAddProduct,
    handleEditProduct,
    handleAddCategory,
    handleEditCategory,
    saveProduct,
    deleteProduct,
    saveCategory,
    deleteCategory,
    refreshData: loadData,
  };
};
