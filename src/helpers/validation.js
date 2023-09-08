
const findMinLimit = (arr, key) => {
    const min = arr.reduce((acc, item) => {
        switch (typeof(item[key])){
            case "number":
                if (item[key] <= acc) {
                        acc = item[key];
                      }
                      break;
            case "boolean":
                if(typeof(acc)!=='boolean'|| !item[key]){
                    acc = item[key]
                }
                break
        }
      return acc;
    }, 50000);
  
    return min;
};

export function findChannelLimitation(channelArr) {
    let compareResult = [];
    channelArr.forEach((element) => {
      let { maxSymbols, maxStandartButtons, maxButtonsText, standartLink, maxInlineButtons, maxInlineButtonsText, inlineLink, maxInlineLink} = element;
      compareResult.push({ maxSymbols, maxStandartButtons, maxButtonsText, standartLink, maxInlineButtons, maxInlineButtonsText, inlineLink,  maxInlineLink});
    });
    
    const limit = {}
   compareResult.map((element) => {

      Object.keys(element).forEach((key) => {
        const minValue = findMinLimit(channelArr, key);
        limit[key] = minValue
  
      });
    });
  
    return limit;
  }