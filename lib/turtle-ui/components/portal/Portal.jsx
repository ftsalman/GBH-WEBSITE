import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

export const Portal = ({ children, containerId = "portal" }) => {
  const [portalElement, setPortalElement] = useState(null);

  useEffect(() => {
    let portalElement = document.getElementById(containerId);
    let systemGenerated = false;

    if (!portalElement) {
      systemGenerated = true;
      portalElement = document.createElement("div");
      portalElement.id = containerId;
      document.body.appendChild(portalElement);
    }

    setPortalElement(portalElement);

    return () => {
      if (systemGenerated) {
        document.body.removeChild(portalElement);
      }
    };
  }, [containerId]);

  if (!portalElement) return null;

  return ReactDOM.createPortal(children, portalElement);
};
