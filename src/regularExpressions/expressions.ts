interface Expression {
  check: (str: string) => boolean;
  match: (str: string) => string[];
}

enum ExpressionNames {
  BRACKETS = 'brackets',
  RANGE = 'range',
}

const expressions: Record<ExpressionNames, RegExp> = {
  brackets: /\(\)/,
  range: /[A-B\s]/gi,
};

const list: Record<ExpressionNames, Expression> = {
  brackets: {
    check: (str: string) => expressions['brackets'].test(str),
    match: (str: string) => str.match(expressions['brackets']),
  },
  range: {
    check: (str: string) => expressions['range'].test(str),
    match: (str) => str.match(expressions['range']),
  },
};

let regexp = /"(\\)"/gi;

let str = ' .. "test me" .. "Скажи \\"Привет\\"!" .. "\\\\ \\"" .. ';

// эта строка в памяти:
console.log(str.match(regexp)); //  .. "test me" .. "Скажи \"Привет\"!" .. "\\ \"" ..
