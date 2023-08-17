import { useRef } from 'react';

interface Options {
  root?: HTMLElement | null;
  rootMargin?: string;
  threshold?: number;
}

/** 관찰중인 모든 entry에 대하여 동일한 callback 함수를 실행하도록 하는 observer를 생성합니다. */
export const useIntersectionObserver = (
  callback: (entry?: IntersectionObserverEntry) => void,
  options: Options
) => {
  const observer = useRef(
    new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) callback();
      }),
        options;
    })
  );
  return observer;
};
