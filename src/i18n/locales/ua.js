export default {
  common: {
    header: {
      navigation: {
        home_link: "Головна",
        about_link: "Про нас",
        projects_link: "Проєкти",
        login_link: "Вхід",
        signup_link: "Реєстрація",
      },
      link_to: "посилання на:",
      link_label: "@:common.header.link_to {linkName}",
      lang_switcher: "Мови",
    },
    sidebar: {
      boards_link: "Дошки",
      statistic_link: "Статистика",
      settings_link: "Налаштування",
      tasks_link: "Усі завдання",
      people_link: "Учасники",
      create_link: "Створити",
      login_link: "Вхід",
    },
    footer: {},
  },
  pages: {
    people: {
      user_list_empty: "Список користувачів порожній.",
      remove_person: "Видалити",
      edit_person: "Редагувати",
      view_profile: "Переглянути профіль",
      action_label: "Натисніть, щоб ",
      btn_action_label: "@:pages.people.action_label отримати додаткові функції",
      btn_edit_label: "@:pages.people.action_label відредагувати користувача",
    },
    tasks: {
      task_text: "завдання",
      remove_task: "Видалити",
      edit_task: "Редагувати",
      btn_edit_label: "@:pages.tasks.edit_task @:pages.tasks.task_text",
      btn_remove_label: "Видалити завдання з ID: {task_id}",
      link_see_details: "Деталі завдання",
      link_see_details_label: "@:common.header.link_to @.lower:pages.tasks.link_see_details",
      modal: {
        delete_task: {
          title: "Видалити завдання з ID: {task_id}?",
          description_text_1:
            "Видалення завдання призведе до безповоротного видалення всіх пов’язаних даних, включаючи коментарі, оновлення, призначення та історію активності.",
          description_text_2: "Цю дію неможливо скасувати.",
          description_text_3:
            "Якщо ви не впевнені, що хочете видалити завдання назавжди, розгляньте можливість закриття завдання замість його видалення.",
          btn_delete: "Видалити",
          btn_cansel: "Скасувати",
          btn_cansel_label: "Скасувати та закрити діалогове вікно",
        },
      },
    },
    boards: {},
  },
};
