import React from "react";

import "./footer.css";

export default function Footer(props) {
  let today = new Date();
  let year = today.getFullYear();
  let footerText = `© ${year}, Shlomi Benshlomo (Onca, Inc.)`
  return (
    <footer>
      <p>{footerText}</p>
    </footer>
  );
}
