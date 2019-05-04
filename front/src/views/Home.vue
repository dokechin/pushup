<template>
  <div class="example">
    <div v-if="loading">loading...</div>
    <datepicker @input="changeDate" format="yyyy-MM-dd" v-model="start"></datepicker>
    <div style="float:left;">~</div>
    <datepicker @input="changeDate" format="yyyy-MM-dd" v-model="end"></datepicker>
    <div>
      <input @change="updateChart" type="radio" value="day" v-model="mode">
      <label for="day">Dayly</label>
      <input @change="updateChart" type="radio" value="month" v-model="mode">
      <label for="month">Monthly</label>
    </div>
    <apexchart width="640" height="500" type="bar" :options="chartOptions" :series="series"></apexchart>
    {{message}}
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
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
          categories: []
        }
      },
      series: [],
      mode: "day",
      message: "こんにちは",
      userId: "",
      displayName: "",
      accessToken: "",
      scope: "",
      client_id: "",
      expires_in: "",
      start: "",
      end: "",
      loading: true
    }
  },
  created() {
    const that = this;
    this.liff.init(
      data => {
        that.userId = data.context.userId;
        that.message = "初期化できたし";
        return that.liff.getProfile()
          .then(profile => {
            that.message = "プロフィール採れたし";
            that.userId = profile.userId;
            that.displayName = profile.displayName;
            const accessToken = that.liff.getAccessToken();
            if (!accessToken) {
              that.message = "アクセストークンを取得できません";
              return;
            }
            that.accessToken = accessToken;
            that.message = "トークン採れたし";
            return axios({
              method: "POST",
              url: 'https://dokechin-pushup.dokechin.com/api',
              data: {},
              headers: {
                'Content-Type': 'application/json',
                'accessToken': accessToken
              }
            }).then(response => {
              this.chartOptions = {
                chart: {
                  stacked: true,
                },
                plotOptions: {
                  bar: {
                    horizontal: false
                  }
                },
                xaxis: {
                  categories: response.data.dates
                }
              };
              var keys = Object.keys(response.data.sum);
              var series = [];
              keys.forEach(function(key) {
                series.push({name: key, data: response.data.sum[key]})
              });
              this.series = series;
              this.start = new moment(response.data.start, 'YYYY-MM-DD').toDate();
              this.end = new moment(response.data.end, 'YYYY-MM-DD').toDate();
              that.message = "完了";
              that.loading = false;
            });
          })
          .catch(err => {
            that.message = "Error\n" + err.code + "\n" + err.message;
            that.loading = false;
          });
      },
      err => {
        that.message = "Error\n" + err.code + "\n" + err.message;
        that.loading = false;
      }
    );
  },
  methods: {
    changeDate() {
      if (this.start > this.end){
        this.start = this.end;
      }
      this.updateChart();
    },
    updateChart() {
      this.loading = true;
      this.message = "updateChart";
      const accessToken = this.accessToken;
      var that = this;
      axios.post(
        'https://dokechin-pushup.dokechin.com/api',
        {},
        {headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'accessToken': accessToken,
            'start': dateToYMD(that.start),
            'end': dateToYMD(that.end),
            'mode': that.mode
          }
        }
      ).then(response => {
        that.chartOptions = {
          chart: {
            stacked: true,
          },
          plotOptions: {
            bar: {
              horizontal: false
            }
          },
          xaxis: {
            categories: response.data.dates
          }
        };
        var keys = Object.keys(response.data.sum);
        var series = [];
        keys.forEach(function(key) {
          series.push({name: key, data: response.data.sum[key]})
        });
        that.series = series;
        that.loading = false;
        that.message = "完了";
      }).catch(err => {
        that.message = "Error\n" + err.code + "\n" + err.message;
        that.loading = false;
      });
    }
  }
}
function dateToYMD(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}
</script>
<style>
</style>
