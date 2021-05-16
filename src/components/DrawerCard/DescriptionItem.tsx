import { useEffect, useState } from "react";

export const DescriptionItem = ({ title, content, type }: any) => {
  const [resultContent, setResultContent] = useState(null);

  useEffect(() => {
    if (type === "array") {
      const result = content.join(", ");
      setResultContent(result);
    }
  }, [type, content]);

  return (
    <div className="drawer-card__description-item">
      <p className="drawer-card__description-item-label">{title}:</p>
      <p className="drawer-card__description-item-content">
        {resultContent ?? content}
      </p>
    </div>
  );
};
