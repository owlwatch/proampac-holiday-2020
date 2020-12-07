<template lang="pug">
ul#scene(:class="{ transition }", :data-scene="scene")
	//Background
	li.background
		.layer(data-depth="0.05")
			.spotlight
		.layer(data-depth="0.1")
			.ground
		.layer(data-depth="0.1")
			.horizon

	// JOY 
	li.joy-word
		.layer(data-depth="0.3", data-letter="j")
			letter(:is_shadow="true", letter="j")
		.layer(data-depth="0.3", data-letter="o")
			letter(:is_shadow="true", letter="o")
		.layer(data-depth="0.3", data-letter="y")
			letter(:is_shadow="true", letter="y")

		.layer(data-depth="0.4", data-letter="j")
			letter(letter="j")
		.layer(data-depth="0.4", data-letter="o")
			letter(letter="o")
		.layer(data-depth="0.4", data-letter="y")
			letter(letter="y")

	// Snowflakes
	li.snowflakes
		.layer(data-depth="0.6")
			snowflake.snowflake-1

		.layer(data-depth="0.8")
			snowflake.snowflake-2

		.layer(data-depth="0.5")
			snowflake.snowflake-3

		.layer(data-depth="0.6")
			snowflake.snowflake-4

		.layer(data-depth="0.8")
			snowflake.snowflake-5

		.layer(data-depth="0.5")
			snowflake.snowflake-6

		.layer(data-depth="0.5")
			snowflake.snowflake-7

		.layer(data-depth="0.5")
			snowflake.snowflake-8

	// Message
	li.message
		.message-copy
			p Joy is appreciating what makes us unique, and celebrating our similarities,
				|
				| together, through community.

			p Happy Holidays to you and yours from ProAmpac.

	// Chain
	li.layer.chain-people(data-depth="0.5")
		.chain
			img(src="../../img/chain_full.png")
	
	li.arrows
		button.arrow.up(@click="onArrow('up')")
			span.material-icons keyboard_arrow_up
		button.arrow.down(@click="onArrow('down')")
			span.material-icons keyboard_arrow_down
		button.arrow.right(@click="onArrow('right')")
			span.material-icons keyboard_arrow_right
		button.arrow.left(@click="onArrow('left')")
			span.material-icons keyboard_arrow_left

	// last page
	li.learn-more
		.header
			a.proampac-logo(
				href="https://prompac.com/" target="_blank"
			)
				img(
					src="../../img/proampac-logo.svg"
				)
			a.nep-logo(
				href="https://nepassage.org/" target="_blank"
			)
				img(
					src="../../img/NEP-logo.svg"
				)
		.main-area
			.video-background
				video(playsinline autoplay muted loop poster="../../img/video-thumb.jpg")
					source(src="../../img/NEP15_v3.mp4" type="video/webm")
			
			.copy
				p.leading <strong>ProAmpac</strong> and <strong>Northeast Passage</strong> are doing good things every day.
				p We support <strong>Northeast Passage</strong> in their mission of helping together
					|  to provide barrier free recreation and health promotion programs for people with
					|  disabling conditions.

				p Learn more about Northeast Passage at <a href="https://nepassage.org" target="_blank">www.nepassage.org</a>.
		

</template>

