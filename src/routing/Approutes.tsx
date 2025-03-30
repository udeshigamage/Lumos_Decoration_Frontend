import { Form, Formik } from 'formik'
import React, { FC, memo, useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { createContext } from 'vm'
import Deleteconfirmation from '../Util/Deleteconfirmation'
import axios from 'axios'
import { toast } from 'react-toastify'

type props = {
    yer: string
}
const Approutes:FC<props> =  ({yer="rey"}) => {
    const employee = [{
        id:1,
        name:"employee1",
      },{
        id:2,
        name:"employee2",
      }]
const filteredemployee = employee.filter((item:any)=>{item.id ===1})

      const[employee1,setemploee]=useState<[]>([])
      const [isdeployed,deployed]=useState<boolean>(false)
      const [ismodelopen, setmodelopen] = useState<boolean>(false);
      const [isloading,setisloading]=useState<boolean>(false)

      useEffect(()=>{
        setTimeout(()=>{
            console.log("hello")
        },10000)

        return ()=>{
            clearTimeout
            //cleanup function
        }
      },[employee1])

      const ride = useCallback(()=>{
        console.log("hello")
      },[])
      const ref = useRef(0)
const context23 = createContext();
      const computedvalue = useMemo(()=>{
        let i=3;let j=300;
        
        while(i<200){
            i=i*j
        }
        return i;
      },[])
      const reducer=(state:number,action:string)=>{
        switch(action){
            case "increment":
                return state+1
                case"decrement":

                return state-1
                default:
                    return state
        }

      }

      const[state,dispatch]=useReducer(reducer,0);

  return (
    <context23.Provider value={"hello"}>
    <div>
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Action</th>
                </tr>
            </thead>
           {employee.map((item:any,index:any)=>(
            <tbody key={index}>
                <tr>{item.id}</tr>
                <tr>{item.name}</tr>
                <tr>{yer}</tr>
            </tbody>
           ))} 
        </table>
        <div>{state}</div>
        <button onClick={()=> dispatch("increment")}></button>
        <button onClick={()=> ride()}></button>
        <div>{computedvalue}</div>
        <div>{ref.current}</div>
        <button onClick={()=> setmodelopen(true)}></button>
        {isdeployed?(<div>hello</div>):(<div>bye</div>)} 
        {isdeployed &&(<div>{computedvalue}</div>)}

      <Formik initialValues={{
        name_:"",
        email:""
      }}
      
      onSubmit={ async (values,{resetForm})=>{
        setisloading (true);
        try{
            await axios.post(`${API_URL}/product`,values);
            toast.success("product added successfully");
            resetForm();

            


        }
        catch{
            toast.error("something went wrong");
        }
        finally{
            setTimeout(()=>{
                setisloading(false);
            },1000)
        }

      }}
      validationSchema={Yup.object().shape({})}>
        {({getFieldProps,resetForm,handleSubmit})=>(
            <Form onSubmit={handleSubmit}>
                <input type="text" id='name'{...getFieldProps("name_")}/>
                <input type="text" id='email'{...getFieldProps("email")}/>
                <button type='submit'>submit</button>    

                
            </Form>
        )}
        
        </Formik>  
     {ismodelopen &&(
        <Deleteconfirmation/>
     )}
    </div>
    </context23.Provider>
  )
}

export default Approutes
