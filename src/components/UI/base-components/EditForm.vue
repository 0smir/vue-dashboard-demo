<template>
	<form class="form edit-form" @submit.prevent="saveChanges">
		<div class="edit-form__content">
			<div class="form-control">
				<input class="form-control__input edit-form__input" 
				type="text" 
				v-model.trim="value"
				@keyup.enter="saveChanges"
			>
			</div>
			<div class="form-control edit-form__btn-wrapper">
				<BaseButton class="btn btn__dark btn-cancel"
										 aria-label="click to cancel changes"
										 @click="cancelChanges"
				>
					Cancel
				</BaseButton>
				<BaseButton class="btn btn__default btn-save"
										type="submit"
										aria-label="click to save changes"
										@click.enter="saveChanges"
				>
					Save
				</BaseButton>
			</div>
		</div>
	</form>
</template>

<script>
	export default {
		props:['type', 'titleValue'],
		emits: ['cancel-edition', 'save-changes'],
		data(){
			return{
				value: this.titleValue
			}
		},
		methods: {
			saveChanges(){
				if(this.value === this.titleValue || this.value === '') return;
				this.$emit('save-changes', this.value);
			},

			cancelChanges(){
				this.$emit('cancel-edition');
			}
		}

	}
</script>

<style lang="scss" scoped>
.edit-form {
	&__btn-wrapper {
		display: flex;
		justify-content: flex-end;
	}
	.btn-cancel,
	.btn-save {
		padding: 8px 15px;	
		border-radius: var(--border-radius-medium);
	}

	.btn-cancel {
		margin-right: 10px;
	}

}
</style>