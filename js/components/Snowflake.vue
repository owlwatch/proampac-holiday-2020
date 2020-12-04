<!-- Pug Template -->
<template lang="pug">
.snowflake.snowflake-1
	.rope
	img.flake(
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
		max-width: 100%;
	}
}
</style>