<script>
import Parallax from "parallax-js";
import Snowflake from "./Snowflake";
import Letter from "./Letter";
import SwipeListener from "swipe-listener";
export default {
	data() {
		return {
			scene: 0,
			transition: false,
		};
	},

	components: {
		Snowflake,
		Letter,
	},

	mounted() {
		this.parallax = new Parallax(this.$el, {
			selector: ".layer",
		});
		this.swipeListener = new SwipeListener(document.body);
		this.swipeCallback = (e) => this.onSwipe(e);
		this.wheelCallback = (e) => this.onWheel(e);
		this.keyupCallback = (e) => this.onKeyup(e);
		this.wheelEvent = 'onwheel' in document ? 'wheel' : 'mousewheel'
		window.addEventListener("swipe", this.swipeCallback, false);
		window.addEventListener("keyup", this.keyupCallback, false);
		window.addEventListener(this.wheelEvent, this.wheelCallback, false);
		this.scene = 1;
	},

	destroy() {
		if (this.instance) {
			this.instance.destroy();
		}
		if (this.swipeListener) {
			this.swipeListener.off();
			delete this.swipeListener;
			window.removeEventListener("swipe", this.swipeCallback);
			window.removeEventListener("keyup", this.keyupCallback);
			window.removeEventListener(this.wheelEvent, this.wheelCallback);
		}
	},

	watch: {
		scene(current, last) {
			if( current == undefined ){
				return;
			}
			this.transition = true;
			setTimeout(() => (this.transition = false), 2000);
			this.disableArrows(['up','down','left','right']);

			switch (last) {
				case 1:
					const flakes = this.$el.querySelectorAll(".snowflakes > .layer");
					for (let flake of flakes) {
						if (flake.classList.contains("active")) {
							flake.style.transitionDuration = 1 - Math.random() * 2 + 2 + "s";
							setTimeout(() => flake.classList.remove("active"), 0);
						}
					}

					["j", "o", "y"].forEach((letter) => {
						const joy = this.$el.querySelectorAll(
							`.joy-word [data-letter="${letter}"]`
						);
						const duration = 1 - Math.random() * 2 + 2 + "s";
						for (let letter of joy) {
							if (letter.classList.contains("active")) {
								letter.style.transitionDuration = duration;
								setTimeout(() => letter.classList.remove("active"), 1);
							}
						}
					});
					
					break;

				case 2:
					this.$el.querySelector(".message").classList.remove("active");
					this.$el.querySelector(".background").classList.remove("active");

				case 3:
					// this.$el.querySelector('.chain').classList.remove('active');
			}
			setTimeout(() => {
				switch (current) {
					case 1:
						this.$el.querySelector(".background").classList.add("active");
						this.$el.querySelector(".message").classList.remove("active");
						this.$el.querySelector(".chain").classList.add("active");
						const flakes = this.$el.querySelectorAll(".snowflakes .layer");
						for (let flake of flakes) {
							if (!flake.classList.contains("active")) {
								flake.style.transitionDuration =
									1 - Math.random() * 2 + 2 + "s";
								flake.classList.add("active");
							}
						}

						["j", "o", "y"].forEach((letter) => {
							const joy = this.$el.querySelectorAll(
								`.joy-word [data-letter="${letter}"]`
							);
							const duration = 1 - Math.random() * 1 + 2 + "s";
							for (let letter of joy) {
								if (!letter.classList.contains("active")) {
									letter.style.transitionDuration = duration;
									letter.classList.add("active");
								}
							}
						});
						setTimeout( () => {
							this.enableArrows(['down']);
						}, 1500);
						break;

					case 2:
						this.$el.querySelector(".background").classList.add("active");
						this.$el.querySelector(".chain").classList.add("active");
						this.$el.querySelector(".message").classList.add("active");
						this.enableArrows(['up','right']);
						break;

					case 3:
						this.enableArrows(['left']);
						break;
				}
			}, 500);
		},
	},

	methods: {
		onSwipe(e) {
			if (this.transition) {
				return;
			}
			const flakes = this.$el.querySelectorAll(".snowflakes > *");
			for (let flake of flakes) {
				if (!flake.classList.contains("off")) {
					flake.style.transitionDuration = 3 - Math.random() * 3 + 3 + "s";
					flake.classList.add("off");
				}
			}
		},
		disableArrows( directions ){
			directions.forEach( dir => {
				const arrow = this.$el.querySelector(`.arrow.${dir}`);
				arrow.disabled = true;
				arrow.classList.remove('active');
			});
		},
		enableArrows( directions ){
			directions.forEach( dir => {
				const arrow = this.$el.querySelector(`.arrow.${dir}`);
				arrow.disabled = false;
				arrow.classList.add('active');
			});
		},
		onKeyup(e) {
			if (this.transition) {
				return;
			}

			switch (e.key) {
				case "Up":
				case "ArrowUp":
					if (this.scene == 2) {
						this.scene = 1;
					}
					break;
				case "Down":
				case "ArrowDown":
					if (this.scene == 1) {
						this.scene = 2;
					}
					break;
				case "Right":
				case "ArrowRight":
					if (this.scene == 2) {
						this.scene = 3;
					}
					break;
				case "Left":
				case "ArrowLeft":
					if (this.scene == 3) {
						this.scene = 2;
					}
					break;
			}
		},
		onWheel(e) {
			if (this.transition) {
				return;
			}
			console.log(e);
			if (e.wheelDelta && !('deltaX' in e) ) {
				let normalized = (e.wheelDelta % 120 - 0) == -0 ? e.wheelDelta / 120 : e.wheelDelta / 12;
				if( normalized > 1 ){
					if( this.scene + 1 < 3){
						this.scene++;
					}
				}
				else {
					if( this.scene > 1 ){
						this.scene--;
					}
				}
			} else {
				let rawAmount = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
				let axis = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? 'x' : 'y';
				let dir;
				if( Math.abs(rawAmount) < 0.5){
					return;
				}
				if( axis == 'x'){
					dir = e.deltaX<0?'right':'left';	
					// this.onArrow(e.deltaX<0?'right':'left')
				}
				else if( axis == 'y'){
					dir = e.deltaY<0?'up':'down'
					// this.onArrow(e.deltaY<0?'down':'up')
				}
				console.log(axis, dir, e.deltaX, e.deltaY);
			}
			
		},
		onArrow(dir){
			if( this.transition ){
				return;
			}
			switch (dir) {
				case "up":
					if (this.scene == 2) {
						this.scene = 1;
					}
					break;
				case "down":
					if (this.scene == 1) {
						this.scene = 2;
					}
					break;
				case "right":
					if (this.scene == 2) {
						this.scene = 3;
					}
					break;
				case "left":
					if (this.scene == 3) {
						this.scene = 2;
					}
					break;
			}
		}
	},
};
</script>

