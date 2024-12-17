import { Task1, Task2 } from "/components";
import styles from "./page.module.css";

export default function Page() {
	return (
		<div className={styles.container}>
			<Task2 />
			<Task1 />
		</div>
	);
}
