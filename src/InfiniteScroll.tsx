interface InfiniteScrollProps {
  list: any[];
  next: () => void;
  hasMore: boolean;
  children: any;
}
const InfiniteScroll = ({
  list,
  hasMore = true,
  next,
  children,
}: InfiniteScrollProps) => {
  const fetchMore = () => {
    if (hasMore) {
      next();
    }
  };
  return (
    <>
      {children}
      <button onClick={fetchMore}>Fetch more</button>
      {!hasMore && <p>No more items</p>}
    </>
  );
};
//https://openlibrary.org/search.json?q=spy&page=1
