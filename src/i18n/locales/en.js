import tasks from "@/store/tasks";

export default {
  common: {
    back_home: "Back Home",
    registration: "Registration",
    see_all: "See all",
    btn_cancel: "Cancel",
    btn_delete: "Delete",
    error: "Error",
    date: "date",
    activity_text: "Activity",
    show_text: "Show: ",
    header: {
      navigation: {
        home_link: "Home",
        about_link: "About",
        projects_link: "Projects",
        login_link: "Login",
        signup_link: "SignUp",
      },
      link_to: "link to:",
      link_label: "@:common.header.link_to {linkName}",
      lang_switcher: "Languages",
      back_home_link: "Back Home",
      back_home_link_label: "@:common.header.link_to @:common.header.back_home_link",
    },
    sidebar: {
      boards_link: "Boards",
      statistic_link: "Statistic",
      settings_link: "Settings",
      tasks_link: "All Tasks",
      people_link: "People",
      create_link: "Create",
      login_link: "SignIn",
    },
    footer: {},
  },
  pages: {
    people: {
      user_list_empty: "Users list is empty.",
      remove_person: "Remove",
      edit_person: "Edit",
      view_profile: "View Profile",
      action_label: "Press to ",
      btn_action_label: "@:pages.people.action_label get additional functions",
      btn_edit_label: "@:pages.people.action_label edit person",
    },
    tasks: {
      task_actions:"Actions",
      task_text: "task",
      remove_task: "Remove",
      edit_task: "Edit",
      btn_edit_label: "@:pages.tasks.edit_task @:pages.tasks.task_text",
      btn_remove_label: "Remove task ID: {task_id}",
      link_see_details: "Task details",
      link_see_details_label: "@:common.header.link_to @.lower:pages.tasks.link_see_details",
      modal: {
        delete_task: {
          title: "Delate task ID: {task_id} ?",
          description_text_1:
            "Deleting a task will permanently remove all associated data, including comments, updates, assignments, and activity history.",
          description_text_2: "This action cannot be reversed.",
          description_text_3:
            "If you're not ready to remove it completely, consider closing the task instead.",
          btn_delete: "Delete",
          btn_cancel: "Cancel",
          btn_cancel_label: "Cancel and close dialog",
        },
      },
      task_description: "Description: ",
      all_tasks_link: "See All tasks list",
      not_found_task_message:
        "Uh-oh! It seems there's no task matching this ID: { task_id }. Please double-check and try again.",
      actions: {
        actions_text: "Actions",
        action_delete: "Delete",
        action_print: "Print",
        action_log_time: "Log time",
      },
      activity_text: "Activity",
      show_text: "Show",
      tabs: {
        all_tab_text: "All",
        comments_tab_text: "Comments",
        history_tab_text: "History",
        work_log_tab_text: "Work log",
        comments: {
          no_comments_text: "No comment yet.",
          add_comment_btn: "Add comment",
          add_comment_placeholder: "Add your comment",
          error_msg: "Comment can't be empty!",
          posted_at: "<span class='poste-time'>Posted at:</span> { post_time}",
        },
        work_log: {
          time_spent: "Time spent:",
          log_date: "@.capitalize:common.date",
          comment_msg: "Comment: ",
          no_logged_time: "No time logged yet",
          no_log_comment: "<No comment>",
          posted_at:
            "Posted: <span class='date-time'>{year}-{month}-{day}</span> at <span class='date-time'>{hour}:{minute}:{seconds}</span>",
          posted_at_short: "<span class='date-time'>{year}-{month}-{day}</span>",
        },
        history: {
          task_changed: "Task {mode} updated to",
          change_task_at:
            "change task <strong>{mode}</strong> at: <span class='poste-time'>{time}</span>",
        },
      },
      tasks_details: {
        details_title: "Task Details",
        details_assignee_label: "Assignee:",
        details_priority_label: "Priority:",
        details_reporter_label: "Reporter:",
        details_project_label: "Project:",
        details_status_label: "Status:",
        task_estimation_label: "Estimated: ",
        task_timetracked_label: "Time tracked: ",
        task_time_tracked_original: "original estimation",
        task_time_tracked: "logged",
        task_time_remained: "remaining",
        task_creation_label: "Created:",
        task_updations_label: "Updated: ",
        no_task_description: "Uh-oh! It seems there's no task matching this ID: {id}. Please double-check and try again.",
        see_all_tasks: "See All tasks list"
      }
    },
    boards: {},
  },
  dialogs: {
    delete_task: {
      title: "Delate task {id}",
      description_text_1: "Are you about permanently delete this task. It's comments and all of it's data.",
      description_text_2: "If you are not sure, you can close this task."
    },
    delete_task_notlogged: {
      title: "You're Not Logged In!",
      description_text: "You need to be logged in to make changes to this task. Please sign in to log time, update the priority, change the status, or modify this task."
    },
      
  },
};
