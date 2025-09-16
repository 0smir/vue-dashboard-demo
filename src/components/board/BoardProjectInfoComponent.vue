<template>
	
	<div class="board__project-info">
		<template v-if="!project">
			<p>This board is not bind to any project</p>
			<BaseButton class="btn btn--transparent btn--small board__btn"
									aria-label="edit board title"
									@click="toggleEditBlock"
			>
				<SvgIcon class="icon" name="edit" />
			</BaseButton>
		</template>
		<template v-else>
			<div v-show="!isEditFormVisible" class="board__project-wrapper">
				<span>project: {{ project.title }} </span>
				<BaseButton class="btn btn--transparent btn--small board__btn btn__edit"
										aria-label="edit board title"
										@click="toggleEditBlock"
				>
					<SvgIcon class="icon icon--medium" name="edit" />
				</BaseButton>
			</div>
		</template>
		<BoardProjectEdit ref="projectsSelect" v-show="isEditFormVisible"
																					 :currentProj="project"
																					 :mode="mode"
																					 @bind-project="editProject"
																					 @change-project="editProject"
																					 @cancel-changes="toggleEditBlock"  
		/>
	</div>
</template>

<script>
import BoardProjectEdit from '@/components/board/BoardProjectEdit.vue';

export default {
	components: {
		BoardProjectEdit
	},
	props:['project'],
	data(){
		return{
			isEditFormVisible: false,
			mode: !this.project ? 'untied' : 'associated'
		}
	},
	methods: {
		toggleEditBlock(){
			this.isEditFormVisible = !this.isEditFormVisible;
		},

		editProject({ id, title }){
			let newValue = { id, title };
			console.log(newValue);
			
			this.$emit('update-board', {type: 'project', newValue});
			this.toggleEditBlock();
		}
	}
			
}
</script>

<style lang="scss">
.board {
	&__project-info {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		@media(min-width: $md){
			width: 50%;
		}
	}
	&__project-wrapper {
		display: flex;
		align-items: center;
		&:hover {
			.btn__edit{
				visibility: visible;
			}
		}
	}
	
}

</style>