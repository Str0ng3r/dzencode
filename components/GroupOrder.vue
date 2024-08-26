<script lang="ts" setup>
import axios from "axios";
const props = defineProps({
	title: {
		type: String,
		default: "",
	},
	products: {
		type: Array as () => Product[],
		default: () => [],
	},
	date: {
		type: String,
		default: "",
	},
	price: {
		type: Number,
		default: 0,
	},
	id: {
		type: Number,
	},
});
interface Product {
	id: number;
	serialNumber: number;
	isNew: number;
	photo: string;
	title: string;
	type: string;
	specification: string;
	guarantee: {
		start: string;
		end: string;
	};
	price: Array<{
		value: number;
		symbol: string;
		isDefault: number;
	}>;
	order: number;
	date: string;
}
const isOpen = ref(false);
const productsOrder = ref([...props.products]);
const isDelete = ref(false);
const emits = defineEmits(["deleteOrder"]);
const deleteOrder = () => {
	emits("deleteOrder", props.id);
	isDelete.value = false;
};
const deleteProduct = (id: number) => {
	productsOrder.value = productsOrder.value.filter(
		(product: any) => product.id !== id
	);
	axios
		.put(
			`https://66c8aee08a477f50dc2ef867.mockapi.io/dzencode/orders/${props.id}`,
			{
				...props,
				products: productsOrder.value,
			}
		)
		.then((response) => {
			console.log("Order updated successfully:", response.data);
		})
		.catch((error) => {
			console.error("Error updating order:", error);
		});
};
const closeDelModal = () => {
	isDelete.value = false;
};
</script>

