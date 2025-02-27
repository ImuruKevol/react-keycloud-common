import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft, faAngleLeft, faAngleRight, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

const Pagination = ({ current = 1, start = 1, end = 1, maxlength = 10, onPageMove }) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const newList = [];
    for (let i = 0; i < maxlength; i++) {
      if (start + i > end) break;
      newList.push(start + i);
    }
    setList(newList);
  }, [start, end, maxlength]);

  const move = (page) => {
    if (page >= start && page <= end) {
      onPageMove(page);
    }
  };

  return (
    <div className="flex justify-center">
      {/* Double Left */}
      <button
        className={`rounded-full text-xs w-6 h-6 mx-1 bg-white text-gray-500 flex items-center justify-center ${
          (current - 1) / maxlength < 1 ? 'opacity-50' : 'hover:bg-gray-100'
        }`}
        onClick={() => move(Math.floor((current - 1) / maxlength) * maxlength - (maxlength - 1))}
        disabled={(current - 1) / maxlength < 1}
      >
        <FontAwesomeIcon icon={faAngleDoubleLeft} />
      </button>

      {/* Left */}
      <button
        className={`rounded-full text-xs w-6 h-6 mx-1 bg-white text-gray-500 flex items-center justify-center ${
          current === 1 ? 'opacity-50' : 'hover:bg-gray-100'
        }`}
        onClick={() => move(current - 1)}
        disabled={current === 1}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>

      {/* Page Numbers */}
      {list.map((page) => (
        <button
          key={page}
          className={`rounded-full text-xs w-6 h-6 mx-1 ${
            page === current
              ? 'bg-blue-200 text-black'
              : 'bg-white text-gray-500 hover:bg-gray-100'
          } flex items-center justify-center`}
          onClick={() => {
            if (page === current) return;
            move(page);
          }}
        >
          {page}
        </button>
      ))}

      {/* Right */}
      <button
        className={`rounded-full text-xs w-6 h-6 mx-1 bg-white text-gray-500 flex items-center justify-center ${
          current + 1 > end ? 'opacity-50' : 'hover:bg-gray-100'
        }`}
        onClick={() => move(current + 1)}
        disabled={current + 1 > end}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>

      {/* Double Right */}
      <button
        className={`rounded-full text-xs w-6 h-6 mx-1 bg-white text-gray-500 flex items-center justify-center ${
          Math.ceil(current / maxlength) * maxlength + 1 > end
            ? 'opacity-50'
            : 'hover:bg-gray-100'
        }`}
        onClick={() => move(Math.ceil(current / maxlength) * maxlength + 1)}
        disabled={Math.ceil(current / maxlength) * maxlength + 1 > end}
      >
        <FontAwesomeIcon icon={faAngleDoubleRight} />
      </button>
    </div>
  );
};

export default Pagination;
