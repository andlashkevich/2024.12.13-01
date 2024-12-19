"use client";

import styles from "./task1.module.css";
import { useEffect, useState } from "react";

export function Task1() {
	const [tD, setTd] = useState([]);
	let d = new Intl.DateTimeFormat("ru", { dateStyle: "full" }).format(
		new Date(),
	);
	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/todos/")
			.then((toDoDate) => toDoDate.json())
			.then((toDo) => {
				setTd(toDo);
			});
	}, []);

	return (
		<form className={styles.wrap}>
			<h1 className={styles.head}> Задачи на год (JSONplaceholder)</h1>
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
