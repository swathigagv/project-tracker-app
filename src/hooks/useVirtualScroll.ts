import { useState } from "react";

export function useVirtualScroll(itemCount: number, rowHeight: number) {
  const [scrollTop, setScrollTop] = useState(0);

  const viewportHeight = 500; // container height
  const buffer = 5;

  const totalHeight = itemCount * rowHeight;

  const startIndex = Math.max(
    0,
    Math.floor(scrollTop / rowHeight) - buffer
  );

  const endIndex = Math.min(
    itemCount,
    Math.ceil((scrollTop + viewportHeight) / rowHeight) + buffer
  );

  return {
    totalHeight,
    startIndex,
    endIndex,
    setScrollTop,
  };
}