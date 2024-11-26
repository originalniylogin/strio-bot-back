import { User } from 'modules/user/user.model';

import type { BulkActionResponse, ResourceWithOptions } from 'admin/types';

export const createUserResource = ({
  features,
}: {
  features: ResourceWithOptions['features'];
}): ResourceWithOptions => ({
  resource: User,
  options: {
    titleProperty: 'telegramId',
    listProperties: ['telegramId', 'telegramUsername'],
    properties: {
      telegramUsername: {
        isTitle: true,
      },
    },
    actions: {
      findRelation: {
        after: (response) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- adminjs is poorely typed. nothing is documented. i hate this fucking lib
          const records = (response as BulkActionResponse).records.map((record) => ({
            ...record,
            params: {
              ...record.params,
              content: 12,
            } satisfies { content: number },
          }));
          return { ...response, records } satisfies BulkActionResponse;
        },
      },
    },
  },
  features,
});
