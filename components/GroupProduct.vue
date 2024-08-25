<script lang="ts" setup>
import axios from "axios";
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
};
const emits = defineEmits(["deleteProduct"]);
</script>

<template>
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
		<button class="wrap_product__delete" @click="deleteProductFunc">
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
.wrap_product__specify {
	font-family: Inter;
	font-size: 1.6rem;
	color: #212121;
	text-align: left;
	font-weight: 500;
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
.wrap_product__price span {
	color: #212121;
	font-family: Inter;
	font-size: 1.4rem;
	opacity: 0.7;
}
</style>
