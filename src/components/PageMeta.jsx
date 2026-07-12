import { useEffect } from "react";


export default function PageMeta({ title }) {
  useEffect(() => {
    document.title = title
      ? `${title} QuantZen™`
      : "QuantZen™ Post Quantum Protection for API Driven Infrastructure";
  }, [title]);

  return null;
}
