const insertionSort = (arr) => {
  for(let i = 1; i < arr.length; i++) {
    const currentVal = arr[i];
    
    for(let j = i - 1; j >= 0; j--) {
      if(currentVal > arr[j]) {
        break;
      }
      
      const temp = arr[j];
      arr[j] = currentVal;
      arr[j + 1] = temp;
    }
  }
  
  return arr;
}
