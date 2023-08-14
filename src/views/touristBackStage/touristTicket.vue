<template >
  <Header></Header>
  <main>
    <div class="title">
      <h2 class="tickstatus">未使用</h2>
      <h2 class="date">2023/05/23</h2>
    </div>
    <section class="top-box">
      <ticket-adult />
      <ticket-adult />
      <ticket-adult />
      <ticket-adult />
      <ticket-adult />
    </section>
    <div class="title">
      <h2 class="tickstatus">票券紀錄</h2>
    </div>
    <section class="btm-box">
      <table class="form">
        <thead>
          <tr>
            <th>日期</th>
            <th>狀態</th>
            <th>票型</th>
            <th>價格</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2023-08-11</td>
            <td>以使用</td>
            <td>成人票（快速通關）</td>
            <td>200元</td>
          </tr>
          <tr>
            <td>2023-08-11</td>
            <td>以使用</td>
            <td>成人票（快速通關）</td>
            <td>200元</td>
          </tr>
          <tr>
            <td>2023-08-11</td>
            <td>以使用</td>
            <td>成人票（快速通關）</td>
            <td>200元</td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>
</template>
<style lang="scss" scoped>
main {
  width: 75%;
  margin: 0 auto;

  .title {
    display: flex;
    justify-content: space-between;;
   
    h2 {
      color:#fff ;
    }
    .tickstatus {
      width: 10rem;
      border-radius: 10px;
      text-align: center;
      background-color:$main-color;
      padding: 0.5rem 0;
      margin-bottom: 2rem;
    }

    .date {
      color: $main-color;
      padding: 0.5rem 0;
      font-weight: bold;
      font-size: 24px;
    }
  }

  section {
      display: flex;
      justify-content: start;
      gap: 60px;
      margin-bottom: 10rem;
      flex-wrap: wrap;
  }

  .top-box{

  }

  .btm-box {
    width: 100%;
    background-color:#F1F1F1;
    padding-bottom: 2rem;
    padding-top: 2rem;
    border-radius: 15px;

    .form {
      width: 80%;
      margin: 0 auto;
      color: #00B9D2;
    }

    .form tbody {
      border: 2px solid #00B9D2;
      background-color: #fff;
    }

    .form th,
    .form td {
      padding: 8px;
      text-align: center;
      font-size: 20px;
    }
    .form tr {
      border-bottom: 1px solid #E4D0D0 ;
    }
    .form td {

    }
  }
}


h2 {
  margin-bottom: 10px;
}
</style>