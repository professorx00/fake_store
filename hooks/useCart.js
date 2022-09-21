function useCart(id) {
  const { data, error } = useSWR(id ? `/api/cart/${id}` : null, fetcher);
}
