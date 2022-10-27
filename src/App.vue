<template>
  <div id="app">
    哈哈哈哈
  </div>
</template>

<script>
import {getBalabce} from "@/api/api";

export default {
  name: 'App',
  components: {
  },
  mounted(){
    let obj = {
      module:'account',
      action:'balancemulti',
      address:'0xFE69929E7dC09640F42E59d044dfa80e8658E1EF,0xb4Fe0Bd32a36152a612822FE68EEB7fB146cB7A1',
      tag:'latest'
    }
    getBalabce(obj).then(res=>{
      console.log('res',res)
      res.result.forEach(item=>{
        console.log('address:',item.account)
        console.log('balance:',this.$web3.utils.fromWei(item.balance,'ether'))
      })
    })

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
