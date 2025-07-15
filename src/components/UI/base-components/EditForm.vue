<template>
	<form class="form edit-form" @submit.prevent="validateForm">
		<div class="edit-form__content">
			<div :class="['form-control', {'error': !isFormValid }]">
				<input class="form-control__input edit-form__input" 
				type="text" 
				v-model.trim="value"
				@focus="clearError"
				@keyup.enter="saveChanges"
			>
			<p v-show="!isFormValid" class="error-text">{{errorMessage}}</p>
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
				>
					Save
				</BaseButton>
			</div>
		</div>
	</form>
</template>

<script>
	export default {
		props:['titleValue'],
		emits: ['cancel-edition', 'save-changes'],
		data(){
			return {
				value: this.titleValue,
				isFormValid: true,
				errorMessage: ''
			}
		},
		methods: {
			validateForm(){
				if(this.value === this.titleValue){
					this.isFormValid = false;
					this.errorMessage = 'New board title should not be the same as the old one!';
				}
				if( this.value === '') {
					this.isFormValid = false;
					this.errorMessage = 'New board title should not be empty!';
				};
				this.isFormValid &&= this.saveChanges();
			},
			saveChanges(){
				this.$emit('save-changes', this.value);
			},

			cancelChanges(){
				this.$emit('cancel-edition');
			},

			clearError(){
				this.isFormValid = true;
				this.errorMessage = '';
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