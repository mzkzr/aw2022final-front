import React from 'react'

export const ToTop = () => {
	const [scrollTop, setScrollTop] = React.useState(false)

  	React.useEffect(() => {
		window.addEventListener("scroll", () => {
			if (window.pageYOffset > 340) {
				setScrollTop(true)
			} else {
				setScrollTop(false)
			}
		})
  	}, [])

  	const bottomToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		})
  	}

  	return (
		<>
			{scrollTop && (
				<i onClick={bottomToTop} className="backToTop bi bi-arrow-up-circle-fill" title="Volver arriba"></i>
			)}
		</>
  	)
}
