"use client";

import styles from "./task2.module.css";
import { useEffect, useState } from "react";

export function Task2() {
	const [inTask, setInTask] = useState("");
	const [outTask, setOutTask] = useState([]);
	const [error, setError] = useState(null);
	const [block, setBlock] = useState(false);
	// const refreshFlag = () => setRefresh(!refresh)

	const inputChange = ({ target }) => {
		let error = null;
		setInTask(target.value);
		if (outTask.find((it) => it.task === target.value))
			error = "Такая задача уже существует";
		if (target.value.length > 30) error = "Слишком длинная задача";
		setError(error);
	};
	useEffect(() => {
		fetch("http://localhost:3003/tasks")
			.then((rsp) => rsp.json())
			.then((dt) => {
				setOutTask(dt);
			});
	}, [block]);

	const createTask = () => {
		setBlock(true);
		fetch("http://localhost:3003/tasks", {
			method: "POST",
			headers: { "Content-Type": "application/json; charset=utf-8" },
			body: JSON.stringify({ task: inTask }),
		})
			.then((rsp) => rsp.json())
			.then((dt) => console.log(dt))
			.catch((error) => console.log(error))
			.finally(() => {
				setInTask("");
				setBlock(false);
			});
	};

	const delTask = (e) => {
		let id = outTask.find((it) => {
			if (it.task === e.target.previousElementSibling.innerText)
				return it;
		}).id;
		fetch(`http://localhost:3003/tasks/${id}`, {
			method: "DELETE",
		});
	};

	const sortTask = (e) => {
		e.preventDefault();
		let sTask = [...outTask];
		setOutTask(
			sTask.sort((a, b) =>
				a.task.toLowerCase() > b.task.toLowerCase() ? 1 : -1,
			),
		);
	};

	const changeTask = (e) => {
		e.preventDefault();
		console.log(e);
	};

	const findTask = () => {
		inTask
			? outTask.find((it) => {
					it.task.includes(inTask);
					let m = `Задача № ${it.task.id + 1} соответсвует запросу`;
					return m;
				})
			: setError("Поиск невозможен");
	};

	return (
		<form className={styles.wrap}>
			<h1 className={styles.head}> Задачи на неделю</h1>
			{error ? <div className={styles.error}>{error}</div> : null}
			<textarea
				name="newTask"
				value={inTask}
				onChange={inputChange}
				// onBlur={emailBlur}
				className={styles.input}
				placeholder="Введите новую задачу или нажмите на существующую для внесения изменений"
				autoFocus={true}
				required={true}
				autoComplete="on"
			></textarea>
			<div className={styles.buttons}>
				<button
					disabled={block}
					className={styles.сButton}
					onClick={createTask}
				>
					Добавить
				</button>
				<button
					disabled={block}
					onClick={sortTask}
					className={styles.oButton}
				>
					Упорядочить
				</button>
				<button
					disabled={block}
					onClick={findTask}
					className={styles.fButton}
				>
					Найти
				</button>
			</div>
			<ol className={styles.ol}>
				{outTask.map((it, id) => {
					return (
						<div className={styles.tasks} key={id}>
							<li className={styles.uncheck}>
								<input
									onChange={changeTask}
									className={styles.checkbox}
									type={"checkbox"}
								></input>
								{it.task}
							</li>
							<button
								disabled={block}
								onClick={delTask}
								className={styles.del}
							>
								Удалить
							</button>
						</div>
					);
				})}
			</ol>
		</form>
	);
}
