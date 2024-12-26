import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

export default {
  namespaced: true,
  state() {
    return {
      projects: [
        {
          id: 'health',
          title: 'Health',
          description: "Personal health is the foundation of a balanced and fulfilling life. It encompasses physical fitness, mental wellness, and lifestyle choices that promote longevity and happiness. By prioritizing health, you take proactive steps to prevent illness and build resilience. This project focuses on setting achievable health goals, like regular exercise and balanced nutrition, to foster overall wellbeing. Together, these habits empower you to live your best life."
        },
        {
          id: 'wellness',
          title: 'Wellness',
          description: "Personal wellness integrates physical, emotional, and mental health to create harmony in your daily life. Unlike focusing solely on physical health, wellness is about nurturing all aspects of your being. This project will guide you through practices to reduce stress, cultivate positive habits, and increase mindfulness. By investing in wellness, you lay the foundation for a more fulfilling, energized life with improved relationships and productivity."
        },
        {
          id: 'career',
          title: 'Career success',
          description: "Achieving career success involves strategic planning, skill-building, and a commitment to continuous growth. This project focuses on setting both short-term and long-term goals to foster career development and seize new opportunities. By defining key milestones, enhancing your skills, and building your professional network, you position yourself for sustained career growth. Whether aiming for a promotion or excelling in a current role, this project equips you with the tools to succeed professionally."
        }
      ],
      status: [{ id: 'active', value: 'Active' }, { id: 'completed', value: 'Completed' }, { id: 'hold', value: 'On hold' }],
      priority: [{ id: 'low', value: 'Low' }, { id: 'medium', value: 'Medium' }, { id: 'high', value: 'High' }]
    }
  },
  actions,
  getters,
  mutations
}