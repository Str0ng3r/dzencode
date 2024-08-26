<script lang="ts" setup>
interface Price {
	value: Number;
	symbol: String;
	isDefault: Number;
}
const props = defineProps({
	title: {
		type: String,
		default: "",
	},
	date: {
		type: String,
		default: "",
	},
	photo: {
		type: String,
		default: "",
	},
	type: {
		type: String,
		default: "",
	},
	price: {
		type: Array as PropType<Price[]>,
		default: 0,
	},
	status: {
		type: Boolean,
		default: false,
	},
	id: {
		type: Number,
	},
	serialNumber: {
		type: String,
		default: "",
	},
	guarantee: {
		type: Object,
		default: {},
	},
	specification: {
		type: String,
		default: "",
	},
});

const deleteProductFunc = () => {
	emits("deleteProduct", props.id);
	isDelete.value = false;
};
const closeDelModal = () => {
	isDelete.value = false;
};
const emits = defineEmits(["deleteProduct"]);
const isDelete = ref(false);
</script>

<template>
	<div class="back_modal" v-if="isDelete">
		<div class="modal_delete" v-click-outside="closeDelModal">
			<button class="modal_delete__close_btn" @click="closeDelModal">X</button>
			<h2 class="modal_delete__title">
				Вы уверены,что хотите удалить этот продукт?
			</h2>
			<div class="wrap_product_delete">
				<img :src="photo" alt="product" class="wrap_product_delete__img" />
				<p class="wrap_product_delete__title">
					{{ title }}
					<span>{{ serialNumber }}</span>
				</p>
				<p class="wrap_product_delete__type"><span>тип:</span>{{ type }}</p>
				<p class="wrap_product_delete__status" v-if="status === true">Новый</p>
				<p class="wrap_product_delete__status" v-else>Б/У</p>
				<p class="wrap_product_delete__price">
					<span>{{ price[0].value }}$</span>{{ price[1].value }} UAH
				</p>
				<p class="wrap_product_delete__specify">{{ specification }}</p>
			</div>
			<div class="wrap_buttons_delete">
				<button class="wrap_buttons_delete__close" @click="closeDelModal">
					Отменить
				</button>
				<button class="wrap_buttons_delete__del" @click="deleteProductFunc">
					<nuxt-icon name="delete" filled class="del_red"></nuxt-icon>Удалить
				</button>
			</div>
		</div>
	</div>
	<!-- ---------------------------MODAL DELETE----------------->
	<div class="wrap_product">
		<div class="good_prod" v-if="status === true"></div>
		<div class="bad_prod" v-else></div>
		<img :src="photo" alt="product_photo" class="wrap_product__img" />
		<h2 class="wrap_product__title">
			{{ title }} <span>{{ serialNumber }}</span>
		</h2>
		<div class="wrap_product__date_guarantee">
			<p><span>с </span>{{ guarantee.start.substring(0, 11) }}</p>
			<p><span>по</span> {{ guarantee.end.substring(0, 11) }}</p>
		</div>
		<p class="wrap_product__status" v-if="status === true">Новый</p>
		<p class="wrap_product__status" v-else>Б/У</p>
		<p class="wrap_product__price">
			<span>{{ price[0].value }}$</span>{{ price[1].value }} UAH
		</p>
		<p class="wrap_product__type"><span>тип:</span>{{ type }}</p>
		<p class="wrap_product__specify">{{ specification }}</p>
		<button
			class="wrap_product__delete"
			@click="
				() => {
					isDelete = true;
				}
			"
		>
			<nuxt-icon name="delete" filled></nuxt-icon>
		</button>
	</div>
</template>

