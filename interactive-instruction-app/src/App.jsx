import data from './data.json';
import styles from './app.module.css';
import { useState } from 'react';

function App() {
	// Можно задать 2 состояния — steps и activeIndex
	const [steps, setSteps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);
	// И определить 3 обработчика: Клик назад, Клик вперед, Начать сначала
	const moveBackButtonClick = () => {
		if (activeIndex > 0) {
			setActiveIndex(updatedIndex => updatedIndex - 1);
		}
	}

	const moveForwardButtonClick = () => {
		if (activeIndex >= 0 || activeIndex <= steps.length - 1) {
			setActiveIndex(updatedIndex => updatedIndex + 1);
		}
	}

	const moveToTheBeginningButtonClick = () => {
		if (activeIndex > 0) {
			setActiveIndex(0);
		}
	}

	// И 2 переменных-флага — находимся ли мы на первом шаге, и находимся ли на последнем
	let firstStep = false;
	let lastStep = false;

	if(activeIndex === 0) {
		firstStep = true;
	}

	if(activeIndex === steps.length - 1) {
		lastStep = true;
	}

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{steps[activeIndex].content}
					</div>
					<ul className={styles['steps-list']}>
						{steps.map(({id, title}, index) => (
							<li key={id} className={styles['steps-item'] + (index <= activeIndex ? ` ${styles.done}` : '') + (index === activeIndex ? ` ${styles.active}` : '')}>
								<button className={styles['steps-item-button']} onClick={() => setActiveIndex(index)}>{index + 1}</button>
								<div>{title}</div>
							</li>
						))}
					</ul>
					<div className={styles['buttons-container']}>
						<button className={styles.button} onClick={moveBackButtonClick} disabled={firstStep}>Назад</button>
						{!lastStep && <button className={styles.button} onClick={moveForwardButtonClick}>
							Далее
						</button>}
						{lastStep && <button className={styles.button} onClick={moveToTheBeginningButtonClick}>Начать сначала</button>}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App
