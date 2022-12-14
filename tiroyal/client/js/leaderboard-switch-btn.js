function DoToggleButtonAnimation(e) {
	// Get parent
	const parent = e.target.parentElement;

	if (e.target === parent.querySelector('.active-case'))
		return

	parent.querySelector('.active-case')
		.classList.toggle('active-case')
	e.target.classList.toggle('active-case')

	const btns = parent.querySelectorAll('.switch-button-case')
	const index = [...parent.children].indexOf(e.target)-1;
	
	const span_left = 100 / btns.length * index
	const span_width = 100 / btns.length

	let s = parent.querySelector('.active')
	s.style.left = span_left + "%";
	s.style.width = span_width + "%";
}

