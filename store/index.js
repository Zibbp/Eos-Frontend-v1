export const state = () => ({
  showRandomVideos: true,
})

export const mutations = {
  toggleRandomVideos(state) {
    state.showRandomVideos = !state.showRandomVideos
    localStorage.setItem('showRandomVideos', state.showRandomVideos)
  },
  setShowRandomVideos(state, storedOption) {
    var isTrueSet = storedOption === 'true'
    state.showRandomVideos = isTrueSet
  },
}
