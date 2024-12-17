"use client";

import styles from "./task2.module.css";
import { useEffect, useState } from "react";

export function Task2() {
	const tasks = [
		"Pay bills",
		"Meet George",
		"By eggs",
		"Read a book",
		"Organize office",
	];
	const [inTask, setInTask] = useState("");
	const [outTask, setOutTask] = useState(tasks);
	const [error, setError] = useState(null);
	const inputChange = ({ target }) => {
		let error = null;
		setInTask(target.value);
		if (target.value.length > 10) error = "Большая задача";
		setError(error);
	};

	const createTask = () => {
		tasks.unshift(inTask);
		setOutTask(tasks);
		console.log(outTask);
		setInTask("");
		// fetch("http://localhost:3005/tasks", {
		// 	method: "POST",
		// 	headers: { "Content-Type": "application/json; charset=utf8" },
		// 	body: JSON.stringify({ tasks: inTask }),
		// })
		// 	.then((resp) => resp.json())
		// 	.then((response) => {
		// 		console.log("Добавлено, ответ сервера:", response);
		// 	});
	};
	return (
		<form className={styles.wrap}>
			<h1 className={styles.head}> Задачи на неделю</h1>
			<textarea
				name="newTask"
				value={inTask}
				onChange={inputChange}
				// onBlur={emailBlur}
				className={styles.input}
				placeholder="Введите новую задачу или нажмите на существующую для внесения изменений"
				autoFocus={true}
				autoComplete="on"
			></textarea>
			<div className={styles.buttons}>
				<button className={styles.сButton} onClick={createTask}>
					Добавить
				</button>
				<button className={styles.oButton}>Упорядочить</button>
				<button className={styles.fButton}>Найти</button>
			</div>
			<ol className={styles.ol}>
				{outTask.map((it, id) => {
					return (
						<div className={styles.tasks} key={id}>
							<li className={styles.uncheck}>
								<input
									className={styles.checkbox}
									type={"checkbox"}
								></input>
								{it}
							</li>
							<button className={styles.del}>Удалить</button>
						</div>
					);
				})}
			</ol>
		</form>
	);
}
