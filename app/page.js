import { Task1, Task2, Task3 } from "/components";
import styles from "./page.module.css";

export default function Page() {
	return (
		<div className={styles.container}>
			<Task3 />
			<Task2 />
			<Task1 />
		</div>
	);
}
