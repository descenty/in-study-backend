import { MiddlewareConsumer, Module } from '@nestjs/common';
import { CourseModule } from './course/course.module';
import { AuthModule, jwtModule } from './auth/auth.module';
import { JwtAuthMiddleware } from './auth/auth-middleware';
import { AdminModule } from '@adminjs/nestjs';
import { DMMFClass } from '@prisma/client/runtime';
import { Resource, Database } from '@adminjs/prisma';
import AdminJS from 'adminjs';
import { PrismaService } from './prisma.service';
import { ArticleModule } from './article/article.module';
import { ArticleService } from './article/article.service';
import { ArticlesModule } from './articles/articles.module';
import { ArticleModule } from './article/article.module';

AdminJS.registerAdapter({
  Resource,
  Database,
});

@Module({
  imports: [
    AdminModule.createAdminAsync({
      useFactory: () => {
        const prisma = new PrismaService();
        // `_baseDmmf` contains necessary Model metadata but it is a private method
        // so it isn't included in PrismaClient type
        const dmmf = (prisma as any)._baseDmmf as DMMFClass;
        return {
          adminJsOptions: {
            // путь к админке
            rootPath: '/admin',
            // в этом списке должны быть указаны все модели/таблицы БД,
            // доступные для редактирования
            resources: [
              {
                resource: { model: dmmf.modelMap.Article, client: prisma },
                options: {
                  properties: {
                    content: {
                      type: 'richtext',
                    },
                  },
                },
              },
              {
                resource: { model: dmmf.modelMap.User, client: prisma },
              },
              {
                resource: { model: dmmf.modelMap.Course, client: prisma },
              },
              {
                resource: { model: dmmf.modelMap.Lesson, client: prisma },
              },
              {
                resource: { model: dmmf.modelMap.Step, client: prisma },
              },
            ],
            locale: {
              language: 'ru',
              translations: {
                actions: {
                  new: 'Создать новый',
                  edit: 'Редактировать',
                  show: 'Показать',
                  delete: 'Удалить',
                  bulkDelete: 'Удалить все',
                  list: 'Список',
                },
                buttons: {
                  save: 'Сохранить',
                  addNewItem: 'Добавить новый элемент',
                  filter: 'Фильтр',
                  applyChanges: 'Применить изменения',
                  resetFilter: 'Очистить фильтры',
                  confirmRemovalMany: 'Подтвердить удаление {{count}} записи',
                  confirmRemovalMany_plural:
                    'Подтвердить удаление {{count}} записей',
                  logout: 'Выйти',
                  login: 'Войти',
                  seeTheDocumentation: 'Смотрите: <1>документация</1>',
                  createFirstRecord: 'Создать первую запись',
                  contactUs: 'Связаться с нами',
                },
                labels: {
                  navigation: 'Навигация',
                  pages: 'Страницы',
                  selectedRecords: 'Выбран ({{selected}})',
                  filters: 'Фильтры',
                  adminVersion: 'Версия AdminJS: {{version}}',
                  appVersion: 'Версия приложения: {{version}}',
                  loginWelcome: 'Добро пожаловать',
                  dashboard: 'Панель приборов',

                  Admin: 'Админы',
                },
                properties: {
                  length: 'Длина',
                  from: 'Вид',
                  to: 'К',
                  email: 'Электронная почта',
                  password: 'Пароль',
                },
                messages: {
                  successfullyBulkDeleted: 'Успешно удалена {{count}} запись',
                  successfullyBulkDeleted_plural:
                    'Успешно удалены записи {{count}}',
                  successfullyDeleted: 'Успешно удалена выбранная запись',
                  successfullyUpdated: 'Успешно обновлена ​​выбранная запись',
                  thereWereValidationErrors:
                    'Есть ошибки валидации – просмотрите их ниже',
                  forbiddenError:
                    'Вы не можете выполнять действия {{actionName}} на {{resourceId}}',
                  anyForbiddenError: 'Вы не можете выполнить заданное действие',
                  successfullyCreated: 'Успешно создана новая запись',
                  bulkDeleteError:
                    'При удалении записей произошла ошибка. Перейдите к консоли для просмотра дополнительной информации',
                  errorFetchingRecords:
                    'При получении записей произошла ошибка. Перейдите к консоли для просмотра дополнительной информации',
                  errorFetchingRecord:
                    'При получении записи произошла ошибка. Перейдите к консоли для просмотра дополнительной информации',
                  noRecordsSelected: 'Вы не выбрали ни одной записи',
                  theseRecordsWillBeRemoved: 'Следующая запись будет удалена',
                  theseRecordsWillBeRemoved_plural:
                    'Следующие записи будут удалены',
                  pickSomeFirstToRemove:
                    'Чтобы удалить записи, сначала их нужно выбрать',
                  error404Resource:
                    'Ресурс с указанным ID: {{resourceId}} не найден',
                  error404Action:
                    'Ресурс с указанным ID: {{resourceId}} не имеет действия с названием: {{actionName}} или Вы не имеете права использовать его!',
                  error404Record:
                    'Ресурс с указанным ID: {{resourceId}} не имеет записи с ID: {{recordId}} или Вы не имеете права использовать его!',
                  seeConsoleForMore:
                    'Смотрите консоль разработки, чтобы узнать больше...',
                  noActionComponent:
                    'Вы должны имплементировать ActionComponent для своего действия',
                  noRecordsInResource: 'В этом ресурсе нет записей',
                  noRecords: 'Нет записей',
                  confirmDelete:
                    'Вы действительно хотите удалить этот элемент?',
                  welcomeOnBoard_title: 'Добро пожаловать на борт!',
                  welcomeOnBoard_subtitle:
                    'Теперь Вы один из нас! Мы подготовили для Вас несколько советов для начала:',
                  loginWelcome:
                    'до AdminJS - ведущей административной панели с открытым кодом для программ Node.js, которая позволяет управлять всеми своими данными в одном месте',
                  addingResources_title: 'Добавление ресурсов',
                  addingResources_subtitle:
                    'Как добавить новые ресурсы в боковую панель',
                  customizeResources_title: 'Настройка ресурсов',
                  customizeResources_subtitle:
                    'Определение поведения, добавление свойств и тому подобное...',
                  customizeActions_title: 'Настройка действий',
                  customizeActions_subtitle:
                    'Изменение существующих действий и добавление новых',
                  writeOwnComponents_title: 'Написание компонентов',
                  writeOwnComponents_subtitle:
                    'Как изменить внешний вид AdminJS',
                  customDashboard_title: 'Панели приборов',
                  customDashboard_subtitle:
                    'Как изменить этот экран и добавить новые страницы на боковой панели»',
                  roleBasedAccess_title: 'Контроль доступа на основе ролей',
                  roleBasedAccess_subtitle:
                    'Создавайте роли и разрешения пользователей в AdminJS',
                  community_title:
                    "Присоединяйтесь к нашему сообществу на Slack'y",
                  community_subtitle:
                    'Разговаривайте с разработчиками и другими пользователями AdminJS',
                  foundBug_title: 'Нашли ошибку? Нуждаетесь в улучшении?',
                  foundBug_subtitle:
                    'Опишите проблему в нашем репозитории GitHub',
                  needMoreSolutions_title: 'Нужны более продвинутые решения?',
                  needMoreSolutions_subtitle:
                    'Мы здесь, чтобы помочь Вам с UX/UI дизайном и разработкой программного обеспечения на основе (и не только) AdminJS',
                  invalidCredentials:
                    'Неверный адрес электронной почты и/или пароль',
                },
                resources: {
                  Article: {
                    properties: {
                      title: 'Название',
                      image: 'Изображение',
                      content: 'Содержание',
                    },
                  },
                },
              },
            },
          },
        };
      },
    }),
    CourseModule,
    AuthModule,
    jwtModule,
    ArticleModule,
    ArticlesModule,
  ],
  providers: [ArticleService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtAuthMiddleware).forRoutes('*');
  }
}
