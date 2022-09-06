const isValidAnagram = (str1: string, str2: string) => {
  if (str1.length !== str2.length) {
    return false;
  }
  // key - letter of str1, value - number of occurrences
  const frequencyCounter1 = {};
  const frequencyCounter2 = {};

  for (let char of str1) {
    frequencyCounter1[char] = (frequencyCounter1[char] || 0) + 1;
  }

  for (let char of str2) {
    frequencyCounter2[char] = (frequencyCounter2[char] || 0) + 1;
  }

  for (let key in frequencyCounter1) {
    if (!(key in frequencyCounter2)) {
      return false;
    }

    if (frequencyCounter1[key] !== frequencyCounter2[key]) {
      return false;
    }
  }

  return true;
};

console.log(isValidAnagram('iceman', 'cinemk'));
