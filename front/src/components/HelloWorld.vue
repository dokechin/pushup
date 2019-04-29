<template>
  <div class="example">    
    <apexchart width="500" height="350" type="bar" :options="chartOptions" :series="series"></apexchart>
     <div>
       {{ message }}
       <button @click="updateChart">Update!</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BarExample',
  data: function() {
    return {
      chartOptions: {
        plotOptions: {
          bar: {
            horizontal: false
          }
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
        }
      },
      series: [{
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }],
      message: "こんにちは",
      userId: "",
      displayName: "",
      accessToken: "",
      scope: "",
      client_id: "",
      expires_in: ""
    }
  },
  created() {
    const that = this;
    this.liff.init(
      data => {
        that.userId = data.context.userId;
        that.message = "初期化できたし";
        return liff.getProfile()
          .then(profile => {
            that.message = "プロフィール採れたし";
            that.userId = profile.userId;
            that.displayName = profile.displayName;
            const accessToken = liff.getAccessToken();
            if (!accessToken) {
              that.message = "アクセストークンを取得できません";
              return;
            }
            that.accessToken = accessToken;
            that.message = "トークン採れたし";
            return axios({
              method: "POST",
              url: 'サーバーのURL',
              data: {},
              headers: {
                'Content-Type': 'application/json',
                'accessToken': accessToken
              }
            }).then(response => {
              that.message = "完了";
            });
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
      updateChart() {
        const max = 90;
        const min = 20;
        const newData = this.series[0].data.map(() => {
          return Math.floor(Math.random() * (max - min + 1)) + min
        })
        const colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0']
        // Make sure to update the whole options config and not just a single property to allow the Vue watch catch the change.
        this.chartOptions = {
          colors: [colors[Math.floor(Math.random()*colors.length)]]
        };
        // In the same way, update the series option
        this.series = [{
          data: newData
        }]
      }
    }
}
</script>