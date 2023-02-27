import React from "react";
function Navlink({
  children,
  link,
}: {
  children: React.ReactNode;
  link: string;
}) {
  return <a href={link}>{children}</a>;
}
export default Navlink;
