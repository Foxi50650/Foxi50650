window.onload = function () {
  class FetchData {
    constructor(url) {
      this.url = url;
    }

    fetching = () => {
      return fetch(this.url)
        .then((response) => response.json())
        .then((result) => {
          return (result = result['feed']['entry']);
        })
        .then((result) => {
          result = this.arrHelp(result);

          return result;
        })
        .catch((e) => console.log(e.response));
    };

    arrHelp(arr) {
      let out = {};
      let actionsArr = [];
      let sportArr = [];
      let indiArr = [];
      let questArr = [];
      for (let i = 0; i < arr.length; i++) {
        if (!arr[i]['gsx$actionstitle']) break;
        let temp = {};

        temp['name'] = arr[i]['gsx$actionstitle']['$t'];
        temp['price'] = arr[i]['gsx$actionsprice']['$t'];
        actionsArr.push(temp);
        out.actions = actionsArr;
      }
      for (let i = 0; i < arr.length; i++) {
        if (!arr[i]['gsx$sporttitle']) break;
        let temp = {};
        temp['name'] = arr[i]['gsx$sporttitle']['$t'];
        temp['price'] = arr[i]['gsx$sportprice']['$t'];
        sportArr.push(temp);
        out.sports = sportArr;
      }
      for (let i = 0; i < arr.length; i++) {
        if (!arr[i]['gsx$questtitle']) break;
        let temp = {};
        temp['name'] = arr[i]['gsx$questtitle']['$t'];
        temp['price'] = arr[i]['gsx$questprice']['$t'];

        questArr.push(temp);
        out.quests = questArr;
      }
      for (let i = 0; i < arr.length; i++) {
        if (!arr[i]['gsx$indititle']) break;
        let temp = {};
        temp['name'] = arr[i]['gsx$indititle']['$t'];
        temp['price'] = arr[i]['gsx$indiprice']['$t'];
        indiArr.push(temp);
        out.indis = indiArr;
      }
      for (let i = 0; i < arr.length; i++) {
        if (!arr[i]['gsx$title']) break;
        let temp = {};
        temp['title'] = arr[i]['gsx$text']['$t'];
        out[arr[i]['gsx$title']['$t']] = temp;
      }
      return out;
    }
  }

  const actions = [
    Array.from(
      document.querySelectorAll('.slide__title[data-actiontitle="actiontitle"]')
    ),
    Array.from(
      document.querySelectorAll(
        '.slider__price[data-actionprice="actionprice"]'
      )
    ),
  ];
  const sports = [
    Array.from(
      document.querySelectorAll('.slide__title[data-storttitle="storttitle"]')
    ),
    Array.from(
      document.querySelectorAll('.slider__price[data-stortprice="stortprice"]')
    ),
  ];
  const indis = [
    Array.from(
      document.querySelectorAll('.slide__title[data-indititle="indititle"]')
    ),
    Array.from(
      document.querySelectorAll('.slider__price[data-indiprice="indiprice"]')
    ),
  ];
  const quests = [
    Array.from(
      document.querySelectorAll('.slide__title[data-questtitle="questtitle"]')
    ),
    Array.from(
      document.querySelectorAll('.slider__price[data-questprice="questprice"]')
    ),
  ];
  const sliderTitle = document.querySelector('.slider__title');

  const API_URL =
    'https://spreadsheets.google.com/feeds/list/1ex_CdhKKYVoetJ_F2x7uvdu_CznFB3bOEms7-oL6fm4/od6/public/values?alt=json';

  const data = new FetchData(API_URL);
  data.fetching().then((r) => {
    showGoods(r);
  });

  function showGoods(data) {
    setData(actions, data.actions);
    setData(sports, data.sports);
    setData(indis, data.indis);
    setData(quests, data.quests);
    sliderTitle.textContent = data.herotitle.title;
  }

  function setData(arrNodes, dataArr) {
    //titles

    arrNodes[0].forEach((node, index) => {
      let counter = 0;
      if (!dataArr[index]) {
        counter = 0;
        index = counter;
      }
      node.textContent = dataArr[index].name;
      counter++;
    });
    //price
    arrNodes[1].forEach((node, index) => {
      if (!dataArr[index]) return;
      node.innerHTML = `<p>${dataArr[index].price} <sup>грн.</sup></p>`;
    });
  }
};
