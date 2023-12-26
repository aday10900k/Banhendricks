
import { initializeApp } from 'firebase/app'

import {
    getFirestore, collection, getDocs, setDoc, addDoc, query, where
  } from 'firebase/firestore'

 
const firebaseConfig = {
    apiKey: "AIzaSyBsNFeOU3P_iUD21kt3rdEvOAFqYYHtGh0",
    authDomain: "banhendricks-528e5.firebaseapp.com",
    projectId: "banhendricks-528e5",
    storageBucket: "banhendricks-528e5.appspot.com",
    messagingSenderId: "385221998933",
    appId: "1:385221998933:web:e00f7bf0e17c37a022d7dc"
};
initializeApp(firebaseConfig)

const db = getFirestore()

const colRef = collection(db, 'Users')

var currentPage = window.location.pathname;
if(currentPage==='/dist/sign-in.html'){
  console.log("Signin page ")
  const random4DigitNumber = generateRandom4DigitNumber();
  console.log(random4DigitNumber);
  const Number ="1000"+random4DigitNumber.toString();
  const accNumber= parseInt(Number)
  const bal=250000.00
  console.log(accNumber);


  const SignUpForm = document.querySelector('.add')
  SignUpForm.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log("gdjs1255")

    addDoc(colRef,{
      AccNum: accNumber,
      Acctype: SignUpForm.accountType.value,
      Age: SignUpForm.age.value,
      Email: SignUpForm.UserName.value,
      FName: SignUpForm.firstName.value,
      LName: SignUpForm.lastName.value,
      Password: SignUpForm.password.value,
      AccBal: bal,
  })

  })   

  const LoginForm = document.querySelector('.check')
  LoginForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    console.log(LoginForm.UserName2.value)
    const q = query(colRef, where("Email","==",LoginForm.UserName2.value))
    const querySnap = await getDocs(q);
    let Userdata =[]
    querySnap.forEach((doc)=>{
      Userdata.push({...doc.data()})
      console.log(doc.data().Password)

      if(doc.data().Password==LoginForm.password2.value){
       window.location.href ="/dist/Dash.html"
        

        
       
        document.cookie= "username ="+doc.data().Email+";expires=Fri, 25 Dec 9999 23:59:59 GMT; path=/dist/"
        let x = document.cookie
    console.log("Dash page "+x)

      }
    })

  })   
}
  
  if(currentPage==='/dist/Dash.html'){
    

    function getCookieValue(cookieName) {
      const cookies = document.cookie.split('; ');
    
      for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name === cookieName) {
          return decodeURIComponent(value);
        }
      }
    
      return null; // Cookie not found
    }
    
    // Get the value of the "myCookie" cookie
    const myCookieValue = getCookieValue('username');
    console.log(myCookieValue);

    const q = query(colRef, where("Email","==",myCookieValue))
    const querySnap = await getDocs(q);
    let Userdata =[]
    querySnap.forEach((doc)=>{
      Userdata.push({...doc.data()})
      console.log(doc.data().Trans[0].Name)
      let AllTransInfo = '';
      doc.data().Trans.forEach(  function  (addtra){
        console.log(addtra.Name)
       AllTransInfo+= '<tr><td class="w-30"><div class="d-flex px-2 py-1 align-items-center"><div></div><div class="ms-4"><h6 class="text-sm font-weight-normal mb-0 " >'+ addtra.Name+'</h6></div></div></td><td><div class="text-center"><h6 class="text-sm font-weight-normal mb-0 ">'+addtra.Acc +'</h6></div></td><td><div class="text-center"><h6 class="text-sm font-weight-normal mb-0 ">'+ addtra.Amount+'</h6></div></td><td class="align-middle text-sm"><div class="col text-center"><p class="text-xs font-weight-bold mb-0 "></p><h6 class="text-sm font-weight-normal mb-0 ">'+ addtra.TransID+'</h6></div></td><td class="align-middle text-sm"><div class="col text-center"><p class="text-xs font-weight-bold mb-0 "></p><h6 class="text-sm font-weight-normal mb-0 ">'+ addtra.Status+'</h6></div></td><td class="align-middle text-sm"><div class="col text-center"><p class="text-xs font-weight-bold mb-0 "></p><h6 class="text-sm font-weight-normal mb-0 ">'+ addtra.Time+'</h6></div></td></tr>'
        
      })

      document.getElementById("AccNum").innerHTML= "Acc " +doc.data().AccNum
      document.getElementById("accountbal").innerHTML= formatMoney(doc.data().AccBal)
      document.getElementById("type").innerHTML= doc.data().Acctype
      document.getElementById("fullname").innerHTML= doc.data().FName +" "+doc.data().LName
      document.getElementById("fullname2").innerHTML = doc.data().FName +" "+doc.data().LName
      document.getElementById("traninfo").innerHTML = AllTransInfo
    })

  }
    

  // deleat cookie
  document.cookie = "username=sdvsf; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      
      
    function generateRandom4DigitNumber() {
        // Generate a random number between 1000 and 9999
        const randomNumber = Math.floor(Math.random() * 9000) + 1000;
      
        return randomNumber;
    }
    function formatMoney(numberString, locale = 'en-US', currency = 'USD') {
      const numberValue = parseFloat(numberString);
    
      if (isNaN(numberValue)) {
        console.error('Invalid number string:', numberString);
        return 'Invalid number';
      }
    
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency
      }).format(numberValue);
    }

