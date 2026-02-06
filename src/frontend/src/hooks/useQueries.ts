import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import type { SwitchProduct, SwitchCategory, UserProfile, OrderItem, GoogleReviewConfig, MenuCategory, Order } from '../backend';

export function useGetAllProducts() {
  const { actor, isFetching } = useActor();

  return useQuery<SwitchProduct[]>({
    queryKey: ['products'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      const catalog = await actor.getSwitchCatalog();
      return catalog.products;
    },
    enabled: !!actor && !isFetching,
    staleTime: 0,
    refetchOnMount: 'always',
  });
}

export function useGetProductById(productId: number | undefined) {
  const { actor, isFetching } = useActor();

  return useQuery<SwitchProduct | null>({
    queryKey: ['product', productId],
    queryFn: async () => {
      if (!actor || productId === undefined) return null;
      const catalog = await actor.getSwitchCatalog();
      return catalog.products.find(p => p.id === productId) || null;
    },
    enabled: !!actor && !isFetching && productId !== undefined,
    staleTime: 0,
    refetchOnMount: 'always',
  });
}

export function useGetAllCategories() {
  const { actor, isFetching } = useActor();

  return useQuery<SwitchCategory[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      const catalog = await actor.getSwitchCatalog();
      return catalog.categories;
    },
    enabled: !!actor && !isFetching,
    staleTime: 0,
    refetchOnMount: 'always',
  });
}

export function useGetProductsByCategory(categoryId: number | null) {
  const { actor, isFetching } = useActor();

  return useQuery<SwitchProduct[]>({
    queryKey: ['products', 'category', categoryId],
    queryFn: async () => {
      if (!actor) return [];
      const catalog = await actor.getSwitchCatalog();
      if (categoryId === null) {
        return catalog.products;
      }
      return catalog.products.filter(p => p.categoryId === categoryId);
    },
    enabled: !!actor && !isFetching,
    staleTime: 0,
    refetchOnMount: 'always',
  });
}

export function useGetProductCatalog() {
  const { actor, isFetching } = useActor();

  return useQuery<{ categories: SwitchCategory[]; products: SwitchProduct[] }>({
    queryKey: ['productCatalog'],
    queryFn: async () => {
      if (!actor) {
        console.error('Actor not available for catalog fetch');
        return { categories: [], products: [] };
      }
      try {
        const catalog = await actor.getSwitchCatalog();
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
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    retry: 2,
  });
}

export function useGetMenu() {
  const { actor, isFetching } = useActor();

  return useQuery<MenuCategory[]>({
    queryKey: ['menu'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getMenu();
    },
    enabled: !!actor && !isFetching,
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
      if (!actor) throw new Error('Actor not available');
      return actor.getAllOrders();
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
      return actor.createSwitchProduct(name, description, price, imageUrl, available, categoryId);
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
      return actor.updateSwitchProduct(productId, name, description, price, imageUrl, available, categoryId);
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
      return actor.deleteSwitchProduct(productId);
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
      return actor.createSwitchCategory(name);
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
      return actor.updateSwitchCategory(categoryId, name);
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
      return actor.deleteSwitchCategory(categoryId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['productCatalog'] });
    },
  });
}

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();

  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching && isAuthenticated,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && isAuthenticated && query.isFetched,
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
      try {
        return await actor.isCallerAdmin();
      } catch (error) {
        console.error('Failed to check admin status:', error);
        throw error;
      }
    },
    enabled: !!actor && !isFetching,
    retry: 1,
  });
}

export function useAdminSeedTestProducts() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.adminSeedMenuItems();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['productCatalog'] });
      queryClient.invalidateQueries({ queryKey: ['menu'] });
    },
  });
}

export function useAdminSeedMenuItems() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.adminSeedMenuItems();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu'] });
    },
  });
}

export function useFetchGoogleRating() {
  const { actor, isFetching } = useActor();

  return useQuery<{
    rating: number | null;
    reviewCount: bigint | null;
    fallbackMessage: string;
  }>({
    queryKey: ['googleRating'],
    queryFn: async () => {
      if (!actor) {
        return {
          rating: null,
          reviewCount: null,
          fallbackMessage: '4.5+ rating on Google with hundreds of happy customers.',
        };
      }
      const result = await actor.fetchGoogleRating();
      return {
        rating: result.rating ?? null,
        reviewCount: result.reviewCount ?? null,
        fallbackMessage: result.fallbackMessage,
      };
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}

export function useGetGoogleReviewConfig() {
  const { actor, isFetching } = useActor();

  return useQuery<GoogleReviewConfig | null>({
    queryKey: ['googleReviewConfig'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getGoogleReviewConfig();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateGoogleReviewConfig() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      apiKey,
      placeId,
      fallbackRating,
    }: {
      apiKey: string;
      placeId: string;
      fallbackRating: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateGoogleReviewConfig(apiKey, placeId, fallbackRating);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['googleReviewConfig'] });
      queryClient.invalidateQueries({ queryKey: ['googleRating'] });
    },
  });
}
