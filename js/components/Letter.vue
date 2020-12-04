<!-- Pug Template -->
<template lang="pug">
.letter(:class="letter")
  .letter-shadow-container(
    v-if="is_shadow"
  )
    img.letter-rope(
      :src="string"
    )
    img.letter-alpha(
      :src="shadow"
    )
  .letter-container(
    v-if="!is_shadow"
  )
    img.letter-rope(
      :src="string"
    )
    img.letter-alpha(
      :src="alpha"
    )
  
</template>

<!-- Script -->
<script>
import string_j from '../../img/Joy_J-string.png';
import string_o from '../../img/Joy_O-string.png';
import string_y from '../../img/Joy_Y-string.png';

import paper_j from '../../img/Joy_J-paper.png';
import paper_o from '../../img/Joy_O-paper.png';
import paper_y from '../../img/Joy_Y-paper.png';

import shadow_j from '../../img/Joy_J-shadow.png';
import shadow_o from '../../img/Joy_O-shadow.png';
import shadow_y from '../../img/Joy_Y-shadow.png';

const strings = {
  j: string_j,
  o: string_o,
  y: string_y
};

const alphas = {
  j: paper_j,
  o: paper_o,
  y: paper_y
};

const shadows = {
  j : shadow_j,
  o : shadow_o,
  y : shadow_y
};

export default {
  props : {
    letter: {
      type: String
    },
    is_shadow: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    alpha(){
      return alphas[this.letter]
    },
    string(){
      return strings[this.letter];
    },
    shadow(){
      return shadows[this.letter];
    }
  }
};
</script>

<!-- SCSS Style -->
<style lang="scss">
.letter {
  $baseLetterWidth: 14rem;
  width: $baseLetterWidth;
  perspective: 1200px;
  position: absolute;
  bottom: 35vh;
  left: 50%;
  transform: translateX(-50%);
  &-container {
    transform-origin: 50% 10%;
    animation: swinging-x 4.5s -3s ease-in-out forwards infinite;
  }
  &-shadow-container {
    // position: absolute;
    transform-origin: 50% 10%;
    animation: swinging-x-backwards 4.5s -3s ease-in-out forwards infinite;
  }
  &-shadow-container {
    .letter-rope {
      visibility: hidden;
    }
    .letter-alpha {
    }
  }
  &-rope, &-alpha {
    display: block;
    max-width: 100%;
  }
  &.j {
    width: $baseLetterWidth * .60726;
    margin-left: -13rem;
    .letter-container { animation-delay: -2s; }
  }
  &.o {
    margin-left: -2rem;
  }
  &.y {
    margin-left: 10rem;
    margin-bottom: 0.5rem;
    .letter-container { animation-delay: 1s; }
  }
}

@keyframes swinging-x{
    0%{transform: rotate3d(1, 0, 0, 1deg);}
    50%{transform: rotate3d(1, 0, 0, -1deg)}
    100%{transform: rotate3d(1, 0, 0, 1deg);}
}
@keyframes swinging-x-backwards{
    0%{transform: rotate3d(1, 0, 0, -1deg);}
    50%{transform: rotate3d(1, 0, 0, 0deg)}
    100%{transform: rotate3d(1, 0, 0, -1deg);}
}
</style>