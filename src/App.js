import React, { useState, useEffect } from 'react';
import  { startOfWeek, endOfWeek } from 'date-fns'
import './App.css';

// I have duplicated the months because
// When the current month is say November +2 +3 +4 goes to 13 14 15 months which is not found
// So to hop away from this error we duplicate the months
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
const curr = new Date();
const currMonth = monthNames[curr.getMonth()];
const nextMonth1 = monthNames[1 + curr.getMonth()];
const nextMonth2 = monthNames[2 + curr.getMonth()];
const nextMonth3 = monthNames[3 + curr.getMonth()];
const nextMonth4 = monthNames[4 + curr.getMonth()];
const nextMonth5 = monthNames[5  + curr.getMonth()];


// we do this because after fixing the issue ( bug 02 ) with overlapping with next month weeks
// When its january from december and it overlaps
// we get undefined month because we dont have any months before january in our monthNames
// I could add december but that means we need to change every other month variable
// and undefined month will only be in this certain condition

var errorMonth = monthNames[curr.getMonth() - 1];
if (errorMonth === undefined) {
  var errorMonth = 'December'
}
const year = new Date().getFullYear() 

// for counter, dates so they show correct values not: september 34th
// we use date-fns to get first day of the week and last day of the week, we also add 1 day to end of the week so its not sunday 
// as a note its sunday 23.59 but we delete off the hours portion and we use days for our counter
// so sunday is treated as 0.00 sunday
const currFirstDay =  new Date();
const counterFirst = startOfWeek(currFirstDay, {weekStartsOn: 1});
const counterLast = endOfWeek(currFirstDay, {weekStartsOn: 1});
const firstDay = counterFirst.getDate();
const counterFirst2 = monthNames[counterFirst.getMonth()] + ' ' + counterFirst.getDate();
const counterLast2 = monthNames[counterLast.getMonth()] + ' ' + [counterLast.getDate() + 1];


// button function
let btn1 = 'Show More'
let btn2 = 'Show Less'
let block = 'grid';
let less = 'none';

const showMoLe = () => {
  const btn = document.getElementById("grid2");
    btn.style.display = block;
    [btn1, btn2] = [btn2, btn1];
    [block, less] = [less, block];
    
}

// counter

const App = () => {
  const [timer, setTimer] = useState(null);
  const timer2 = () => {
    const now = new Date().getTime();
    const countDownDate = new Date(counterLast).getTime();  
    const distance = countDownDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    const countDwn = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
    setTimer(countDwn);
    
    setInterval(timer2, 1000);
    console.log(timer2)
  }
  
  const [data, setData] = useState(null);
  var nameW = data && data[currMonth][firstDay]
 

  // update with a bug fix(2), if last month overlaps with current in a week term 
  // ex.  11-27 to 12-05 or etc 
  // when its 12-05 its going to be looking at december not november (currMonth data)
  // so we take last month variable with data, we look for the last object in the json
  // we regex to remove the stuff which is not needed (numbers, special chars.)
  // and we change the variable
   if (nameW === undefined) {
    var highest = data[errorMonth][ Object.keys(data[errorMonth]).pop() ];
    var highest2 = highest.replace(/\s+/g, '');
    let highest3 = highest2.replace(/[^a-zA-Z0-9\s+]/g,'')
    let highest4 = highest3.replace(/\d+/g,'');
    var nameW = highest4
  }
 
  useEffect(() => {
    timer2();
    return () => {
      clearInterval(timer);
      clearInterval(timer2);
      clearInterval(setTimer);
    };
  },)
  useEffect(() => {
    
    
    fetch(process.env.REACT_APP_MY_API_KEY)
      .then(res => {
        if (res.ok) {
        //  console.log('SUCCESS!')
        } else {
          alert('Something Messed Up! ERROR - 01')
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
       
      })
      .catch(error => alert('Something Messed Up! ERROR - 02'))
  }, [], )
  return (
    
    <div className="App">
      <div id='flexBox1'>
        <h1 id='headerText'> On-call:</h1>
        <h1 id='name'> { nameW } </h1>
        
        <p class='headerText2'> {counterFirst2} - {counterLast2} </p>
        <p class='countDown'> {timer} </p>

      </div>
      <div id='grid'>
        <div class='flexBox2'>

          <h2> {currMonth} </h2>
          <p class='next1More'> {data && data[currMonth]['01']} </p>
          <p class='next1More'> {data && data[currMonth]['02']} </p>
          <p class='next1More'> {data && data[currMonth]['03']} </p>
          <p class='next1More'> {data && data[currMonth]['04']} </p>
          <p class='next1More'> {data && data[currMonth]['05']} </p>

        </div>
        <div class='flexBox3'>
          <h2> {nextMonth1}</h2>
          <p class='next1More'> {data && data[nextMonth1]['01']} </p>
          <p class='next1More'> {data && data[nextMonth1]['02']} </p>
          <p class='next1More'> {data && data[nextMonth1]['03']} </p>
          <p class='next1More'> {data && data[nextMonth1]['04']} </p>
          <p class='next1More'> {data && data[nextMonth1]['05']} </p>

        </div>
        <div class='flexBox4'>
          <h2> {nextMonth2}</h2>
          <p class='next2More'> {data && data[nextMonth2]['01']} </p>
          <p class='next2More'> {data && data[nextMonth2]['02']} </p>
          <p class='next2More'> {data && data[nextMonth2]['03']} </p>
          <p class='next2More'> {data && data[nextMonth2]['04']} </p>
          <p class='next2More'> {data && data[nextMonth2]['05']} </p>
        </div>
      </div>   
        
      <div id='grid2'>
        <div class='flexBox2'>

        <h2> {nextMonth3}</h2>
          <p class='next1More'> {data && data[nextMonth3]['01']} </p>
          <p class='next1More'> {data && data[nextMonth3]['02']} </p>
          <p class='next1More'> {data && data[nextMonth3]['03']} </p>
          <p class='next1More'> {data && data[nextMonth3]['04']} </p>
          <p class='next1More'> {data && data[nextMonth3]['05']} </p>

        </div>
        <div class='flexBox3'>
          <h2> {nextMonth4}</h2>
          <p class='next1More'> {data && data[nextMonth4]['01']} </p>
          <p class='next1More'> {data && data[nextMonth4]['02']} </p>
          <p class='next1More'> {data && data[nextMonth4]['03']} </p>
          <p class='next1More'> {data && data[nextMonth4]['04']} </p>
          <p class='next1More'> {data && data[nextMonth4]['05']} </p>

        </div>
        <div class='flexBox4'>
          <h2> {nextMonth5}</h2>
          <p class='next2More'> {data && data[nextMonth5]['01']} </p>
          <p class='next2More'> {data && data[nextMonth5]['02']} </p>
          <p class='next2More'> {data && data[nextMonth5]['03']} </p>
          <p class='next2More'> {data && data[nextMonth5]['04']} </p>
          <p class='next2More'> {data && data[nextMonth5]['05']} </p>
        </div>
      </div>
      
        <button class = 'button2' onClick={showMoLe}> {btn1} </button>
    
    </div>
    
  );
}
export default App;