<style lang="scss">
@import "~rfs/scss";
body,
html {
	font-family: filosofia, serif;
	height: 100%;
	position: relative;
	padding: 0;
	margin: 0;
	display: flex;
	width: 100%;
	background: #6ca98e;
	overflow: hidden;
	font-size: 16px;
}
a {
	color: #fff;
	text-decoration: none;
}
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
#scene {
	height: 100%;
	width: 100%;
	position: relative;
	color: #fff;
}

.joy-word,
.snowflakes {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
.joy-word,
.snowflakes {
	> .layer {
		transition: 2s margin-top;
		width: 100%;
		height: 100%;
		position: absolute;
		&:not(.active) {
			margin-top: -100vh;
			transition-timing-function: ease-out;
		}
	}
}

#scene > li {
	list-style: none;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
.background {
	.layer {
		transition: 1s opacity;
	}
	&:not(.active) {
		.layer {
			opacity: 0;
		}	
	}
}
.learn-more {
	display: flex;
	flex-direction: column;
	transition: 1s opacity;
	transition-delay: 0s !important;
	top: -100vh;
	opacity: 0;
	[data-scene="3"] & {
		transition-delay: 1s;
		opacity: 1;
		top: auto;
		
	}
	.header {
		pointer-events: auto;
		background: #fff;
		padding-top: 1rem;
		padding-bottom: 1rem;
		flex-shrink: 0;
		text-align: center;
		height: 10rem;
		display: flex;
		justify-content: center;
		align-items: center;
		@include font-size(1.5rem);
		img {
			height: 5em;
			width: auto;
		}
		a + a {
			margin-left: 1em;
		}
		.proampac-logo img {
			height: 2.6em;
		}
	}
	.main-area {
		flex: 1;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		&:after {
			content: '';
			display: block;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0,0,0,0.4);
			mix-blend-mode: multiply;
		}
		.copy {
			font-weight: 300;
			pointer-events: auto;
			font-family: "Proxima Nova", sans-serif;
			position: relative;
			z-index: 100;
			max-width: 80vw;
			width: 40em;
			text-shadow: 0 1px 10px rgba(#000, 0.4);
			@include font-size(2rem);
			p { 
				margin-bottom: 1em;
			}
			.leading {
				font-size: 1.1em;
			}
		}
	}
	.video-background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		transition: 1s opacity;
		[data-scene="3"] & {
			opacity: 1;
		}
		video {
			object-fit: cover;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
		}
	}
}
.ground {
	position: absolute;
	left: -5vw;
	width: 110vw;
	top: 75vh;
	height: 30vh;
	background: rgba(0, 0, 0, 0.2);
	box-shadow: 0 0 100px rgba(0, 0, 0, 0.4);
	mix-blend-mode: multiply;
}
.horizon {
	position: absolute;
	left: -50vw;
	width: 200vw;
	top: 67vh;
	height: 8vh;
	border-radius: 50%;
	mix-blend-mode: multiply;
	background: radial-gradient(
		rgba(255, 255, 255, 0.2),
		rgba(255, 255, 255, 0) 50%
	);
}
.background > .layer {
	width: 100%;
	height: 100%;
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
	@media( max-width: 700px ){
		@include rfs(4rem, width);
	}
	animation: swinging 4.5s -2s ease-in-out backwards infinite;
	.rope {
		@include rfs(12rem, height);
	}
}
.snowflake-2 {
	@include margin-left(-45rem);
	@include rfs(15rem, width);
	@media( max-width: 700px ){
		@include rfs(7rem, width);
	}
	animation: swinging 6.5s -2s ease-in-out backwards infinite;
	.rope {
		@include rfs(20rem, height);
		@media( max-width: 700px ){
			@include rfs(32rem, height);
		}
	}
}
.snowflake-3 {
	@include margin-left(-30rem);
	width: 10rem;
	@media( max-width: 700px ){
		@include rfs(8rem, width);
	}
	animation: swinging 4s -0.5s ease-in-out forwards infinite;
	.rope {
		height: 10rem;
		@media( max-width: 700px ){
			@include rfs(30rem, height);
		}
	}
}

