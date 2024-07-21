
/**
 * 根据人数 、方案 计算场数
 * @param playerNum 参与人数
 * @param session 每人上场次数
 */
function calcDoubleSession(playerNum: number, session: number) {
  let st: number;
  let last: number = (playerNum * session) % 4;
  if (last == 0) {
    st = session;
  } else {
    let sss: number = calcDoubleSession(playerNum, session + 1)
    st = sss;
  }
  return st;
}
/**
 * 双打计算 共多少场
 * @param playerNum 
 * @param all 是否全搭
 */
function doublePlayerSession(playerNum: number, all: boolean) {
  if (playerNum < 9) {
    return calcDoubleSession(playerNum, playerNum - 1);
  } else {
    if (all) {
      let ls: number = (playerNum * (playerNum - 1)) % 4;
      if (ls == 0) {
        // 判断是否除尽
        return calcDoubleSession(playerNum, playerNum - 1);
      }
    }
    return calcDoubleSession(playerNum, 8);
  }
}

/**
 * 双打计算 共多少场，一个全搭，一个不全搭
 * @param playerNum 
 */
export function getDoublePlayerSession(playerNum: number) {
  const s1: number = doublePlayerSession(playerNum, false)
  const s2: number = doublePlayerSession(playerNum, true)
  return Array.from(new Set([s1, s2]))
}

function calcSingleSession(playerNum: number, session: number) {
  let st: number;
  let last: number = (playerNum * session) % 2;
  if (last == 0) {
    st = session;
  } else {
    let sss: number = calcSingleSession(playerNum, session + 1)
    st = sss;
  }
  return st;
}
function singlePlayerSession(playerNum: number, all: boolean) {
  if (playerNum < 9) {
    return calcSingleSession(playerNum, playerNum - 1);
  } else {
    if (all) {
      let ls: number = (playerNum * (playerNum - 1)) % 4;
      if (ls == 0) {
        // 判断是否除尽
        return calcSingleSession(playerNum, playerNum - 1);
      }
    }
    return calcSingleSession(playerNum, 8);
  }
}
export function getSinglePlayerSession(playerNum: number) {
  const s1: number = singlePlayerSession(playerNum, false)
  const s2: number = singlePlayerSession(playerNum, true)
  return Array.from(new Set([s1, s2]))
}

/**
 * 根据人数 计算需要最少场地数
 * @param players 人数
 * @param playingNum 每片场地可容纳的合理人数
 */
export function calcFieldNum(players: number, fieldAccommodatePlayerNum: number) {
  let num: number = players / fieldAccommodatePlayerNum
  num = Math.floor(num)
  return num;
}

export type GroupedArray<T> = {
  [key: number]: T[];
};
export function groupBy<T>(array: T[], keyGetter: (item: T) => number): GroupedArray<T> {
  return array.reduce((result, item) => {
    const key = keyGetter(item);
    // 使用类型断言确保key可以作为一个字符串索引
    (result[key as keyof GroupedArray<T>] ||= []).push(item);
    return result;
  }, {} as GroupedArray<T>);
}