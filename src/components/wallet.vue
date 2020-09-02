<template>
  <div class="Wallet">
    <el-dialog :visible.sync="walletModel" :append-to-body="true">
      <div class="walletContent">
        <div class="close" @click="walletCloseBtn">
          <img src="../assets/model_close.png" alt />
        </div>
        <p class="tips">{{$t('connectWallet')}}</p>
        <div class="item golBor">
          <div class="flex name">
            <img src="../assets/MetaMask.png" alt />
            MetaMask
          </div>
          <div class="connected" v-if="this.address && this.address.length>0"></div>
          <div class="flex btn" v-else @click="changeMetaMask">{{$t('connect')}}</div>
        </div>
        <div class="item golBor">
          <div class="flex name">
            <img src="../assets/BitKeep.png" alt />
            BitKeep
          </div>
          <!-- <div class="connected" v-if="false"></div> -->
          <el-tooltip placement="top">
            <div slot="content">
              <img class="BitKeepErCode" src="../assets/BitKeepErCode.png" alt />
              <p class="BitKeepErCodeTip">{{$t('PleaseBitKeep')}}</p>
            </div>
            <div class="flex btn" @click="changeBitKeep">{{$t('connect')}}</div>
          </el-tooltip>
        </div>
        <div class="flex closeChange" @click="closeChange()">{{$t('disconnected')}}</div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="myWalletModel" :append-to-body="true">
      <div class="myWalletContent">
        <div class="close" @click="myWalletCloseBtn">
          <img src="../assets/model_close.png" alt />
        </div>
        <p class="tips">{{$t('MyGOF')}}</p>
        <div class="address golBor flex">
          <div class="connected"></div>
          <p>{{hiddenAddress(this.address)}}</p>
        </div>
        <div class="gof flex">
          <img src="../assets/coin_gof.png" />
          <p>GOF</p>
        </div>
        <div class="balance">{{gofBalance}}</div>
        <div class="btnWarp">
          <div class="btn flex">{{$t('ViewonEtherscan')}}</div>
          <div class="btn flex" @click="closeChange()">{{$t('Disconnected')}}</div>
        </div>
      </div>
    </el-dialog>
    <div class="walletBtn flex" @click="walletBtn">
      <p v-if="this.address && this.address.length>0">{{hiddenAddress(this.address)}}</p>
      <p v-else>{{$t('connectWallet')}}</p>
    </div>
    <div class="myWalletBtn flex"  v-if="this.address && this.address.length>0" @click="myWalletBtn">{{$t('MyGOF')}}</div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import errorHandler from '@/utils/errorHandler';
import { isH5, hiddenAddress } from '@/utils/index';
export default {
  data () {
    return {
      gofBalance: '...',
      hiddenAddress: hiddenAddress
    }
  },
  computed: {
    ...mapState(['walletModel', 'myWalletModel', 'address', 'xCoin']),
  },
  watch: {
    address () {
      if (this.address && this.address.length > 0) {
        this.getBalance();
      }
    },
    eloadTime () {
      if (this.address && this.address.length > 0) {
        this.getBalance();
      }
    }
  },
  mounted () {
    if (this.address && this.address.length > 0) {
      this.getBalance();
    }
  },
  methods: {
    walletBtn () {
      this.$store.commit('updateWalletModel', true);
    },
    walletCloseBtn () {
      this.$store.commit('updateWalletModel', false);
    },
    myWalletBtn () {

      if (this.address && this.address.length > 0) {
        this.$store.commit('updateMyWalletModel', true);
      } else {
        this.changeMetaMask();
      }
    },
    myWalletCloseBtn () {
      this.$store.commit('updateMyWalletModel', false);
    },
    closeChange () {
      this.$store.commit('updateAccountsChanged', undefined)
    },
    getBalance () {
      this.contract.token.methods.balanceOf(this.address).call().then(result => {
        this.gofBalance = result / 1e18;
      }).catch(err => {
        errorHandler(err);
      });
    },
    changeMetaMask () {
      ethereum.enable()
        .then((accounts) => {
          console.log('accounts', accounts)
          this.$store.commit('updateAccountsChanged', accounts[0])
          this.$store.commit('updateWalletModel', false);
        })
        .catch((err) => {
          errorHandler(err);
        })
    },
    changeBitKeep () {

    }
  }
}
</script>

