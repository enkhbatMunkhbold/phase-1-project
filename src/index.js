document.addEventListener('DOMContentLoaded', () => {
  getAllCars()
  addSellCar()
})

const carsList = document.querySelector('ul.list')
const sellCarImage = document.querySelector('img.detail-image')
const sellCarModel = document.querySelector('p.your-car-model')
const sellCarYear = document.querySelector('p.your-car-year')
const sellCarMileage = document.querySelector('p.your-car-mileage')
const sellCarColor = document.querySelector('p.your-car-color')
const sellCarTransmission = document.querySelector('p.your-car-transmission')
const sellCarPrice = document.querySelector('p.your-car-price')

const getAllCars = () => {
  fetch('http://localhost:3000/used_cars')
  .then(res => res.json())
  .then(cars => cars.forEach(renderEachCar))
}

function renderEachCar(car) {
  const div = document.createElement('div')
  div.className = 'card text-bg-info border-secondary mb-3 car-poster'
  div.id = car.id
  div.innerHTML = `
    <img src="${car.image}" class="card-img-top car-image" style="height:100px;" alt="...">
    <div class="card-body">
      <h5 class="card-title">${car.model.toUpperCase()}</h5>
    </div>
  `
  const cardBody = div.querySelector('div.card-body')
  div.onmouseover = () => {
    div.classList.add('activated')
    cardBody.style.background = '#387ADF'
  }
  div.onmouseout = () => {
    div.classList.remove('activated')
    cardBody.style.background = ''
  };
  div.addEventListener('click', () => {
    renderCarDetails(car)
  })

  // div.addEventListener('dblclick', () => {
  //   removeCarFromDom(car)
  //   deleteCar(car)   
  // })

  div.addEventListener('keydown', e => {
    console.log(e.target)
  })

  carsList.appendChild(div)
}

const removeCarFromDom = car => {
  const list = carsList.children
  for(let i = 0; i < list.length; i++) {
    if(list[i].id === car.id) {
      list[i].remove()
    }
  }
}

const renderCarDetails = car => {
  sellCarImage.src = car.image
  sellCarModel.textContent = `MODEL:   ${car.model}`
  sellCarYear.textContent = `YEAR:   ${car.year}`
  sellCarMileage.textContent = `MILEAGE:   ${car.mileage}`
  sellCarColor.textContent = `COLOR:   ${car.color}`
  sellCarTransmission.textContent = `TRANSMISSION:   ${car.transmission}`
  sellCarPrice.textContent = `PRICE:   $${car.price}`
}

const addSellCar = () => {
  const form = document.querySelector('form#sell-car')
  form.addEventListener('submit', e => {
    e.preventDefault()
    let sellCar = {
      model: e.target.model.value,
      image: e.target.image.value,
      year: e.target.year.value,
      mileage: e.target.mileage.value,
      color: e.target.color.value,
      transmission: e.target.transmission.value,
      price: e.target.price.value
    }
    renderCarDetails(sellCar)
    renderEachCar(sellCar)
    addCarToBackEng(sellCar)
  })}

const addCarToBackEng = car => {
  fetch('http://localhost:3000/used_cars', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(car)
  }).then(res => res.json())
  .then(car => console.log(car))
  .catch(error => console.log(error.message))
}

const deleteCar = car => {
  fetch(`http://localhost:3000/used_cars/${car.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then(res => res.json())
  .catch(error => console.log(error.message))
}
