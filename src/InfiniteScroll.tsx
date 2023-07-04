import * as React from 'react';
interface InfiniteScrollProps {
  query: string;
  next: (query: string, pageNumber: number) => void;
  hasMore?: boolean;
  children: any;
  listItem: any;
  data: any[];
}
export const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  hasMore = true,
  next,
  children,
  query,
  listItem,
  data,
}: InfiniteScrollProps) => {
  const pageNumber = React.useRef(1);
  const observer = React.useRef(null);
  const lastItemRef = React.useCallback((node) => {
    if (observer.current) return observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        pageNumber.current += 1;
        fetchMore();
      }
      if (node) observer.current.observe(node);
    });
  }, []);
  const fetchMore = () => {
    if (hasMore) {
      next(query, pageNumber.current);
    }
  };

  React.useEffect(() => {
    if (query.trim() !== '') next(query, pageNumber.current);
  }, [query]);

  const renderList = () => {
    return data.map((el, indx) => {
      if (indx === data.length - 1) {
        return listItem({ title: el.title }, lastItemRef);
      } else {
        return listItem(el, null);
      }
    });
  };

  return (
    <>
      {renderList()}
      {!hasMore && <p>No more items</p>}
    </>
  );
};
