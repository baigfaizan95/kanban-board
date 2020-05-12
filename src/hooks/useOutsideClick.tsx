import { useEffect, RefObject, useCallback } from 'react';

const useOutsideClick = (ref: RefObject<any>, callback: Function) => {
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (ref.current && ref.current.contains(e.target)) {
        // inside click
        return;
      }
      // outside click
      callback();
    },
    [callback, ref]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback, handleClickOutside]);
};

export default useOutsideClick;
