"use client";

import styles from "./task3.module.css";
import { useEffect, useState } from "react";
import { ref, onValue, push, set, remove } from "firebase/database";
import { db } from "../../firebase";

export function Task3() {
	const [inTask, setInTask] = useState("");
	const [outTask, setOutTask] = useState([]);
	const [error, setError] = useState(null);
	const [id, setId] = useState("");
	const setClear = () => {
		setInTask("");
		setError(null);
	};

	useEffect(() => {
		const taskDbRef = ref(db, "tasks");
		return onValue(taskDbRef, (snapshot) => {
			const loaded = Object.entries(snapshot.val()) || [];
			setOutTask(loaded);
		});
	}, [inTask]);

	const inputChange = ({ target }) => {
		let error = null;
		setInTask(target.value);
		if (outTask.find((it) => it[1].task === target.value))
			error = "Такая задача уже существует";
		if (target.value.length > 100) error = "Слишком длинная задача";
		setError(error);
	};

	const createTask = () => {
		const taskDbRef = ref(db, "tasks");
		push(taskDbRef, { task: inTask })
			.then((rsp) => console.log(rsp))
			.catch((error) => console.log(error))
			.finally(() => setClear());
	};

	const delTask = (e) => {
		let id = outTask.find((it) => {
			if (it[1].task === e.target.previousElementSibling.innerText)
				return it;
		})[0];
		const taskDbRef = ref(db, `tasks/${id}`);
		remove(taskDbRef).then((rsp) => console.log(rsp));
	};

	const sortTask = (e) => {
		setOutTask(
			[...outTask].sort((a, b) =>
				a[1].task.toLowerCase() > b[1].task.toLowerCase() ? 1 : -1,
			),
		);
	};

	const fixTask = (e) => {
		setInTask(e.target.innerText);
		setId(
			outTask.find((it) => {
				if (it[1].task === e.target.innerText) return it;
			})[0],
		);
	};

	const updTask = () => {
		const taskDbRef = ref(db, `tasks/${id}`);
		set(taskDbRef, { task: inTask })
			.then((rsp) => console.log(rsp))
			.catch((error) => console.log(error))
			.finally(() => setClear());
	};

	// const findTask = () => {
	// 	let a = [];
	// 	a = outTask.filter((it) => it[1].task.includes(inTask));
	// 	inTask && a.length > 0
	// 		? setOutTask(a)
	// 		: setError("Поиск не дал результатов");
	// };

	// ПОИСК С debounce ВНИЗУ, А ПРОСТОЙ И ПОНЯТНЫЙ ПОИСК ВВЕРХУ

	const debounce = (f, timeout) => {
		let id = null;
		return (...arg) => {
			clearTimeout(id);
			id = setTimeout(() => f(...arg), timeout);
		};
	};

	const fTask = () => {
		const taskDbRef = ref(db, "tasks");
		return onValue(taskDbRef, (snapshot) => {
			const loaded = Object.entries(snapshot.val());
			setOutTask(loaded.filter((it) => it[1].task.includes(inTask)));
		});
	};
	const findTask = debounce(fTask, 3000);

	return (
		<div className={styles.wrap}>
			<h1 className={styles.head}> Задачи на день (Firebase)</h1>
			<div className={styles.field}>
				{error ? <div className={styles.error}>{error}</div> : null}
				<textarea
					name="newTask"
					value={inTask}
					onChange={inputChange}
					className={styles.input}
					placeholder="1.Введите новую задачу или словосочетание для поиска существующей. 2.Для исправления имеющейся задачи нажмите на неё и внесите желаемое изменение в этом поле. 3.Ввод пустого значения или задачи длиной более 100 знаков неприемлем. 4.Если задача уже есть в списке, ввести её еще раз не получится."
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
				{outTask.map((it) => {
					return (
						<div className={styles.tasks} key={it[0]}>
							<li onClick={fixTask} className={styles.uncheck}>
								{it[1].task}
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
