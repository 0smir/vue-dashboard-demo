<template>
	<div class="board__project-details" @click="loadProjectsList">
		<p v-if="mode === 'untied'">choose project to bind board:</p>
		<p v-else>change project:</p>
		<SmartBox :list="projectsList" :title="projTitle" mode="project" @update-params="updateProject"
			:classList="['btn', 'btn--medium', 'btn--transparent', 'btn-project__controller']">
			<template #list-items="{ list, selectItem }">
				<li  v-if="!list.length" class="smart-box__list-item">
					<BaseSpinner />
				</li>
				<li v-else class="smart-box__list-item" v-for="item in list" :key="item.id">
					<BaseButton class="btn btn--transparent btn-project__project-item"
											:id="item.id"
											@click.stop="selectItem(item)">
						<span class="btn-text">{{ item.title }}</span>
					</BaseButton>
				</li>
			</template>
		</SmartBox>
			<BaseButton class="btn btn__dark btn-cancel"
										aria-label="click to cancel changes"
										@click="cancelChanges"			
			>
				Cancel
			</BaseButton>
			<BaseButton v-if="mode === 'untied'" class="btn btn__default btn-save"
									aria-label="click to save changes"
									@click="bindProject"
			>
				Save	
			</BaseButton>
	
	</div>
</template>

<script>
import SmartBox from '@/components/UI/base-components/SmartBox.vue';
import BaseSpinner from '@/components/UI/base-components/BaseSpinner.vue';
export default {
		components: {
		SmartBox
	},
	props:['currentProj', 'mode'],
	emits: ['change-project', 'bind-project', 'cancel-changes'],
	data(){
		return{
			error: null
		}
	},
	computed: {
		projectsList() {
      return this.$store.getters['projects/getProjects'];
    },
		projTitle(){
			if (!this.currentProj && this.projectsList.length){
				return this.projectsList[0].title;
			}else {
				return this?.currentProj?.title;
			}
			
		}
	},
	methods: {
		async loadProjectsList() {
			if (!this.projectsList.length) {
				try {
					await this.$store.dispatch('projects/loadProjectsList');
				} catch (error) {
					this.error = error.message || 'Smth went wrong!';
				}
			}
		},

		bindProject(){
			let newVal = {
					id: this.projectsList[0].id,
					title: this.projectsList[0].title,
				};
			this.$emit('bind-project', newVal);
		},

		updateProject(payload) {
			let {newVal} = payload;
      this.$emit('change-project', newVal);
		},
		cancelChanges() {
			this.$emit('cancel-changes');
		}
	},
	created(){
		if(this.mode === 'untied'){
			this.loadProjectsList();
		}
	}
}
</script>

<style lang="scss" scoped>

</style>