export default {
  common: {
    registration: "Регистрация",
    see_all: "Все",
    btn_cancel: "Отмена",
    date: "дата",
    activity_text: "Активности",
    show_text: "Показать: ",
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
      task_text: "Задача",
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
    },
    boards: {},
  },
};
