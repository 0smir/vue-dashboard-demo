export default {
  common: {
    registration: "Реєстрація",
    see_all: "Усі",
    btn_cancel: "Скасувати",
    date: "дата",
    activity_text: "Активності",
    show_text: "Показати: ",
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
      task_text: "Завдання",
      remove_task: "Видалити",
      edit_task: "Редагувати",
      btn_edit_label: "@:pages.tasks.edit_task @.lower:pages.tasks.task_text",
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
          btn_cancel: "Скасувати",
          btn_cancel_label: "Скасувати та закрити діалогове вікно",
        },
      },
      task_description: "Опис:",
      all_tasks_link: "Переглянути список усіх завдань",
      not_found_task_message:
        "От халепа! Схоже, завдання з ID {task_id} не існує. Будь ласка, перевірте ідентифікатор та спробуйте ще раз.",
      actions: {
        actions_text: "Дії",
        action_delete: "Видалити",
        action_print: "Друк",
        action_log_time: "Облік часу",
      },
      activity_text: "Активність",
      show_text: "Показати",
      tabs: {
        all_tab_text: "Усі",
        comments_tab_text: "Коментарі",
        history_tab_text: "Історія",
        work_log_tab_text: "Облік часу",
        comments: {
          no_comments_text: "Коментарів поки немає.",
          add_comment_btn: "Додати коментар",
          add_comment_placeholder: "Додайте свій коментар",
          error_msg: "Коментар не може бути порожнім!",
          posted_at: "<span class='poste-time'>Опубліковано:</span> { post_time}",
        },
        work_log: {
          time_spent: "Витрачений час:",
          log_date: "@.capitalize:common.date",
          comment_msg: "Коментар: ",
          no_logged_time: "Облік часу відсутній",
          no_log_comment: "<Нема коментаря>",
          posted_at:
            "Опубліковано: <span class='date-time'>{year}-{month}-{day}</span> у <span class='date-time'>{hour}:{minute}:{seconds}</span>",
          posted_at_short: "<span class='date-time'>{year}-{month}-{day}</span>",
        },
        history: {
          task_changed: "{mode} змінено на ",
          change_task_at:
            "було змінено <strong>{mode}</strong>: <span class='poste-time'>{time}</span>",
        },
      },
    },
    boards: {},
  },
};
