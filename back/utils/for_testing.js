const reverse=(str)=>{
    return str.split('').reverse().join('')
}

// const average=(arr)=>{
//     return arr.reduce((a,b)=>a+b)/arr.length
// }

const average = array => {
    const reducer = (sum, item) => {
      return sum + item
    }
    return array.length === 0
      ? 0 
      : array.reduce(reducer, 0) / array.length
  }

module.exports={
    reverse,
    average
}