<template>
	<div class="back_modal" v-if="isDelete">
		<div class="modal_delete" v-click-outside="closeDelModal">
			<button class="modal_delete__close_btn" @click="closeDelModal">X</button>
			<h2 class="modal_delete__title">
				Вы уверены,что хотите удалить этот приход?
			</h2>
			<div class="wrap_order_delete" v-if="productsOrder.length !== 0">
				<div class="status_product"></div>
				<img
					v-if="productsOrder[0]"
					:src="productsOrder[0].photo"
					alt="order"
					class="wrap_order_delete__img"
				/>
				<img
					v-else
					src="https://brilliant24.ru/files/cat/template_01.png"
					alt="no-photo"
					class="wrap_order_delete__img"
				/>
				<p class="wrap_order_delete__title">
					{{ productsOrder[0].title }}
					<span>{{ productsOrder[0].serialNumber }}</span>
				</p>
			</div>
			<div v-else>
				<h2 class="notify_none_products">Тут нету продуктов!</h2>
			</div>
			<div class="wrap_buttons_delete">
				<button class="wrap_buttons_delete__close" @click="closeDelModal">
					Отменить
				</button>
				<button class="wrap_buttons_delete__del" @click="deleteOrder">
					<nuxt-icon name="delete" filled class="del_red"></nuxt-icon>Удалить
				</button>
			</div>
		</div>
	</div>
	<!--///////////////////// MODAL DELETE////////////////////// -->
	<div class="back_modal" v-if="isOpen">
		<div class="modal_products">
			<button
				class="close_btn"
				@click="
					() => {
						isOpen = false;
					}
				"
			>
				X
			</button>
			<h2 class="modal_products__title">{{ title }}</h2>
			<div class="wrap_add_product">
				<button class="wrap_add_product__button">+</button>
				<p class="wrap_add_product__text">Добавить продукт</p>
			</div>
			<ul class="list_products_order">
				<li v-for="item in productsOrder" class="list_products_order__li">
					<div class="li__wrap_img_title_product">
						<img :src="item.photo" alt="product" class="product_li__img" />
						<h2 class="product_li__title">
							{{ item.title }}
							<span>SN-{{ item.serialNumber }}</span>
						</h2>
					</div>
					<button class="delete_product_order" @click="deleteProduct(item.id)">
						<nuxt-icon name="delete" filled></nuxt-icon>
					</button>
				</li>
			</ul>
		</div>
	</div>
	<!--///////////////////// MODAL ////////////////////// -->
	<div class="wrap_order">
		<h2 class="wrap_order__title">{{ title }}</h2>
		<div class="wrap_more_count">
			<button
				class="wrap_order__button_more"
				@click="
					() => {
						isOpen = true;
					}
				"
			>
				<nuxt-icon name="more" filled></nuxt-icon>
			</button>
			<div class="wrap_count">
				{{ productsOrder.length }}
				<p>Продукта</p>
			</div>
		</div>
		<p class="wrap_order__date">{{ date }}</p>
		<p class="wrap_order__price">{{ price }} UAH</p>
		<button
			class="wrap_order__delete"
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
.wrap_order {
	width: 100%;
	padding: 1rem 3rem;
	border: 2px solid #eaeaea;
	border-radius: 6px;
	display: flex;
	align-items: center;
	justify-content: space-around;
}
.notify_none_products {
	font-family: Inter;
	font-size: 1.8rem;
	font-weight: 600;
	color: #212121;
	padding: 2rem;
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
.modal_products__title {
	font-family: Inter;
	font-size: 2rem;
	color: #212121;
	font-weight: 600;
	margin-bottom: 2rem;
	margin-left: 4rem;
	margin-top: 4rem;
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
.del_red:deep(path) {
	fill: #ca2a2a;
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
.close_btn {
	width: 4rem;
	height: 4rem;
	border-radius: 3rem;
	border: 1px solid #eaeaea;
	color: #212121;
	cursor: pointer;
	position: absolute;
	font-weight: 700;
	text-align: center;
	top: -2rem;
	right: -2rem;
	background-color: #ffffff;
	-webkit-box-shadow: 0px 12px 59px 30px rgba(66, 68, 90, 1);
	-moz-box-shadow: 0px 12px 59px 30px rgba(66, 68, 90, 1);
	box-shadow: 0px 12px 59px 5px rgba(66, 68, 90, 1);
}
.wrap_add_product {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.6rem;
	margin-left: 4rem;
}
.wrap_add_product__button {
	width: 2rem;
	height: 2rem;
	border-radius: 1rem;
	background-color: chartreuse;
	color: #ffffff;
	font-size: 2rem;
	font-weight: 600;
	font-family: Inter;
	text-align: center;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
}
.modal_delete__title {
	font-size: 1.8rem;
	font-family: Inter;
	color: #212121;
	font-weight: 600;
	margin-bottom: 3rem;
	padding: 2rem;
}
.wrap_add_product__text {
	font-family: Inter;
	font-size: 1.6rem;
	font-weight: 400;
	color: chartreuse;
}
.wrap_order_delete__img {
	max-width: 4rem;
	margin-right: 6rem;
}
.wrap_order_delete__title {
	font-family: Inter;
	font-size: 1.4rem;
	font-weight: 500;
	color: #212121;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
	text-decoration: underline;
}
.wrap_order_delete__title span {
	font-family: Inter;
	font-size: 1rem;
	font-weight: 400;
	opacity: 0.7;
	color: #212121;
	text-decoration: underline;
}
.status_product {
	width: 1rem;
	height: 1rem;
	border-radius: 0.5rem;
	background-color: chartreuse;
	margin-right: 4rem;
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
.wrap_order_delete {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	padding: 1rem 3rem;
}
.list_products_order {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
	gap: 1rem;
	margin-top: 3rem !important;
}

.list_products_order__li {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 6rem;
	width: 100%;
	max-height: 10rem;
	border-bottom: 1px solid #eaeaea;
}
.product_li__img {
	max-width: 5rem;
	margin-right: 3rem;
}
.product_li__title {
	font-size: 1.6rem;
	font-weight: 500;
	color: #212121;
	font-family: Inter;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
	margin-right: 5rem;
}
.product_li__title span {
	font-size: 1.2rem;
	font-weight: 400;
	color: #212121;
	opacity: 0.8;
	font-family: Inter;
}
.delete_product_order {
	cursor: pointer;
}
.li__wrap_img_title_product {
	display: flex;
	align-items: center;
	justify-content: center;
}
.modal_products {
	border-radius: 10px;
	background-color: #ffffff;
	width: 100%;
	max-width: 100rem;
	height: 60%;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
}
.wrap_more_count {
	display: flex;
	gap: 1rem;
	align-items: center;
	justify-content: center;
}
.wrap_order__title {
	font-family: Inter;
	font-size: 1.6rem;
	font-weight: 500;
	color: #212121;
	margin-right: 8rem;
}
.wrap_order__delete {
	cursor: pointer;
}
.wrap_order__date {
	color: #212121;
	font-family: Inter;
	font-size: 1.2rem;
	margin-right: 8rem;
}
.wrap_order__price {
	color: #212121;
	font-family: Inter;
	font-size: 1.4rem;
	margin-right: 7rem;
}
.wrap_order__button_more {
	width: 3rem;
	height: 3rem;
	border: 1px solid #eaeaea;
	border-radius: 6px;
}
.wrap_count {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-right: 3rem;
	font-family: Inter;
	color: #212121;
	font-size: 1.4rem;
}
.wrap_count p {
	font-family: Inter;
	color: #212121;
	opacity: 0.7;
	font-size: 1rem;
}
</style>
