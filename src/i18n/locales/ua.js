export default {
  common: {
    back_home: "На головну",
    registration: "Реєстрація",
    see_all: "Усі",
    btn_cancel: "Скасувати",
    btn_delete: "Видалити",
    error: "Помилка",
    date: "дата",
    activity_text: "Активності",
    show_text: "Показати: ",

    back_to_prev_link: "Back",
    back_to_prev_link_label: "@:common.link_to @:common.back_to_prev_link",

    link_to: "посилання на:",
    link_label: "@:common.link_to {linkName}",
    header: {
      navigation: {
        home_link: "Головна",
        about_link: "Про нас",
        projects_link: "Проєкти",
        login_link: "Вхід",
        signup_link: "Реєстрація",
      },
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
    back_to_prev_link: "Повернутись",
    back_to_prev_link_label: "@:common.link_to @:common.back_to_prev_link",
   
    footer: {
      rights_text: "\&COPY Copyright {year}, <span class='footer__rights-text'>All Rights Reserved</span>"
    },
  },
  pages: {
    auth: {
      login: {
        page_title: "Вхід",
        email_label: "Email:",
        password_label: "Пароль:",
        email_error: "Будь ласка, введіть коректну email-адресу",
        password_error: "Пароль обов'язковий і має містити щонайменше 6 символів.",
        btn_login: "Увійти",
        registration_link: "Реєстрація",
        registration_link_label: "Посилання на сторінку реєстрації",
        forgot_password: "Забули пароль?",
        forgot_password_label: "Посилання на сторінку відновлення пароля",
        invalid_credentials: "Невірний email або пароль.",
      },
    },
    not_found: {
      subtitle: "Сторінку не знайдено",
      error_name: "помилка 404",
      description_text:"Можливо, сторінку було видалено, перейменовано або ви помилилися в адресі. Поверніться на головну або скористайтеся пошуком."
    },
    create: {
      page_title: "Створити",
      project: "Проєкт",
      board: "Створити дошку",
      task: "Створити завдання",
      person: "Додати учасника",
    },
    people: {
      all_people: "Перелік робітників",
      user_list_empty: "Перелік користувачів порожній.",
      remove_person: "Видалити",
      edit_person: "Редагувати",
      view_profile: "Переглянути профіль",
      action_label: "Натисніть, щоб ",
      btn_action_label: "@:pages.people.action_label отримати додаткові функції",
      btn_edit_label: "@:pages.people.action_label відредагувати користувача",
      person_title: "Учасник: {name}",
      user_menu: {
        open_label: "Натисніть, щоб відкрити меню користувача",
        my_profile: "Мій профіль",
        my_boards: "Мої дошки",
        my_projects: "Мої проєкти",
        logout: "Вийти",
      },
    },
    tasks: {
      task_actions:"Дії",
      task_text: "Завдання",
      remove_task: "Видалити",
      edit_task: "Редагувати",
      btn_edit_label: "@:pages.tasks.edit_task @.lower:pages.tasks.task_text",
      btn_remove_label: "Видалити завдання з ID: {task_id}",
      link_see_details: "Детальніше",
      link_see_details_label: "@:common.link_to @.lower:pages.tasks.link_see_details",
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
        "Упс! Схоже, завдання з ID {task_id} не існує. Будь ласка, перевірте ідентифікатор та спробуйте ще раз.",
        no_items_with_status: "Немає завдань зі статусом {status}",
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
      tasks_details: {
        details_title: "Деталі завдання",
        details_assignee_label: "Виконавець:",
        details_priority_label: "Пріоритет:",
        details_reporter_label: "Автор:",
        details_project_label: "Проєкт:",
        details_status_label: "Статус:",
        task_estimation_label: "Оцінка: ",
        task_timetracked_label: "Витрачено часу: ",
        task_time_tracked_original: "початковий розрахунок",
        task_time_tracked: "зафіксовано",
        task_time_remained: "залишилось",
        task_creation_label: "Створено:",
        task_updations_label: "Оновлено: ",
        no_task_description: "Ой! Схоже, завдання з ID {id} не існує. Будь ласка, перевірте та спробуйте ще раз.",
        see_all_tasks: "Переглянути список усіх завдань"
      },
      create_page_title: "Створити нове завдання"
    },
    boards: {},
    profile: {
      page_title: "Профіль користувача",
      user_menu: {
        open_label: "Натисніть, щоб відкрити меню користувача",
        logout_label: "Натисніть, щоб вийти",
        my_profile: "Мій профіль",
        my_boards: "Мої дошки",
        my_projects: "Мої проєкти",
        logout: "Вийти",
      },
    }

  },
  dialogs: {
    delete_task: {
      title: "Видалити завдання {id}",
      description_text_1: "Ви збираєтеся остаточно видалити це завдання, його коментарі та всі пов'язані з ним дані.",
      description_text_2: "Якщо ви не впевнені, можете просто закрити це завдання."
    },
    delete_task_notlogged: {
      title: "Ви не увійшли в систему!",
      description_text: "Щоб вносити зміни до цього завдання, потрібно увійти в систему. Будь ласка, увійдіть, щоб обліковувати час, змінювати пріоритет, статус або редагувати це завдання."
    },  
  },
};
