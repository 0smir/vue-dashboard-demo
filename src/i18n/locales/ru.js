export default {
  common: {
    header: {
      navigation: {
        home_link: "Главная",
        about_link: "О нас",
        projects_link: "Проекты",
        login_link: "Вход",
        signup_link: "Регистрация",
      },
      link_to: "ссылка на:",
      link_label: "@:common.header.link_to {linkName}",
      lang_switcher: "Языки",
    },
    sidebar: {
      boards_link: "Доски",
      statistic_link: "Статистика",
      settings_link: "Настройки",
      tasks_link: "Все задачи",
      people_link: "Сотрудники",
      create_link: "Создать",
      login_link: "Вход",
    },
    footer: {},
  },
  pages: {
    people: {
      user_list_empty: "Список пользователей пуст.",
      remove_person: "Удалить",
      edit_person: "Изменить",
      view_profile: "Просмотреть профиль",
      action_label: "Нажмите, чтобы ",
      btn_action_label: "@:pages.people.action_label получить дополнительные функции",
      btn_edit_label: "@:pages.people.action_label отредактировать пользователя",
    },
    tasks: {
      remove_task: "Удалить",
      edit_task: "Редактировать",
      btn_edit_label: "@:pages.tasks.edit_task задачу",
      btn_remove_label: "Удалить задачу с ID: {task_id}",
      link_see_details: "Подробности задачи",
      link_see_details_label: "@:common.header.link_to @.lower:pages.tasks.link_see_details",
      modal: {
        delete_task: {
          title: "Удалить задачу с ID: {task_id}?",
          description_text_1:
            "Удаление задачи приведёт к безвозвратному удалению всех связанных данных, включая комментарии, обновления, назначения и историю активности.",
          description_text_2: "Это действие нельзя отменить.",
          description_text_3:
            "Если вы не уверены, что хотите удалить задачу навсегда, рассмотрите возможность её закрытия вместо удаления.",
          btn_delete: "Удалить",
          btn_cansel: "Отмена",
          btn_cansel_label: "Отменить и закрыть диалоговое окно",
        },
      },
    },
    boards: {},
  },
};
