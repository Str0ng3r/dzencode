<script lang="ts" setup>
import axios from "axios";
const products = ref();
const productsCount = ref();
const sortOrder = ref("asc");
const blockCheck = ref();
const monitorCheck = ref();

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
			productsCount.value = products.value.length;
		})
		.catch((error) => {
			console.error("Error fetching data:");
		});
};

const sortedProducts = computed(() => {
	if (!products.value || products.value.length === 0) {
		return [];
	}

	let filteredProducts = products.value;

	// Фильтрация по типу продукта
	if (monitorCheck.value) {
		filteredProducts = filteredProducts.filter(
			(product: any) => product.type === "Monitor"
		);
	}

	if (blockCheck.value) {
		filteredProducts = filteredProducts.filter(
			(product: any) => product.type === "Block"
		);
	}
	if (blockCheck.value & monitorCheck.value) {
		filteredProducts = products.value;
	}

	// Сортировка по цене
	return filteredProducts.sort((a: any, b: any) => {
		if (sortOrder.value === "asc") {
			return a.price[1].value - b.price[1].value;
		} else {
			return b.price[1].value - a.price[1].value;
		}
	});
});

const toggleSortOrder = () => {
	sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
};
</script>

<template>
	<div class="wrap_products">
		<h1 class="title_page_products">Продукты / {{ productsCount }}</h1>
		<button @click="toggleSortOrder" class="sort_button">
			Цена
			<nuxt-icon name="arrow" filled v-if="sortOrder === 'asc'"></nuxt-icon>
			<nuxt-icon name="arrowd" filled v-else></nuxt-icon>
		</button>
		<div class="wrap_checkbox_sort">
			<div class="wrap_checkbox">
				<p>Блоки</p>
				<input type="checkbox" v-model="blockCheck" />
			</div>
			<div class="wrap_checkbox">
				<p>Мониторы</p>
				<input type="checkbox" v-model="monitorCheck" />
			</div>
		</div>
		<ul class="list_products">
			<GroupProduct
				v-for="prod in sortedProducts"
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
.wrap_checkbox {
	display: flex;
	flex-direction: column;
}
.wrap_checkbox p {
	font-family: Inter;
	font-size: 1.6rem;
	font-weight: 500;
	color: #212121;
}
.wrap_checkbox_sort {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	margin-top: 1rem;
	margin-bottom: 1rem;
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
.list_products::-webkit-scrollbar {
	width: 0.7rem;
}
.list_products::-webkit-scrollbar-track {
	width: 0.7rem;
}
.list_products::-webkit-scrollbar-thumb {
	width: 0.7rem;
	border-radius: 0.35rem;
	border: 1px solid rgba(255, 255, 255, 0.15);
	background: var(--Stroke-medium-grey-stroke, #d5d6de);
}
.sort_button {
	font-family: Inter;
	font-size: 1.8rem;
	color: #212121;
	font-weight: 600;
	margin-top: 2rem;
	margin-bottom: 2rem;
	padding: 1rem;
	border: 2px solid #666666;
	background-color: #d1d1d1;
	cursor: pointer;
	border-radius: 4px;
	display: flex;
	align-items: center;
}
.wrap_products {
	padding: 6rem 10rem;
	background-color: #ffffff;
	width: 100%;
	z-index: 1;
	height: 100vh;
}
</style>