<style lang="less" scoped>
.Wallet {
  position: relative;
  .golBor {
    border: 1px solid rgba(17, 139, 128, 0.06);
    border-radius: 24px;
    box-shadow: 0px 12px 29px -10px rgba(17, 139, 128, 0.25);
  }
  .tips {
    color: #333333;
    margin-bottom: 24px;
    font-size: 20px;
  }

  .walletBtn {
    width: 150px;
    height: 44px;
    background: #f1f8f2;
    border: 1px solid rgba(17, 139, 128, 0.06);
    border-radius: 10px;
    box-shadow: 0px 12px 29px -10px rgba(17, 139, 128, 0.25);
    color: #118b80;
    cursor: pointer;
  }
  .myWalletBtn {
    position: fixed;
    z-index: 99;
    top: 100px;
    right: 10px;
    width: 120px;
    height: 44px;
    background: #f1f8f2;
    border: 1px solid rgba(17, 139, 128, 0.06);
    border-radius: 10px;
    box-shadow: 0px 12px 29px -10px rgba(17, 139, 128, 0.25);
    color: #ff6400;
    cursor: pointer;
  }
  .minWalletBtn {
    position: fixed;
    z-index: 101;
    top: 100px;
    right: 10px;
    height: 44px;
    padding: 0 10px;
    background: #f1f8f2;
    border: 1px solid #08a89a;
    border-radius: 100px;
    color: #08a89a;
    cursor: pointer;
    p {
      line-height: 40px;
    }
  }
  @media (max-width: 920px) {
    .walletBtn {
      display: none;
    }
    .myWalletBtn {
      display: none;
    }
    .minWalletBtn {
      display: block;
    }
  }
  @media (min-width: 920px) {
    .minWalletBtn {
      display: none;
    }
  }
}
/deep/.el-dialog__header {
  display: none;
}
/deep/.el-dialog__body {
  padding: 0;
}
/deep/.el-dialog {
  width: 90%;
  max-width: 350px;
  background: #f1f8f2;
  border: 1px solid rgba(26, 233, 216, 0.06);
  border-radius: 24px;
  box-shadow: 0px 12px 29px -10px rgba(17, 139, 128, 0.25);
}
.walletContent {
  width: calc(100% - 64px);
  padding: 32px;
  position: relative;
  .close {
    position: absolute;
    right: 22px;
    cursor: pointer;
    img {
      width: 22px;
      height: 22px;
    }
  }
  .item {
    width: 100%;
    height: 56px;
    margin-top: 25px;
    background: #ffffff;
    display: flex;
    align-items: center;
    .name {
      justify-content: flex-start;
      flex-direction: initial;
      margin-left: 18px;
      color: #333333;
      flex: 1;
      img {
        width: 32px;
        height: 30px;
        margin-right: 7px;
      }
    }
    .btn {
      width: 80px;
      height: 38px;
      background: #08a89a;
      border-radius: 19px;
      color: #fff;
      margin-right: 20px;
      cursor: pointer;
    }
    .connected {
      width: 8px;
      height: 8px;
      background: #08a89a;
      border-radius: 100px;
      margin-right: 40px;
    }
  }
  .closeChange {
    width: 100%;
    height: 50px;
    margin-top: 20px;
    background: #f1f8f2;
    border: 1px solid #118b80;
    border-radius: 28px;
    color: #118b80;
    font-size: 16px;
    margin-top: 24px;
    cursor: pointer;
  }
}
.myWalletContent {
  width: 80%;
  max-width: 300px;
  padding: 32px;
  position: relative;
  .connected {
    width: 4px;
    height: 4px;
    background: #08a89a;
    border-radius: 100px;
    margin-right: 5px;
  }
  .close {
    position: absolute;
    right: 22px;
    cursor: pointer;
    img {
      width: 22px;
      height: 22px;
    }
  }
  .tips {
    font-size: 18px;
    font-weight: 700;
  }
  .address {
    width: 150px;
    height: 44px;
    margin-top: 10px;
    background: #ffffff;
    color: #118b80;
    flex-direction: row;
  }
  .gof {
    width: 100%;
    margin-top: 24px;
    text-align: center;
    img {
      width: 56px;
    }
    p {
      margin-top: 2px;
      font-size: 20px;
      font-weight: 700;
    }
  }
  .balance {
    width: 100%;
    margin-top: 24px;
    text-align: center;
    color: #118b80;
    font-size: 30px;
    font-family: Bebas-Regular;
  }
  .btnWarp {
    width: 100%;
    margin-top: 24px;
    display: flex;
    .btn {
      flex: 1;
      height: 44px;
      margin: 0 4px;
      background: #f1f8f2;
      border: 1px solid #118b80;
      border-radius: 28px;
      color: #118b80;
      font-size: 14px;
      text-align: center;
      cursor: pointer;
    }
  }
}
.BitKeepErCode {
  width: 200px;
}
.BitKeepErCodeTip {
  width: 100%;
  margin-top: 10px;
  font-size: 16px;
  text-align: center;
}
</style>
