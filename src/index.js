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
  div.className = 'card text-bg-info border-secondary mb-3'
  div.style = "width: 25rem;"
  div.innerHTML = `
    <img src="${car.image}" class="card-img-top" alt="...">
    <div class="card-body">
    <h3 class="card-title">${car.model}</h3>
        <h5>Year: ${car.year}</h5>
        <h5>Mileage: ${car.mileage}</h5>
        <h5>Color: ${car.color}</h5>
        <h5>Transmission: ${car.transmission}</h5>
        <h5>Price: $${car.price}</h5>
    </div>
  `
  console.log('Div:', div)
  ul.appendChild(div)
}

