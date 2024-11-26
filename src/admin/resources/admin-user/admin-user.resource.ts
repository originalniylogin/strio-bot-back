import { AdminUser } from 'admin/modules/admin-user/admin-user.model';

import type { ResourceWithOptions } from 'admin/types';

export const createAdminUserResource = ({
  features,
}: {
  features: ResourceWithOptions['features'];
}): ResourceWithOptions => ({
  resource: AdminUser,
  options: {
    titleProperty: 'email',
    properties: {
      email: {
        isRequired: true,
        isTitle: true,
      },
      encryptedPassword: {
        isVisible: false,
      },
      password: {
        type: 'string',
      },
    },
  },
  features,
});