.snowflake-4 {
	@include margin-left(-12rem);
	width: 8rem;
	@media( max-width: 700px ){
		@include rfs(10rem, width);
	}
	animation: swinging 5.5s -3s ease-in-out backwards infinite;
	.rope {
		height: 12rem;
		@media( max-width: 700px ){
			@include rfs(28rem, height);
		}
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
	@include rfs(9rem, width);
	animation: swinging 4.5s -1.3s ease-in-out backwards infinite;
	.rope {
		@include rfs(12rem, height);
	}
}
.chain-people {
	width: 100%;
	height: 100%;
}
.chain {
	position: absolute;
	bottom: 3rem;
	left: 50%;
	width: 80rem;
	transform: translate(-50%, 0%);
	transition: 2s margin-bottom ease-in-out;
	&:not(.active) {
		margin-bottom: -150%;
	}
	img {
		width: 100%;
		max-width: 100vw;
	}
}
.message {
	@include font-size(2.5rem);
	&:not(.active) &-copy {
		opacity: 0;
		margin-top: 3em;
	}
	&-copy {
		transition: margin 1s, opacity 1s;
		position: absolute;
		top: 25%;
		left: 50%;
		transform: translateX(-50%);
		width: 90vw;
		max-width: 30em;
		text-shadow: 0 1px 10px rgba(#000, 0.1);
		p {
			margin-bottom: 1em;
		}
	}
}

.arrows {
	z-index: 99;
	.arrow {
		position: absolute;
		pointer-events: auto;
		background: #fff;
		border: 0;
		border-radius: 50%;
		@include rfs(3rem, width);
		@include rfs(3rem, height);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: 1s margin, 1s opacity;
		opacity: 1;
		box-shadow: 0 0 15px rgba(#000, 0.1);
		cursor: pointer;
		span {
			@include font-size(2.5rem);
			color: #24583C;
		}
		&:not(.active){
			opacity: 0;
			pointer-events: none;
		}
		&.up,&.down {
			left: 50%;
			transform: translateX(-50%);
		}
		&.left,&.right {
			top: 50%;
			transform: translateY(-50%);
		}
		&.up {
			top: 1rem;
			&:not(.active){
				margin-top: -150%;
			}
		}
		&.down {
			bottom: 1rem;
			&:not(.active){
				margin-bottom: -150%;
			}
		}
		&.left {
			left: 1rem;
			&:not(.active){
				margin-left: -150%;
			}
		}
		&.right {
			right: 1rem;
			&:not(.active){
				margin-right: -150%;
			}
		}
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