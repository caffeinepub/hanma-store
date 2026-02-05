import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Product, Category, Order, UserProfile, OrderItem } from '../backend';

export function useGetAllProducts() {
  const { actor, isFetching } = useActor();

  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAllProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetProductById(productId: number | undefined) {
  const { actor, isFetching } = useActor();

  return useQuery<Product | null>({
    queryKey: ['product', productId],
    queryFn: async () => {
      if (!actor || productId === undefined) return null;
      return actor.getProductById(productId);
    },
    enabled: !!actor && !isFetching && productId !== undefined,
  });
}

export function useGetAllCategories() {
  const { actor, isFetching } = useActor();

  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAllCategories();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetProductsByCategory(categoryId: number | null) {
  const { actor, isFetching } = useActor();

  return useQuery<Product[]>({
    queryKey: ['products', 'category', categoryId],
    queryFn: async () => {
      if (!actor) return [];
      if (categoryId === null) {
        return actor.listAllProducts();
      }
      return actor.listProductsByCategory(categoryId);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetProductCatalog() {
  const { actor, isFetching } = useActor();

  return useQuery<{ categories: Category[]; products: Product[] }>({
    queryKey: ['productCatalog'],
    queryFn: async () => {
      if (!actor) {
        console.error('Actor not available for catalog fetch');
        return { categories: [], products: [] };
      }
      try {
        const catalog = await actor.getProductCatalog();
        console.log('Product catalog loaded successfully:', {
          categoriesCount: catalog.categories.length,
          productsCount: catalog.products.length,
        });
        return catalog;
      } catch (error) {
        console.error('Failed to fetch product catalog:', error);
        throw error;
      }
    },
    enabled: !!actor && !isFetching,
    retry: 2,
  });
}

export function useCreateOrder() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      items,
      totalAmount,
      customerName,
      customerEmail,
      customerAddress,
    }: {
      items: OrderItem[];
      totalAmount: number;
      customerName: string;
      customerEmail: string;
      customerAddress: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createOrder(items, totalAmount, customerName, customerEmail, customerAddress);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}

export function useGetAllOrders() {
  const { actor, isFetching } = useActor();

  return useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAllOrders();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetOrderById(orderId: number | undefined) {
  const { actor, isFetching } = useActor();

  return useQuery<Order | null>({
    queryKey: ['order', orderId],
    queryFn: async () => {
      if (!actor || orderId === undefined) return null;
      return actor.getOrderById(orderId);
    },
    enabled: !!actor && !isFetching && orderId !== undefined,
  });
}

export function useCreateProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      description,
      price,
      imageUrl,
      available,
      categoryId,
    }: {
      name: string;
      description: string;
      price: number;
      imageUrl: string;
      available: boolean;
      categoryId: number | null;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createProduct(name, description, price, imageUrl, available, categoryId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['productCatalog'] });
    },
  });
}

export function useUpdateProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      productId,
      name,
      description,
      price,
      imageUrl,
      available,
      categoryId,
    }: {
      productId: number;
      name: string;
      description: string;
      price: number;
      imageUrl: string;
      available: boolean;
      categoryId: number | null;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateProduct(productId, name, description, price, imageUrl, available, categoryId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['productCatalog'] });
    },
  });
}

export function useDeleteProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: number) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteProduct(productId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['productCatalog'] });
    },
  });
}

export function useCreateCategory() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (name: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createCategory(name);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['productCatalog'] });
    },
  });
}

export function useUpdateCategory() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ categoryId, name }: { categoryId: number; name: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateCategory(categoryId, name);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['productCatalog'] });
    },
  });
}

export function useDeleteCategory() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (categoryId: number) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteCategory(categoryId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['productCatalog'] });
    },
  });
}

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}
