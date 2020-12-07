<!-- Pug Template -->
<template lang="pug">
.snowflake
	.rope
	.flake
		img(
			src="../../img/snowflake.svg"
		)

</template>

<!-- Script -->
<script>
export default {
};
</script>

<!-- SCSS Style -->
<style lang="scss">
.snowflake {
	position: absolute;
	transform-origin: 50% 0;
	top: -10rem;
	left: 50%;
	.rope {
		position: relative;
		width: 2px;
		background: rgba(#fff,0.4);
		left: 50%;
		margin-left: -2px;
	}
	.flake {
		perspective: 800px;
		img {
			display: block;
			max-width: 100%;
			animation: leftright 4.5s ease-in-out backwards infinite;
			transform-origin: 50% 50%;
			max-width: 100%;
		}
		
	}
}

@keyframes leftright {
	0% {
		transform: rotateY(10deg);
	}
	50% {
		transform: rotateY(-10deg);
	}
	100% {
		transform: rotateY(10deg);
	}
}
</style>