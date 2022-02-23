import './geo-review.html';
import formTemplate from './templates/form.hbs';

let myMap;
const storage = localStorage;
let reviews = [];
let html;

const init = () => {
  const clusterer = new ymaps.Clusterer({
    clusterDisableClickZoom: true,
    groupByCoordinates: true,
    clusterOpenBalloonOnClick: false,
  });

  clusterer.events.add('click', (e) => {
    const coords = e.get('target').geometry.getCoordinates();
    openBalloon(coords);
  });

  myMap = new ymaps.Map('map', {
    center: [55.76, 37.64],
    zoom: 10,
  });

  myMap.geoObjects.add(clusterer);

  myMap.events.add('click', (e) => {
    const coords = e.get('coords');
    openBalloon(coords);
  });

  document.body.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.dataset.role === 'review-btn') {
      let coords;
      if (!document.querySelector('[data-role=reviews]')) {
        const reviewForm = document.querySelector('[data-role=review-form]');
        coords = JSON.parse(reviewForm.dataset.coords);
      } else {
        const coordsString = document.querySelector('[data-role=reviews]').dataset.coords;
        coords = JSON.parse('[' + coordsString + ']');
      }

      if (createReview(coords)) {
        createPlacemark(coords);
        myMap.balloon.close();
      }
    }
  });

  function createReview(coords) {
    const nameInput = document.querySelector('[data-role=review-name]');
    const placeInput = document.querySelector('[data-role=review-place]');
    const opinionInput = document.querySelector('[data-role=review-opinion]');

    if (nameInput.value.trim() && placeInput.value.trim() && opinionInput.value.trim()) {
      const review = {
        name: nameInput.value.trim(),
        place: placeInput.value.trim(),
        opinion: opinionInput.value.trim(),
      };
      if (document.querySelector('[data-role=reviews]')) {
        reviews = JSON.parse(storage[coords]);
      }
      reviews.push(review);
      storage[coords] = JSON.stringify(reviews);
      return true;
    } else {
      nameInput.style.borderColor = '#FF8663';
      placeInput.style.borderColor = '#FF8663';
      opinionInput.style.borderColor = '#FF8663';
    }
  }

  function openBalloon(coords) {
    if (!storage.hasOwnProperty(coords)) {
      html = formTemplate();
      myMap.balloon
        .open(coords, {
          content: html,
        })
        .then(() => {
          const reviewForm = document.querySelector('[data-role=review-form]');
          reviewForm.dataset.coords = JSON.stringify(coords);
        });
    } else {
      reviews = JSON.parse(storage[coords]);
      html = formTemplate({ reviews, coords });
      myMap.balloon.setData(html).then(() => {
        myMap.balloon.open(coords);
      });
      reviews.length = 0;
    }
  }

  function createPlacemark(coords) {
    const myPlacemark = new ymaps.Placemark(coords);
    clusterer.add(myPlacemark);

    myPlacemark.events.add('click', (e) => {
      const coords = e.get('target').geometry.getCoordinates();
      openBalloon(coords);
    });
  }

  function loadPlacemarks() {
    const keys = Object.keys(storage);
    for (const key of keys) {
      if (!key.includes('loglevel')) {
        const coords = JSON.parse('[' + key + ']');
        const inner = JSON.parse(storage[key]);
        if (inner.length > 1) {
          for (let i = 0; i < inner.length; i++) {
            createPlacemark(coords);
          }
        } else {
          createPlacemark(coords);
        }
      }
    }
  }
  loadPlacemarks();
};

ymaps.ready(init);
