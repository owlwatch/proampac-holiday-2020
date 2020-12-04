<template lang="pug">
ul#scene
  li(
    data-depth="0.05"
  )
    div.spotlight

  
  // JOY
  li(
    data-depth="0.3"
  )
    letter(
      :is_shadow="true"
      letter="j"
    )
  li(
    data-depth="0.3"
  )
    letter(
      :is_shadow="true"
      letter="o"
    )
  li(
    data-depth="0.3"
  )
    letter(
      :is_shadow="true"
      letter="y"
    )


  li(
    data-depth="0.4"
  )
    letter(
      letter="j"
    )
  li(
    data-depth="0.4"
  )
    letter(
      letter="o"
    )
  li(
    data-depth="0.4"
  )
    letter(
      letter="y"
    )

  // Snowflakes
  li(
    data-depth="0.6"
  )
    snowflake.snowflake-1

  li(
    data-depth="0.8"
  )
    snowflake.snowflake-2

  li(
    data-depth="0.5"
  )
    snowflake.snowflake-3

  // Chain
  li(
    data-depth="0.3"
  )
    .chain
      img(
        src="../../img/chain_full.png"
      )
</template>

<script>
import Parallax from 'parallax-js';
import Snowflake from './Snowflake';
import Letter from './Letter';
export default {
  components: {
    Snowflake,
    Letter
  },
  mounted(){
    this.instance = new Parallax(this.$el);
  },

  destroy(){
    if( this.instance ) this.instance.destroy();
  }
}
</script>

<style lang="scss">
body,html {
  height: 100%;
  position:relative;
  padding: 0;
  margin: 0;
  display: flex;
  width: 100%;
  overflow: hidden;
  background: #75aa8d;
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
#scene > li {
  position: absolute;
  margin: 0;
  padding: 0;
  list-style: none;
  width: 100%;
  height: 100%;
}
.spotlight {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60vw;
  height: 60vw;
  background: radial-gradient( rgba(255,255,255,0.4), rgba(255,255,255,0) 50%);
  transform: translate(-50%,-50%);
}
.snowflake-1 {
  margin-left: -5rem;
  width: 10rem;
  animation: swinging 4s ease-in-out forwards infinite;
  .rope {
    height: 15rem;
  }
}
.snowflake-2 {
  margin-left: 15rem;
  width: 14rem;
  animation: swinging 4.5s -1s ease-in-out backwards infinite;
  .rope {
    height: 15rem;
  }
}
.snowflake-3 {
  margin-left: -26rem;
  width: 8rem;
  animation: swinging 4.5s -3s ease-in-out backwards infinite;
  .rope {
    height: 20rem;
  }
}

.chain {
  position: absolute;
  bottom: 2rem; left: 50%;
  width: 60rem;
  transform: translate(-50%, 0%);
  img {
    width: 100%;
    max-width: 100vw;
  }
}
@keyframes swinging{
    0%{transform: rotate(10deg);}
    50%{transform: rotate(-5deg)}
    100%{transform: rotate(10deg);}
}
</style>