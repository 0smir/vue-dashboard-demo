import tasks from "@/store/tasks";

export default {
  common: {
    registration: "Registration",
    see_all: "See all",
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
          btn_cansel: "Cansel",
          btn_cansel_label: "Cansel and close dialog",
        },
      },
    },
    boards: {},
  },
};
