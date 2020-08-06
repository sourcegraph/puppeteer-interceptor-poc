
setTimeout(() => {
  fetch('http://localhost:5000/data.txt')
    .then(async response => console.log('response', await response.text()))
    .catch(error => console.error('error', error))

  fetch('http://localhost:5000/data2.txt')
    .then(async response => console.log('response', await response.text()))
    .catch(error => console.error('error', error))
}, 5000)
