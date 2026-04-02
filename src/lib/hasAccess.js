export function hasAccess(pathname, roles) {
  if (pathname.startsWith("/admin")) {
    return roles === "ADMIN";
  }

  if (pathname.startsWith("/home")) {
    return roles.includes(["USER", "ADMIN"]);
  }
  return true;
}
