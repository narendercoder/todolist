import React, { useState,useEffect } from "react";
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddIcon from '@mui/icons-material/Add';
import { Button } from "@mui/material";

const getLocalItems = () => {
    let list = localStorage.getItem('lists');
    if(list){
        return JSON.parse(localStorage.getItem('lists'));
    }
    else{
        return [];
    }
}

const Todolist = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalItems());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);


  const addItems = () => {
      if(!inputData){
           alert("plz fill data")
      }
      else if(inputData && !toggleSubmit){
        setItems(
            items.map((val)=>{
                if(val.id === isEditItem){
                    return{...val, name:inputData}
                }
                return val;
            })
        )
        setToggleSubmit(true);
        setInputData('');
        setIsEditItem(null);
      }
      else{
        const allInputData = {id: new Date().getTime().toString(), name:inputData }
        setItems( [...items, allInputData]);
        setInputData(" ");
      }
  };

  const deleteItem = (index) => {
      const updateditems = items.filter((val) => {
        return index !== val.id;
      });
    setItems(updateditems);
  };
   
  const editItem = (id) => {
      let newEditItem = items.find((val) => {
        return val.id === id;
      });
    setToggleSubmit(false);
    setInputData(newEditItem.name);
    setIsEditItem(id);
  };

  
    const handleComplete = (id) =>{
      setItems(
        items.map((val)=>{
          if(val.id === id){
            return {...val,completed: !val.completed}
          }
          return val;
        })
      )};

  useEffect(() => {
    localStorage.setItem('lists',JSON.stringify(items))
   }, [items])
   
  return (
    <>
      <div className="main_div">
        <div className="center_div">
          <br />
          <h1>TODO List</h1>
          <br />
          <div className="input">
          <input
            type="text"
            value={inputData}
            placeholder="Enter todo"
            onChange={(event)=>setInputData(event.target.value)}
          />
          {
              toggleSubmit ?
                          <Button className="newBtn"  onClick={addItems}>
                          <AddIcon />
                          </Button>
                          :<Button className="newBtn"  onClick={addItems}>
                          <EditIcon />
                          </Button>

          }
          </div>
          <br />
          <div className="list">
            <ol>
              {
                items.map((val) => {
                return (
                  <div className="todo_style "key ={val.id}>
                    <div className={`todo ${val.completed ? "completed" : ""}`}>
                      <CheckCircleIcon 
                      className="checkbox" 
                      onClick={()=>handleComplete(val.id)} />
                      <li>
                        {val.name}
                      </li>
                    </div>
                    <div className="icons">
                      <span>
                        <EditIcon className="edit" onClick={()=>editItem(val.id)} />
                      </span>
                      <span
                        onClick={()=>deleteItem(val.id)}>
                        <CloseIcon className="deleteIcon Forever" />
                      </span>
                    </div>
                  </div>
                )
              })}
            </ol>
          </div>
          <br />
        </div>
      </div>
    </>
  );
};

export default Todolist;
