<template>
  <section class="section task-activity__wrapper">
    <h4 class="section__title title">{{ $t("common.activity_text") }}</h4>
    <div class="tabs">
      <span class="tabs__label">{{ $t("common.show_text") }}</span>
      <BaseButton
        :class="['tabs__btn', { active: activeItem === 'all' }]"
        @click="updateFilter('all', 'TaskAllActivitiesComponent')"
      >
        {{ $t("pages.tasks.tabs.all_tab_text") }}
      </BaseButton>
      <BaseButton
        :class="['tabs__btn', { active: activeItem === 'comment' }]"
        @click="updateFilter('comment', 'TaskCommentsComponent')"
      >
        {{ $t("pages.tasks.tabs.comments_tab_text") }}
      </BaseButton>
      <BaseButton
        :class="['tabs__btn', { active: activeItem === 'history' }]"
        @click="updateFilter('history', 'TaskHistoryComponent')"
      >
        {{ $t("pages.tasks.tabs.history_tab_text") }}
      </BaseButton>
      <BaseButton
        :class="['tabs__btn', { active: activeItem === 'logTime' }]"
        @click="updateFilter('logTime', 'TaskWorkLogComponent')"
      >
        {{ $t("pages.tasks.tabs.work_log_tab_text") }}
      </BaseButton>
    </div>
    <div class="tabs__content" v-if="!isLoading">
      <component :is="activeComponent" :taskID="taskID" :activity="activityFiltered"></component>
    </div>
    <BaseSpinner v-else />
  </section>
</template>

<script>
import TaskAllActivitiesComponent from "@/components/tasks/task/TaskAllActivitiesComponent.vue";
import TaskCommentsComponent from "@/components/tasks/task/TaskCommentsComponent.vue";
import TaskHistoryComponent from "@/components/tasks/task/TaskHistoryComponent.vue";
import TaskWorkLogComponent from "@/components/tasks/task/TaskWorkLogComponent.vue";
import BaseSpinner from "@/components/UI/base-components/BaseSpinner.vue";

export default {
  components: {
    TaskAllActivitiesComponent,
    TaskCommentsComponent,
    TaskHistoryComponent,
    TaskWorkLogComponent,
  },
  props: ["taskID", "activity"],
  data() {
    return {
      isLoading: false,
      error: null,
      activeItem: "all",
      activeComponent: "TaskAllActivitiesComponent",
      activitiesAll: Array.from(Object.values(this.activity)),
      authorsDataList: [],
    };
  },
  computed: {
    enrichedHistory() {
      if (!this.authorsDataList.length) return [];
      return Object.entries(this.activity).map(([id, update]) => {
        const author = this?.authorsDataList.find((user) => user.id === update.authorID) || {
          name: "Unknown",
          lastName: "",
        };
        return {
          id,
          ...update,
          authorName: author.name,
          authorLastName: author.lastName,
        };
      });
    },
    activityFiltered() {
      let updatesHistory = this.enrichedHistory;
      if (this.activeItem === "all") {
        return updatesHistory;
      } else if (this.activeItem === "comment" || this.activeItem === "logTime") {
        return updatesHistory.filter((item) => item.mode === this.activeItem);
      } else {
        return updatesHistory.filter((item) => item.mode !== "comment" && item.mode !== "logTime");
      }
    },
  },

  methods: {
    updateFilter(mode, componentName) {
      this.activeItem = mode;
      this.activeComponent = componentName;
    },

    getAuthorsData() {
      let activity = Object.values(this.activity);
      let uniqueIDList = [...new Set(activity.map((item) => item.authorID))];
      let requests = uniqueIDList.map((id) =>
        fetch(`https://jira-vue-demo-default-rtdb.firebaseio.com/people/${id}.json`)
      );

      this.isLoading = true;

      Promise.all(requests)
        .then((resp) => Promise.all(resp.map((r) => r.json())))
        .then((users) => {
          let authorsData = [];
          users.forEach((user) => {
            authorsData.push(user);
          });
          this.authorsDataList = authorsData;
          this.isLoading = false;
        })
        .catch((error) => {
          console.error("Failed to fetch authors:", error);
        });
    },
  },
  created() {
    if (this.activity) {
      this.getAuthorsData();
    }
  },
};
</script>

<style lang="scss" scoped>
.section {
  &__title {
    font-size: 18px;
    margin-bottom: 20px;
  }
}
.tabs {
  &__content {
    padding: 20px 0;
  }

  &__label {
    margin-right: 15px;
  }
}
</style>
