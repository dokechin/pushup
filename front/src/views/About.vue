<template>
  <div class="about">
    <h1>筋トレ応援団</h1>
    <h2>カウントインテント</h2>
    <p>
      種目＋回数で指示するとカウントアップする。　例）「プッシュアップを10回」
    </p>
    <p>
      １分間のカウント速度を[30,40,50,60]から選べる。例）「プッシュアップをスピード60で30回
    </p>
    <table class="blueTable">
      <tr><th>No</th><th>種目名</th></tr>
      <tr><td>1</td><td>プッシュアップ（腕立て）</td></tr>
      <tr><td>2</td><td>シットアップ（腹筋）</td></tr>
      <tr><td>3</td><td>バックエクステンション（背筋）</td></tr>
      <tr><td>4</td><td>スクワット</td></tr>
      <tr><td>5</td><td>クランチ</td></tr>
      <tr><td>6</td><td>バックキック</td></tr>
      <tr><td>7</td><td>ヒップリフト</td></tr>
      <tr><td>8</td><td>レッグレイズ</td></tr>
      <tr><td>9</td><td>カーフレイズ</td></tr>
      <tr><td>10</td><td>ランジ</td></tr>
      <tr><td>11</td><td>チンニング（懸垂）</td></tr>
    </table>
    <h2>集計インテント</h2>
    <p>月単位で種目ごとのカウント数、偏差値を計算。LINEプッシュで通知する。例）5月の集計送って、先月の集計送って</p>
    <h2>筋トレ応援団ボット</h2>
    <p>「今年」、「今月」、「今週」、「今日」と発言すると、カウント数を集計して返信します。</p>
    <p>「グラフ」と発言すると、グラフアプリを開くリンクを返信します。</p>
    <footer class="serif">
      <p>COPYRIGHT &#169; dokechin ALL RIGHTS RESERVED.	</p>
    </footer>
  </div>

</template>
<style>
table.blueTable {
  border: 1px solid #1C6EA4;
  background-color: #EEEEEE;
  width: 100%;
  text-align: left;
  border-collapse: collapse;
}
table.blueTable td, table.blueTable th {
  border: 1px solid #AAAAAA;
  padding: 3px 2px;
}
table.blueTable tbody td {
  font-size: 13px;
}
table.blueTable tr:nth-child(even) {
  background: #D0E4F5;
}
.serif{
  font-family:serif;
}
</style>
