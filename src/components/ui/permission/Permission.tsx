import { FC } from "react";

import useRolePermission from "@/hooks/useRolePermission";

type PermissionProps = {
  roles?: string[];
  excludeRoles?: string[];
  superAdminNotAllowed?: boolean;
  children: React.ReactNode | React.ReactNode[];
};

export const Permission: FC<PermissionProps> = ({ children, ...rest }) =>
  useRolePermission({ ...rest }).allowAccess ? <>{children}</> : null;
