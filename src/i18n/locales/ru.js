export default {
  common: {
    back_home: "На главную",
    registration: "Регистрация",
    see_all: "Все",
    btn_cancel: "Отмена",
    btn_delete: "Удалить",
    error: "Ошибка",
    date: "дата",
    activity_text: "Активности",
    show_text: "Показать: ",

    back_to_prev_link: "Back",
    back_to_prev_link_label: "@:common.link_to @:common.back_to_prev_link",

    link_to: "ссылка на:",
    link_label: "@:common.link_to {linkName}",
  },
    header: {
      navigation: {
        home_link: "Главная",
        about_link: "О нас",
        projects_link: "Проекты",
        login_link: "Вход",
        signup_link: "Регистрация",

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
    back_to_prev_link: "Назад",
    back_to_prev_link_label: "@:common.link_to @:common.back_to_prev_link",
    footer: {
      rights_text: "\&COPY Copyright {year}, <span class='footer__rights-text'>All Rights Reserved</span>"
    },
  },
  pages: {
    auth: {
      login: {
        page_title: "Вход",
        email_label: "Email:",
        password_label: "Пароль:",
        email_error: "Пожалуйста, введите корректный email",
        password_error: "Пароль обязателен и должен содержать не менее 6 символов.",
        btn_login: "Войти",
        registration_link: "Регистрация",
        registration_link_label: "Ссылка на страницу регистрации",
        forgot_password: "Забыли пароль?",
        forgot_password_label: "Ссылка на страницу восстановления пароля",
        invalid_credentials: "Неверный email или пароль.",
      },
    },
    not_found: {
      subtitle: "Страница не найдена",
      error_name: "error 404",
      description_text: "Возможно, страница была удалена, переименована или вы ошиблись в адресе. Вернитесь на главную или воспользуйтесь поиском."
    },
    create: {
      project: "Проект",
      board: "Создать доску",
      task: "Создать задачу",
      person: "Добавить сотрудника",
    },
    people: {
      all_people: "Список сотрудников",
      user_list_empty: "Список сотрудников пуст.",
      remove_person: "Удалить",
      edit_person: "Изменить",
      view_profile: "Просмотреть профиль",
      action_label: "Нажмите, чтобы ",
      btn_action_label: "@:pages.people.action_label получить дополнительные функции",
      btn_edit_label: "@:pages.people.action_label отредактировать пользователя",
      person_title: "Сотрудник: {name}",
      user_menu: {
        open_label: "Нажмите, чтобы открыть меню пользователя",
        my_profile: "Мой профиль",
        my_boards: "Мои доски",
        my_projects: "Мои проекты",
        logout: "Выйти",
      },
    },
    tasks: {
      task_actions:"Действия",
      task_text: "Задача",
      remove_task: "Удалить",
      edit_task: "Редактировать",
      btn_edit_label: "@:pages.tasks.edit_task задачу",
      btn_remove_label: "Удалить задачу с ID: {task_id}",
      link_see_details: "Подробнее",
      link_see_details_label: "@:common.link_to @.lower:pages.tasks.link_see_details",
      no_items_with_status: "Нет задач со статусом {status}",
      modal: {
        delete_task: {
          title: "Удалить задачу с ID: {task_id}?",
          description_text_1:
            "Удаление задачи приведёт к безвозвратному удалению всех связанных данных, включая комментарии, обновления, назначения и историю активности.",
          description_text_2: "Это действие нельзя отменить.",
          description_text_3:
            "Если вы не уверены, что хотите удалить задачу навсегда, рассмотрите возможность её закрытия вместо удаления.",
          btn_delete: "Удалить",
          btn_cancel: "Отмена",
          btn_cancel_label: "Отменить и закрыть диалоговое окно",
        },
      },
      task_description: "Описание:",
      all_tasks_link: "Смотреть список всех задач",
      not_found_task_message:
        "Упс! Похоже, задачи с ID {task_id} не существует. Пожалуйста, проверьте идентификатор и попробуйте снова.",
      actions: {
        actions_text: "Действия",
        action_delete: "Удалить",
        action_print: "Печать",
        action_log_time: "Учёт времени",
      },
      activity_text: "Активность",
      show_text: "Показать",
      tabs: {
        all_tab_text: "Все",
        comments_tab_text: "Комментарии",
        history_tab_text: "История",
        work_log_tab_text: "Учёт времени",
        comments: {
          no_comments_text: "Комментариев пока нет.",
          add_comment_btn: "Добавить комментарий",
          add_comment_placeholder: "Добавьте комментарий",
          error_msg: "Комментарий не может быть пустым!",
          posted_at: "<span class='poste-time'>Опубликовано:</span> {post_time}",
        },
        work_log: {
          time_spent: "Затраченное время:",
          log_date: "@.capitalize:common.date",
          comment_msg: "Комментарий: ",
          no_logged_time: "Учёт времени отсутствует",
          no_log_comment: "<Комментария нет>",
          posted_at:
            "Опубликовано: <span class='date-time'>{year}-{month}-{day}</span> в <span class='date-time'>{hour}:{minute}:{seconds}</span>",
          posted_at_short: "<span class='date-time'>{year}-{month}-{day}</span>",
        },
        history: {
          task_changed: "{mode} изменен на ",
          change_task_at:
            "был изменен <strong>{mode}</strong> в: <span class='poste-time'>{time}</span>",
        },
      },
      tasks_details: {
        details_title: "Детали задачи",
        details_assignee_label: "Исполнитель:",
        details_priority_label: "Приоритет:",
        details_reporter_label: "Автор:",
        details_project_label: "Проект:",
        details_status_label: "Статус:",
        task_estimation_label: "Оценка: ",
        task_timetracked_label: "Затрачено времени: ",
        task_time_tracked_original: "изначальная оценка",
        task_time_tracked: "зафиксированно",
        task_time_remained: "осталось",
        task_creation_label: "Создано:",
        task_updations_label: "Обновлено: ",
        no_task_description: "Ой! Похоже, задачи с ID {id} не существует. Пожалуйста, проверьте и попробуйте снова.",
        see_all_tasks: "Посмотреть список всех задач"
      }
    },
    boards: {},
    profile: {
      user_menu: {
        open_label: "Нажмите, чтобы открыть меню пользователя",
        logout_label: "Нажмите, чтобы выйти",
        my_profile: "Мой профиль",
        my_boards: "Мои доски",
        my_projects: "Мои проекты",
        logout: "Выйти",
      },
    }
  },
  dialogs: {
    delete_task: {
      title: "Удалить задачу {id}",
      description_text_1: "Вы собираетесь безвозвратно удалить эту задачу, её комментарии и все связанные с ней данные.",
      description_text_2: "Если вы не уверены, вы можете просто закрыть эту задачу."
    },
    delete_task_notlogged: {
      title: "Вы не вошли в систему!",
      description_text: "Чтобы вносить изменения в эту задачу, необходимо войти в систему. Пожалуйста, войдите, чтобы учитывать время, менять приоритет, статус или редактировать эту задачу."
    },  
  }
};
