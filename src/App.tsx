import * as React from 'react';
import { InfiniteScroll } from './InfiniteScroll';
import './style.css';

export interface ListItemProps {
  title: string;
}

interface ListProps {
  list: ListItemProps[];
}

export default function App() {
  const [value, setValue] = React.useState<string>('');
  const [list, setList] = React.useState<ListItemProps[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const getData = (query: string, pageNumber: number) => {
    fetch(
      'https://openlibrary.org/search.json?' +
        new URLSearchParams({ q: query, page: pageNumber.toString() }),
      {
        method: 'GET',
      }
    ).then(async (data) => {
      try {
        const listData = await data.json();
        console.log(listData);
        setList([...list, ...listData.docs]);
      } catch (err) {
        console.log(err);
      }
    });
  };

  const renderItem = React.useCallback((props, ref) => {
    return <div ref={ref}>{props?.title}</div>;
  }, []) ;

  return (
    <div>
      <h1>Infinite Scroll</h1>
      <div>
        <input type="text" onChange={handleChange} value={value} />
      </div>
      <div>
        <InfiniteScroll
          query={value}
          next={(query: string, page: number) => getData(query, page)}
          listItem={renderItem}
          data={list}
        >
          {/* <ul>
            {list.map((item) => (
              <li>
                <p>{item.title}</p>
              </li>
            ))}
          </ul> */}
        </InfiniteScroll>
        {(props, ref) => renderItem(props, ref)}
      </div>
    </div>
  );
}
