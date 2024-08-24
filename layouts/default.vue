<script lang="ts" setup>
const date = new Date();
const months = [
	"JAN",
	"FEB",
	"MAR",
	"APR",
	"MAY",
	"JUN",
	"JUL",
	"AUG",
	"SEP",
	"OCT",
	"NOV",
	"DEC",
];

const monthName = months[date.getMonth()];
const year = date.getFullYear();
const hours = date.getHours();
const minutes = date.getMinutes();
const day = date.getDate();
console.log(year);
</script>

<template>
	<header>
		<h2 class="logo">INVENTORY</h2>
		<div class="wrap_time">
			<p class="wrap_time__day">Today</p>
			<p class="wrap_time__date">
				{{ day }} {{ monthName }} , {{ year }}

				<span
					><nuxt-icon name="clock" filled class="clock_icon"></nuxt-icon
					>{{ hours }}:{{ minutes }}</span
				>
			</p>
		</div>
	</header>
	<div class="wrap_sidebar_slot">
		<div class="sidebar">
			<div class="wrap_settings">
				<img
					src="../assets/img/AVATARKA.jpg"
					alt="avatar"
					class="sidebar__avatar"
				/>
				<div class="settings">
					<nuxt-icon name="setting" filled></nuxt-icon>
				</div>
			</div>
			<NavBar></NavBar>
		</div>
		<slot></slot>
	</div>
</template>

<style scoped lang="scss">
header {
	height: 8rem;
	background-color: #ffffff;
	width: 100%;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1rem 8rem;
	// -webkit-box-shadow: 0px 12px 16px -8px rgba(66, 68, 90, 1);
	// -moz-box-shadow: 0px 12px 16px -8px rgba(66, 68, 90, 1);
	// box-shadow: 0px 12px 16px -8px rgba(66, 68, 90, 1);
}
.wrap_settings {
	position: relative;
	margin-bottom: 2rem;
}
.nav__link {
	color: #212121;
	font-size: 1.6rem;
	font-family: "Inter";
	text-transform: uppercase;
	font-weight: 600;
}
nav {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	gap: 1.4rem;
	flex-direction: column;
	width: 100%;
}
.logo {
	color: #6af081;
	font-size: 2rem;
	font-family: "Poppins";
}
.settings {
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	height: 5rem;
	padding: 1.4rem;
	width: 5rem;
	background-color: #ffffff;
	position: absolute;
	right: -1rem;
	cursor: pointer;
	bottom: 0rem;
}
.wrap_time {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
}
.sidebar__avatar {
	border-radius: 8rem;
	max-width: 12rem;
}
.wrap_time__day {
	color: #212121;
	font-size: 1.2rem;
	font-family: "Poppins";
	margin-bottom: 0.4rem;
}
.wrap_time__date {
	color: #212121;
	font-size: 1rem;
	font-weight: 600;
	font-family: "Poppins";
	display: flex;
}
.wrap_time__date span {
	color: #212121;
	font-size: 1rem;
	font-weight: 600;
	font-family: "Poppins";
	display: flex;
	margin-left: 0.6rem;
	gap: 0.4rem;
}
.wrap_sidebar_slot {
	display: flex;
	width: 100%;
	align-items: flex-start;
	justify-content: flex-start;
}
.sidebar {
	width: 100%;
	max-width: 16rem;
	background-color: #fdfdfd;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 6rem 1rem;
	-webkit-box-shadow: 14px 0px 12px -8px rgba(66, 68, 90, 1);
	-moz-box-shadow: 14px 0px 12px -8px rgba(66, 68, 90, 1);
	box-shadow: 14px 0px 12px -8px rgba(66, 68, 90, 1);
}
</style>