<style scoped lang="scss">
.wrap_product {
	width: 100%;
	padding: 1rem 3rem;
	border: 2px solid #eaeaea;
	border-radius: 6px;
	display: flex;
	align-items: center;
	justify-content: space-around;
}
.wrap_product_delete__img {
	max-width: 4rem;
	margin-right: 4rem;
}
.wrap_product_delete__title span {
	font-family: Inter;
	font-size: 1rem;
	font-weight: 400;
	opacity: 0.7;
	color: #212121;
	text-decoration: underline;
}
.wrap_product_delete {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	padding: 1rem 3rem;
}
.wrap_buttons_delete {
	height: 10rem;
	background-color: rgb(115, 170, 60);
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	padding: 2rem 3rem;
	gap: 2rem;
	border-bottom-left-radius: 4px;
	border-bottom-right-radius: 4px;
}
.wrap_product_delete__specify {
	font-family: Inter;
	font-size: 1.2rem;
	font-weight: 500;
	margin-left: 1rem;
}
.wrap_buttons_delete__close {
	cursor: pointer;
	color: #ffffff;
	padding: 1rem 2rem;
	background-color: transparent;
	font-size: 1.8rem;
	font-weight: 600;
	font-family: Inter;
}
.wrap_product_delete__title {
	font-family: Inter;
	font-size: 1.4rem;
	font-weight: 500;
	color: #212121;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
	text-decoration: underline;
	margin-right: 4rem;
}
.wrap_buttons_delete__del {
	cursor: pointer;
	color: #ca2a2a;
	padding: 1rem 4rem;
	background-color: #ffffff;
	-webkit-box-shadow: 8px 8px 24px 0px rgba(66, 68, 90, 1);
	-moz-box-shadow: 8px 8px 24px 0px rgba(66, 68, 90, 1);
	box-shadow: 8px 8px 24px 0px rgba(66, 68, 90, 1);
	font-size: 1.8rem;
	border-radius: 20px;
	font-weight: 600;
	font-family: Inter;
	display: flex;
	gap: 1rem;
	align-items: center;
	justify-content: center;
}
.modal_delete {
	border-radius: 4px;
	max-width: 60rem;
	background-color: #ffffff;
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
	flex-direction: column;
	position: relative;
	width: 100%;
	-webkit-box-shadow: 8px 8px 24px 0px rgba(66, 68, 90, 1);
	-moz-box-shadow: 8px 8px 24px 0px rgba(66, 68, 90, 1);
	box-shadow: 8px 8px 24px 0px rgba(66, 68, 90, 1);
}
.modal_delete__title {
	font-size: 1.8rem;
	font-family: Inter;
	color: #212121;
	font-weight: 600;
	margin-bottom: 3rem;
	padding: 2rem;
}
.modal_delete__close_btn {
	position: absolute;
	top: -2rem;
	right: -2rem;
	width: 4rem;
	height: 4rem;
	border-radius: 2rem;
	background-color: #e9e6e6;
	-webkit-box-shadow: 8px 8px 24px 0px rgba(66, 68, 90, 1);
	-moz-box-shadow: 8px 8px 24px 0px rgba(66, 68, 90, 1);
	box-shadow: 8px 8px 24px 0px rgba(66, 68, 90, 1);
	text-align: center;
	cursor: pointer;
	font-size: 2rem;
	color: #212121;
	font-family: Inter;
}
.back_modal {
	position: fixed;
	z-index: 3;
	left: 0;
	top: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(104, 104, 104, 0.52);
	display: flex;
	align-items: center;
	justify-content: center;
}
.good_prod {
	border-radius: 50%;
	width: 1rem;
	height: 1rem;
	background-color: chartreuse;
}
.bad_prod {
	border-radius: 50%;
	width: 1rem;
	height: 1rem;
	background-color: rgb(143, 93, 19);
}
.wrap_product__type {
	font-family: Inter;
	font-size: 1.6rem;
	color: #212121;
	text-align: left;
	font-weight: 500;
}
.wrap_product_delete__type {
	font-family: Inter;
	font-size: 1.6rem;
	color: #212121;
	text-align: left;
	font-weight: 500;
}
.wrap_product__specify {
	font-family: Inter;
	font-size: 1.6rem;
	color: #212121;
	text-align: left;
	font-weight: 500;
}
.wrap_product_delete__type span {
	font-family: Inter;
	font-size: 1.4rem;
	color: #212121;
	font-weight: 500;
	opacity: 0.7;
	text-align: left;
}
.wrap_product__type span {
	font-family: Inter;
	font-size: 1.4rem;
	color: #212121;
	font-weight: 500;
	opacity: 0.7;
	text-align: left;
}
.wrap_product__status {
	font-size: 1.4rem;
	color: #212121;
	font-family: Inter;
	font-weight: 400;
}
.wrap_product_delete__status {
	font-size: 1.4rem;
	color: #212121;
	font-family: Inter;
	font-weight: 400;
	margin-left: 3rem;
	margin-right: 3rem;
}
.wrap_product__img {
	max-width: 5rem;
}
.wrap_product__title {
	font-family: Inter;
	font-size: 1.6rem;
	font-weight: 500;
	color: #212121;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
	gap: 0.2rem;
}
.wrap_product__title span {
	font-family: Inter;
	font-size: 1.4rem;
	font-weight: 500;
	color: #212121;
	opacity: 0.7;
}
.wrap_product__delete {
	cursor: pointer;
}
.wrap_product__date_guarantee {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
	gap: 0.2rem;
}
.wrap_product__date_guarantee p {
	color: #212121;
	font-family: Inter;
	font-size: 1.2rem;
	font-weight: 500;
}

.wrap_product__date_guarantee p > span {
	color: #212121;
	font-family: Inter;
	opacity: 0.7;
	font-size: 1.2rem;
	font-weight: 500;
}
.wrap_product__price {
	color: #212121;
	font-family: Inter;
	font-size: 1.4rem;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
}
.wrap_product_delete__price {
	color: #212121;
	font-family: Inter;
	font-size: 1.4rem;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
}
.wrap_product_delete__price span {
	color: #212121;
	font-family: Inter;
	font-size: 1.4rem;
	opacity: 0.7;
}
.wrap_product__price span {
	color: #212121;
	font-family: Inter;
	font-size: 1.4rem;
	opacity: 0.7;
}
</style>
