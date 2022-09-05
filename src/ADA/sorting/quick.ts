const swap = (array: number[], index1, index2) => {
  const temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
};

const pivot = (array: number[], start = 0, end = array.length - 1) => {
  let piv = start;
  const number = array[start];
  let i = start + 1;

  while (i <= end) {
    if (array[i] < number) {
      piv++;

      if (i !== piv) {
        swap(array, i, piv);
      }
    }

    i++;
  }

  swap(array, start, piv);

  return piv;
};

const quickSort = (arr: number[], left = 0, right = arr.length - 1) => {
  if (left >= right) {
    return arr;
  }

  let piv = pivot(arr, left, right);

  quickSort(arr, left, piv - 1);
  quickSort(arr, piv + 1, right);

  return arr;
};
