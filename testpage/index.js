new Worker('worker.js')

fetch('data.txt')
  .then(async response => console.log('response', await response.text()))
  .catch(error => console.error('error', error))

fetch('data2.txt')
  .then(async response => console.log('response', await response.text()))
  .catch(error => console.error('error', error))
