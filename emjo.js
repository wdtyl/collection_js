
const nullVerify = (value, title) => {
  if (typeof value === 'object') {
    if (value.length === 0) {
      if (title) {
        wepy.showToast({
          title,
          icon: 'none'
        });
      }
      return false;
    }
    return true;
  }
  value = String(value)
  if (!value || !value.trim()) {
    if (title) {
      wepy.showToast({
        title,
        icon: 'none'
      });
    }
    return false;
  } else {
    return true;
  }
};

const phoneVerify = (value, title) => {
  if (!value && !value.trim() || !/^1\d{10}$/.test(value)) {
    wepy.showToast({
      title,
      icon: 'none'
    });
    return false;
  } else {
    return true;
  }
};

const iDCardVerify = (value, title) => {
  if (!value && !value.trim() || !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)) {
    wepy.showToast({
      title,
      icon: 'none'
    });
    return false;
  } else {
    return true;
  }
};

const formatPhone = (value) => {
  //const trim1 = value.replace(/ /g, '');
  //const trim2 = trim1.replace(/-/g, '');
  const trim3 = value.replace(/[^\d]/g, '');
  console.log('验证后的电话号码 ==>', trim3);
  return trim3;
};

const amountVerify = (value) => {
  const amountReg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
  return amountReg.test(value);
};

const pullParam = (target, defaultValue) => {
  if (target !== null && target !== undefined) {
    return target;
  }
  return defaultValue;
};
//检测字符串是否含有表情及特殊字符
const includeFace = (substring) => {
  if (substring) {
    let reg = new RegExp("[~#^$@%&!?%*]", 'g');
    if (substring.match(reg)) {
      return true;
    }
    for (let i = 0; i < substring.length; i++) {
      let hs = substring.charCodeAt(i);
      if (0xd800 <= hs && hs <= 0xdbff) {
        if (substring.length > 1) {
          let ls = substring.charCodeAt(i + 1);
          let uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
          if (0x1d000 <= uc && uc <= 0x1f77f) {
            return true;
          }
        }
      } else if (substring.length > 1) {
        let ls = substring.charCodeAt(i + 1);
        if (ls == 0x20e3) {
          return true;
        }
      } else {
        if (0x2100 <= hs && hs <= 0x27ff) {
          return true;
        } else if (0x2B05 <= hs && hs <= 0x2b07) {
          return true;
        } else if (0x2934 <= hs && hs <= 0x2935) {
          return true;
        } else if (0x3297 <= hs && hs <= 0x3299) {
          return true;
        } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030 ||
          hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b ||
          hs == 0x2b50) {
          return true;
        }
      }
    }
  }
};
export {
  nullVerify,
  phoneVerify,
  formatPhone,
  amountVerify,
  pullParam,
  iDCardVerify,
  includeFace
};
