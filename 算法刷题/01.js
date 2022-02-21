/**
 * 给定无序、不重复的数组data，取出 n 个数，使其相加和为sum
 */

function solution(arr, n, sum, temp = []) {
  if (temp.length === n) {
    if (help(temp) === sum) {
      return temp
    }
    return
  }

  for (let i = 0; i < arr.length; i++) {
    const curent = arr.shift()
    temp.push(curent)
    const res = solution(arr, n, sum, temp)
    if (res) {
      return res
    }
    temp.pop()
    arr.push(curent)
  }

  function help(arr) {
    return arr.reduce((pre, next) => pre + next, 0)
  }
}

const arr = [1, 2, 3, 4, 5, 6]

console.log(solution(arr, 3, 10, []))
