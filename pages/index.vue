<script lang="ts" setup>
import axios from "axios";

const orders = ref();
const ordersCount = ref();
onMounted(() => {
	axios
		.get("https://66c8aee08a477f50dc2ef867.mockapi.io/dzencode/orders")
		.then((response) => {
			orders.value = response.data;
			ordersCount.value = response.data.length;
			console.log(response.data);
		})
		.catch((error) => {
			console.error("Error fetching data:");
		});
});
const handleDeleteOrder = (id: number) => {
	console.log("Deleted order ID:", id);
	axios
		.delete(`https://66c8aee08a477f50dc2ef867.mockapi.io/dzencode/orders/${id}`)
		.then((response) => {
			console.log(response.data);
			orders.value = orders.value.filter((order: any) => order.id !== id);
		})
		.catch((error) => {
			console.error("Error fetching data:");
		});
};
</script>

<template>
	<div class="wrap_orders">
		<div class="wrap_add_counts">
			<button class="wrap_add_counts__button">+</button>
			<p class="wrap_add_counts__count">Приходы / {{ ordersCount }}</p>
		</div>
		<ul class="list_orders">
			<GroupOrder
				v-for="item in orders"
				:title="item.title"
				:products="item.products"
				:date="item.date"
				:price="item.price"
				:id="item.id"
				@delete-order="handleDeleteOrder"
			></GroupOrder>
		</ul>
	</div>
</template>

<style scoped lang="scss">
.wrap_orders {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
	padding: 6rem 10rem;
	width: 100%;
	z-index: 1;
	height: 100vh;
	background-color: #ffffff;
}
.list_orders {
	display: flex;
	width: 100%;
	justify-content: flex-start;
	align-items: flex-start;
	gap: 1rem;
	flex-direction: column;
	max-height: 50rem;
	overflow-x: auto;
}
.list_orders::-webkit-scrollbar {
	width: 0.7rem;
}
.list_orders::-webkit-scrollbar-track {
	width: 0.7rem;
}
.list_orders::-webkit-scrollbar-thumb {
	width: 0.7rem;
	border-radius: 0.35rem;
	border: 1px solid rgba(255, 255, 255, 0.15);
	background: var(--Stroke-medium-grey-stroke, #d5d6de);
}
.wrap_add_counts {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	margin-bottom: 4rem;
}
.wrap_add_counts__button {
	border: 4px #648963 solid;
	height: 4rem;
	width: 4rem;
	border-radius: 2rem;
	background-color: #85bd84;
	color: #ffffff;
	font-weight: 600;
	cursor: pointer;
	font-family: Inter;
}
.wrap_add_counts__count {
	font-family: Inter;
	font-weight: 600;
	font-size: 2.4rem;
	color: #212121;
	margin-left: 1rem;
}
</style>
