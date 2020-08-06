fetch('data.txt')
  .then(async response => console.log('from worker response', await response.text()))
  .catch(error => console.error('from worker error', error))

fetch('data2.txt')
  .then(async response => console.log('from worker response', await response.text()))
  .catch(error => console.error('from worker error', error))
