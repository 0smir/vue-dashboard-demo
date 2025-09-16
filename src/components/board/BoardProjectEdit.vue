<template>
	<div class="board__project-details" @click="loadProjectsList">
		<p v-if="mode === 'untied'" class="board__details-description">choose project to bind board:</p>
		<p v-else class="board__details-description">change project:</p>
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
		<BaseButton class="btn btn-cancel"
									aria-label="click to cancel changes"
									@click="cancelChanges"			
		>
			<SvgIcon class="icon icon--small" name="close" />
		</BaseButton>
	
	</div>
</template>

<script>
import SmartBox from '@/components/UI/base-components/SmartBox.vue';
import BaseSpinner from '@/components/UI/base-components/BaseSpinner.vue';
import SvgIcon from '../UI/base-components/SvgIcon.vue';
export default {
		components: {
		SmartBox,
		BaseSpinner,
		SvgIcon
		
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
.board {
	&__project-details {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;
		align-items: center;
		// flex-basis: 175px;
	}
	&__details-description {
		font-style: italic;
	}
}
.btn-cancel {
	height: 25px;
	width: 25px;
	padding: 0;
	border-radius: $border-radius-medium;
	border: 2px solid $color-secondary-medium;
	color:  $color-tetriary;
	background-color: $color-white;
	transform: scale(1);
	transition: transform .35s ease;

	&:hover,
	&:focus {
		color: $color-primary;
		background-color: $color-primary-light;
		border-color: $color-primary-medium;
		transform: scale(1.2);
		transition: transform .35s ease;
	}
}
</style>