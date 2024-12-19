"use client";

import styles from "./task2.module.css";
import { useEffect, useState } from "react";

export function Task2() {
	const [inTask, setInTask] = useState("");
	const [outTask, setOutTask] = useState([]);
	const [error, setError] = useState(null);
	const [id, setId] = useState("");
	const [refresh, setRefresh] = useState(false);
	const setClear = () => {
		setInTask("");
		setError(null);
	};

	const inputChange = ({ target }) => {
		let error = null;
		setInTask(target.value);
		if (outTask.find((it) => it.task === target.value))
			error = "Такая задача уже существует";
		if (target.value.length > 100) error = "Слишком длинная задача";
		setError(error);
	};

	useEffect(() => {
		fetch("http://localhost:3003/tasks")
			.then((rsp) => rsp.json())
			.then((dt) => {
				setOutTask(dt);
			});
	}, [inTask, refresh]);

	const createTask = () => {
		fetch("http://localhost:3003/tasks", {
			method: "POST",
			headers: { "Content-Type": "application/json; charset=utf-8" },
			body: JSON.stringify({ task: inTask }),
		})
			.then((rsp) => rsp.json())
			.then((dt) => console.log(dt))
			.catch((error) => console.log(error))
			.finally(() => setClear());
	};

	const delTask = (e) => {
		let id = outTask.find((it) => {
			if (it.task === e.target.previousElementSibling.innerText)
				return it;
		}).id;
		fetch(`http://localhost:3003/tasks/${id}`, {
			method: "DELETE",
		});
		setRefresh(!refresh);
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

	const fixTask = (e) => {
		setInTask(e.target.innerText);
		let id = outTask.find((it) => {
			if (it.task === e.target.innerText) return it;
		}).id;
		setId(id);
	};

	const updTask = () => {
		fetch(`http://localhost:3003/tasks/${id}`, {
			method: "PUT",
			body: JSON.stringify({ task: inTask }),
			headers: {
				"content-Type": "application/json; charset=utf-8",
			},
		})
			.then((rsp) => rsp.json())
			.then((dt) => console.log(dt))
			.catch((error) => console.log(error))
			.finally(() => setClear());
	};

	const findTask = () => {
		let a = [];
		a = outTask.filter((it) => it.task.includes(inTask));
		inTask && a.length > 0
			? setOutTask(a)
			: setError("Поиск не дал результатов");
	};

	// Если я правильно понял debounce , то его код с findTask указан ниже на замену текущей функции findTask, которая ничего на сервере не ищет, а перебирает существующие на странице элементы и не нуждается во временных задержках и в целом проще.

	// const debounce = (f, timeout) => {
	// 	let id = null;
	// 	return (...arg) => {
	// 		clearTimeout(id);
	// 		id = setTimeout(() => f(...arg), timeout);
	// 	};
	// };
	// const fTask = () => {
	// 	fetch("http://localhost:3003/tasks")
	// 		.then((rsp) => rsp.json())
	// 		.then((dt) => {
	// 			setOutTask(dt.filter((it) => it.task.includes(inTask)));
	// 		});
	// };
	// const findTask = debounce(fTask, 3000);

	return (
		<div className={styles.wrap}>
			<h1 className={styles.head}> Задачи на неделю</h1>
			<div className={styles.field}>
				{error ? <div className={styles.error}>{error}</div> : null}
				<textarea
					name="newTask"
					value={inTask}
					onChange={inputChange}
					className={styles.input}
					placeholder="1.Введите новую задачу  или  словосочетание  для  поиска существующей. 2.Для исправления имеющейся задачи нажмите на неё и внесите желаемое изменение в этом поле. 3.Ввод пустого значения или задачи длиной более 100 знаков неприемлем. 4.Если задача уже есть в списке, ввести её еще раз не получится."
					autoFocus={true}
					autoComplete="on"
				></textarea>
				<button onClick={setClear} className={styles.xBut}>
					X
				</button>
			</div>
			<div className={styles.buttons}>
				<button
					disabled={!inTask || error}
					className={styles.сButton}
					onClick={createTask}
				>
					Добавить
				</button>
				<button
					disabled={!outTask}
					onClick={sortTask}
					className={styles.sButton}
				>
					Упорядочить
				</button>
				<button
					disabled={!inTask}
					onClick={findTask}
					className={styles.fButton}
				>
					Найти
				</button>
				<button
					disabled={!inTask || error}
					onClick={updTask}
					className={styles.uButton}
				>
					Изменить
				</button>
			</div>
			<ol className={styles.ol}>
				{outTask.map((it, id) => {
					return (
						<div className={styles.tasks} key={id}>
							<li onClick={fixTask} className={styles.uncheck}>
								{it.task}
							</li>
							<button
								// disabled={}
								onClick={delTask}
								className={styles.del}
							>
								Удалить
							</button>
						</div>
					);
				})}
			</ol>
		</div>
	);
}
