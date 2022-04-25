export const getInitials = user => {
  if (user && user.first_name && user.last_name) {
    return `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`;
  }
  return user?.email?.substring(0, 2).toUpperCase();
};

export const transformLabel = label => label.toUpperCase().replace(/[-_]/g, " ");
