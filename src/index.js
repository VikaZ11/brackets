module.exports = function check(str, bracketsConfig) {
    const open = bracketsConfig.map((arr) => arr[0]);
    const close = bracketsConfig.map((arr) => arr[1]);

    const uniques = {};

    for (let i = 0; i < open.length; ) {
        if (close.includes(open[i])) {
            uniques[open[i]] = true;

            open.splice(i, 1);
            close.splice(i, 1);
        } else i++;
    }

    const stack = [];
  for (let char of str) {
    let isOpen = (char in uniques && uniques[char]) || open.includes(char);

        if (isOpen) {
          stack.push(char);
          
          if (char in uniques)
            uniques[char] = !uniques[char];
        } else {

          let matchingOpen;

          if (char in uniques) {
            matchingOpen = char;
            uniques[char] = !uniques[char];
          }
          else {
            const index = close.indexOf(char);
            matchingOpen = open[index];
          }
          
            if (!stack.includes(matchingOpen) || stack[stack.length - 1] !== matchingOpen)
                return false;

            stack.pop();
        }
    }

    return stack.length === 0;
};
