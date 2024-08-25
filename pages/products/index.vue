<script lang="ts" setup>
import axios from "axios";
const products = ref();
const productsCount = ref();
onMounted(() => {
	axios
		.get("https://66c8aee08a477f50dc2ef867.mockapi.io/dzencode/products")
		.then((response) => {
			products.value = response.data;
			productsCount.value = response.data.length;
			console.log(response.data);
		})
		.catch((error) => {
			console.error("Error fetching data:");
		});
});
const deleteProductFunc = (id: number) => {
	axios
		.delete(
			`https://66c8aee08a477f50dc2ef867.mockapi.io/dzencode/products/${id}`
		)
		.then((response) => {
			console.log(response.data);
			products.value = products.value.filter((prod: any) => prod.id !== id);
		})
		.catch((error) => {
			console.error("Error fetching data:");
		});
};
</script>

<template>
	<div class="wrap_products">
		<h1 class="title_page_products">Продукты / {{ productsCount }}</h1>
		<ul class="list_products">
			<GroupProduct
				v-for="prod in products"
				:title="prod.title"
				:id="prod.id"
				:photo="prod.photo"
				:type="prod.type"
				:date="prod.date"
				:price="prod.price"
				:status="prod.isNew"
				:serialNumber="prod.serialNumber"
				:guarantee="prod.guarantee"
				:specification="prod.specification"
				@delete-product="deleteProductFunc"
			></GroupProduct>
		</ul>
	</div>
</template>

<style scoped lang="scss">
.title_page_products {
	font-family: Inter;
	font-weight: 600;
	font-size: 2.4rem;
	color: #212121;
	margin-left: 1rem;
}
.list_products {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
	gap: 1rem;
	max-height: 40rem;
	overflow-x: auto;
}
.wrap_products {
	padding: 6rem 10rem;
	background-color: #ffffff;
	width: 100%;
	z-index: 1;
	height: 100vh;
}
</style>
