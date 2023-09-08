import React, { useEffect, useState } from 'react';
import messageAPI from '../../api/MessageService.js';
import channelTypeAPI from '../../api/ChannelTypeService.js';
import { findChannelLimitation } from '../../helpers/validation.js';
import classes from "./MessagePage.module.css"
import { validateButtons } from '../../helpers/validateButtons.js';
const url = 'http://localhost:3001/api/message';

const MessagePage = () => {


    const [channelType, setChannelType] = useState([])
    const [text, setText] = useState('')
    const [button, setButton] = useState([])
    const [newButton, setNewButton] = useState({
        text: "",
        inline: false,
        link: ""
    })

    const [channelApi, setChannelApi] = useState(null)

  const [limits, setLimits] = useState({
      maxSymbols: 4096,
      maxStandartButtons: 40,
      maxButtonText: undefined,
      standartLink: true,
      maxInlineButtonsText: undefined,
      maxInlineButtons: 10,
      inlineLink: true,
      maxInlineLink:10
    });
    useEffect(() => {
      channelTypeAPI.getChannels('http://localhost:3001/api/channel')
      .then((newChannels) => setChannelApi([...newChannels.channels]))

    }, []);
  
    useEffect(()=>{
        const arrayOfLimits = []
            for (let i = 0; i < channelType.length; i++) {
              for (let j = 0; j < channelApi.length; j++) {
                 if(channelApi[j]._id===channelType[i]){
                    arrayOfLimits.push(channelApi[j])
                 }
                
              }
                
            }
        const newLimits = findChannelLimitation(arrayOfLimits)
        setLimits(newLimits)


    },[channelType]
    )
 
 
    function addButton(e){
        const arrOfStandart = button.filter((item) => !item.inline);
        const arrOfInline = button.filter((item) => item.inline);
        const arrOfInlineLink = button.filter((item) => item.link && item.inline);

        if(newButton.inline=== false && Boolean(newButton.link) === false && arrOfStandart.length < limits.maxStandartButtons){

                setButton([...button, newButton])
        }
        if(newButton.inline === false && Boolean(newButton.link) === true && arrOfStandart.length < limits.maxStandartButtons && limits.standartLink){

                setButton([...button, newButton])
        }
        if(newButton.inline === true && Boolean(newButton.link) === false && arrOfInline.length < limits.maxInlineButtons){

                setButton([...button, newButton])
        }
        if(newButton.inline=== true && Boolean(newButton.link) === true && arrOfInlineLink.length < limits.maxInlineLink){

                setButton([...button, newButton])
        }
        
    }
    function deleteButton(e){
        const index = e.target.id

        const arrOfButtons = button
        arrOfButtons.splice(index, 1)
        setButton((prev)=> [...arrOfButtons])

    }
  async function handleChannelChange(e) {
    console.log("target", e.target.value);
    if(channelType.includes(e.target.value)){
        const newArr = channelType.filter((el)=> el !== e.target.value)
        setChannelType(newArr)
        
    }else{

        setChannelType((prev)=>[...prev, e.target.value])

     
    }
}
    
   
    function handleNewButton(e){
        if(e.target.name === "inline"){

            setNewButton({...newButton, [e.target.name]: !newButton[e.target.name]} )
        }else{
        setNewButton({...newButton, [e.target.name]: e.target.value} )}


    }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(text.length <= limits.maxSymbols && channelType.length > 0 && validateButtons(button, limits)){


        const saveMessage = {text, channelType, button}
    
    const response = await messageAPI.postOne(url, saveMessage);

    console.log(response);

    }
  };

  return (
    <div className={classes.main}>
    <form
        className={classes.form}
      method="post"
      encType="multipart/form-data">

        <div className={classes.message}>

      <label className={classes.message__label} htmlFor="message">

        текст сообщения:
        </label>
        <textarea
          id="message"
          name="text"
          cols="30"
          rows="10"
          maxLength={limits.maxSymbols}
          value={text}
          onChange={(e)=> setText(e.target.value)}></textarea>
          </div>
          <div className={classes.channels}>

      {channelApi && channelApi.map((channel) => {
          return (
              <div key={channel._id}>
            <input
              key={channel.updatedAt}
              type="checkbox"
              name="channelType"
              id={channel._id}
              value={channel._id}
              onChange={handleChannelChange}
              />
            <label
              key={channel.type}
              htmlFor={channel._id}>
              {channel.type}
            </label>
          </div>
        );
    }) }
    </div>
       <div className={classes.limits}>Limits:
         maxSymbols: {limits.maxSymbols}
     <div> maxStandartButtons: {limits.maxStandartButtons},</div>
     <div> maxButtonText: {limits.maxButtonText? limits.maxButtonText : "undefined or auto"},</div>
     <div> standartLink: {limits.standartLink? "true" : "false"},</div>
     <div> maxInlineButtonsText: {limits.maxInlineButtonsText},</div>
     <div> maxInlineButtons: {limits.maxInlineButtons},</div>
     <div>inlineLink: {limits.inlineLink? "true": "false"},</div>
     <div> maxInlineLink:{limits.maxInlineLink? limits.maxInlineLink: "undefined or auto"}</div>

      </div>
      <div className={classes.newButton__form}>

      <input type="text" maxLength={limits.maxButtonText} placeholder='Текст Кнопки' name='text' value={newButton.text} onChange={handleNewButton}/>
      <input type="checkbox" id='checkbox' checked={newButton.inline} name='inline' onChange={handleNewButton} />
      <label htmlFor="checkbox">Inline</label>
      <input type="text" placeholder='Ссылка' name='link' value={newButton.link} onChange={handleNewButton}/>
      <button type="button" onClick={addButton}>добавить кнопку</button>
      </div>

      <button
        type="submit"
        onClick={handleSubmit}>
        Создать
      </button>
    </form>
    <div className={classes.newButton__container}>

{button && button.map((el, index)=>{
    return(
        <div className={classes.newButton} key={index} >
          <div>button text: {el.text}</div>
          <div>inline : {el.inline? "true": "false"}</div>
          <div>link: {el.link}</div>
          <button type='button' id={index} onClick={deleteButton}>DELETE</button>
      </div>
  )
})}
</div>
    </div>
  );
};
export default MessagePage;
