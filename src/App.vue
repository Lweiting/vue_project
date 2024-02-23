<template>
    <div id="app">
        <input type="text" v-model="obj.contractaddress" class="input">
        <button @click="getList">查询</button>
<!--        <div v-for="(item,index) in addressDetailList" :key="index" style="display: flex;">-->
<!--            <div style="width: 580px;text-align: left;">-->
<!--                <span>地址:</span>-->
<!--                <span>{{item.account}}</span>-->
<!--            </div>-->
<!--            <div>-->
<!--                <span>余额:</span>-->
<!--                <span>{{$web3.utils.fromWei(item.balance,'ether')}}</span>-->
<!--            </div>-->
<!--           -->
<!--&lt;!&ndash;            <div>&ndash;&gt;-->
<!--&lt;!&ndash;                <span>当前代币余额:</span>&ndash;&gt;-->
<!--&lt;!&ndash;                <span>{{$web3.utils.fromWei(getTokenBalance(item.account)) }}</span>&ndash;&gt;-->
<!--&lt;!&ndash;            </div>&ndash;&gt;-->
<!--        </div>-->
    </div>
</template>

<script>
    import {getBalabce} from "./api/api";

    export default {
        name: 'App',
        components: {},
        data() {
            return {
                addressList: [],
                addressDetailList:[],
                obj:{
                    module:'account',
                    action:'tokentx',
                    contractaddress:'0x06f7E3cecd6e66aB2fCC527e8a2e908c96e1a31c',
                    startblock:0,
                    endblock:9999999999999,
                    page:1,
                    offset:50,
                    sort:'desc'
                }
            }
        },
         mounted() {
            // this.getList()
        },
        methods: {
            sliceArray(arr, size) {
                let arr2 = []
                for (let i = 0; i <= arr.length; i = i + size) {
                    arr2.push(arr.slice(i, i + size))
                }
                return arr2
            },
            getList(){
                let obj = this.obj
                getBalabce(obj).then(res=>{
                    console.log(res)
                    console.log('价值',this.$web3.utils.toWei('4978827410949640858','ether'))
                })
            },
            async getBscList(){
                // let obj = {
                //   module:'account',
                //   action:'balancemulti',
                //   address:'0xFE69929E7dC09640F42E59d044dfa80e8658E1EF,0xb4Fe0Bd32a36152a612822FE68EEB7fB146cB7A1',
                //   tag:'latest'
                // }
                // getBalabce(obj).then(res=>{
                //   console.log('res',res)
                //   res.result.forEach(item=>{
                //     console.log('address:',item.account)
                //     console.log('balance:',this.$web3.utils.fromWei(item.balance,'ether'))
                //   })
                // })

                // //某代币在这个地址中的数量
                // let obj = {
                //     module: 'account',
                //     action: 'tokenbalance',
                //     contractaddress: '0x55d398326f99059ff775485246999027b3197955',
                //     address: '0xc2fA06A68bcA5BBfe969aC2C26aFA32adB9A6BEb',
                //     tag: 'latest'
                // }
                // getBalabce(obj).then(res => {
                //     console.log('res', this.$web3.utils.fromWei(res.result))
                //     // res.result.forEach(item => {
                //     //     // console.log('address:', item.account)
                //     //     // console.log('balance:', this.$web3.utils.fromWei(item.balance, 'ether'))
                //     // })
                // })


                // //某代币在这个地址中的数量
                let obj = {
                    module: 'account',
                    action: 'txlist',
                    address: '0x77ea96d80da8cb62e9f18cca4ab80e77ef0595e4',
                    startblock: '0',
                    endblock: '99999999',
                    page: '1',
                    offset: '1744',
                    sort: 'asc',
                }
                await getBalabce(obj).then(res => {
                    //所有预售交易成功的信息
                    let arr = res.result.filter(item => {
                        return item.txreceipt_status == 1 && (item.functionName == 'contribute()' || item.functionName == "" && item.value > 0)
                    })
                    this.addressList = arr.map(item => {
                        return item.from
                    })
                })
                // this.addressList.forEach(item => {
                //
                // })
                let addressList = this.addressList
                let newArr = this.sliceArray(addressList, 20)
                let obj1 = {
                    module: 'account',
                    action: 'balancemulti',
                    tag: 'latest',
                    address: ''
                }

                for (let i = 0; i < newArr.length; i++) {
                    obj1.address = ''
                    obj1.address = newArr[i].join(',')
                    // console.log('obj1',obj1.address)
                    let data = await getBalabce(obj1)
                    data.result.forEach(item=>{
                        this.addressDetailList.push(item)
                    })
                }
                console.log('钱包详细信息',this.addressDetailList)
                // await newArr.forEach((item,index)=>{
                //      console.log('index',index)
                //      console.log('address=',this.addressList)
                //
                //      obj1.address = ''
                //      // obj1.address = this.addressList.splice(0,20).join(',')
                //      // console.log('obj11=======',obj1.address)
                //      // setTimeout(()=>{
                //      //     getBalabce(obj1).then(res => {
                //      //         console.log(`res${index}`, res)
                //      //         // res.result.forEach(item=>{
                //      //         //   console.log('address:',item.account)
                //      //         //   console.log('balance:',this.$web3.utils.fromWei(item.balance,'ether'))
                //      //         // })
                //      //     })
                //      // },2000)
                //
                //
                //  })
            }
            // async getTokenBalance(address){
            //     let obj={
            //         module:'account',
            //         action:'tokenbalance',
            //         contractaddress:'0xc8dc1B4812409c9e335e39F6781b11bf5F8A7A48',
            //         address:address,
            //         tag:'latest'
            //     }
            //     let data = await getBalabce(obj)
            //     if(data.status==1){
            //         return data.result
            //     }else {
            //         return 1
            //     }
            // }
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
    .input{
        width: 500px;
        height: 28px;
        padding: 10px;
        border-radius: 12px;

    }
</style>
