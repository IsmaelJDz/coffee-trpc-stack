import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { ACCESS_DENIED } from "@/constants/common";
import { SUPER_ADMIN } from "@/constants/roles";
import { useUser } from "@/hooks/useAuth";

type RolePermissionProps = {
  roles?: string[];
  excludeRoles?: string[];
  superAdminNotAllowed?: boolean;
  redirect?: string;
};

const useRolePermission = ({
  roles,
  excludeRoles = [],
  superAdminNotAllowed = false,
  redirect
}: RolePermissionProps) => {
  const router = useRouter();
  const [allowAccess, setAllowAccess] = useState(false);
  const user = useUser();
  const rolesName = user?.rolesName ?? [];

  useEffect(() => {
    if (!user) setAllowAccess(false);
    validateAccess();
  }, [user]);

  const validateAccess = () => {
    let allowAccess = false;
    const isSuperAdmin = rolesName.includes(SUPER_ADMIN);

    if (!isSuperAdmin && Array.isArray(roles)) {
      roles.forEach(role => {
        if (rolesName.includes(role)) {
          allowAccess = true;
        }
      });
    } else if (isSuperAdmin) {
      allowAccess = !superAdminNotAllowed;
    } else {
      allowAccess = true;
    }

    excludeRoles?.forEach(role => {
      if (rolesName.includes(role)) {
        allowAccess = false;
      }
    });

    if (!allowAccess && redirect) {
      router.replace(redirect);
      toast.error(ACCESS_DENIED, {
        duration: 5000
      });
      return;
    }

    setAllowAccess(allowAccess);
  };

  return { allowAccess };
};

export default useRolePermission;
