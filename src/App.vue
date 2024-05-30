<script setup>
import { ref } from '@vue/reactivity'
import Hearticon from '../src/components/Hearticon.vue'

const memes = ref([])
const favs = ref([])
const allMemes = ref([])
const showingFavorites = ref(false)

const loadData = async () => {
  const response = await fetch('https://api.imgflip.com/get_memes')
  const { data } = await response.json()

  memes.value = data.memes
  allMemes.value = data.memes

  const storedFavs = JSON.parse(localStorage.getItem('favs')) || []
  favs.value = storedFavs
}

const searchMeme = event => {
  const value = event.target.value
  if (showingFavorites.value) {
    memes.value = allMemes.value.filter(meme => meme.name.toLowerCase().includes(value.toLowerCase()) && favs.value.includes(meme.id))
  } else {
    memes.value = allMemes.value.filter(meme => meme.name.toLowerCase().includes(value.toLowerCase()))
  }
}

const saveFav = memeId => {
  const index = favs.value.indexOf(memeId)
  if (index > -1) {
    favs.value.splice(index, 1)
  } else {
    favs.value.push(memeId)
  }
  localStorage.setItem('favs', JSON.stringify(favs.value))
}

const mostrarFavoritos = () => {
  showingFavorites.value = true
  memes.value = allMemes.value.filter(meme => favs.value.includes(meme.id))
}

const mostrarAll = () => {
  showingFavorites.value = false
  memes.value = allMemes.value
}

loadData()

</script>

<template>
  <h1>Memes Search</h1>

  <input class="input input-bordered input-accent w-full max-w-xs mt-10" type="text" placeholder="Buscar meme"
    @input="searchMeme">

  <div class="flex justify-center items-baseline flex-wrap mt-8">
    <div class="flex m-2">
      <button @click="mostrarAll"
        class=" w-[50vh] text-base rounded-l-none border-l-0 hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer hover:bg-teal-200 bg-teal-100 text-teal-700 border duration-200 ease-in-out border-teal-600 transition">
        <div class="flex leading-5">
          All
          <i class="fas fa-eye text-lg leading-none pl-5" aria-hidden="true"></i>
        </div>
      </button>
      <button @click="mostrarFavoritos"
        class=" w-[50vh] text-base rounded-l-none border-l-0 hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer hover:bg-teal-200 bg-teal-100 text-teal-700 border duration-200 ease-in-out border-teal-600 transition">
        <div class="flex leading-5">
          <i class="fas fa-heart text-lg leading-none pr-5" aria-hidden="true"></i>
          Favorite
        </div>
      </button>
    </div>
  </div>

  <section class="container mt-10">
    <div class="card" v-for="meme in memes" :key="meme.id">
      <img :src="meme.url" />
      <p>{{ meme.name }}</p>
      <Hearticon class="icon" :class="{ selected: favs.includes(meme.id) }" @click="saveFav(meme.id)"></Hearticon>
    </div>
  </section>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css" />
</template>


<style scoped>
.base-input {
  padding: 5px 8px;
}

.container {
  display: flex;
  flex-wrap: wrap;
}

.card {
  display: flex;
  width: 180px;
  flex-direction: column;
  border: 1px solid lightblue;
  border-radius: 8px;
  margin: 5px;
  position: relative;
  max-width: 180px;
  max-height: 300px;
  padding: 10px;
  align-items: center;
  background-color: rgb(68, 6, 125);
}

.card .icon {
  width: 40px;
  color: black;
  position: absolute;
  right: 15px;
  cursor: pointer;
}

.card .icon.selected {
  color: red;
}

.card .icon:hover {
  opacity: 0.75;
}

.card img {
  width: 100%;
  height: 180px;

}
</style>
