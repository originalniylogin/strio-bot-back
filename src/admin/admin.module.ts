import { Module } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { isNil } from 'lodash';
import { AppConfigService } from 'modules/shared/services/app-config.service';

import AdminRuLocale from './locales/admin.ru.json';
import { AdminUserAdminModule, UserAdminModule } from './modules';
import { AdminUser } from './modules/admin-user/admin-user.model';
import { createAdminUserResource, createMessageResource, createUserResource } from './resources';

@Module({
  imports: [
    Promise.all([
      import('adminjs'),
      import('@adminjs/nestjs'),
      import('@adminjs/passwords'),
      import('@adminjs/relations'),
    ]).then(
      ([
        { ComponentLoader },
        { AdminModule: AdminJsModule },
        passwordsFeature,
        { owningRelationSettingsFeature, RelationType },
      ]) => {
        const componentLoader = new ComponentLoader();
        return AdminJsModule.createAdminAsync({
          imports: [UserAdminModule, AdminUserAdminModule],
          inject: [AppConfigService],
          useFactory: (appConfigService: AppConfigService) => ({
            adminJsOptions: {
              rootPath: '/admin',
              componentLoader,
              resources: [
                createAdminUserResource({
                  features: [
                    passwordsFeature.default({
                      componentLoader,
                      properties: {
                        encryptedPassword: 'encryptedPassword',
                        password: 'password',
                      },
                      hash: async (str: string) => await bcrypt.hash(str, 10),
                    }),
                  ],
                }),
                createUserResource({
                  features: [
                    owningRelationSettingsFeature({
                      componentLoader,
                      licenseKey: appConfigService.adminJsLicenseKey,
                      relations: {
                        balances: {
                          type: RelationType.OneToMany,
                          target: {
                            joinKey: 'userId',
                            resourceId: 'messages',
                          },
                        },
                      },
                    }),
                  ],
                }),
                createMessageResource({
                  features: [],
                  componentLoader,
                }),
              ],
              locale: {
                language: 'ru',
                availableLanguages: ['ru'],
                translations: { ru: AdminRuLocale },
              },
            },
            auth: {
              authenticate: async (email: string, password: string) => {
                const user = await AdminUser.findOne({ where: { email } });
                if (isNil(user)) return null;

                const matched = await bcrypt.compare(password, user.encryptedPassword);
                if (!matched) return null;

                return await Promise.resolve({
                  email,
                });
              },
              cookieName: 'adminjs',
              cookiePassword: 'secret',
            },
            sessionOptions: {
              resave: true,
              saveUninitialized: true,
              secret: 'secret',
            },
          }),
        });
      }
    ),
  ],
})
export class AdminModule {}
