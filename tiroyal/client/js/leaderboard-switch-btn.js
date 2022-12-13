// 'use strict';

// var switchButton 			= document.querySelector('.switch-button');
// var switchBtnRight 			= document.querySelector('.switch-button-case.right');
// var switchBtnLeft 			= document.querySelector('.switch-button-case.left');
// var activeSwitch 			= document.querySelector('.active');

// function switchLeft(){
// 	switchBtnRight.classList.remove('active-case');
// 	switchBtnLeft.classList.add('active-case');
// 	activeSwitch.style.left 						= '0%';
// }

// function switchRight(){
// 	switchBtnRight.classList.add('active-case');
// 	switchBtnLeft.classList.remove('active-case');
// 	activeSwitch.style.left 						= '50%';
// }

// switchBtnLeft.addEventListener('click', function(){
// 	switchLeft();
// }, false);

// switchBtnRight.addEventListener('click', function(){
// 	switchRight();
// }, false);

// var btns = document.querySelectorAll('.switch-button-case')
// console.log(btns)
// for (var btn of btns) {
// 	btn.addEventListener('click', function(){
// 		isSwitch();
// 	}, false);
// }

function isSwitch(e) {
	// Get parent
	const parent = e.target.parentElement;

	if (e.target === parent.querySelector('.active-case'))
		return

	parent.querySelector('.active-case')
		.classList.toggle('active-case')
	e.target.classList.toggle('active-case')

	const btns = parent.querySelectorAll('.switch-button-case')
	
	const index = [...parent.children].indexOf(e.target)-1;
	let container = parent.parentElement
	const span_left = 100 / btns.length * index
	const span_width = 100 / btns.length

	let s = parent.querySelector('.active')
	s.style.left = span_left + "%";
	s.style.width = span_width + "%";
}
