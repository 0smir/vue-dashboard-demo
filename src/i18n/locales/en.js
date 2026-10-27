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
    new_task: "New task",
    back_to_prev_link: "Back",
    back_to_prev_link_label: "@:common.link_to @:common.back_to_prev_link",
    link_to: "link to:",
    link_label: "@:common.link_to {linkName}",
    back_home_link: "Back Home",
    back_home_link_label: "@:common.link_to @:common.back_home_link",
    header: {
      navigation: {
        home_link: "Home",
        about_link: "About",
        projects_link: "Projects",
        login_link: "Login",
        signup_link: "SignUp",
      },
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
    positions: {
      front_end: "Front-End",
      back_end: "Back-End",
      qa: "QA",
      manager: "Manager",
      product_owner: "Product Owner",
      seo: "SEO",
      designer: "Designer",
      hr: "HR",
    },
    footer: {
      rights_text: "\&COPY Copyright {year}, <span class='footer__rights-text'>All Rights Reserved</span>"
    },
  },
  pages: {
    auth: {
      login: {
        page_title: "Login",
        email_label: "Email:",
        password_label: "Password:",
        email_error: "Please, enter a valid email address",
        password_error: "Password is required and must be at least 6 characters long.",
        btn_login: "Login",
        registration_link: "Registration",
        registration_link_label: "Link to registration page",
        forgot_password: "Forgot password?",
        forgot_password_label: "Link to password recovery page",
        invalid_credentials: "Incorrect email or password.",
      },
    },
    not_found: {
      subtitle: "Page not found",
      error_name: "error 404",
      description_text: "The page may have been deleted, renamed, or you entered the address incorrectly. Return to the home page or use the search."
    },
    create: {
      page_title: "Create",
      project: "Project",
      board: "Create Board",
      task: "Create Task",
      person: "Add Person",
    },
    people: {
      all_people: "Employees list",
      user_list_empty: "Employees list is empty.",
      remove_person: "Remove",
      edit_person: "Edit",
      view_profile: "View Profile",
      action_label: "Press to ",
      btn_action_label: "@:pages.people.action_label get additional functions",
      btn_edit_label: "@:pages.people.action_label edit person",
      person_title: "Person: {name}",
      user_menu: {
        open_label: "Click to open user navigation",
        my_profile: "My Profile",
        my_boards: "My boards",
        my_projects: "My Projects",
        logout: "Logout",
      },
    },
    tasks: {
      all_tasks_title: "All tasks",
      task_actions:"Actions",
      task_text: "task",
      remove_task: "Remove",
      edit_task: "Edit",
      btn_edit_label: "@:pages.tasks.edit_task @:pages.tasks.task_text",
      btn_remove_label: "Remove task ID: {task_id}",
      link_see_details: "Task details",
      link_see_details_label: "@:common.link_to @.lower:pages.tasks.link_see_details",
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
      no_items_with_status: "No items with task status {status}",
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
      },
    },
    boards: {
      page_title: "Boards"
    },
    projects: {
      page_title: "Projects"
    },
    profile: {
      page_title: "User profile",
      user_menu: {
        open_label: "Click to open user navigation",
        logout_label: "Click to logout",
        my_profile: "My Profile",
        my_boards: "My boards",
        my_projects: "My Projects",
        logout: "Logout",
      },
    }
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
