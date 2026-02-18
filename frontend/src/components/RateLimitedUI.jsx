import React from "react";
import { AlertTriangle } from "lucide-react";

const RateLimitedUI = () => {
  return (
    <div className="rate-limit">
      <div className="rate-card">
        <AlertTriangle className="rate-icon" size={40} />
        <h3>Rate Limit Reached</h3>
        <p>Please wait a few seconds before trying again.</p>
      </div>
    </div>
  );
};

export default RateLimitedUI;
