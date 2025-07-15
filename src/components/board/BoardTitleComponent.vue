<template>
	<div class="board__header">
		<div v-if="!isEditFormVisible" class="board__title-wrapper">
			<h1 class="title board__title"> {{ title }} </h1>
			<BaseButton class="btn btn--transparent btn--small board__btn btn__edit-title"
									aria-label="edit board title"
									@click="toggleEditBlock"
			>
				<SvgIcon class="icon" name="edit" />
			</BaseButton>
		</div>
		<EditForm v-else :titleValue="title" 
										@cancel-edition="toggleEditBlock"	
										@save-changes="editTitle"
		/>
	</div>
</template>

<script>
import EditForm from '@/components/UI/base-components/EditForm.vue';
export default {
	components: {
		EditForm
	},
  props: ['title', 'id'],
	emits: ['update-board'],
	data(){
		return{
			isEditFormVisible: false
		}
	},
	methods: {
		toggleEditBlock(){
			this.isEditFormVisible = !this.isEditFormVisible;
		},
		editTitle(newValue){
			this.$emit('update-board', {type: 'title', newValue});
			this.toggleEditBlock();
		}
	}
    
}
</script>

<style lang="scss">
.board {
	&__header {
		@media(min-width: $md){
			max-width: 50%;
		}
	}
	&__title{
		margin: 0;
	}
	&__title-wrapper{
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 15px;

		&:hover {
			.btn__edit-title{
				visibility: visible;
			}
		}
	}
}
.btn__edit-title {
	visibility: hidden;
}

</style>