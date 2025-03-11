import React, { useEffect } from "react";

const SnipcartProvider: React.FC = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.snipcart.com/themes/v3.0.30/default/snipcart.js";
    script.async = true;
    document.body.appendChild(script);

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdn.snipcart.com/themes/v3.0.30/default/snipcart.css";
    document.head.appendChild(link);
  }, []);

  return (
    <div hidden id="snipcart" data-api-key="NjNmMzljZWEtMDNkNC00ZjdmLTg2OTYtZWRiY2RkYzE4YmQ0NjM4NzQyMTEyMzcwODIxNjUw"></div>
  );
};

export default SnipcartProvider;
