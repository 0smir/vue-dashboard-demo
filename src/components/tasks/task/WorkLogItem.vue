<template>
  <div class="time-log__item">
    <div class="flex time-log__details">
      <UserProfileImg :userInfo="userInfo" theme="light" />
      <span class="author">{{ authorFullName }}</span>
      <span
        class="poste-time"
        v-html="
          $t('pages.tasks.tabs.work_log.posted_at', {
            year: updateTime?.year,
            month: updateTime?.month,
            day: updateTime?.day,
            hour: updateTime?.hour,
            minute: updateTime?.minute,
            seconds: updateTime?.seconds,
          })
        "
      ></span>
    </div>

    <div class="time-log__description">
      <div class="time-log__description-item">
        <span class="description-label">{{ $t("pages.tasks.tabs.work_log.time_spent") }}</span>
        <span class="description-value">{{ timeSpent }}</span>
      </div>
      <div class="time-log__description-item">
        <span class="description-label">{{ $t("pages.tasks.tabs.work_log.log_date") }}:</span
        ><span
          class="description-value"
          v-html="
            $t('pages.tasks.tabs.work_log.posted_at_short', {
              year: dateOfLog?.year,
              month: dateOfLog?.month,
              day: dateOfLog?.day,
            })
          "
        ></span>
      </div>
      <div class="time-log__description-item">
        <span class="description-label">{{ $t("pages.tasks.tabs.work_log.comment_msg") }}</span>
        <p class="description-value time-log__description-text">{{ workDescription }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import UserProfileImg from "@/components/auth/UserProfileInfo.vue";
export default {
  components: {
    UserProfileImg,
  },
  props: ["workLog"],
  computed: {
    userInfo() {
      return {
        name: this?.workLog?.authorName,
        lastName: this?.workLog?.authorLastName,
      };
    },
    authorFullName() {
      return `${this?.workLog?.authorName} ${this?.workLog?.authorLastName}`;
    },
    timeSpent() {
      return this.workLog.newValue.spentTime + "h";
    },
    emptyMessage() {
      return this.$t("pages.tasks.tabs.work_log.no_log_comment");
    },
    workDescription() {
      return this.workLog.newValue.loggedTimeDescription || this.emptyMessage;
    },
    dateOfLog() {
      return this.timeFormattedData(this.workLog.newValue.loggedTimeDate);
    },
    updateTime() {
      return this.timeFormattedData(this.workLog.updateTime, true);
    },
  },
  methods: {
    timeFormattedData(timestamp, full = false) {
      if (!timestamp) return "";

      let creatinDate = new Date(timestamp);
      let year = creatinDate.getFullYear();
      let month = String(creatinDate.getMonth() + 1).padStart(2, "0");
      let day = String(creatinDate.getDate()).padStart(2, "0");
      let hour = String(creatinDate.getHours()).padStart(2, "0");
      let minute = String(creatinDate.getMinutes()).padStart(2, "0");
      let seconds = String(creatinDate.getSeconds()).padStart(2, "0");

      return full
        ? { year: year, month: month, day: day, hour: hour, minute: minute, seconds: seconds }
        : { year: year, month: month, day: day };
    },
  },
};
</script>

<style lang="scss">
.time-log {
  &__item {
    margin-bottom: 20px;
  }
  &__details {
    display: flex;
    align-items: center;
    margin-bottom: 7px;
  }
  &__description {
    padding-left: 35px;
  }
  &__description-item {
    display: flex;
    margin-bottom: 7px;

    .description-label,
    .description-value {
      display: flex;
    }

    .description-label {
      color: $color-tetriary;
      flex: 1 1 75px;
    }
    .description-value {
      flex: 5 1 150px;
    }
  }
}

.author {
  display: inline-flex;
  padding: 7px 5px 5px 5px;
  margin-right: 7px;
  border-radius: $border-radius-large;
  background-color: $color-primary-light;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
}
.poste-time {
  font-size: 12px;
  color: $color-primary;
  font-weight: 500;

  .date-time {
    color: $color-secondary;
    font-weight: 400;
  }
}
</style>
