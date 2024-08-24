<script lang="ts" setup>
const route = useRoute();
interface Tab {
	btnText: string;
	btnLink: string;
}
interface TabBarProps {
	tabArr?: Tab[];
}
const props = withDefaults(defineProps<TabBarProps>(), {
	tabArr: () => [
		{
			btnText: "Заказы",
			btnLink: "/",
		},
		{
			btnText: "Группы",
			btnLink: "/groups",
		},
		{
			btnText: "Продукты",
			btnLink: "/products",
		},
		{
			btnText: "Пользователи",
			btnLink: "/users",
		},
		{
			btnText: "Настройки",
			btnLink: "/settings",
		},
	],
});
</script>

<template>
	<nav>
		<NuxtLink
			v-for="link in tabArr"
			class="nav__link"
			:to="link.btnLink"
			:class="{ active: route.fullPath === link.btnLink }"
			>{{ link.btnText }}</NuxtLink
		>
	</nav>
</template>

<style scoped lang="scss">
.nav__link {
	color: #212121;
	font-size: 1.6rem;
	font-family: "Inter";
	text-transform: uppercase;
	font-weight: 600;
}
.nav__link.active {
	border-bottom: 3px greenyellow solid;
}
nav {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	gap: 1.4rem;
	flex-direction: column;
	width: 100%;
}
</style>
