import { Message } from 'modules/message';

import type { ComponentLoader, ResourceWithOptions } from 'admin/types';

export const createMessageResource = ({
  features,
  componentLoader,
}: {
  features: ResourceWithOptions['features'];
  componentLoader: ComponentLoader;
}): ResourceWithOptions => {
  return {
    resource: Message,
    options: {
      listProperties: ['createdAt', 'textContent', 'voiceLink'],
      actions: {
        new: {
          isAccessible: false,
        },
        show: {
          isAccessible: false,
        },
        delete: {
          isAccessible: false,
        },
        list: {
          isAccessible: false,
        },
        search: {
          isAccessible: false,
        },
      },
      properties: {
        textContent: {
          type: 'textarea',
          components: {
            list: componentLoader.add('MessageText', './components/message-text.component'),
          },
        },
        voiceLink: {
          type: 'string',
          components: {
            list: componentLoader.add('MessageLink', './components/message-link.component'),
          },
        },
      },
    },
    features,
  };
};
