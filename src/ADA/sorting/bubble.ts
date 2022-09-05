export const bubbleSort = (arr: number[]) => {
  for (let i = 0; i < arr.length; i++) {
    let hasSwaps = false;
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }

    if (!hasSwaps) {
      break;
    }
  }

  return arr;
};
