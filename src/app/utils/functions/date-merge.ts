const array = [7, 4, 10, 8, 6, 2, 5, 3, 9, 1];

export function dateMerge(array: number[]): number[] {
  console.log(
    'STEP1 - first received array of dateMerge:',
    array,
    array.length,
  );
  if (array.length <= 1) {
    console.log('lngth alert! returning array:', array);
    return array;
  }

  const mid = Math.floor(array.length / 2);
  const leftHalf: number[] = [];
  const rightHalf: number[] = [];

  for (let index = 0; index < mid; index++) {
    const element = array[index];
    leftHalf.push(element);
  }
  for (let index = mid; index < array.length; index++) {
    const element = array[index];
    rightHalf.push(element);
  }
  console.log(
    'two halves before recursive call from dateMerge to dateMerge: ',
    leftHalf,
    rightHalf,
  );
  const sortedLeft = dateMerge(leftHalf);

  const sortedRight = dateMerge(rightHalf);
  console.log(
    'two sorted halves in dateMerge, before merge: ',
    sortedLeft,
    sortedRight,
  );
  return merge(sortedLeft, sortedRight);
}

function merge(left: number[], right: number[]): number[] {
  console.log('BEGIN MERGE');
  console.log('untouched left and right of beginning merge()', left, right);

  const result: number[] = [];
  let i = 0;
  let j = 0;

  while (left.length && right.length) {
    if (left[i] < right[j]) {
      const h = left.shift();
      if (h) result.push(h);
    } else {
      const h = right.shift();
      if (h) result.push(h);
    }
  }
  console.log('left half at end of merge', left);
  console.log('right half at end of merge', right);

  console.log('result at end of merge', result);
  const hoo = [...result, ...left, ...right];
  console.log('final spread return', hoo);

  return [...result, ...left, ...right];
  //   return result;
}
