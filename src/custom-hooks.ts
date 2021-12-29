import React from "react";

export const useQueryParams = () => {
  const { search, hash } = window.location;

  return React.useMemo(
    () => new URLSearchParams(hash ? `?${hash.split("?")[1]}` : search),
    [search, hash]
  );
};
