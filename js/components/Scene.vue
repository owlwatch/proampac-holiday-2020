<template lang="pug">
ul#scene
	//Background
	li.slide1.slide2(data-depth="0.05")
		.spotlight
	li.slide1.slide2(data-depth="0.1")
		.ground
	li.slide1.slide2(data-depth="0.1")
		.horizon

	// JOY
	li.slide1(data-depth="0.3")
		letter(:is_shadow="true", letter="j")
	li.slide1(data-depth="0.3")
		letter(:is_shadow="true", letter="o")
	li.slide1(data-depth="0.3")
		letter(:is_shadow="true", letter="y")

	li.slide1(data-depth="0.4")
		letter(letter="j")
	li.slide1(data-depth="0.4")
		letter(letter="o")
	li.slide1(data-depth="0.4")
		letter(letter="y")

	// Snowflakes
	li.slide1(data-depth="0.6")
		snowflake.snowflake-1

	li.slide1(data-depth="0.8")
		snowflake.snowflake-2

	li.slide1(data-depth="0.5")
		snowflake.snowflake-3

	li.slide1(data-depth="0.6")
		snowflake.snowflake-4

	li.slide1(data-depth="0.8")
		snowflake.snowflake-5

	li.slide1(data-depth="0.5")
		snowflake.snowflake-6
	
	li.slide1(data-depth="0.5")
		snowflake.snowflake-7
	
	li.slide1(data-depth="0.5")
		snowflake.snowflake-8

	// Chain
	li.slide1(data-depth="0.5")
		.chain
			img(src="../../img/chain_full.png")
</template>

<script>
import Parallax from "parallax-js";
import Snowflake from "./Snowflake";
import Letter from "./Letter";
export default {

	data(){
		return {
			scene: 1
		}
	},

	components: {
		Snowflake,
		Letter,
	},

	mounted() {
		this.instance = new Parallax(this.$el);
		document.addEventListener('mousewheel', e => this.onMousewheel(e), false);
	},

	destroy() {
		if (this.instance) this.instance.destroy();
	},

	methods: {
		onMousewheel(e){
			
		}
	}
};
</script>

<style lang="scss">
@import "~rfs/scss";
body,
html {
	height: 100%;
	position: relative;
	padding: 0;
	margin: 0;
	display: flex;
	width: 100%;
	background: #6CA98E;
	overflow: hidden;
}
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
#scene {
	height: 100%;
	width: 100%;
	overflow: hidden;
	position: relative;
	color: #fff;
}

#scene > li {
	position: absolute;
	margin: 0;
	padding: 0;
	list-style: none;
	width: 100%;
	height: 100%;
}
.ground {
	position: absolute;
	left: -5vw;
	width: 110vw;
	top: 85vh;
	height: 20vh; 
	background: rgba(0,0,0,0.2);
	box-shadow: 0 0 100px rgba(0,0,0,0.4);
	mix-blend-mode: multiply;
}
.horizon {
	position: absolute;
	left: -50vw;
	width: 200vw;
	top: 77vh;
	height: 8vh; 
	border-radius: 50%;
	mix-blend-mode: multiply;
	background: radial-gradient(
		rgba(255, 255, 255, 0.2),
		rgba(255, 255, 255, 0) 50%
	);
}
.spotlight {
	position: absolute;
	top: 50%;
	left: 50%;
	width: 60vw;
	height: 60vw;
	background: radial-gradient(
		rgba(255, 255, 255, 0.4),
		rgba(255, 255, 255, 0) 50%
	);
	transform: translate(-50%, -50%);
}
.snowflake-1 {
	@include margin-left(-52rem);
	@include rfs(9rem, width);
	animation: swinging 4.5s -2s ease-in-out backwards infinite;
	.rope {
		@include rfs(12rem, height);
	}
}
.snowflake-2 {
	@include margin-left(-45rem);
	@include rfs(15rem, width);
	animation: swinging 6.5s -2s ease-in-out backwards infinite;
	.rope {
		@include rfs(20rem, height);
	}
}
.snowflake-3 {
	@include margin-left(-30rem);
	width: 10rem;
	animation: swinging 4s -0.5s ease-in-out forwards infinite;
	.rope {
		height: 10rem;
	}
}

.snowflake-4 {
	@include margin-left(-16rem);
	width: 8rem;
	animation: swinging 5.5s -3s ease-in-out backwards infinite;
	.rope {
		height: 20rem;
	}
}

.snowflake-5 {
	@include margin-left(0rem);
	width: 10rem;
	animation: swinging 4s ease-in-out forwards infinite;
	.rope {
		height: 15rem;
	}
}
.snowflake-6 {
	@include margin-left(15rem);
	width: 14rem;
	animation: swinging 8.5s -1s ease-in-out backwards infinite;
	.rope {
		height: 15rem;
	}
}

.snowflake-7 {
	@include margin-left(34rem);
	width: 12rem;
	animation: swinging 4.5s -2.5s ease-in-out backwards infinite;
	.rope {
		@include rfs(24rem, height);
	}
}

.snowflake-8 {
	@include margin-left(45rem);
	@include rfs( 9rem, width);
	animation: swinging 4.5s -1.3s ease-in-out backwards infinite;
	.rope {
		@include rfs(12rem, height);
	}
}


.chain {
	position: absolute;
	bottom: 3rem;
	left: 50%;
	width: 90rem;
	transform: translate(-50%, 0%);
	img {
		width: 100%;
		max-width: 100vw;
	}
}
@keyframes swinging {
	0% {
		transform: rotate(5deg);
	}
	50% {
		transform: rotate(-5deg);
	}
	100% {
		transform: rotate(5deg);
	}
}
</style>