import { useEffect, useRef, useState } from "react";

function useInteraction() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInView(true);
        } else {
          setInView(false);
        }
      });
    });
    observer.observe(ref.current as Element);
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current as Element);
      }
    };
  }, []);
  return { ref, inView };
}

export default useInteraction;
