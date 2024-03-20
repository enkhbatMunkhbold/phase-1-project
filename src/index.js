document.addEventListener('DOMContentLoaded', () => {
  getAllCars()
  addSellCar()
})

const carsList = document.querySelector('ul.list')
const details = document.querySelector('div.details')
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
  .then(data => list = data)
  .then(cars => {
    if(cars.length > 0) {
      renderCarDetails(cars[cars.length-1])
      cars.forEach(renderEachCar)
    } else {
      defaultCarDetails()
    }    
  })
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
    // div.classList.add('activated')
    cardBody.style.background = '#387ADF'
  }

  div.onmouseout = () => {
    // div.classList.remove('activated')
    cardBody.style.background = ''
  };

  carDetials(car, div)
  deleteCar(car, div)
  carsList.appendChild(div)
}

const carDetials = (car, el) => {
  el.addEventListener('click', () => {
    renderCarDetails(car)
  })
}

const deleteCar = (car, el) => {
  el.addEventListener('dblclick', () => {
    removeCarFromDom(car)
    deleteCarFromBackEnd(car)   
  })
}

const removeCarFromDom = car => {
  debugger
  const domList = carsList.children  
  for(let i = 0; i < list.length; i++) {
    if(list[i].id === car.id) {
      domList[i].remove()
      list.splice(i, 1)
      if(i > 0) {
        renderCarDetails(list[i - 1])
      } else if(list.length > 0 && i === 0) {
        renderCarDetails(list[i + 1])
      } else {
        defaultCarDetails()
      }      
    } 
  }
  console.log('domList:', domList)
  console.log('list:', list)
  // for(let i = 0; i < list.length; i++) {
  //   if(list[i].id === car.id) {
  //     list.splice(i, 1)
  //     if(i > 0) {
  //       renderCarDetails(list[i - 1])
  //     } else if(list.length > 0 && i === 0) {
  //       renderCarDetails(list[i + 1])
  //     } else {
  //       defaultCarDetails()
  //     }      
  //   }
  // }  
}

const defaultCarDetails = () => {
  sellCarImage.src = "images/default-car.png"
  sellCarModel.textContent = 'MODEL:'
  sellCarYear.textContent = 'YEAR:'
  sellCarMileage.textContent ='MILEAGE:'
  sellCarColor.textContent = 'COLOR:'
  sellCarTransmission.textContent = 'TRANSMISSION:'
  sellCarPrice.textContent = 'PRICE:'
}

const renderCarDetails = car => {
  sellCarImage.src = car.image
  sellCarModel.textContent = `MODEL:   ${captilaze(car.model)}`
  sellCarYear.textContent = `YEAR:   ${car.year}`
  sellCarMileage.textContent = `MILEAGE:   ${car.mileage}`
  sellCarColor.textContent = `COLOR:   ${captilaze(car.color)}`
  sellCarTransmission.textContent = `TRANSMISSION:   ${captilaze(car.transmission)}`
  sellCarPrice.textContent = `PRICE:   $${car.price}`
}

const captilaze = word => {
  return word[0].toUpperCase() + word.slice(1).toLowerCase()
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
    list.push(sellCar)
    renderCarDetails(sellCar)
    renderEachCar(sellCar)
    addCarToBackEng(sellCar)
    form.reset()
  })}

  // const editCar = car => {
  //   details.addEventListener('dblclick', e => {
  //     e.target.classList.add('editing')
  //     const textContent = e.target.textContent
  //     const textValue = textContent.split(' ')[3]
  //     console.log(e.target.className)
      
  //   })
  // }

  // const turnInput = (event, text) => {
  //   const arrOfNames = event.target.className.split(' ')
  //   let isEditing = arrOfNames.includes('editing')
  //   isEditing ? `<input type="text">${text}</input>` : 
  //   `<p class="your-car-${arrOfNames[0]}" name="${arrOfNames[0]}">`
  // }

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

const deleteCarFromBackEnd = car => {
  fetch(`http://localhost:3000/used_cars/${car.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then(res => res.json())
  .catch(error => console.log(error.message))
}
