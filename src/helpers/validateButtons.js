export function validateButtons(buttonsArr, limitsObj) {
    const arrOfStandart = buttonsArr.filter((item) => !item.inline);
    const arrOfInline = buttonsArr.filter((item) => item.inline);
    const arrOfStandartLink = buttonsArr.filter((item) => item.link && !item.inline);
    const arrOfInlineLink = buttonsArr.filter((item) => item.link && item.inline);
     
      if(limitsObj.maxStandartButtons < arrOfStandart.length && limitsObj.maxStandartButtons !== undefined){
        return false
      }
      if(limitsObj.maxButtonsText < findMaxValue(arrOfStandart) && limitsObj.maxButtonsText !== undefined){
        return false
      }
      if(arrOfStandartLink.length > 0 && !limitsObj.standartLink){
        return false
      }
      if(limitsObj.maxInlineButtons < arrOfInline.length && limitsObj.maxInlineButtons !== undefined){
        return false
      }
      if(limitsObj.maxInlineButtonsText < findMaxValue(arrOfInline) && limitsObj.maxInlineButtons !== undefined){
        return false
      }
      if(arrOfInlineLink.length > 0 && !limitsObj.inlineLink){
        return false
      }
      if(arrOfInlineLink.length >  limitsObj.maxInlineLink){
            return false
      }
  
      return true
  }

  function findMaxValue(arr) {
    const maxValue = arr.reduce(function (acc, cur) {
      if (cur.text.length >= acc) {
        acc = cur.text.length;
      }
  
      return acc;
    }, 0);
  
    return maxValue;
  }