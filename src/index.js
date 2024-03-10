document.addEventListener('DOMContentLoaded', () => {
  getAllUsedCars()
})

const ul = document.querySelector('ul.list')
console.log('ul:', ul)

const getAllUsedCars = () => {
  fetch('http://localhost:3000/used_cars')
  .then(res => res.json())
  .then(cars => {
    console.log(cars)
    cars.forEach(car => renderEachCar(car));
  })
}

const renderEachCar = car => {
  const div = document.createElement('div')
  div.className = 'card text-bg-info border-secondary mb-3 car-poster'
  div.innerHTML = `
    <img src="${car.image}" class="card-img-top car-image" style="height:100px;" alt="...">
    <div class="card-body">
      <h5 class="card-title">${car.model}</h5>
    </div>
  `
  console.log('Div:', div)
  ul.appendChild(div)
}

