import './geo-review.html';



const homeworkContainer = document.querySelector('#map');




let myMap;

const init = ()=>{
  myMap = new ymaps.Map('map', {
    center: [55.76, 37.64], 
    zoom: 10
  });

  myMap.events.add('click', function (e){
    let position = e.get('coords');
    myMap.balloon.open(position, {
      contentHeader: '<b>Отзыв</b>',
      contentBody: '<form><input name="Имя" placeholder="Укажите ваше имя">'+
      '<input placeholder="Укажите место"><textarea placeholder="Оставить отзыв">'+
      '</textarea></form><button class=".review__button">Добавить</button>'
    });
    const info = myMap.balloon.getData().contentBody;
    console.log(info);

    // let myPlacemark = new ymaps.Placemark(position, {
    //   balloonContentHeader: "Балун метки"
    // });
    // myMap.geoObjects.add(myPlacemark);
    // myPlacemark.balloon.open();

    // let balloon = new ymaps.Balloon(myMap);
    // balloon.options.setParent(myMap.options);
// Открываем балун в центре карты:
    console.log(position);

    // balloon.open(myMap.position);

  });
}

ymaps.ready(init);



