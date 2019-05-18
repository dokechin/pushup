<template>
  <div class="example">
    <div>
      読み上げ速度（読み上げ速度を省略した場合）
      <input @change="updateSpeed" type="radio" value="30" v-model="speed">
      <label for="30">30</label>
      <input @change="updateSpeed" type="radio" value="40" v-model="speed">
      <label for="40">40</label>
      <input @change="updateSpeed" type="radio" value="50" v-model="speed">
      <label for="50">50</label>
      <input @change="updateSpeed" type="radio" value="60" v-model="speed">
      <label for="60">60</label>
    </div>
    <div>
      {{ message }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'BarExample',
  data: function() {
    return {
      speed: null,
      message: '',
      accessToken: '',
    }
  },
  created() {
    const that = this;
    this.liff.init(
      data => {
        that.userId = data.context.userId;
        return that.liff.getProfile()
          .then(profile => {
            that.userId = profile.userId;
            that.displayName = profile.displayName;
            const accessToken = that.liff.getAccessToken();
            if (!accessToken) {
              that.message = "予期せぬエラー（トークン取得）";
              return;
            }
            that.accessToken = accessToken;
            return axios({
              method: "GET",
              url: 'https://dokechin-pushup.dokechin.com/setting',
              data: {},
              headers: {
                'Content-Type': 'application/json',
                'accessToken': accessToken,
              }
            }).then(response => {
              this.speed = response.data.speed;
            }).catch(err =>{
              that.message = "Error\n" + err.code + "\n" + err.message;
            })
          })
          .catch(err => {
            that.message = "Error\n" + err.code + "\n" + err.message;
          });
      },
      err => {
        that.message = "Error\n" + err.code + "\n" + err.message;
      }
    );
  },
  methods: {
    updateSpeed() {
      const accessToken = this.accessToken;
      var that = this;
      axios.post(
        'https://dokechin-pushup.dokechin.com/setting',
        {},
        {headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'accessToken': accessToken,
            'speed': that.speed,
          }
        }
      ).then(response => {
      }).catch(err => {
        that.message = "Error\n" + err.code + "\n" + err.message;
      });
    }
  }
}
</script>
<style>
</style>
