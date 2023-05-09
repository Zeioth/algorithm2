/* Helper to extract the last digit of a number.
 *
 * @parameter num is a numeric value of type number.
 *
 * @example
 * ```
 * getLastDigit(1112)
 * ```
 * */
function getLastDigit(num: number): number {
  return parseInt(num.toString().charAt(num.toString().length - 1));
}


/* Returns the longest consistent fragment among all numbers in A.
 *
 * @parameger A is an array of numbers
 * @returns: The longest consistent fragment among all numbers in A */
function solution(A: number[]): number {
  let longestConsistentFragment = 0;

  // 1. We iterate all numbers in the parameter A.
  for (let i = 0; i < A.length; i++) {
    // 2. We use digiSet to keep track of unique last digits in current number.
    const digitSet = new Set<number>();
    // 3. We add the last digit of the first element to the set.
    digitSet.add(getLastDigit(A[i]));
    let currentFragmentLength = 1;

    /* 4. Iterate over remaining elements in array to find consistent fragment
     *    starting from the current element. */
    for (let j = i + 1; j < A.length; j++) {
      // 5. Add the last digit of the current element to the set.
      digitSet.add(getLastDigit(A[j]));

      /* 6. If there are more than 2 unique last digits, the fragment
       *    is not consistent, so break out of the loop. */
      if (digitSet.size > 2) {
        break;
      } else if (digitSet.size === 2) {
        /* 7. If there are exactly 2 unique last digits, then check if all elements
         *    in the current fragment can be generated using the same digits. */
        const digits = Array.from(digitSet);
        const digit1 = digits[0];
        const digit2 = digits[1];
        let consistent = true;
        for (let k = i + 1; k <= j; k++) {
          const remainder = getLastDigit(A[k]);
          if (remainder !== digit1 && remainder !== digit2) {
            consistent = false;
            break;
          }
        }
        if (consistent) {
          /* 8. If so far, all elements in the current fragment can be generated
           *    using the same digits, increment the length of the current
           *    fragment. */
          currentFragmentLength++;
        } else {
          // 9. If not, the fragment is not consistent, so break out of the loop.
          break;
        }
      } else {
        // 10. If there is only 1 unique last digit,
        //     increment the length of the current fragment.
        currentFragmentLength++;
      }
    }

    /* 11. If the length of the current fragment is greater than the length of
     *     the longest consistent fragment found so far, update the variable. */
    if (currentFragmentLength > longestConsistentFragment) {
      longestConsistentFragment = currentFragmentLength;
    }
  }

  // Return the length of the longest consistent fragment found
  return longestConsistentFragment;

}


// ===========================================================================
console.log("MOCKED TEST CASES:")
console.log("[23, 333, 33, 30, 0, 505] → " + solution([23, 333, 33, 30, 0, 505]))
console.log("[615, 88, 498, 99, 9] → " + solution([615, 88, 498, 99, 9]))
console.log("[123, 456] → " + solution([123, 456]))
