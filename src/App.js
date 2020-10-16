import React from 'react'
import ListElement from './ListElement'

function App() {
	const [value, setValue] = React.useState('')
	let arrMounth = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"]

    const [month, setMonth]  = React.useState(localStorage["month"] !== undefined ? Number(localStorage["month"]) : new Date().getMonth()) 
	const [year, setYear]  = React.useState(localStorage["year"] !== undefined ? Number(localStorage["year"]) : new Date().getFullYear()) 
	let buf = [{month: month, year: year,valuesPLus:[],valuesMinus:[]}]
	if(localStorage["arr"] !== undefined) buf = JSON.parse(localStorage["arr"])
	const[arrValues,setArrValues] = React.useState(buf) 

	
	let element
	for (const iterator of arrValues) {
		if(iterator.month === month && iterator.year === year) {
			element = iterator
			break
		} 
	}

	function monthUpdate(i){
		let resultMonth
		let resultYear
		if(month + i < 0){
			resultYear = year - 1
			resultMonth = 11
		}else if(month + i > 11) {
			resultYear = year + 1
			resultMonth = 0
		}else{
			resultYear = year
			resultMonth = month + i
		}
		setYear(resultYear)
		setMonth(resultMonth)
		
		if(!checkDate(resultMonth,resultYear) ){
			setArrValues(arrValues.concat( {month: resultMonth, year: resultYear,valuesPLus:[],valuesMinus:[]}))
		}
		localStorage.setItem('month', JSON.stringify(resultMonth));
		localStorage.setItem('year', JSON.stringify(resultYear));
	}
	function checkDate(month,year){
		for (const iterator of arrValues) {
			if(iterator.month === month && iterator.year === year) {
				return true
			} 
		}
		return false
	}
	function addValue(i){
		if(value === '') return
		
		if(i === 1){
			element.valuesPLus = element.valuesPLus.concat([{value:Number(value),id:Date.now()}])
			setValue('')
		}else if(i === -1){
			element.valuesMinus = element.valuesMinus.concat([{value:Number(value),id:Date.now()} ])
			setValue('')
		}
		save(arrValues)
	}
	function deleteElement(ell){
		element.valuesPLus = element.valuesPLus.filter((el)=> el.id !== ell.id)
		element.valuesMinus = element.valuesMinus.filter((el)=> el.id !== ell.id)
		let resultArr = arrValues.map( elem =>{
			if(elem.month === element.month && elem.year === element.year) return element
			else return elem
		})
		setArrValues(resultArr)
		save(resultArr)
	}
	function save(arr) {
		localStorage.setItem('arr', JSON.stringify(arr));
	}
	let allValue = 0
	for (const iterator of element.valuesPLus) {
		allValue += iterator.value
	} 
	for (const iterator of element.valuesMinus) {
		allValue -= iterator.value
	} 
	return (
		
		<div className="container">
			<main>
				<header>
					<div className="block-month-balance" >{allValue}</div>
					<div className="block-month-data">
						<button onClick={ ()=> monthUpdate(-1)}>&lt;</button>
						<div>
							<span >{arrMounth[month]}</span>
							<span >{year}</span>
						</div>
						<button onClick={ ()=> monthUpdate(1)}>&gt;</button>
					</div>
				</header>
				<div className="input">
					<button onClick={ ()=> addValue(1)}><span>+</span></button>
					<div className="input-value"><input type="number" value={value} onChange={event => setValue(event.target.value)} /></div>
					<button onClick={ ()=> addValue(-1)}><span>-</span></button>
				</div>
				<div className="lists">
					<ListElement arrValues={element.valuesPLus} deleteElement={deleteElement}/>
					<div></div>
					<ListElement arrValues={element.valuesMinus} deleteElement={deleteElement}/>
				</div>
			</main>
		</div>
	);
}

export default App;
