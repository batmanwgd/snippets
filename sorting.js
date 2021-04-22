const arr = [10,2,3,0,9,4];
const mySorting = () => {
  for(let i = 1; i < arr.length; i++){
    let key = arr[i];
    let j = i-1;
    while( j>=0 && key< arr[j]){
      arr[j+1] = arr[j];
      j = j-1
    }
    arr[j+1] = key;
  }
  return arr;
}
console.log(mySorting(arr))



