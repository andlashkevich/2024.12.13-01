"use client";

import styles from "./task1.module.css";
import { useEffect, useState } from "react";

export function Task1() {
	const [tD, setTd] = useState([]);
	// const [isLoad, setIsload] = useState(false);
	let d = new Intl.DateTimeFormat("ru", { dateStyle: "full" }).format(
		new Date(),
	);
	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/todos/")
			.then((toDoDate) => toDoDate.json())
			.then((toDo) => {
				setTd(toDo);
			});
		// .finally(() => setIsload(false));
	}, []);

	return (
		<form className={styles.wrap}>
			<h1 className={styles.head}> Задачи на год</h1>
			<h3 className={styles.date}>{d}</h3>
			<ul type={"circle"} className={styles.ul}>
				{tD.map((it, id) => {
					return (
						<li
							key={id}
							className={
								it.completed ? styles.checked : styles.uncheck
							}
						>
							{it.title}
						</li>
					);
				})}
			</ul>
		</form>
	);
}